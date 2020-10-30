// Here we keep all functions related to database requests
const SQLite = require('better-sqlite3');

const sql = SQLite('./.data/global-data.db');
const XMLHttpRequest = require('xhr2');
const discordbot = require('./discordbot.js');
const socket = require('./socket.js');

let regionNames = ['DeadLandsHex', // 3
  'CallahansPassageHex', // 4
  'MarbanHollow', // 5
  'UmbralWildwoodHex', // 6
  'MooringCountyHex', // 7
  'HeartlandsHex', // 8
  'LochMorHex', // 9
  'LinnMercyHex', // 10
  'ReachingTrailHex', // 11
  'StonecradleHex', // 12
  'FarranacCoastHex', // 13
  'WestgateHex', // 14
  'FishermansRowHex', // 15
  'OarbreakerHex', // 16
  'GreatMarchHex', // 17
  'TempestIslandHex', // 18
  'GodcroftsHex', // 19
  'EndlessShoreHex', // 20
  'AllodsBightHex', // 21
  'WeatheredExpanseHex', // 22
  'DrownedValeHex', // 23
  'ShackledChasmHex', // 24
  'ViperPitHex']; // 25
function UpdateMapList() {
  const request = new XMLHttpRequest();
  request.responseType = 'json';
  request.open('GET', 'https://war-service-live.foxholeservices.com/api/worldconquest/maps/', true);
  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      try {
        const obj = [];
        for (let i = 0; i < this.response.length; i++) {
          obj.push(this.response[i]);
        }
        regionNames = obj;
      }
      catch (err) {
        console.log(err);
      }
    }
  };
  request.send();
}
UpdateMapList(); // Getting the map list on launch.
setInterval(UpdateMapList, 60000/* 100000 */); // Updating map list every minute.

// Checks if user is logged on
exports.logincheck = function logincheck(request) {
  // console.log(request.headers);
  if (request.headers.cookie == undefined) { return false; }
  if (!request.headers.cookie.includes('salt')) { return false; }
  const cookiestring = request.headers.cookie;
  const id = cookiestring.substring(cookiestring.indexOf(' steamid=') + 9, cookiestring.indexOf(' steamid=') + 26).replace(';', '');
  let salt = cookiestring.substring(cookiestring.indexOf(' salt=') + 6, cookiestring.indexOf(' salt=') + 15).replace(';', '');
  const query = sql.prepare('SELECT * FROM users WHERE id= ?;').get(id);
  // console.log("Validating id "+query.id+" | "+id);
  // console.log("Validating salt "+query.salt+" | "+salt);
  //console.log(id, salt, query);
  if (query == undefined) {
    return false;
  }
  query.salt = query.salt.slice(0, 9);
  salt = salt.slice(0, 9);
  // console.log(id==query.id)
  if (query == undefined) { return false; }
  if (id == query.id && salt == query.salt) {
    return true;
  } return false;
};

exports.offlinecheck = function (online, io) {
  const users = sql.prepare("SELECT * FROM users WHERE id LIKE 'anonymous%';").all();
  const now = new Date();
  for (let i = 0; i < users.length; i++) {
    if (users[i].id != 'anonymous') {
    // console.log(users[i].id);
      if (online.includes(users[i].id)) {
        sql.prepare('UPDATE users SET avatar = ? WHERE id = ?;').run(new Date().toString(), users[i].id);
      } else {
        const timediff = now - new Date(users[i].avatar);
        if (timediff > 1800000) {
          // console.log("Deleting user "+users[i].id+" | "+users[i].name);
          const rooms = sql.prepare('SELECT * FROM userglobal where userid = ?').all(users[i].id);
          sql.prepare('DELETE FROM userglobal WHERE userid = ?').run(users[i].id);

          for (let j = 0; j < rooms.length; j++) {
            io.to(rooms[j].globalid).emit('leaveroomroom', users[i].id);
          }
          sql.prepare('DELETE FROM users WHERE id = ?').run(users[i].id);
        }
      }
    }
  }
};

// Check if this user already exists in the database
exports.existscheck = function (id) {
  const result = sql.prepare('SELECT * FROM users WHERE id= ?;').get(id);
  // console.log(result);
  if (result == undefined) {
    return false;
  } return true;
};

