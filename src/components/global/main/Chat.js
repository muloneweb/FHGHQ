import React from 'react';
import socket from '../../../_static/socket';
import store from '../../../redux/store'
import {connect} from 'react-redux';
import A from '../../../redux/actions';
import U from '../useful_functions'

class ChatCore extends React.Component {
  render(){
  if(this.props.tab.tab!=7){
      return null
    }else{
   return <div className="row" id="chat_totalcontainer">
   <div className="col chat_window_container" id="chat_window_container_general">
     <div className="chat_window_header" id="generalheader">
    <p>GENERAL</p>
</div>
     <Chat chat={this.props.chat} users={this.props.users} category="general"/>
     </div>
      <div className="col chat_window_container" id="chat_window_container_announcements">
         <div className="chat_window_header" id="announcementsheader">
    <p id="opc">OPERATION</p>
</div>
      <Chat chat={this.props.chat} users={this.props.users} category="announcements"/>
     </div>  
   </div> 
  }
  }
}
class Chat extends React.Component {
  componentDidMount(){
    var el = document.getElementById("chat_window_"+this.props.category)
    el.scrollTop = el.scrollHeight
  }
  componentDidUpdate() {
    var el = document.getElementById("chat_window_"+this.props.category)
    el.scrollTop = el.scrollHeight
  }
  render(){
      let messages=[]
      if(this.props.chat!=undefined){
      if(this.props.chat[this.props.category]!=undefined){
      for(let i =0;i<this.props.chat[this.props.category].length;i++){
        let message = this.props.chat[this.props.category][i]
        let user = U.GetUser(this.props.users.users,message.userid)
        //console.log(message,user)
        messages.push(<Message user={user} message={message} category={this.props.category}/>)
      }
      }
      }
      return <React.Fragment><div className="chat_window" id={"chat_window_"+this.props.category}><ul>{messages}</ul></div>{
      (this.props.category!="announcements"||this.props.users.myrank<3) ? <ChatInput category={this.props.category}/> : null}</React.Fragment>
  }
}

class Message extends React.Component {
  render(){
    let user = this.props.user
    let message = this.props.message
    let username_class = ""
    let message_class = ""
    switch(user.rank){
      case 1:
        username_class= "row-admin"
        break;
      case 2:
        username_class= "row-mod"
        break;
      case 3:
        username_class= "row-user"
        break;
      default:
        username_class= "user-offline"
        break;
    }
    if(this.props.category=="general"){
      message_class = "chat_message_text_general"
    }else if(this.props.category=="announcements"){
      message_class = "chat_message_text_announcements"
    }
    return <li className="chat_message_li"><p className="chat_message_meta"><img className="chat_userimg" src={user.avatar} /><span className={"chat_message_username "+username_class}>{user.name}</span> <span className="chat_message_datespan">{new Date(message.date).toLocaleDateString()} {new Date(message.date).toLocaleTimeString()}</span></p>
      <p className={message_class}>{message.message}</p></li>
  }
}

class ChatInput extends React.Component {
  constructor(props) {
    super(props);
    this.state={  
      message:""
    }
    this.handleOnSend = this.handleOnSend.bind(this)
    this.handleOnChange=this.handleOnChange.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
    }
  handleKeyPress(e){
     if(e.key === 'Enter'){
      this.handleOnSend()
    }
  }
  handleOnSend(){
    if(this.state.message!=""){
    let packet = {userid:window.steamid,date: Date.now(),message:this.state.message}
    store.dispatch(A.addMessage(packet,this.props.category))
    socket.emit('addMessage',packet,this.props.category)
    this.setState({
      message:""
    })
    }
  }
  handleOnChange(e){
    this.setState({
      message:e.target.value
    })
  }
  render(){
    return <div className="chat_input_container"><input className="chat_input_field" type="text" value={this.state.message} onChange={this.handleOnChange} onKeyPress={this.handleKeyPress}/>
      <button onClick={()=>this.handleOnSend()} className="chat_input_btn" ><img className="chat_input_btn_img" src="https://cdn.glitch.com/84b19724-a86b-4caa-8e69-1e9c973e043f%2Farw.png?v=1565705731914" /></button></div>
  }
}

const mapStateToProps = store => {
  let privateinfo = store.private
  return {
    tab: store.tab,
    chat:privateinfo.misc.chat,
    users: store.users,
  }
}

class ChatPersonal extends React.Component {
  constructor(props) {
    super(props);
    this.state={  
      message:""
    }
  }
    componentDidMount(){
    var el = document.getElementById("chat_window_personal")
    if(el!=null){
      el.scrollTop = el.scrollHeight
    }
  }
  componentDidUpdate() {
    var el = document.getElementById("chat_window_personal")
    if(el!=null){
      el.scrollTop = el.scrollHeight
    }
  }
  handleClose(){
    store.dispatch(A.selectUser(0))
  }
  render(){
    if(this.props.tab.user==0){
      return null
    }
    let user = U.GetUser(this.props.users.users,this.props.tab.user)
    let username_class=""
    switch(user.rank){
      case 1:
        username_class= "row-admin"
        break;
      case 2:
        username_class= "row-mod"
        break;
      case 3:
        username_class= "row-user"
        break;
      default:
        username_class= "user-offline"
        break;
    }
      let messages=[]
      let category=user.id
      if(this.props.chat!=undefined){
        if(this.props.chat[category]!=undefined){
            for(let i =0;i<this.props.chat[category].length;i++){
            let message = this.props.chat[category][i]
            let user = U.GetUser(this.props.users.users,message.userid)
            messages.push(<Message user={user} message={message} category={category}/>)
            }
        }
      }
  
    return <div className="chat_window_container" id="chat_personal_totalcontainer"><div className="chat_window_header" id="chat_window_header_personal">
      <span className={"chat_message_username "+username_class}><img className="chat_userimg" src={user.avatar} />{user.name}</span>
      <button className="card_remove_btn" onClick={() => this.handleClose()}><img className="card_remove_image"  src="https://cdn.glitch.com/dd3f06b2-b7d4-4ccc-8675-05897efc4bb5%2FX.png?1557668374293" />
            </button>
      
      </div>
      <div className="chat_window" id={"chat_window_personal"}><ul>{messages}</ul></div>
      <ChatInput category={category}/>
    </div>
  }
}


export default { 
  ChatCore: connect(mapStateToProps)(ChatCore),
  ChatPersonal:connect(mapStateToProps)(ChatPersonal)
}
//export default connect(mapStateToProps)(ChatCore)

