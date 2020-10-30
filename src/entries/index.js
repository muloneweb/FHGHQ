import React from 'react';
import ReactDOM from'react-dom';
import Top from '../components/Index-top';
const socket = Top.socket;
import Ranks from '../_static/ranks';
const steamid = document.cookie.substring(document.cookie.indexOf(" steamid=")+9,document.cookie.indexOf(" steamid=")+26).replace(';','');
Object.defineProperty( window, 'steamid', {
  value: steamid,
  writable: false,
  enumerable: true,
  configurable: true
});
Top.RenderTop();

  //Get rooms this user is connected to
 $.post('/getuserrooms?' + $.param({ id:steamid}), function(roomslist) {
  //rooms = roomslist;
   //console.log(roomslist)
    ReactDOM.render(<LeaveModal ref={(leavemodal) => {window.leavemodal = leavemodal}} />,document.getElementById('leaveModalContainer'));
    ReactDOM.render(<CreateModal ref={(createmodal) => {window.createmodal = createmodal}} />,document.getElementById('createModalContainer'));
    ReactDOM.render(<Room ref={(room) => {window.room = room}} rooms={roomslist} />,document.getElementById('roomtablebody'));
  });  


class Room extends React.Component{
constructor(props){
super(props)
  this.state = {
    rooms: this.props.rooms
  }
   this.UpdateRoom = this.UpdateRoom.bind(this);
   this.RemoveRoom = this.RemoveRoom.bind(this);
}
 UpdateRoom(roominfo){
   let rooms = this.state.rooms
   rooms[this.findRoom(roominfo.globalid)].rank=Number(roominfo.rank);
   if(roominfo.rank==1){
     rooms[this.findRoom(roominfo.globalid)].admin=window.myname;
   }
   this.setState({rooms:rooms})
 }
  
RemoveRoom(roomid){
let rooms = this.state.rooms
  rooms.splice(this.findRoom(roomid),1);
  this.setState({rooms:rooms})
}
  
findRoom(roomid){
  for(var i =0;i< this.state.rooms.length;i++){
  if(this.state.rooms[i].globalid==roomid){
  return i;
  }}}
  
render(){
let roomlist = this.state.rooms.map((item) => <RoomUnit key={item.globalid} item={item}/>)
  return(
    <React.Fragment>{roomlist}</React.Fragment>    
    )
}}

function RoomUnit (props){
  return(
  <tr>
      <td className="removecell"><button onClick={()=>window.leavemodal.ShowModal(props.item)} className="removebutton"><img className="removeimage" src="https://cdn.glitch.com/dd3f06b2-b7d4-4ccc-8675-05897efc4bb5%2FX.png?1557668374293" /></button></td>
      <td><p>{props.item.roomname}</p></td>
      <td><a href={'https://steamcommunity.com/profiles/'+props.item.adminid}>{props.item.admin}</a></td>
      <td><a href={window.location.origin+'/room/'+props.item.globalid}>{props.item.globalid}</a></td>
      <td><p>{Ranks[props.item.rank]}</p></td>
    </tr>
    )
}

class LeaveModal extends React.Component{ //// MODAL FOR LEAVING ROOMS /////////////////////////////////////////
constructor(){
super()
    this.state = {
     globalid: 0,
     roomname: "",
     admin: false,
     show:false
  }
  this.ShowModal = this.ShowModal.bind(this);
  this.CloseModal = this.CloseModal.bind(this);
  this.LeaveRoom = this.LeaveRoom.bind(this);
}

   ShowModal(room){
     //console.log("Ping!");
     var banned = room.rank==4
    return(
    this.setState({
    globalid: room.globalid, 
    roomname: room.roomname, 
    admin: room.rank==1,
    show: !banned
    })
       )
  }
  
  CloseModal(){
  this.setState({
    globalid: "",
    roomname: "", 
    admin: "",
    show:false
    })
  }
  
  LeaveRoom(){
    window.room.RemoveRoom(this.state.globalid);
    this.CloseModal();
    $.post('/leaveroom?' + $.param({ globalid:this.state.globalid}), function() {
    });
  }
  
    render(){
    return(
  <React.Fragment>
<div className={(this.state.show)?'modal show':'modal'} style={{display:(this.state.show)?'block':'none'}}>
    <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h4 className="modal-title">Leave room</h4>
        <button type="button" className="close" onClick={this.CloseModal}>&times;</button>
      </div>
      <div className="modal-body">
      <h6>Are you sure you want to leave room {this.state.roomname}?</h6>

        {this.state.admin ? <div className="alert alert-warning" id="adminwarning">
      <strong>Warning!</strong> You are the admin of this room. Leaving will delete this room.
      </div>:<div></div>
          }      </div>
      <div className="modal-footer">
        <button type="button" className="btn" onClick={this.LeaveRoom}>Leave room</button>
        <button type="button" className="btn" onClick={this.CloseModal}>Close</button>
      </div>
    </div>
  </div>
  </div>
  <div className='modal-backdrop show' style={{display:(this.state.show)?'block':'none'}}></div>
      </React.Fragment>
      )
  }
}