// Gets account from the database
exports.getaccount = function (id) {
  const result = sql.prepare('SELECT * FROM users WHERE id= ?;').get(id);
  // console.log(result);
  return result;
};

// Gets membership of a user
exports.getmembership = function (id, globalid) {
  const result1 = sql.prepare('SELECT * FROM global WHERE id = ?;').get(globalid);
  if (result1 == undefined) { return 8; }
  const result = sql.prepare('SELECT rank FROM userglobal WHERE userid = ? AND globalid = ?;').get(id, globalid);
  if (result == undefined) { return 7; }
  return result.rank;
};

// Get info on rooms connected to a user
exports.getrooms = function (id) {
  const rooms = sql.prepare('SELECT * FROM userglobal WHERE userid = ?;').all(id);
  const globalinfo = [];
  // console.log(rooms);
  if (rooms.length > 0) {
    for (let i = 0; i < rooms.length; i++) {
      const room = exports.getroominfo(rooms[i].globalid);
      // console.log(room)
      const settings = JSON.parse(room.settings);
      const object = {
        roomname: settings.name, admin: room.adminname, adminid: room.adminid, rank: rooms[i].rank, globalid: rooms[i].globalid,
      };
      // console.log(object);
      globalinfo.push(object);
    }
  }
  return globalinfo;
};

// Just gets the names of the rooms the user is in
exports.getroomsshort = function (id) {
  const rooms = sql.prepare('SELECT * FROM userglobal WHERE userid = ?;').all(id);
  return rooms;
};

// Get meta info on room
exports.getroominfo = function (id) {
  // console.log(id);
  const result = sql.prepare('SELECT * FROM global WHERE id = ?;').get(id);
  if (result != undefined) {
    const adminname = sql.prepare('SELECT * FROM users WHERE id = ?;').get(result.admin).name;

    const packet = { adminname, adminid: result.admin, settings: result.settings };
    return packet;
  } return false;
};

// Get private info on room
exports.getprivateroominfo = function (id) {
  const result = sql.prepare('SELECT * FROM global WHERE id = ?;').get(id);
  // console.log(result)
  const refinery = parse(result.refinery);
  const production = parse(result.production);
  const storage = parse(result.storage);
  const stockpiles = parse(result.stockpiles);

  const techtree = parse(result.techtree);
  const fobs = parse(result.fobs);
  const requests = parse(result.requests);
  const misc = parse(result.misc);

  const arty = parse(result.arty);
  const squads = parse(result.squads);
  const logi = parse(result.logi);
  const events = parse(result.events);
  return {
    refinery, production, storage, stockpiles, techtree, requests, fobs, misc, arty, squads, logi, events,
  };
};
exports.getallevents = function () {

  const events = sql.prepare('select * from events order by date desc limit 400').all();
  return { events };
};
// Create a room
exports.createroom = function (id, admin, settings) {
  const insertroom = sql.prepare('INSERT INTO global (id, admin, settings, techtree,refinery, production, storage, stockpiles,fobs, requests, misc, arty,squads,logi,events) VALUES (@id, @admin, @settings, "", "","", "", "","", "", "", "", @squads,  "","[]");');
  settings = JSON.stringify(settings);
  const squads = { vehicles: {}, squads: [{ icon: 0, name: 'New Squad', users: [admin] }] };
  const e = {
    id,
    admin,
    settings,
    squads: JSON.stringify(squads),
  };
  if (admin.includes('anonymous')) {
    e.admin = 'anonymous';
  }
  // console.log(e)
  insertroom.run(e);
  exports.insertrelation.run(e.admin + id, e.admin, id, 1);
  if (admin.includes('anonymous')) {
    exports.insertrelation.run(admin + id, admin, id, 3);
  }
};

// Checks password
exports.checkpassword = function (id, password) {
  let result = sql.prepare('SELECT settings FROM global WHERE id = ?;').get(id);
  result = JSON.parse(result.settings);
  // console.log(password);
  // console.log(result.password);
  if (password == result.password) {
    return true;
  }
  return false;

};

