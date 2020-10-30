import React from 'react';
import store from '../../../redux/store'
import {connect} from 'react-redux';
import A from '../../../redux/actions.js';
import U from '../useful_functions'
import RegionImages from '../../../_static/region-images'; 
import VoiceEvents from '../../../_static/voice';
import cost from '../../../_static/cost';
import tech from '../../../_static/techtree';
import markers from '../../../_static/markers';
import audio from '../../../_static/audio';
console.log('Audio', audio)
/*////PRIVATE EVENT TYPES:
  0 - TECH COMPLETED
  1 - ITEMS SUBMITTED TO LOGI REQUEST
  2 - LOGI REQUEST COMPLETED
 */
class Events extends React.Component {  ////Component generation
  constructor(props) {
    super(props);
    this.GetEventString = this.GetEventString.bind(this)    //Function binding
  }
    shouldComponentUpdate(nextProps, nextState){
    if(JSON.stringify(this.props.events)!=JSON.stringify(nextProps.events)){
      return true
    }
    return false
  }
  
  componentDidUpdate(prevProps, prevState){
    //console.log("Updated events",this.props,prevProps)
    let soundsArray = [/*{id:0,faction:"COLONIALS"},{id:1,faction:"WARDENS"}*/]
    for(var i=0;i<this.props.events.length;i++){
      let newEvent = this.props.events[i]
      let oldEvent =prevProps.events[0]
     if(JSON.stringify(newEvent)==JSON.stringify(oldEvent)){
       break;
     }
      let prevItem=JSON.parse(newEvent.prevItem)
      let newItem=JSON.parse(newEvent.newItem)
        if((prevItem.teamId!=newItem.teamId&&!newItem.flags&4)||((prevItem.flags&4)&&!(newItem.flags&4)&&newItem.iconType==5)){
      if(newItem.teamId!="NONE"){
        let townname = U.GetTownName(newEvent.region,prevItem,this.props.static)
        for(var j =0;j<VoiceEvents.length;j++){
          if(VoiceEvents[j].name==townname){
            let packet = {id:j,faction:newItem.teamId}
            soundsArray.push(packet)
            break;
          }
        }
      }}
    }
    if(soundsArray.length>0){
      window.soundcontrol.PlayArray(soundsArray)
    }
  }
  handleSelect(obj,townname,region){
  //console.log("event obj",obj)
    let position = U.convert(region,obj.x,obj.y)
     window.selecticon.ChangePosition(position)
   store.dispatch(A.selectObject("stockpiles",U.signature(obj),townname))
  }
  GetEventString(obj){
    //console.log(obj)
    let datestring = new Date(JSON.parse(obj.date))
    function GetFaction(obj,reverse){
    if(obj.teamId=="WARDENS"){
      if(reverse){
        return <span className="collie_text">Colonials</span>
      }else return <span className="warden_text">Wardens</span>
    }else if(obj.teamId=="COLONIALS"){
      if(reverse){
        return <span className="warden_text">Wardens</span>
      }else return <span className="collie_text">Colonials</span> 
    }
    }
    
    let prevItem = JSON.parse(obj.prevItem)
    let newItem = JSON.parse(obj.newItem)
    let actionstring = ""
    let faction = ""
    if(prevItem.teamId!=newItem.teamId){
      if(newItem.teamId=="NONE"){
        //console.log("Checking flags",newItem.flags)
        if(newItem.flags&0x10){
          actionstring = <span className="eventlog_text_nuke">was nuked by </span>
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
      if(newItem.iconType==5){
        if(prevItem.iconType==5){
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
        actionstring = <span className="eventlog_text_upgrade">{actionstring}</span>
        faction = GetFaction(newItem,false)
      }
    }else if((prevItem.flags&4)&&!(newItem.flags&4)){
          actionstring = "was taken by " 
        faction = GetFaction(newItem,false)
  }else if(prevItem.teamId=="NONE"&&newItem.teamId=="NONE"&&newItem.flags&10){
    actionstring=<span className="eventlog_text_nuke">was nuked by Someone</span>
  }else if(prevItem.iconType==newItem.iconType&&(!(prevItem.flags&4)&&(newItem.flags&4))){
    actionstring="is being rebuilt by "
    faction = GetFaction(newItem,false)
  }
    if(actionstring==""){
      return null
    }
    let townname = U.GetTownName(obj.region,prevItem,this.props.static)
    datestring = GetDateString(datestring) //OK
    let regionName = RegionImages.regionlist[obj.region].name  //OK
    let totalstring = <span >{datestring}{regionName}: <b className="eventlog_town_name" onClick={()=>this.handleSelect(prevItem,townname,obj.region)}>{townname}</b> {actionstring}{faction}</span>
    //console.log(totalstring)
    return <li className="event_log_line" key={"event"+obj.date}>{totalstring}</li>
  }
  
  render(){
  let eventlist = []
  if(this.props.events!=undefined){
    for(var i =0;i<30;i++){
      if(this.props.events[i]==undefined){
        break;
      }
      eventlist.push(this.GetEventString(this.props.events[i]))  
    }
  }
  return eventlist
  }
}
//////////////////////////////////////////////////////////////////////////////////////////////////
class PrivateEvents extends React.Component {  ////Component generation
  constructor(props) {
    super(props);
    this.GetEventString = this.GetEventString.bind(this)    //Function binding
  }
  shouldComponentUpdate(nextProps, nextState){
    if(JSON.stringify(this.props.events)!=JSON.stringify(nextProps.events)){
      return true
    }
    return false
  }
    GetEventString(obj){
      //console.log("event obj",obj)
      let datestring =  GetDateString(new Date(JSON.parse(obj.date)))
      let actionstring =<span></span>
      switch(obj.type){
        case 0:
          actionstring = <span><img style={{width:15,height:15}} src={tech[obj.packet].url} /> {tech[obj.packet].name} research complete</span>
          break;
        case 1:
          let packet = JSON.parse(obj.packet)
         // console.log("Private event packet",packet)
          let username = <b>{U.GetUsername(this.props.users.users,packet.wip.author)}</b>
          let wiparray = []
          for(var i =0;i<packet.wip.request.length;i++){
            let item = packet.wip.request[i]
          wiparray.push(<span key={"wiparray"+obj.date+"|"+item.catid+"|"+item.itemid}>{item.crates}x <img style={{width:15,height:15}} src={cost.cost[item.catid][item.itemid].src}/> </span>)
          }
          let location = <img style={{width:15,height:15}} src='https://cdn.glitch.com/6393f3fd-16a7-4641-ae3d-994f8e7cea4e%2FIconStatusEncumberedRed.png?1549573551066' onClick={()=>store.dispatch(A.selectObject("requests",packet.request))} />
         // console.log("wiparray",wiparray)
          actionstring = <span>{username} delivered {wiparray} to {location}</span>
          break;
        case 2:
          actionstring =<span><img style={{width:15,height:15}} src='https://cdn.glitch.com/dd3f06b2-b7d4-4ccc-8675-05897efc4bb5%2FIconStatusEncumbered.png?1554591180726' onClick={()=>store.dispatch(A.selectObject("requests",obj.packet))}/> completed</span>
          break;
        case 3:
          actionstring = <span>New supply order requested <img id="eventlog_logi_img" src='https://cdn.glitch.com/6393f3fd-16a7-4641-ae3d-994f8e7cea4e%2FIconStatusEncumberedRed.png?1549573551066' onClick={()=>store.dispatch(A.selectObject("requests",obj.packet))}/></span>
          break;
        case 4:
          let item = markers.MiscIconArray[obj.packet.type]
          actionstring = <span>Relic <img style={{width:15,height:15}} src={item.url} onClick={()=>store.dispatch(A.selectObject("icon",obj.packet.key,"misc",obj.packet.type))}/>{item.name} spotted</span>
          break;
      }
      let totalstring = <span >{datestring}{actionstring}</span>
      return <li className="event_log_line" key={"privateevent"+obj.date}>{totalstring}</li>
  }
render(){
  //console.log("Rendering private event log")
  let eventlist = []
  if(this.props.events!=undefined){
    let eventArray = JSON.parse(JSON.stringify(this.props.events))
    eventArray.reverse()
    //console.log("Private events",this.props)
    for(var i =0;i<30;i++){
      if(eventArray[i]==undefined){
        break;
      }
      eventlist.push(this.GetEventString(eventArray[i]))  
    }
  }
  return eventlist
  }
}

const mapStateToProps = store => {
  let events = store.events
  let staticdata = store.roominfo.static
  return {
    events: events.events,
    static: staticdata
  }
}
const mapStateToPropsPrivate = store => {
  let events = store.events
  //let staticdata = store.roominfo.static
  return {
    events: events.privateEvents,
    users: store.users,
  }
}
    function GetDateString(date){
      function addZero(num){
        if(num<10){
        num = "0"+num;
        }
        return num;
      }
      var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      var day = addZero(date.getDate());
      var month = months[date.getMonth()];
      var hour = date.getHours();
      var minute = addZero(date.getMinutes());
      var stringfull = day+" "+month+" - "+hour+":"+minute;
      let string = <span title={stringfull}>{hour}:{minute} </span>
      return string;
    }
export default {Events:connect(mapStateToProps)(Events),
                 PrivateEvents:connect(mapStateToPropsPrivate)(PrivateEvents)
                 } 