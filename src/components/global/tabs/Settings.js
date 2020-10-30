///Settings tab will be here
import React from 'react';
import store from '../../../redux/store'
import {connect} from 'react-redux';
import U from '../useful_functions'
import A from "../../../redux/actions";
import socket from '../../../_static/socket';
import shortid from 'shortid';
const Popover = require('react-tiny-popover');

class Settings_ extends React.Component {
 handleChangeRoomName(e){
   let name = e.target.value
   if(name.length<33){
   store.dispatch(A.changeSettings("name",name))
     socket.emit('changeSettings',"name",name)
   }
 }
 handleChangePassword(e){
   let password = e.target.value
   if(password.length<33){
   store.dispatch(A.changeSettings("password",password))
     socket.emit('changeSettings',"password",password)
   }
 }
  
  GenerateToken(){
    let token = shortid.generate()
    store.dispatch(A.changeSettings("token",token))
    socket.emit('changeSettings',"token",token)
  }
  
  DisconnectDiscord(){
    store.dispatch(A.deleteSettings("link"))
    socket.emit('deleteSettings',"link")
  }
  ResetMap(){
    store.dispatch(A.clearMap())
    socket.emit('clearMap')
  }
  render(){
    //console.log("Rendering Settings");
    let token = null
    if(this.props.settings.token!=undefined){
      token=<p id="settings_token">{this.props.settings.token}</p>
    }
    let discordbtn = <button className="btn" onClick={this.GenerateToken}>Generate discord token</button>

    let discordtext = null
    if(this.props.settings.link!=undefined){
      let link = this.props.settings.link
      discordtext= "Room linked to channel #"+link.channelname+" on server "+link.servername;
      discordbtn = <button className="btn" onClick={this.DisconnectDiscord}>Remove link to channel</button>
    }
    //console.log(this.props)
     const management = this.props.users.sort(U.compare).map(user => <ManagementlistUnit key={user.id} HandleRankChange={this.HandleRankChange} user={user} myrank={this.props.myrank}/>)
                                                           
    return  <div id="manage" className="container tab-pane row">
            <div className="row">
            <div className="col" id="settings_usertable_col">
         <h4>Manage users</h4>
    <table className="table" id="settings_usertable" >
      <colgroup>
      <col width="200" />
      <col width="140"/>
      <col width="120"/>
      </colgroup>
    <thead className="indextable">
      <tr >
        <th><h5>Username</h5></th>
        <th><h5>Rank</h5></th>
        <th><h5>Change rank</h5></th>
      </tr>
    </thead>
    <tbody id="managetablebody"> 
      
      {management}
    </tbody>
  </table></div>
          <div className="col">                                                     
              <h4>Room settings</h4>
             <table><tbody><tr><td className="settings_td1"><h5>Room name:</h5></td>
              <td  className="settings_td2"><input type="text" 
                          value={this.props.settings.name}
                          onChange={this.handleChangeRoomName}/></td></tr>
              <tr><td  className="settings_td1"><h5>Password:</h5></td>
                <td className="settings_td2"> <input type="text" 
                          value={this.props.settings.password}
                          disabled={this.props.settings.secure==1}
                          onChange={this.handleChangePassword}/></td></tr></tbody>
            </table>            
    <div className="form-check-inline">
  <label className="form-check-label">
    <h5><input type="radio" 
          className="form-check-input" 
          name="faction" 
          value="1" 
          checked={this.props.settings.secure==1}
          onChange={()=>window.modalcontainer.ShowModal(3,"secure")} />Secure</h5>
  </label>
</div>
<div className="form-check-inline">
  <label className="form-check-label">
    <h5><input type="radio" 
          className="form-check-input" 
          name="faction" 
          value="0" 
          checked={this.props.settings.secure==0}
          onChange={()=>window.modalcontainer.ShowModal(3,"unsecure")}/>Unsecure</h5>
  </label>
</div>
      <button className="btn" onClick={()=>window.modalcontainer.ShowModal(4)}>Reset Room</button>
      <button className="btn" onClick={()=>this.ResetMap()}>Reset Map</button>
          <br /> <h4>Discord bot </h4> 
                  <DiscordPopover />{discordbtn}{token}
              <p>{discordtext}</p>
            <div>  <h4>Bot info</h4>
          <h5> - How do I get the bot on my server?</h5>
          <p>Follow this link: <a href="https://discordapp.com/api/oauth2/authorize?client_id=530789519360917514&permissions=0&scope=bot">https://discordapp.com/api/oauth2/authorize?client_id=530789519360917514&permissions=0&scope=bot</a></p>
          <h5> - Town hall/Fort notifications</h5>
              <p>If you have a discord channel linked to your bot, you can make bot notify you of events in desired town halls/forts by selecting a town/fort and clicking the 'Notify in Discord' checkbox.</p>
              <h5> - Operation timers</h5>
              <p>Discord emits a message when an operation is scheduled and when there is 1 hour left until the operation start.</p>
              <h5> - Tech tree</h5>
              <p>Discord emits a message when a research has been completed (this is based on user actions and is not linked to the game). Alternatively you can type !techtree and get all techs currently being researched (not empty and not full techs)</p>
     </div>
      </div>
       </div>                                                         
  </div>
                                                             }
}
/////////////////////////////////////////////////////////////////////