// Leave a room
exports.leaveroom = function (id, globalid) {
  const rank = exports.getmembership(id, globalid);
  // console.log("exports rank: "+rank);
  if (rank != 6) {
    deleterelation.run(id, globalid);
    // discordbot.leaveroom(id,globalid);
    if (rank == 1) {
      // discordbot.deleteroom(id,globalid);
      socket.deleteroom(globalid);
      exports.deleteroom(globalid);
    }
  }
};

// Delete a room
exports.deleteroom = function (id) {
  sql.prepare('DELETE FROM userglobal WHERE globalid = ?').run(id);
  sql.prepare('DELETE FROM global WHERE id = ?').run(id);
};

// Get members of a room
exports.getroomusers = function (id) {
  const users = sql.prepare('SELECT users.id, users.name, users.avatar, userglobal.rank, userglobal.role FROM users INNER JOIN userglobal WHERE users.id=userglobal.userid AND userglobal.globalid= ? ORDER BY (userglobal.rank) ASC;').all(id);
  // console.log(users);
  return users;
};
// Gets data of a user that requests access
exports.getrequester = function (id) {
  const user = sql.prepare('SELECT * FROM users WHERE id = ?;').get(id);
  const packet = {
    id: user.id, name: user.name, avatar: user.avatar, rank: 5,
  };
  return packet;
};
/*    PortBase(4)

    StaticBase1(5)
    StaticBase2(6)
    StaticBase3(7)

    ForwardBase1(8)
    ForwardBase2(9)
    ForwardBase3(10)

    Hospital          (11)
    VehicleFactory    (12)
    Armory            (13)
    SupplyStation     (14)
    Workshop          (15)
    ManufacturingPlant(16)
    Refinery          (17)
    Shipyard          (18)
    TechCenter        (19)

    SalvageField    (20)
    ComponentField  (21)
    FuelField       (22)
    SulfurField     (23)
    WorldMapTent    (24)
    TravelTent      (25)
    TrainingArea    (26)
    SpecialBase     (27) v0.14
    ObservationTower(28) v0.14
    Fort            (29) v0.14
    TroopShip       (30) v0.14
    ScrapMine       (31) v0.16
    SulfurMine      (32) v0.16
    StorageFacility (33) v0.17
    Factory         (34) v0.17
    Garrison Station(35) v0.20
    Ammo Factory	(36) v0.20
    Rocket Site 	(37) v0.20     */
// Get static icons
exports.getstatic = function () {
  const staticdata = sql.prepare('SELECT * FROM apidata_static').all();
  for (let i = 0; i < staticdata.length; i++) {
    staticdata[i].data = JSON.parse(staticdata[i].data);
  }
  return staticdata;
};

// Get dynamic data
exports.getdynamic = function () {
  const dynamic = sql.prepare('SELECT * FROM apidata_dynamic').all();
  for (let i = 0; i < dynamic.length; i++) {
    dynamic[i].data = JSON.parse(dynamic[i].data);
    if (regionNames.includes(dynamic[i].regionName)) {
      dynamic[i].active = true;
    } else {
      dynamic[i].active = false;
    }
  }
  return dynamic;
};
exports.getevents = function () {
  const events = sql.prepare('select * from events order by date desc limit 500').all();
  return events;
};
// Changes rank of users
exports.changeusers = function (subjid, objects, globalid) {
  const subjrank = exports.getmembership(subjid, globalid);
  const admin = (subjid == exports.getroominfo(globalid).adminid);
  if (subjrank < 3) {
    for (let i = 0; i < objects.length; i++) {
      const objrank = exports.getmembership(objects[i].id, globalid);
      if (objrank != 7 && objrank != 8) {
        const newrank = objects[i].rank;
        if (newrank != undefined && (newrank < 6)) {
          if (subjrank == 1 && newrank != 1) {
            updaterank.run(newrank, objects[i].id, globalid);
          }
          if (subjrank == 2 && newrank != 1 && (objrank != 2) && (newrank != 2)) {
            updaterank.run(newrank, objects[i].id, globalid);
          }
        }
      }
    }
    socket.updateusers(objects, globalid);
  }
};

// Changes role
exports.setRole = function (user, globalid) {
  const role = JSON.stringify(user.role);
  updaterole.run(role, user.id, globalid);
};

