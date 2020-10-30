const db = require('./dbfunctions.js');
const warapi = require('./warapi.js');
var XMLHttpRequest = require('xhr2');
const discordbot = require('./discordbot.js');
const SQLite = require("better-sqlite3");
const sql = SQLite('./.data/global-data.db'); 
var http;
var io;
var steamidlist=[];
var socketidlist=[];
//console.log(steamidlist);
//console.log(socketidlist);

exports.import = function(importhttp){
console.log("Socket server started.");
http=importhttp;
io=require('socket.io')(http);
  io.on('connection', function(socket){
    if(db.logincheck(socket.handshake)){
    var account = parsecookies(socket.handshake);
       console.log("Connecting "+account.id)
     var link = socket.handshake.headers.referer; 
      socket.on('disconnect', function(data){
      console.log("Disconnecting "+account.id)})
      //Profile room for reacting to role changes
      if(link==process.env.LINK){
      socket.join(account.id); 
      console.log(socket.handshake.headers.referer)
      //console.log("User "+socket.id+" ("+account.id+") joined room "+account.id);   
      io.in(account.id).emit('pong')
      }else if(link.includes(process.env.LINK+'room/')){
      //Join the global room
         link = link.replace(process.env.LINK+'room/','');
        var rank = db.getmembership(account.id,link);
        if(rank>0&&rank<5){
        //Add user to the list of online pepol
        //console.log(socket);
        var user = {id:account.id,socketid:socket.id}
        socket.join(link);
        //console.log("User "+account.id+" pushed");
        steamidlist.push(account.id);
        socketidlist.push(socket.id);
        //console.log(steamidlist);
        //console.log("Socket "+socket.id+" joined room "+link); 
        emitonlineusers(link);
        emitOnlineCount();  
          
          socket.on('disconnect', function(data){
            var index = socketidlist.indexOf(socket.id)
            socketidlist.splice(index,1);
            steamidlist.splice(index,1);
            emitonlineusers(link);
            emitOnlineCount();  
          })
          
          socket.on('updateusers',(users,steamid) =>{
          //console.log("updating users");
          let globalid = getglobalid(socket);
          rank = db.getmembership(steamid,link);
          if(rank<3){
            db.changeusers(steamid, users, globalid);
          }
          })
          
          socket.on('setRole',(user) =>{
          //console.log("updating users");
          let globalid = getglobalid(socket);
          socket.broadcast.to(globalid).emit('setRole', user);
            db.setRole(user,globalid);
          })
          
          socket.on('hailnewking',(adminid,steamid)=>{
          let globalid = getglobalid(socket);
          rank = db.getmembership(steamid,link);
          if(rank==1){
          db.hailnewking(steamid,adminid,globalid);
          }
              var packet = {globalid:globalid, rank:1}
              io.in(adminid).emit('updateroom',packet);
          })

          
          socket.on('updateTech', (packet) => { //packet 
          packet.globalid = getglobalid(socket);
          rank = db.getmembership(account.id,link);
          if(rank>0&&rank<4){
            socket.broadcast.to(packet.globalid).emit('updateTech', packet);
            packet.techtree = JSON.stringify(packet.techtree);
            db.changetech(packet); 
          }
          })

          
          socket.on('updateObject', (packet) => { //packet
            //console.log(packet)
          packet.globalid = getglobalid(socket);
            rank = db.getmembership(account.id,link);
          if(rank>0&&rank<4){
            socket.broadcast.to(packet.globalid).emit('updateObject', packet);
            db.updateObject(packet); 
          }
          })
          
          socket.on('deleteObject', (packet) => { //packet 
          //console.log(packet);
          packet.globalid = getglobalid(socket);
            rank = db.getmembership(account.id,link);
          if(rank>0&&rank<4){
            socket.broadcast.to(packet.globalid).emit('deleteObject', packet);
            db.deleteObject(packet); 
          }
          })
          
          socket.on('addArtyResult', (packet) => { //packet
          packet.globalid = getglobalid(socket);
            rank = db.getmembership(account.id,link);
          if(rank>0&&rank<4){
            socket.broadcast.to(packet.globalid).emit('addArtyResult', packet);
            db.addArtyResult(packet); 
          }
          })
          
          socket.on('updateSquads', (packet) => { //packet
          packet.globalid = getglobalid(socket);
            rank = db.getmembership(account.id,link);
          if(rank>0&&rank<4){
            socket.broadcast.to(packet.globalid).emit('updateSquads', packet);
            db.updateSquads(packet); 
          }
          })
          
          socket.on('submitEvent', (packet) => { //packet
            //console.log(packet)
          packet.globalid = getglobalid(socket);
          rank = db.getmembership(account.id,link);
          if(rank>0&&rank<4){
            socket.broadcast.to(packet.globalid).emit('submitEvent', packet);
            db.submitEvent(packet); 
          }
          })
          
          socket.on('submitOpTimer', (packet) => { //packet
            //console.log(packet)
          packet.globalid = getglobalid(socket);
          rank = db.getmembership(account.id,link);
          if(rank>0&&rank<4){
            socket.broadcast.to(packet.globalid).emit('submitOpTimer', packet);
            db.submitOpTimer(packet); 
          }
          })
                
          socket.on('toggleSecure', (data) => { //packet
            //console.log(packet)
          let globalid = getglobalid(socket);
          rank = db.getmembership(account.id,link);
          if(rank==1||rank==2){
            //io.in(globalid).emit('updateroom',packet);
            socket.broadcast.to(globalid).emit('toggleSecure',data);
            if(data==1){
            let users = db.toggleSecure(globalid,data); 
            io.in(globalid).emit('updateusers',users);
            }else{
              db.toggleSecure(globalid,data);
            }
          }
          })
          
          socket.on('clearRoom', () => { //packet
            //console.log(packet)
          let globalid = getglobalid(socket);
          rank = db.getmembership(account.id,link);
          if(rank>0&&rank<3){
            socket.broadcast.to(globalid).emit('clearRoom');
            db.clearRoom(globalid); 
          }
          })
          
          socket.on('clearMap', () => { //packet
            //console.log(packet)
          let globalid = getglobalid(socket);
          rank = db.getmembership(account.id,link);
          if(rank>0&&rank<3){
            socket.broadcast.to(globalid).emit('clearMap');
            db.clearMap(globalid); 
          }
          })
          
          socket.on('changeSettings', (type, data) => { //packet
            //console.log(packet)
          let globalid = getglobalid(socket);
          rank = db.getmembership(account.id,link);
          if(rank>0&&rank<3){
            //io.in(globalid).emit('updateroom',packet);
            socket.broadcast.to(globalid).emit('changeSettings',type,data);
            db.changeSettings(globalid,type,data);
          }
          })
          
          socket.on('deleteSettings', (type) => { //packet
            //console.log(packet)
          let globalid = getglobalid(socket);
          rank = db.getmembership(account.id,link);
          if(rank>0&&rank<4){
            socket.broadcast.to(globalid).emit('deleteSettings',type);
            db.deleteSettings(globalid,type); 
          }
          })
          
          socket.on('setDiscordToken', (token) => { //packet
            //console.log(packet)
          let globalid = getglobalid(socket);
          rank = db.getmembership(account.id,link);
          if(rank>0&&rank<3){
            //io.in(globalid).emit('updateroom',packet);
            socket.broadcast.to(globalid).emit('setDiscordToken',token);
            db.setDiscordToken(globalid,token);
          }
          })
          
          socket.on('disconnectDiscord', () => { //packet
            //console.log(packet)
          let globalid = getglobalid(socket);
          rank = db.getmembership(account.id,link);
          if(rank>0&&rank<3){
            socket.broadcast.to(globalid).emit('disconnectDiscord');
            db.disconnectDiscord(globalid); 
          }
          })
          
          socket.on('addMessage', (packet,category) => { //packet
            //console.log(packet)
          let globalid = getglobalid(socket);
          rank = db.getmembership(account.id,link);
          if(rank>0&&rank<4){
            socket.broadcast.to(globalid).emit('addMessage', packet,category);
            db.addMessage(packet,category,globalid); 
          }
          })
          
          socket.on('joinStats', () => { //packet
            socket.join("stats");
          })
          
          socket.on('leaveStats', () => { 
           socket.leave("stats") 
          })
          
        }    
    }
    }});
  }
