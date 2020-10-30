import React from 'react';
import socket from '../../../../../_static/socket';
import store from '../../../../../redux/store'
import markers from '../../../../../_static/markers';
import A from '../../../../../redux/actions.js';
import U from '../../../useful_functions'

export class ContextDropdown extends React.Component {  ////Component generation
    constructor(props) {
      super(props);
      this.state={      ///State
        isPopoverOpen:false,
        button:0
      }
      this.TogglePopover = this.TogglePopover.bind(this)    //Function binding
      this.CreateIcon = this.CreateIcon.bind(this)
      this.HoverIcon = this.HoverIcon.bind(this)
    }
    TogglePopover(){
    this.setState({ isPopoverOpen: !this.state.isPopoverOpen })
    }
    CreateIcon(event,contextmenu){
      if(this.state.button!=0){
        contextmenu.hide()
        let packet = {position:{x:event.latlng.lng,y:event.latlng.lat},notes:"",type:this.state.button,lastupdate:new Date()}
        let key = U.signature(packet.position)
        store.dispatch(A.updateObject("misc_icon",packet,key))
         socket.emit('updateObject',{type:"misc_icon",object:packet,key:key})
        if(this.state.button>=16&&this.state.button<=20){
          let packetEvent = {type:4,  date:JSON.stringify(new Date()), packet:{key:key,type:this.state.button}}
          store.dispatch(A.submitEvent(packetEvent))
          socket.emit('submitEvent',packetEvent)
          
        }
      }
    }
    HoverIcon(num){
      this.setState({
        button:num
      })
    }
    GetItem(i){
    let item = markers.MiscIconArray[i]
    return <p  className="dropdown-item dropdown_item_context-menu" onMouseEnter={()=>this.HoverIcon(i)} onMouseLeave={()=>this.HoverIcon(0)} key={"contextdropdown"+item.name}><img className="dropdown_image" src={item.url} />{item.name}</p>
    }
    render(){
      let items = []
    switch(this.props.type){
      case 0:
    for(var i=8;i<=12;i++){
      items.push(this.GetItem(i))
    }
        break;
      case 1:
     for(var i=13;i<=15;i++){
      items.push(this.GetItem(i))
    }   
        break;
      case 2:
    for(var i=16;i<=20;i++){
      items.push(this.GetItem(i))
    }
        break;
        case 3:
    for(var i=21;i<=24;i++){
      items.push(this.GetItem(i))
    }
     break;
    case 4:
    for(var i=29;i<=33;i++){
      items.push(this.GetItem(i))
    }   
    }
    return <React.Fragment>
      {items}
    </React.Fragment>
    }
  }