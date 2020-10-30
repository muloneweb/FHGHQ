const db = require('./dbfunctions');
const socket = require('./socket');
//DISCORD AREA
const Discord = require("discord.js");
const client = new Discord.Client();
const techtree = require('./src/_static/techtree');
 const regionlist=[
  ,//0
 ,//1
  ,//2
  'Deadlands',//3
  "Callahan's Passage",//4
  'Marban Hollow',//5
  'Umbral Wildwood',//6
  'The Moors',//7
  'The Heartlands',//8
  'Loch Mor',//9
  'The Linn of Mercy',//10
  'Reaching Trail',//11
  'Stonecradle',//12
  'Farranac Coast',//13
  'Westgate',//14
  "Fisherman's Row",//15
  'The Oarbreaker Isles',//16
  'Great March',//17
  'Tempest Island',//18
  'Godcrofts',//19
  'Endless Shore',//20
  "Allod's Bight",//21
  'Weathered Expanse',//22
  'The Drowned Vale',//23
  'Shackled Chasm',//24
 'Viper Pit',//25
]
 try{
client.discord = Discord;

client.login(process.env.DISCORD_TOKEN)
 }catch(err){
   console.log("Cant connect discord")
 }
client.on("ready", () => {
    client.user.setActivity(`!fghelp`);
    //console.log(`Ready to serve on ${client.guilds.size} servers, for ${client.users.size} users.`);
    client.channels.get("531113716905803777").send("Bot Restarting");
});

client.on("message", message => {
  
  if(message.content.indexOf('!') !== 0) return;
  const args = message.content.slice(1).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  switch(command){
    case "ping":
    message.channel.send("Pong!");
    break;
    case "fghelp":
      let channelID = message.channel.id
        const embed = {
          "title": "Bot info",
          "color": 0xDDD1D1,
          "fields": [
            {
              "name": "How do I get the bot on my server?",
              "value": "Follow this link: https://discordapp.com/api/oauth2/authorize?client_id=530789519360917514&permissions=0&scope=bot"
            },
            {
              "name": "How do I link a room to the channel?",
              "value": "If you are a Steam-logged user and a room moderator/owner, you can link the bot to the room by generating a discord token in the management tab and then writing !linkroom <token> in the desired discord channel where <token> is your generated token. You have to have management rights in the discord channel to do that."
            },
            {
              "name":"Town hall/fort notifications",
              "value":"If you have a discord channel linked to your bot, you can make bot notify you of events in desired town halls/forts by selecting a town/fort and clicking the 'Notify in Discord' checkbox."
            },
            {
              "name":"Operation timers",
              "value":"Discord emits a message when an operation is scheduled and when there is 1 hour left until the operation start."
            },
            {
              "name":"Tech tree",
              "value":"Discord emits a message when a research has been completed (this is based on user actions and is not linked to the game). Alternatively you can type !techtree and get all techs currently being researched (not empty and not full techs)"
            }
          ]
        }
      message.channel.send({embed});
    break;
    case "linkroom":
    try{
      let channelID = message.channel.id
      if (message.channel.permissionsFor(message.member).has("MANAGE_GUILD", false)){
        //console.log("Message")
        //console.log(message)
        let link = {channelid:message.channel.id,channelname:message.channel.name,servername:message.channel.guild.name}
        //console.log("Registering channel",message.channel.name,message.channel.guild.name)
        let room = db.getRoomByToken(args[0],link)
        if(room==undefined){
          message.channel.send("Error: Invalid token");
        }else{
        let channelData = {
          channelID: channelID,
          serverName: message.guild.name,
        }
        const embed = {
          "title": "Successfully linked room to this channel",
          "color": 16312092,
          "fields": [
            {
              "name": "Registered By",
              "value": message.author.username
            },
            {
              "name":"Room name",
              "value":room.settings.name
            },
            {
              "name":"Room ID",
              "value":room.id
            }
          ]
        }
        socket.connectDiscord(room.id,link) 
        message.channel.send({embed});
       client.channels.get("520188265618472960").send(new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })+` **${channelID} Channel registered for server ${message.guild.name} by ${message.author.username}**`);
        
        //client.registerChannel.run(channelData);
      }} else {
        message.channel.send("Error: User does not have permissions");
      }
    } catch (error) {
      message.channel.send("Error: Couldn't register channel. Channel doesn't exist or bot is lacking permissions");
      //console.log(error)
    }
      break;
    case "techtree":
      let global = db.getRoomFromDiscordChannel(message.channel.id)
       let fields = []
      if(global==undefined){
        message.channel.send("Error: No rooms connected");
      }else{
        if(global.techtree!=undefined){
          if(global.techtree==""){
            global.techtree={}
          }else{
            global.techtree=JSON.parse(global.techtree)
        for(let i=0;i<techtree.length;i++){
          if(global.techtree[techtree[i].name]!=undefined){
            let tech = global.techtree[techtree[i].name];
            if(tech>0&&tech<techtree[i].needtech){
              fields.push({name:techtree[i].name,value:tech+"/"+techtree[i].needtech})
            }
          }
        }
        }
        }
        if(fields.length==0){
          let embed = {
          "title": "No research going on at this time",
          "color": 0x0f99b5
          }
          message.channel.send({embed});
        }else{
        const embed = {
          "title": "Current research status",
          "color": 0x0f99b5,
          "fields": fields
        }
        message.channel.send({embed});
        }
      }
    break;
      
  }
  });