exports.connectDiscord = function(globalid,link){
  io.in(globalid).emit('changeSettings',"link",link);
  io.in(globalid).emit('deleteSettings',"token");
}
exports.totalplayers = 0;
exports.warstats={}

function UpdateStats(){
  var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=505460", true);
    xhr.responseType = "json"
    xhr.onload = function (e) {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          exports.totalplayers = xhr.response.response.player_count
        } else {
          console.error(xhr.statusText);
        }
      }
    }.bind(this);
    xhr.onerror = function (e) {
      console.log(e)
      console.error(xhr.statusText);
    };
xhr.send();
  
var request = new XMLHttpRequest();
    request.responseType = "json"
    request.open('GET', 'https://war-service-live.foxholeservices.com/api/worldconquest/war', true); 
    request.onload = function () {
      if (request.status >= 200 && request.status < 400) {
        try{
          var data = this.response
          exports.warstats = data
        }
        catch(err){
          console.log(err)
        }
      }
    }
    request.send();
  
var request2 = new XMLHttpRequest();
    request2.responseType = "json"
    request2.open('GET', 'http://foxholeglobal.com/service/currentWar', true); 
    request2.onload = function () {
      if (request2.status >= 200 && request2.status < 400) {
        try{
          var data = this.response
          exports.currentwar = data
         let savedwars = sql.prepare("SELECT warnumber FROM warhistory;").all();
          console.log("Saved wars")
          console.log(savedwars)
          for(let i=0;i<data.warstats.length-1;i++){
            let present = false
            for(let j=0;j<savedwars.length;j++){
              if(data.warstats[i].warNumber==savedwars[j].warnumber){
                present = true
              }
            }
            if(!present){
              var requestwar = new XMLHttpRequest();
              requestwar.responseType = "json"
              requestwar.open('GET', 'http://foxholeglobal.com/service/prevWar/'+data.warstats[i].warNumber, true); 
              requestwar.onload = function () {
                if (requestwar.status >= 200 && requestwar.status < 400) {
                try{
                  let wardata = this.response
                  const insertwar = sql.prepare('INSERT INTO warhistory (warnumber, events, reports, warstats,startpoint) VALUES (@warnumber, @events, @reports, @warstats, @startpoint);');
                  let e = {warnumber:data.warstats[i].warNumber,events:JSON.stringify(wardata.events),
                reports:JSON.stringify(wardata.reports),warstats:JSON.stringify(wardata.warStats),startpoint:JSON.stringify(wardata.startpoint)}
                insertwar.run(e)
                }catch(err){}
                }
            }
              requestwar.send();
          }
          }
        }
        catch(err){
          console.log(err)
        }
      }
    }
    request2.send();
  
