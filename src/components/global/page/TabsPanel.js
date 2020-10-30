import React from 'react';
import store from '../../../redux/store'
import {connect} from 'react-redux';
import A from "../../../redux/actions";
import U from '../useful_functions'
import Meta from './Meta';
import socket from '../../../_static/socket';
const InputMask = require('react-input-mask');

function Tabs(props) {
  //console.log("Tabs props",props)
  let requestcounter = 0;
  for(var i =0;i<props.users.users.length;i++){
    if(props.users.users[i].rank==5){
      requestcounter++;
    }
  }
  let requestpill = null
  if(requestcounter>0){
    requestpill=<p className="badge badge-pill" id="requestcounter">{requestcounter}</p>
  }
  let messagepill = null
  if(props.tab.messages>0){
    messagepill=<p className="badge badge-pill" id="messagecounter">{props.tab.messages}</p>
  }
  return <ul className="nav nav-tabs" role="tablist">
    <li className="nav-item" id="hometab" onClick={()=>store.dispatch(A.selectTab(0))}>
      <a id="homehref" className="nav-link active" data-toggle="tab" href="#home"><img className="nav_image" src="https://cdn.glitch.com/dd3f06b2-b7d4-4ccc-8675-05897efc4bb5%2Fdadf1.png?v=1560105039857" /></a>
    </li>
    {
        <li className="nav-item" id="chat" onClick={()=>store.dispatch(A.selectTab(7))}>
      <a className="nav-link" data-toggle="tab" href="#home"><img className="nav_image" src="https://cdn.glitch.com/84b19724-a86b-4caa-8e69-1e9c973e043f%2FIconFacilitiesRadioStation3.png?v=1565529795969" /></a>
        {messagepill}
    </li>
      }
        <li className="nav-item" id="squad" onClick={()=>store.dispatch(A.selectTab(1))}>
      <a className="nav-link" data-toggle="tab" href="#squadtab"><img className="nav_image" src="https://cdn.glitch.com/dd3f06b2-b7d4-4ccc-8675-05897efc4bb5%2FIconFacilitiesLargeGarrison.png?v=1560375757858" /></a>
    </li>
        <li className="nav-item" id="refi"  onClick={()=>store.dispatch(A.selectTab(2))}>
      <a id="refineryhref" className="nav-link" data-toggle="tab" href="#refinery"  onClick={()=>store.dispatch(A.selectTab(2))}><img className="nav_image" src="https://cdn.glitch.com/dd3f06b2-b7d4-4ccc-8675-05897efc4bb5%2Fref.png?1556809275423" /></a>
    </li>
        <li className="nav-item" id="logi" onClick={()=>store.dispatch(A.selectTab(3))}>
      <a className="nav-link" data-toggle="tab" href="#logicalc"><img className="nav_image" src="https://cdn.glitch.com/dd3f06b2-b7d4-4ccc-8675-05897efc4bb5%2Flogi.png?1554636831579" /></a>
    </li>
    <li className="nav-item" id="techtreetab" onClick={()=>store.dispatch(A.selectTab(4))}>
      <a className="nav-link" data-toggle="tab" href="#techtree" onClick={()=>store.dispatch(A.selectTab(4))}><img className="nav_image" src="https://cdn.glitch.com/dd3f06b2-b7d4-4ccc-8675-05897efc4bb5%2FUntitled-3.png?1556809844470" /></a>
    </li>
     <li className="nav-item" id="Stats" onClick={()=>store.dispatch(A.selectTab(5))}>
      <a className="nav-link" data-toggle="tab" href="#statstab"><img className="nav_image" src="https://cdn.glitch.com/dd3f06b2-b7d4-4ccc-8675-05897efc4bb5%2Fsta0.png?v=1557932324597" /></a>
    </li>
    
    {props.users.myrank<3 && <li className="nav-item" id="managetab" onClick={()=>store.dispatch(A.selectTab(6))}>
      <a id="managetablink" className="nav-link" data-toggle="tab" href="#manage" ><img className="nav_image" src="https://cdn.glitch.com/dd3f06b2-b7d4-4ccc-8675-05897efc4bb5%2Fsetting.png?1554570996253" /> 
        </a>
      {requestpill}
    </li>}
    <li id="tabs_op_timer_li"><OpTimer /></li>
    <li id="tabs_totalresources"><TotalResources /></li>
    <li id="tabs_totalplayers"><TotalPlayers /></li>
    <li id="tabs_meta_li"><Meta /></li>
    <li><Top /></li>
  </ul> ;
}
////////////////////////////////////////////////////////
class OpTimer_ extends React.Component{
    constructor(props) {
      super(props)
      let date = new Date()
      let month = date.getMonth()+1
      if(month<10){
        month="0"+month
      }
      let day = date.getDate()
      if(day<10){
        day="0"+day
      }
    this.state={      ///State
      date:date.getFullYear()+"-"+month+"-"+day,
      time:"00:00",
      timer:0
    }
    this.handleSetDate = this.handleSetDate.bind(this)    //Function binding
    this.handleChangeTime = this.handleChangeTime.bind(this)
    this.submitTimer = this.submitTimer.bind(this)
    this.deleteTimer = this.deleteTimer.bind(this)
    }
    componentDidMount() {  
  this.interval = setInterval(() => this.setState({ timer: Date.now() }), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }


    handleSetDate(event){
      let value = event.target.value
      //console.log(event.target.value)
    this.setState({
      date:value
    })
  }
  handleChangeTime(event){
    //console.log(event.target.value)
    let value = event.target.value
    let h = value.substring(0,2)
    if(h>23){
      h="23"
    }
    h = h.replace(" ","0");
    let m = value.substring(3,5)
    if(m>59){
      m="59"
    }
    m = m.replace(" ","0");
    this.setState({
      time:h+":"+m
    })
  }
  submitTimer(){
    let date = new Date(this.state.date+" "+this.state.time)
    if (!isNaN(date.getTime())) {
    store.dispatch(A.submitOpTimer(date))
    socket.emit('submitOpTimer',{date:date})
    }
  }
  deleteTimer(){
    store.dispatch(A.deleteSettings("optimer"))
    socket.emit('deleteSettings',"optimer")
  }
  render(){
    //console.log("Rendering op timer")
    //console.log("Timer props",this.props)
    let date = "OP starts on ----"
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
      var string = day+" "+month+" - "+hour+":"+minute+" ";
      return string;
    }
    let totalstring = "OP starts in ----"
    if(this.props.settings.optimer!=undefined){
      
      let props = new Date(this.props.settings.optimer)
      date = GetDateString(props);
      let time = ""
      let timerdate = new Date(props).getTime()
      let now = new Date().getTime();
      if(timerdate>now){
        time=U.SplitTime(timerdate-now)
        date = "OP starts on "+date
        totalstring = "OP starts in "+time
      }else{
        time=U.SplitTime(now-timerdate)
        date = "OP started on "+date
        totalstring = "OP started since "+time
      }
      if(time=="00:01:00:00"&&timerdate>now){
        window.soundcontrol.PlaySingle('https://cdn.glitch.com/dd3f06b2-b7d4-4ccc-8675-05897efc4bb5%2FOP.mp3?1559289539656')
      }
    }
    return <div className="dropdown">
  <button type="button" id="op_timer_container" data-toggle="dropdown">
    {totalstring}
  </button>
  <div className="dropdown-menu" id="op_timer_dropdown">
    <span id="op_timer_date_span">{date}</span>
    <div className="op_timer_input_div"><input type="date" id="op_timer_calendar" 
       value={this.state.date}
        onChange={this.handleSetDate}
       min="2019-01-01"  />
    <InputMask id="op_timer_inputmask" value={this.state.time} mask="99:99" maskChar=" " placeholder="00:00" onChange={this.handleChangeTime}/></div>
     <div className="op_timer_input_div">
      <button type="button" className="btn" id="op_timer_submitbtn" onClick={this.submitTimer}>Set timer</button>
      <button type="button" className="btn" id="op_timer_removebtn" onClick={this.deleteTimer}>Remove timer</button>
    </div>
  </div>
</div> 

  }
}