exports.cunt = function test(string){
console.log("Discord module "+string);
}

exports.disconnectDiscord = function(globalid,settings){
    const embed = {
          "title": "This channel has been disconnected from room",
          "color": 16312092,
          timestamp: new Date(),
          "fields": [
            {
              "name":"Room name",
              "value":settings.name
            },
            {
              "name":"Room ID",
              "value":globalid
            }
          ]
        }
   try{
  client.channels.get(settings.link.channelid).send({embed});
   }catch(err){}
}

exports.techEvent = function(global,techid){
let settings = JSON.parse(global.settings)
if(settings.link!=undefined){
  try{
        const embed = {
          "title": techtree[techid].name+" research complete",
          "color": 0x19CAE5,
          thumbnail: {
		          url: techtree[techid].url
	        },
          "fields": [
            {
              "name":"Date",
              "value":""+new Date()
            }]
        }
    client.channels.get(settings.link.channelid).send({embed});
  }catch(err){}
}
}

exports.startOpTimer= function(global){
  if(global.settings.link!=undefined){
  try{
      const embed = {
          "title": "New operation scheduled",
          "color": 0xb5190f,
          "fields": [
            {
              "name":"Date",
              "value":""+new Date(global.settings.optimer)
            }]
        }
     client.channels.get(global.settings.link.channelid).send({embed});
    }catch(err){}
  }
}