warapi.updateWarReport();
}
exports.FinishUpdateStats = function(){
  let packet = {totalplayers:exports.totalplayers,warstats:exports.warstats,wr:warapi.WR,currentwar:exports.currentwar}
  io.to('stats').emit('updatestats', packet);
}

UpdateStats()
setInterval(UpdateStats, 60000/*100000*/); //UPDATE RATE FOR PLAYERCOUNT
setInterval(UpdateMap, 5000/*100000*/); //UPDATE RATE FOR DYNMAP

function UpdateMap(){
//console.log("Updating dynmap...");
warapi.updateMap();
db.offlinecheck(steamidlist,io)
}

 exports.UpdateDynMap = function(){
   // 
    //warapi.updateMap();
     var dynamic = db.getdynamic();
     var events = db.getevents();
     let packet = {dynamic:dynamic,events:events}
    io.emit('updatedynmap', packet);
      console.log("Map updated.");  
      var now = new Date()
    }

exports.emitaccessrequest = function(packet){
var user = db.getrequester(packet.userid);
io.to(packet.globalid).emit('requestaccess', user);
}
exports.emitleaveroom = function(packet){
io.to(packet.globalid).emit('leaveroomroom', packet.userid);
}

exports.cunt = function test(string){
console.log("Socket module "+string);
}

//Kicks everyone and sends messages if the room is deleted
exports.deleteroom = function(globalid){
io.in(globalid).emit('deleteroom'); 
var users = db.getroomusers(globalid);
 // console.log(users);
//Removes rooms from profiles in real time
for(var i=0;i<users.length;i++){
   io.in(users[i].id).emit('leaveroom',globalid)
 }           
}

//Updates users' status in a room
exports.updateusers = function(users,globalid){
  //console.log(users);
   io.in(globalid).emit('updateusers',users)  
//Updates users' status in their profiles
for(var i=0;i<users.length;i++){
  var packet = {globalid:globalid, rank:users[i].rank}
   io.in(users[i].id).emit('updateroom',packet);
  //console.log(users[i].id);
  //console.log(socketidlist[0]);
  //console.log(io.sockets.connected);
  if(users[i].newrank==5){
   var index = steamidlist.indexOf(users[i].id);
    if(index!=-1){
      io.sockets.connected[socketidlist[index]].disconnect();
    }
  }
}
}

//Emit list of online users
function emitonlineusers(globalid){
var userlist = [];
io.in(globalid).clients((error, clients) => {
for(var i=0;i<clients.length;i++){
userlist.push(steamidlist[socketidlist.indexOf(clients[i])]);
}
var roomusers = db.getroomusers(globalid)
var packet = {users:roomusers, onlineusers:userlist};
 io.in(globalid).emit('onlineusers',packet); 
})
}

//Transfers ownership
exports.hailnewking = function(admin, globalid){
  var packet = {globalid:globalid, rank:1}
   io.in(admin.id).emit('updateroom',packet); //if the new admin is in his lobby
   io.in(globalid).emit('hailnewking',admin);
}

//Get account data from cookies
function parsecookies(request){
if(request.headers['cookie']==undefined){return false;}
if(!request.headers['cookie'].includes("salt")){return false}
var cookiestring = request.headers['cookie'] 
var id = cookiestring.substring(cookiestring.indexOf(" steamid=")+9,cookiestring.indexOf(" steamid=")+26).replace(';','')
var salt = cookiestring.substring(cookiestring.indexOf(" salt=")+6,cookiestring.indexOf(" salt=")+15).replace(';','')
var result ={id:id, salt:salt};
return result;
}

function getglobalid(socket){
  var globalid = socket.handshake.headers.referer.replace(process.env.LINK+'room/','');
      globalid = globalid.replace(process.env.LINK+'room/','');
  return globalid;
}

function emitOnlineCount(){
  let ids = []
  for(var i=0;i<steamidlist.length;i++){
    if(!ids.includes(steamidlist[i])){
      ids.push(steamidlist[i])
    }
  }
  discordbot.emitOnlineCount(ids.length,db.GetCounts())
}