const mapStateToProps = store => {
  //console.log(store) 
  return {
    users:store.users,
    tab:store.tab
  }
}
const mapStateToPropsOpTimer = store => {    //Importing props from store
  let meta = store.meta
  return {
    settings:meta.settings
  }
}

const OpTimer = connect(mapStateToPropsOpTimer)(OpTimer_)     //Connecting components

class Top_ extends React.Component{
  
  LogOut(){
      document.cookie="steamid=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/"
       window.location.replace('/auth'); 
  }
  Profile(){
    window.location.replace('/'); 
  }
  
  About(){
    window.location.replace('/about'); 
  }
  
  render(){
  let profile = {}
    for(var i=0;i<this.props.users.users.length;i++){
      let user = this.props.users.users[i]   
      if(window.steamid==user.id){
         profile=user
        break;
         }
    }
    //console.log(this.props.users.users)
if(window.steamid.includes("anonymous")){
  profile.avatar="https://cdn.glitch.com/dd3f06b2-b7d4-4ccc-8675-05897efc4bb5%2Fdasd.jpg?1556805827222"
}
    
  window.myname =profile.name;
  return ( <div className="dropdown">
  <button type="button" id="profile_dropdown_btn" className="btn btn-primary dropdown-toggle" data-toggle="dropdown">
    <img className="profileimg" src={profile.avatar} />
  </button>
  <div className="dropdown-menu dropdown-menu-right">
    <div id="top_dropdown_namespan"><img className="profileimg" src={profile.avatar} />{window.steamid.includes("anonymous") ? " "+ profile.name : <a href={"https://steamcommunity.com/profiles/"+window.steamid} target="_blank">{' '+profile.name}</a>}</div>
    <a className="dropdown-item" href="#" onClick={this.LogOut}>Log Out</a>
    <a className="dropdown-item" href="/">Profile</a>
    <a className="dropdown-item" href="/about">About</a>
  </div>
</div> 
  )
  }
}