class ManagementlistUnit extends React.Component{
    constructor(props) {
      super(props)
      this.HandleRankChange = this.HandleRankChange.bind(this);
      this.ChangeSelect = this.ChangeSelect.bind(this);
    }
  
   ChangeSelect(e){
     this.HandleRankChange(e.target.value)
   }
  
   HandleRankChange(rank){
     if(rank==1){
     window.modalcontainer.ShowModal(0,this.props.user)
     }else{
     store.dispatch(A.setUser({id:this.props.user.id,rank:rank}))
     }
   }
  
  render(){
    var canRender = !(this.props.myrank>=this.props.user.rank||window.steamid==this.props.user.id||this.props.user.rank>4)
    let selection = [];
    let avatar = this.props.user.avatar
    if(this.props.user.id.includes("anonymous")){avatar = 'https://cdn.glitch.com/dd3f06b2-b7d4-4ccc-8675-05897efc4bb5%2Fdasd.jpg?1556805827222'}
    for(var i =1;i<5;i++){
      if(this.props.myrank==1||(this.props.myrank<i)){
      selection.push(<option key={i} value={i}>{window.Ranks[i]}</option>)
      }
    }

  return(<tr>
    <td className="textleft"><h6 className="userlist_header"><img className="profileimg" src={avatar}></img><a href={"https://steamcommunity.com/profiles/"+this.props.user.id}  target="_blank">{" "+this.props.user.name}</a></h6></td>
    <td ><p >{window.Ranks[this.props.user.rank]}</p></td>
    <td>
      {canRender && 
      <select       
          value={this.props.user.rank}
          onChange={this.ChangeSelect}
         name="rank">
          {selection}
      </select>
      }
      {this.props.user.rank==5 &&
      <p>Approve 
          <button className="approvebtn" onClick={()=>this.HandleRankChange(3)}>
            <img className="approve_img" src="https://cdn.glitch.com/6393f3fd-16a7-4641-ae3d-994f8e7cea4e%2Fcheckmark.png?1546938883091" />
          </button>
          <button className="approvebtn" onClick={()=>this.HandleRankChange(4)}>
            <img className="approve_img" src="https://cdn.glitch.com/6393f3fd-16a7-4641-ae3d-994f8e7cea4e%2FX%20icon%20small.png?1546753641488" />
          </button>
        </p>
      }
      </td>
    </tr>)
  }
}

class DiscordPopover extends React.Component {  ////PROPS: handleDelete, header
    constructor(props) {
    super(props);
    this.state={
      isPopoverOpen:false
    }
  }
  render(){
    
    return <Popover.default
            isOpen={this.state.isPopoverOpen}
            position={'left'} // preferred position
            onClickOutside={() => this.setState({ isPopoverOpen: false })}
            content={(
                <div id="settings_popover">
                <p>1. Invite the bot to your channel using <a href="https://discordapp.com/api/oauth2/authorize?client_id=530789519360917514&permissions=0&scope=bot">this link</a></p>
                <p>2. Set up a channel for the bot and give the bot rights to read, write, embed and upload</p>
                <p>3. In the channel, type !linkroom {'<token>, where <token> is your generated token on the right'}</p>
          <p>4. If you have manage permissions in the channel, the channel will be successfully linked to the room</p>
                </div>
          )} >
          <button id="settings_discord_explain_btn" onClick={() => this.setState({ isPopoverOpen: !this.state.isPopoverOpen })}><img id="settings_discord_explain_img"  src="https://cdn.glitch.com/dd3f06b2-b7d4-4ccc-8675-05897efc4bb5%2Fabout.png?v=1554634446293" />
            </button>
            </Popover.default>
  }
}

const mapStateToProps = store => {
  //console.log(store) 
  let meta = store.meta
  return {
    users: store.users.users,
    myrank: store.users.myrank,
    settings: meta.settings
  }
}
export const Settings = connect(mapStateToProps)(Settings_)