exports.emitNotify= function(packet){
  //console.log("Packet",packet)
  let settings = JSON.parse(packet.global.settings)
      //console.log(obj)
    let datestring = ""+packet.date
    function GetFaction(obj,reverse){
      if(obj.teamId=="WARDENS"){
        return reverse ? "Colonials" : "Wardens"
      }else if(obj.teamId=="COLONIALS"){
        return reverse ? "Wardens" : "Colonials"
      }
    }
    
    let prevItem = packet.prevItem
    let newItem = packet.newItem
    let actionstring = ""
    let faction = ""
    if(prevItem.teamId!=newItem.teamId){
      if(newItem.teamId=="NONE"){
        //console.log("Checking flags",newItem.flags)
        if(newItem.flags&0x10){
          actionstring = "was nuked by "
          faction = GetFaction(prevItem,true)
        }else{
          actionstring = "was lost by "
          faction = GetFaction(prevItem,false)
        }
      }else{
        if(newItem.flags&4){
             actionstring ="is being built by "
           }else{
             actionstring = "was taken by "
           }
        actionstring = actionstring
        faction = GetFaction(newItem,false)
      }
    }else if(prevItem.iconType!=newItem.iconType||(prevItem.iconType==newItem.iconType&&(prevItem.flags&4)&&!(newItem.flags&4))){
      if(newItem.iconType==5||newItem.iconType==29){
        if(prevItem.iconType==5||prevItem.iconType==29){
           actionstring = "was taken by "
            faction = GetFaction(newItem,false)
        }else{
        actionstring = "was reset to T1"
        }
      }else{
      if(newItem.flags&4){
        actionstring = "is being upgraded "
        }else{
        actionstring ="was upgraded "
        }
      if(newItem.iconType==6){
        actionstring = actionstring+"to T2 by "
      }else if(newItem.iconType==7){
        actionstring = actionstring+"to T3 by "
      }
        actionstring = actionstring
        faction = GetFaction(newItem,false)
      }
    }else if((prevItem.flags&4)&&!(newItem.flags&4)){
          actionstring = "was taken by " 
        faction = GetFaction(newItem,false)
  }else if(prevItem.teamId=="NONE"&&newItem.teamId=="NONE"&&newItem.flags&10){
    actionstring="was nuked by Someone"
  }else if(prevItem.iconType==newItem.iconType&&(!(prevItem.flags&4)&&(newItem.flags&4))){
    actionstring="is being rebuilt by "
    faction = GetFaction(newItem,false)
  }
    if(actionstring==""){
      return null
    }
    

    let townname = db.GetTownName(newItem,packet.region)
    if(newItem.iconType==29){
      townname="Fort "+townname
    }
    let totalstring = townname+" "+actionstring+" "+faction
    let url = ""
    switch(newItem.iconType){
      case 5:
        if(newItem.teamId=="NONE"){
          url="https://cdn.glitch.com/6393f3fd-16a7-4641-ae3d-994f8e7cea4e%2FMapIconStaticBase1.png?v=1547289997432"
        }else if(newItem.teamId=="COLONIALS"){
          url="https://cdn.glitch.com/6393f3fd-16a7-4641-ae3d-994f8e7cea4e%2FMapIconStaticBase1Colonial.png?v=1547289997508"
        }else{
          url="https://cdn.glitch.com/6393f3fd-16a7-4641-ae3d-994f8e7cea4e%2FMapIconStaticBase1Warden.png?v=1547289997468"
        }
        break;
      case 6:
        if(newItem.teamId=="NONE"){
          url="https://cdn.glitch.com/6393f3fd-16a7-4641-ae3d-994f8e7cea4e%2FMapIconStaticBase2.png?v=1547288289597"
        }else if(newItem.teamId=="COLONIALS"){
          url="https://cdn.glitch.com/6393f3fd-16a7-4641-ae3d-994f8e7cea4e%2FMapIconStaticBase2Colonial.png?v=1547289997577"
        }else{
          url="https://cdn.glitch.com/6393f3fd-16a7-4641-ae3d-994f8e7cea4e%2FMapIconStaticBase2Warden.png?v=1547289997541"
        }
        break;
      case 7:
        if(newItem.teamId=="NONE"){
          url="https://cdn.glitch.com/6393f3fd-16a7-4641-ae3d-994f8e7cea4e%2FMapIconStaticBase3.png?v=1547288290801"
        }else if(newItem.teamId=="COLONIALS"){
          url="https://cdn.glitch.com/6393f3fd-16a7-4641-ae3d-994f8e7cea4e%2FMapIconStaticBase3Colonial.png?v=1547289997637"
        }else{
          url="https://cdn.glitch.com/6393f3fd-16a7-4641-ae3d-994f8e7cea4e%2FMapIconStaticBase3Warden.png?v=1547289997109"
        }
        break;
      case 29:
        if(newItem.teamId=="NONE"){
          url="https://cdn.glitch.com/6393f3fd-16a7-4641-ae3d-994f8e7cea4e%2FMapIconFort.png?v=1547289047513"
        }else if(newItem.teamId=="COLONIALS"){
          url="https://cdn.glitch.com/6393f3fd-16a7-4641-ae3d-994f8e7cea4e%2FMapIconFortColonial.png?v=1547289997157"
        }else{
          url="https://cdn.glitch.com/6393f3fd-16a7-4641-ae3d-994f8e7cea4e%2FMapIconFortWarden.png?v=1547289997217"
        }
    }
    //let regionName = RegionImages.regionlist[obj.region].name  //OK
    //console.log(datestring,regionName,townname,actionstring)
    //let totalstring = <span>{datestring}{regionName}: <b className="eventlog_town_name" onClick={()=>this.handleSelect(prevItem,townname,obj.region)}>{townname}</b> {actionstring}{faction}</span>
        
    //console.log(totalstring)
        const embed = {
          "title": "Marked map event",
          "color": 0xed0707,
          thumbnail: {
		          url: url
	        },
          "fields": [
            {
              "name": "Event",
              "value": totalstring
            },
            {
              "name":"Region",
              "value":regionlist[packet.region]
            },
            {
              "name":"Date",
              "value":datestring
            }
          ]
        }
        try{
    client.channels.get(settings.link.channelid).send({embed});
        }catch(err){}
}
exports.emitNotifyOp= function(settings){
          const embed = {
          "title": "Operation starts in 1 hour",
          "color": 0xde970a,
          "fields": [
            {
              "name": "Start time",
              "value": ""+new Date(settings.optimer)
            }
          ]
        }
          try{
      client.channels.get(settings.link.channelid).send({embed});   
          }catch(err){}
}

exports.emitOnlineCount= function(count,dbcount){
  try{
  client.channels.get("531113716905803777").send("Users online: "+count+"\nTotal Steam-logged users: "+dbcount.steamcount+"\nTotal anonymous users: "+dbcount.nosteamcount+"\nDate: "+new Date())
  }catch(err){}
}