///////////////////////////////////////////
class TotalPlayers_ extends React.Component{
    constructor(props) {
      super(props)
    }
  render(){
    return <p id="top_banner_playersonline">Online: {this.props.totalplayers}</p>
  }
}
class TotalResources_ extends React.Component{

  render(){
    let imglinks= [
      "https://cdn.glitch.com/84b19724-a86b-4caa-8e69-1e9c973e043f%2Fbm.png?v=1563790619306",
      "https://cdn.glitch.com/84b19724-a86b-4caa-8e69-1e9c973e043f%2Ffuel.png?v=1563792365865",
      "https://cdn.glitch.com/84b19724-a86b-4caa-8e69-1e9c973e043f%2Femad.png?v=1563790618836",
      "https://cdn.glitch.com/84b19724-a86b-4caa-8e69-1e9c973e043f%2Frmaaat.png?v=1563790808963",
      "https://cdn.glitch.com/84b19724-a86b-4caa-8e69-1e9c973e043f%2FHE.png?v=1563791976757",
      "https://cdn.glitch.com/84b19724-a86b-4caa-8e69-1e9c973e043f%2Frefinedfuel.png?v=1563790619764",
      "https://cdn.glitch.com/84b19724-a86b-4caa-8e69-1e9c973e043f%2Fuparts.png?v=1563745195056",
      "https://cdn.glitch.com/84b19724-a86b-4caa-8e69-1e9c973e043f%2Ftech.png?v=1563745196308"
                  ]
    let resource = []
    for(let i=0;i<imglinks.length;i++){
      resource.push(0)
    }
    for(var user in this.props.reftotal){
      for(let i =0;i<resource.length;i++){
        if(this.props.reftotal[user][i]!=undefined){
          resource[i]=Number(resource[i])+Number(this.props.reftotal[user][i])
        }
      }
    }
    let resourcetds = []
    for(let i=0;i<resource.length;i++){
      let text = null
      let imgclass = "top_banner_resources_img_empty"
      if(resource[i]>0){
        text = resource[i]
        imgclass = "top_banner_resources_img"
      }
        resourcetds.push(<div key={i}><span>{<img className={imgclass} src={imglinks[i]}/>}{text}</span></div>)
      
    }
    return <div id="top_banner_resources">{resourcetds}</div>
  }
}

const mapStateToPropsRefTotal = store => {    //Importing props from store
  let privateinfo = store.private
  return {
    reftotal: privateinfo.misc.reftotal
  }
}
const mapStateToPropsUsers = store => {    //Importing props from store
  //console.log(store) 
  return {
    users: store.users,
  }
}
const mapStateToPropsPlayers = store => {    //Importing props from store
    let roominfo = store.roominfo
  let stats = roominfo.stats
  return {
    totalplayers:stats.totalplayers
  }
}
const Top = connect(mapStateToPropsUsers)(Top_)
const TotalPlayers = connect(mapStateToPropsPlayers)(TotalPlayers_)
const TotalResources = connect(mapStateToPropsRefTotal)(TotalResources_)
export default connect(mapStateToProps)(Tabs)