import React from 'react';
import RegionImages from "../../_static/region-images";
///////////////////////////////////////////////////////////////////////
function GetMyRank(users) {
  //console.log(users)
  for (var i = 0; i < users.length; i++) {
    if (window.steamid == users[i].id) {
      return users[i].rank;
    }
  }
}
///////////////////////////////////////////////////////////////////////
function compare(a, b) {
  if (a.rank < b.rank) return -1;
  if (a.rank > b.rank) return 1;
  return 0;
}
///////////////////////////////////////////////////////////////////////
function copy(obj) {
  return JSON.parse(JSON.stringify(obj));
}
////////////////////////////////////////////////////////////////
function GetUsername(users, id) {
  for (var i = 0; i < users.length; i++) {
    if (id == users[i].id) {
      return users[i].name;
    }
  }
  return "Anonymous";
}
function ConvertTeam(obj) {
  switch (obj.teamId) {
    case "COLONIALS":
      return "colonial";
      break;
    case "WARDENS":
      return "warden";
      break;
    case "NONE":
      return "neutral";
      break;
    default:
  }
}
///////////////////////////////////////////////////////////////////////
function GetAvatar(users, id) {
  if (id.includes("anonymous")) {
    return "https://cdn.glitch.com/dd3f06b2-b7d4-4ccc-8675-05897efc4bb5%2Fdasd.jpg?1556805827222";
  }
  for (var i = 0; i < users.length; i++) {
    if (id == users[i].id) {
      return users[i].avatar;
    }
  }
  return "https://cdn.glitch.com/dd3f06b2-b7d4-4ccc-8675-05897efc4bb5%2Fdasd.jpg?1556805827222";
}
//////////////////////////////////////////////////////////////////////
function GetUser(users, id) {
  //console.log("Checking user",users,id)
  for (var i = 0; i < users.length; i++) {
    if (id == users[i].id) {
      let user = JSON.parse(JSON.stringify(users[i]));
      user.valid = true;
      if (user.id.includes("anonymous")) {
        user.avatar =
          "https://cdn.glitch.com/dd3f06b2-b7d4-4ccc-8675-05897efc4bb5%2Fdasd.jpg?1556805827222";
      }
      return user;
    }
  }
  return { valid: false, role: 0 };
}
///////////////////////////////////////////////////////////////////////
function signature(obj) {
  if (obj.regionId == undefined) {
    return obj.x + obj.y;
  } else {
    return obj.x + obj.y + obj.regionId;
  }
}
///////////////////////////////////////////////////////////////////////
function GetUpdate(props) {
  let obj = props.obj;
  //console.log("Update obj",obj)
  return (
    <div
      className="card-header cardheader"
      data-toggle="collapse"
      href="#cardnotes"
    >
      Last Update: {GetDateString(new Date(obj.lastupdate))}
    </div>
  );

  function GetDateString(date) {
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    var day = addZero(date.getDate());
    var month = months[date.getMonth()];
    var year = date.getFullYear();
    if (year < 1100) {
      return "None";
    }
    var hour = addZero(date.getHours());
    var minute = addZero(date.getMinutes());
    var second = addZero(date.getSeconds());
    var string =
      day + "/" + month + "/" + year + " " + hour + ":" + minute + ":" + second;
    return string;
  }

  function addZero(num) {
    if (num < 10) {
      num = "0" + num;
    }
    return num;
  }
}
///////////////////////////////////////////////////////////////////////
function SplitTime(time) {
  var diffDays = Math.floor(time / 86400000);
  if (diffDays < 10) {
    diffDays = "0" + diffDays;
  }
  var diffHrs = Math.floor((time % 86400000) / 3600000); // hours
  if (diffHrs < 10) {
    diffHrs = "0" + diffHrs;
  }
  var diffMins = Math.floor(((time % 86400000) % 3600000) / 60000);
  if (diffMins < 10) {
    diffMins = "0" + diffMins;
  }
  var diffSec = Math.floor((((time % 86400000) % 3600000) % 60000) / 1000);
  if (diffSec < 10) {
    diffSec = "0" + diffSec;
  }
  var timestring = diffDays + ":" + diffHrs + ":" + diffMins + ":" + diffSec;
  return timestring;
}
////////////////////////////////////////////////////////////////////
function GetTownName(regionid, town, staticdata) {
  let labellist = [];
  for (var i = 0; i < 23; i++) {
    if (regionid == staticdata[i].regionId) {
      labellist = staticdata[i].data.mapTextItems;
    }
  }
  function compare(a, b) {
    if (a.distance < b.distance) return -1;
    if (a.distance > b.distance) return 1;
    return 0;
  }
  try {
    for (var i = 0; i < labellist.length; i++) {
      var xdif = Math.abs(town.x - labellist[i].x);
      var ydif = Math.abs(town.y - labellist[i].y);
      var distance = Math.sqrt(Math.pow(xdif, 2) + Math.pow(ydif, 2));
      labellist[i].distance = distance;
    }
    labellist.sort(compare);
  } catch (err) {
    console.log(err, staticdata, regionid);
  }
  try {
    return labellist[0].text;
  } catch (err) {
    return "undefined";
  }
}
////////////////////////////////////////////////
function convert(regionid, x, y) {
  return RegionImages.convert(regionid, x, y);
}
////////////////////////////////////////////////////
const GetStoreProps = store => {
  let privateinfo = store.private;
  let selected = store.selected;
  if (selected.type == "" || selected.key == "") {
    return {
      storeObj: {},
      selected: selected
    };
  }
  let obj = {};
  if (selected.townname == "misc") {
    obj = privateinfo.misc[selected.type][selected.key];
  } else {
    obj = privateinfo[selected.type][selected.key];
  }
  if (obj == undefined) {
    obj = {};
  } else {
    if (selected.townname == "misc") {
      obj = JSON.parse(
        JSON.stringify(privateinfo.misc[selected.type][selected.key])
      );
    } else {
      obj = JSON.parse(
        JSON.stringify(privateinfo[selected.type][selected.key])
      );
    }
  }
  return {
    storeObj: obj,
    selected: selected,
    refinery: privateinfo.refinery[selected.refinery],
    production: privateinfo.production[selected.production],
    storage: privateinfo.storage[selected.storage]
  };
};
//////////////////////////////////
const squadnumbers = [
  "https://cdn.glitch.com/dd3f06b2-b7d4-4ccc-8675-05897efc4bb5%2F1s.png?1557484360213",
  "https://cdn.glitch.com/dd3f06b2-b7d4-4ccc-8675-05897efc4bb5%2Fs2.png?1557485248288",
  "https://cdn.glitch.com/dd3f06b2-b7d4-4ccc-8675-05897efc4bb5%2Fs3.png?1557485249108",
  "https://cdn.glitch.com/dd3f06b2-b7d4-4ccc-8675-05897efc4bb5%2Fs4.png?1557485250384",
  "https://cdn.glitch.com/dd3f06b2-b7d4-4ccc-8675-05897efc4bb5%2Fs5.png?1557485251552"
];
////////////////////////////////////////////////////////////////////////////
const roleicons = [
  {
    name: "No role",
    url:
      "https://cdn.glitch.com/dd3f06b2-b7d4-4ccc-8675-05897efc4bb5%2Ftrasp.png?1557577826580"
  },

  {
    name: "  Medic",
    url:
      "https://cdn.glitch.com/dd3f06b2-b7d4-4ccc-8675-05897efc4bb5%2F6393f3fd-16a7-4641-ae3d-994f8e7cea4eIconFilterMedical.png?1554067564203"
  },
  {
    name: "  Engineer",
    url:
      "https://cdn.glitch.com/6393f3fd-16a7-4641-ae3d-994f8e7cea4e%2FIconFilterUtility.png?1548935226605"
  },
  {
    name: "  Scrapper",
    url:
      "https://cdn.glitch.com/dd3f06b2-b7d4-4ccc-8675-05897efc4bb5%2F98ac14b2-4603-4541-b92e-320b855d2e65SledgeHammerItemIcon.png?1554067559208"
  },
  {
    name: "  Rifleman",
    url:
      "https://cdn.glitch.com/dd3f06b2-b7d4-4ccc-8675-05897efc4bb5%2F98ac14b2-4603-4541-b92e-320b855d2e65RifleItemIcon.png?1554067557676"
  },
  {
    name: "  Sniper",
    url:
      "https://cdn.glitch.com/dd3f06b2-b7d4-4ccc-8675-05897efc4bb5%2F98ac14b2-4603-4541-b92e-320b855d2e65SniperRifleItemIcon.png?1554067559653"
  },
  {
    name: "  Machine Gunner",
    url:
      "https://cdn.glitch.com/dd3f06b2-b7d4-4ccc-8675-05897efc4bb5%2F98ac14b2-4603-4541-b92e-320b855d2e65HeavyMachineGunIcon.png?1554067573521"
  },
  {
    name: "  Grenadier",
    url:
      "https://cdn.glitch.com/dd3f06b2-b7d4-4ccc-8675-05897efc4bb5%2F98ac14b2-4603-4541-b92e-320b855d2e65GrenadeItemIcon.png?1554067573845"
  },
  {
    name: "  RPG",
    url:
      "https://cdn.glitch.com/6393f3fd-16a7-4641-ae3d-994f8e7cea4e%2FRpgItemIcon.png?1548192480952"
  },
  {
    name: "  Artillery Crew",
    url:
      "https://cdn.glitch.com/dd3f06b2-b7d4-4ccc-8675-05897efc4bb5%2FField_Artillery.png?1555248898255"
  },
  {
    name: "  Sailor",
    url:
      "https://cdn.glitch.com/6393f3fd-16a7-4641-ae3d-994f8e7cea4e%2FMapIconShipyard.png?1547280455531"
  },
  {
    name: "  Vehicle Crew",
    url:
      "https://cdn.glitch.com/6393f3fd-16a7-4641-ae3d-994f8e7cea4e%2FPistolItemIcon.png?v=1548192477296"
  }
];
/////////////////////////////////////////////////////////////////////////////
function GetShortDate(date) {
  let datestring = new Date(date).toDateString();
  datestring = datestring.split(" ");
  let timestring = new Date(date).toLocaleTimeString();
  timestring = timestring.split(":");
  return (
    datestring[1] +
    " " +
    datestring[2] +
    " " +
    datestring[3] +
    " " +
    timestring[0] +
    ":" +
    timestring[1]
  );
}
//////////////////////////////
function FormatNumber(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
/////////////////////////////
export default {
  GetUpdate: GetUpdate,
  GetMyRank: GetMyRank,
  compare: compare,
  GetUsername: GetUsername,
  GetAvatar: GetAvatar,
  GetUser: GetUser,
  signature: signature,
  SplitTime: SplitTime,
  GetStoreProps: GetStoreProps,
  squadnumbers: squadnumbers,
  roleicons: roleicons,
  GetTownName: GetTownName,
  convert: convert,
  ConvertTeam: ConvertTeam,
  copy: copy,
  GetShortDate: GetShortDate,
  FormatNumber: FormatNumber
};
