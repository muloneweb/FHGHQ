import React from 'react';
const ReactDOM = require('react-dom');
const socket = require('socket.io-client')();

function RenderTop(){
    //console.log("Loading top")
$.post('/getprofile?' + $.param({ id:window.steamid}), function(profile) {
if(window.steamid.includes("anonymous")){
  profile.avatar="https://cdn.glitch.com/dd3f06b2-b7d4-4ccc-8675-05897efc4bb5%2Fdasd.jpg?1556805827222"
}
//console.log(profile);
ReactDOM.render(<Top profile={profile} steamid={window.steamid}/>,document.getElementById('top'));
})
}

class Top extends React.Component{
  constructor(props){
      super(props)
      
  }
  LogOut(){
      document.cookie="steamid=;"
       window.location.replace('/auth'); 
  }
  Profile(){
    window.location.replace('/'); 
  }
  
  About(){
    window.location.replace('/about'); 
  }
  
  render(){
  window.myname = this.props.profile.name;
  return (
  <h6>{'Logged in as: '}
    <img className="profileimg" src={this.props.profile.avatar} />{window.steamid.includes("anonymous") ? " "+ this.props.profile.name : <a href={"https://steamcommunity.com/profiles/"+this.props.steamid} target="_blank">{' '+this.props.profile.name}</a>}
    <button id="logoutBtn" type="button" className="btn TopBtn" onClick={this.LogOut}>Log Out</button>
    <button id="profileBtn" type="button" className="btn TopBtn" onClick={this.Profile}>Profile</button> 
    <button id="aboutBtn" type="button" className="btn TopBtn" onClick={this.About}>About</button> 
    </h6>
  )
  }
}


export default {
  RenderTop:RenderTop,
  Top:Top,
  socket:socket
}