// Transfer room ownership
exports.hailnewking = function (id, newadmin, globalid) {
  const admin = (id == exports.getroominfo(globalid).adminid);
  const membership = exports.getmembership(newadmin, globalid);
  if (admin && (membership < 7)) {
  // console.log("newadmin = "+newadmin+", oldadmin = "+id+", globalid"+globalid);
    sql.prepare('UPDATE userglobal SET rank = 1 WHERE userid = ? AND globalid =?;').run(newadmin, globalid)
    sql.prepare('UPDATE userglobal SET rank = 2 WHERE userid = ? AND globalid =?;').run(id, globalid)
    sql.prepare('UPDATE global SET admin = ? WHERE id = ?;').run(newadmin, globalid)
    socket.hailnewking(newadmin, globalid);
    return true;
  } return false;
};


// Change levels of tech
exports.changetech = function (packet) {
  sql.prepare('UPDATE global SET techtree = ? WHERE id = ?;').run(packet.techtree, packet.globalid);
};


// Creates/updates an object
exports.updateObject = function (packet) {
// console.log(packet)
  const global = sql.prepare('SELECT * FROM global WHERE id = ?').get(packet.globalid);
  // console.log(global);
  if (packet.type.includes('misc')) {
    let misc = {};
    if (global.misc != '') {
      misc = JSON.parse(global.misc);
    }
    const kind = packet.type.slice(5);
    if (misc[kind] == undefined) {
      misc[kind] = {};
    }
    misc[kind][packet.key] = packet.object;
    misc = JSON.stringify(misc);
    sql.prepare('UPDATE global SET misc = ? WHERE id = ?;').run(misc, packet.globalid);
  } else {
    let type = {};
    if (global[packet.type] != '') {
      type = JSON.parse(global[packet.type]);
    }
    type[packet.key] = packet.object;
    type = JSON.stringify(type);
    sql.prepare(`UPDATE global SET ${packet.type} = ? WHERE id = ?;`).run(type, packet.globalid);
  }
};

// Deletes logi request
exports.deleteObject = function (packet) {
// console.log(packet)
  const global = sql.prepare('SELECT * FROM global WHERE id = ?').get(packet.globalid);
  if (packet.type.includes('misc')) {
    let misc = {};
    if (global.misc != '') {
      misc = JSON.parse(global.misc);
    }
    const kind = packet.type.slice(5);
    if (misc[kind] == undefined) {
      misc[kind] = {};
    }
    delete misc[kind][packet.key];
    misc = JSON.stringify(misc);
    sql.prepare('UPDATE global SET misc = ? WHERE id = ?;').run(misc, packet.globalid);
  } else {
    let type = {};
    if (global[packet.type] != '') {
      type = JSON.parse(global[packet.type]);
    }
    delete type[packet.key];
    type = JSON.stringify(type);
    sql.prepare(`UPDATE global SET ${packet.type} = ? WHERE id = ?;`).run(type, packet.globalid);
  }
};
// Adds arty calculations
exports.addArtyResult = function (packet) {
// console.log(packet)
  const global = sql.prepare('SELECT arty FROM global WHERE id = ?').get(packet.globalid);
  if (global.arty == '') { global.arty = []; } else {
    global.arty = JSON.parse(global.arty);
  }
  if (global.arty.constructor != Array) { global.arty = []; }
  global.arty.push(packet.totalstring);
  if (global.arty.length > 5) {
    global.arty.splice(0, 1);
  }
  global.arty = JSON.stringify(global.arty);
  sql.prepare('UPDATE global SET arty = ? WHERE id = ?;').run(global.arty, packet.globalid);
};

// Updates squads
exports.updateSquads = function (packet) {
  const global = sql.prepare('SELECT * FROM global WHERE id = ?').get(packet.globalid);
  if (global.squads == '' || global.squads == '[]') {
    global.squads = {};
  } else {
    global.squads = JSON.parse(global.squads);
  }
  global.squads[packet.type] = packet.data;
  global.squads = JSON.stringify(global.squads);
  // console.log("Updating squads",global.squads)
  // let squads = JSON.stringify(packet.squads);
  sql.prepare('UPDATE global SET squads = ? WHERE id = ?;').run(global.squads, packet.globalid);
};