class CreateModal extends React.Component{ //// MODAL FOR CREATING ROOMS /////////////////////////////////////////
constructor(){
super()
    this.state = {
     roomname: "",
     faction: 0,
     secure: 0,
     password: "",
     show:false
  }
  this.ShowModal = this.ShowModal.bind(this);
  this.CloseModal = this.CloseModal.bind(this);
  this.handleChange = this.handleChange.bind(this);
  this.handleChangeName = this.handleChangeName.bind(this);
  this.CreateRoom = this.CreateRoom.bind(this);
}
    ShowModal(){
    this.setState(prevState=>{
    return {
    show:true
    }})
  }
  
  CloseModal(){
  this.setState(prevState=>{
    return {
    show:false
    }})
  }
  
  handleChange(event) {
        const {name, value, type, checked} = event.target
        this.setState({ [name]: value })
    //console.log(this.state);
    }
    handleChangeName(event) {
        let value = event.target.value
        if(value.length<33){
        this.setState({ roomname: value })
        }
    //console.log(this.state);
    }
  CreateRoom(){
    let roomname = this.state.roomname;
    if(roomname==""){
    roomname = "New Room"
    }
    let settings = {name:roomname, faction:this.state.faction, secure:this.state.secure, password:this.state.password}
     $.post('/createroom?' + $.param({ id:steamid, settings:settings}), function(id) {
      window.location.replace('/room/'+id); 
    });
  }
  
  
    render(){
    return(
<React.Fragment>
  <div className={(this.state.show)?'modal show':'modal'} style={{display:(this.state.show)?'block':'none'}}>
  <div className="modal-dialog">
    <div id="index_createmodal_content" className="modal-content">
      <div id="index_createmodal_header" className="modal-header">
        <h4 className="modal-title">Create new room</h4>
        <button type="button" className="close" onClick={this.CloseModal}><span>&times;</span></button>
      </div>
      <div id="index_createmodal_body" className="modal-body">
      <form>
        <h5>Room name:  <input type="text" 
                          placeholder="New Room" 
                          value={this.state.roomname}
                          onChange={this.handleChangeName}/></h5>
         <div className="form-check-inline">
  <label className="form-check-label">
    <h5><input type="radio" 
          className="form-check-input" 
          name="faction" 
          value="0" 
          checked={this.state.faction==0}
          onChange={this.handleChange} /><img className="faction_img" src="https://cdn.glitch.com/dd3f06b2-b7d4-4ccc-8675-05897efc4bb5%2Fcol.png?v=1560274203875"/></h5>
  </label>
</div>
<div className="form-check-inline">
  <label className="form-check-label">
    <h5><input type="radio" 
          className="form-check-input" 
          name="faction" 
          value="1" 
          checked={this.state.faction==1}
          onChange={this.handleChange}/><img className="faction_img" src="https://cdn.glitch.com/dd3f06b2-b7d4-4ccc-8675-05897efc4bb5%2FUward.png?v=1560274204371"/></h5>
  </label>
</div>
        <hr />
  <div className="form-check-inline" >
  <label className="form-check-label">
    <h5><input type="radio" 
          className="form-check-input" 
          name="secure" 
          value="1" 
          checked={this.state.secure==1}
          onChange={this.handleChange}
          disabled={window.steamid.includes("anonymous")}
          />Secure</h5>      
    <p>Only steam users can request access, no password required</p>
  </label>
</div>   
   <div className="form-check-inline">
  <label className="form-check-label">
    <h5><input type="radio" 
          className="form-check-input" 
          name="secure" 
          value="0" 
          checked={this.state.secure==0}
          onChange={this.handleChange} />Unsecure</h5>
    <p>Allow Steam and non Steam users (requires Password)</p>
  </label>
</div>  
      <br /> <h5>Password:  <input type="text" 
                          name="password" 
                          value={this.state.password}
                          onChange={this.handleChange}
                          disabled={this.state.secure==1}
                              /></h5>
  </form>
  <div className="alert alert-warning" role="alert">
   Only Steam authorized users can create secure rooms and change room settings.
</div>
      </div>
    <div className="modal-footer">
        <button type="button" id='cr' className="btn" onClick={this.CreateRoom}>Create room</button>
        <button type="button" id='cr' className="btn" onClick={this.CloseModal}>Close</button>
      </div>
    </div>
  </div>
</div>
  <div className='modal-backdrop show' style={{display:(this.state.show)?'block':'none'}}></div>
</React.Fragment>
      )}
}

  //Removes room from the table
  socket.on('leaveroom', function (roomid) { //SOCKET EVENT - LEAVES ROOM
    window.room.RemoveRoom(roomid);
  })

  //Updates room status
  socket.on('updateroom', function (roominfo) { //SOCKET EVENT - UPDATES ROOM
  //console.log('updating room');
  //console.log(roominfo);
  window.room.UpdateRoom(roominfo)
  })
  