// Adds a private event
exports.submitEvent = function (packet) {
// console.log(packet)
  const global = sql.prepare('SELECT * FROM global WHERE id = ?').get(packet.globalid);
  switch (packet.type) {
    case 0:// TECH EVENT
      discordbot.techEvent(global, packet.packet);
      break;
  }
  let events = [];
  if (global.events != '') {
    events = JSON.parse(global.events);
  }
  events.push({ type: packet.type, date: packet.date, packet: packet.packet });
  if (events.length > 400) {
    events = events.splice(1);
  }
  // console.log(packet)
  events = JSON.stringify(events);
  sql.prepare('UPDATE global SET events = ? WHERE id = ?').run(events, packet.globalid);
};

exports.submitOpTimer = function (packet) {
  const global = sql.prepare('SELECT * FROM global WHERE id = ?').get(packet.globalid);
  let settings = JSON.parse(global.settings);
  settings.optimer = packet.date;
  global.settings = settings;
  discordbot.startOpTimer(global);
  settings = JSON.stringify(settings);
  sql.prepare('UPDATE global SET settings = ? WHERE id = ?').run(settings, packet.globalid);
};

exports.toggleSecure = function (globalid, data) {
  const global = sql.prepare('SELECT * FROM global WHERE id = ?').get(globalid);
  let settings = JSON.parse(global.settings);
  settings.secure = data;
  settings = JSON.stringify(settings);
  sql.prepare('UPDATE global SET settings = ? WHERE id = ?').run(settings, globalid);
  if (data == 1) {
    sql.prepare('DELETE FROM userglobal WHERE userid LIKE "anonymous%" AND globalid = ?;').run(globalid);
    const users = exports.getroomusers(globalid);
    return users;
  }
};

exports.clearRoom = function (globalid) {
  const global = sql.prepare('SELECT * FROM global WHERE id = ?').get(globalid);
  const e = {
    id: global.id,
    admin: global.admin,
    settings: global.settings,
  };
  sql.prepare('INSERT OR REPLACE INTO global (id, admin, settings, techtree,refinery, production, storage, stockpiles,fobs, requests, misc, arty,squads,logi,events) VALUES (@id, @admin, @settings, "", "","", "", "","", "", "", "", "",  "","[]");').run(e);
};

exports.clearMap = function (globalid) {
  const global = sql.prepare('SELECT * FROM global WHERE id = ?').get(globalid);
  let misc = {};
  if (global.misc != '') {
    misc = JSON.parse(global.misc);
    if (misc.rld != undefined) {
      misc.rld = {};
    }
    if (misc.icon != undefined) {
      misc.icon = {};
    }
  }
  misc = JSON.stringify(misc);
  sql.prepare('UPDATE global SET fobs="",requests="",misc=?  WHERE id = ?').run(misc, globalid);
};

exports.changeSettings = function (globalid, type, data) {
  const global = sql.prepare('SELECT * FROM global WHERE id = ?').get(globalid);
  let settings = JSON.parse(global.settings);
  settings[type] = data;
  settings = JSON.stringify(settings);
  sql.prepare('UPDATE global SET settings = ? WHERE id = ?').run(settings, globalid);
};

exports.deleteSettings = function (globalid, type) {
  const global = sql.prepare('SELECT * FROM global WHERE id = ?').get(globalid);
  let settings = JSON.parse(global.settings);
  if (type == 'link') {
    discordbot.disconnectDiscord(globalid, settings);
  }
  delete settings[type];
  settings = JSON.stringify(settings);
  // console.log("Deleting optimer")
  // console.log(settings)
  sql.prepare('UPDATE global SET settings = ? WHERE id = ?').run(settings, globalid);
};

exports.getRoomByToken = function (token, link) {
  const text = `%"token":"${token}"%`;
  const global = sql.prepare('SELECT * FROM global WHERE settings LIKE ?;').get(text);
  // console.log(global)
  if (global != undefined) {
    global.settings = JSON.parse(global.settings);
    global.settings.link = link;
    delete global.settings.token;
    const settings = JSON.stringify(global.settings);
    sql.prepare('UPDATE global SET settings = ? WHERE id = ?').run(settings, global.id);
  }
  return global;
};

exports.getRoomFromDiscordChannel = function (channelid) {
  const text = `%"channelid":"${channelid}"%`;
  const global = sql.prepare('SELECT * FROM global WHERE settings LIKE ?;').get(text);
  return global;
};

// Adds chat messsage
exports.addMessage = function (packet, category, globalid) {
// console.log(packet)
  const global = sql.prepare('SELECT * FROM global WHERE id = ?').get(globalid);
  // console.log(global);
  let misc = {};
  if (global.misc != '') {
    misc = JSON.parse(global.misc);
  }
  if (misc.chat == undefined) {
    misc.chat = {};
  }
  if (misc.chat[category] == undefined) {
    misc.chat[category] = [];
  }
  misc.chat[category].push(packet);
  misc = JSON.stringify(misc);
  sql.prepare('UPDATE global SET misc = ? WHERE id = ?;').run(misc, globalid);
};

// SQL Constant commands
exports.insertuser = sql.prepare('INSERT INTO users (id, salt, name, avatar) VALUES (?, ?, ?, ?);');
exports.updateuser = sql.prepare('UPDATE users SET name = ?, avatar = ? WHERE id = ?;');

exports.insertrelation = sql.prepare('INSERT OR REPLACE INTO userglobal (id, userid, globalid, rank, role) VALUES (?, ?, ?, ?, "[0,0]");');

const deleterelation = sql.prepare('DELETE FROM userglobal WHERE userid = ? AND globalid = ?;');

const updaterank = sql.prepare('UPDATE userglobal SET rank = ? WHERE userid = ? AND globalid =?;');
const updaterole = sql.prepare('UPDATE userglobal SET role = ? WHERE userid = ? AND globalid =?;');

function parse(string) {
  // console.log(string)
  if (string == '') {
    return {};
  }
  return JSON.parse(string);

}
setInterval(CheckOpTimers, 60000/* 100000 */);
function CheckOpTimers() {
  let date = new Date();
  date.setHours(date.getHours() + 1);
  date = JSON.stringify(date);
  date = date.substring(0, 17);
  // console.log(date)
  const globallist = sql.prepare('SELECT settings FROM global WHERE settings LIKE ? AND settings LIKE "%channelid%" ').all(`%"optimer":${date}%`);
  if (globallist.length > 0) {
    for (let i = 0; i < globallist.length; i++) {
      const settings = JSON.parse(globallist[i].settings);
      discordbot.emitNotifyOp(settings);
    }
  }
// console.log("Op check global list")
// console.log(globallist)
}
exports.GetWar = function (warnumber) {
  const war = sql.prepare('SELECT * FROM warhistory WHERE warnumber = ?').get(warnumber);
  return war;
};

exports.GetTownName = function (obj, regionId) {
  const region = sql.prepare('SELECT * FROM apidata_static WHERE regionId = ?').get(regionId);
  // console.log("Town name - region",region)
  const data = JSON.parse(region.data);
  const name = GetTownName(data.mapTextItems, obj);
  // console.log("Town name - got it",name)
  return name;
};

exports.GetCounts = function () {
  const steamcount = sql.prepare('SELECT count(id) FROM users WHERE id NOT LIKE "anon%";').get();
  const nosteamcount = sql.prepare('SELECT count(id) FROM users WHERE id LIKE "anonymous_%";').get();
  return { steamcount: steamcount['count(id)'], nosteamcount: nosteamcount['count(id)'] };
};
function GetTownName(labellist, town) {
  function compare(a, b) {
    if (a.distance < b.distance)
    { return -1; }
    if (a.distance > b.distance)
    { return 1; }
    return 0;
  }
  for (let i = 0; i < labellist.length; i++) {
    const xdif = Math.abs(town.x - labellist[i].x);
    const ydif = Math.abs(town.y - labellist[i].y);
    const distance = Math.sqrt(Math.pow(xdif, 2) + Math.pow(ydif, 2));
    labellist[i].distance = distance;
  }
  labellist.sort(compare);
  try {
    return labellist[0].text;
  } catch (err) {
    return 'undefined';
  }
}

exports.cunt = function test(string) {
  console.log(`Database functions module ${string}`);
}