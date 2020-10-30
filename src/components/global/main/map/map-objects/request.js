import React from 'react';
import markers from '../../../../../_static/markers';
const L = require('react-leaflet');
import store from '../../../../../redux/store'
import {connect} from 'react-redux';
import A from '../../../../../redux/actions.js';
import socket from '../../../../../_static/socket';
import U from '../../../useful_functions'

class RequestIcon_ extends React.Component {
    constructor(props) {
    super(props);
      this.markerRef = React.createRef();
    }
      shouldComponentUpdate(nextProps,nextState){
      let signature = U.signature(this.props.request.position)
      //console.log("Request props",this.props,nextProps)
        if(JSON.stringify(this.props.requests[signature])!=JSON.stringify(nextProps.requests[signature])){
          return true
        }
          return false
      }

  SelectRequest(request){
   let signature = U.signature(request.position)
   store.dispatch(A.selectObject("requests",signature))
  }
  CheckCompleted(){ 
    let signature = U.signature(this.props.request.position)
    let request = this.props.requests[signature]
    if(request.done==undefined){
      return false
    }
    let donestring = JSON.stringify(request.done)
    if(donestring==""){
      return false
    }
    let done = JSON.parse(donestring)
    for(var i=0;i<3;i++){
      for(var j =0;j<request.request[i].length;j++){
        let obj = request.request[i][j]
        let item = done.find(item => obj.catid == item.catid&&obj.itemid == item.itemid);
       // console.log("Request items",obj,item)
        if(item==undefined){
          return false;
        }else{
          if(obj.crates>item.crates){
            return false;
          }else{
            item.crates = item.crates-obj.crates
          }
        }
      }
    }
    return true;
  }
  handleDragEnd(e){
    let obj = this.props.requests[U.signature(this.props.request.position)]
    let coords = e.target._latlng
    const position = {x:coords.lng,y:coords.lat}
    let packet = {...obj, position: position, lastupdate:new Date()}
    store.dispatch(A.updateObject("requests",packet, U.signature(position)))
    store.dispatch(A.deleteObject("requests", U.signature(this.props.request.position)))
    socket.emit('updateObject',{type:"requests",object:packet, key: U.signature(position)})
    socket.emit('deleteObject',{type:"requests", key: U.signature(this.props.request.position)})
  }

  render(){
  //console.log("Rendering request")
  let request = this.props.request
  let icon = markers.RequestIcon.incomplete
  if(this.CheckCompleted()){
    icon=markers.RequestIcon.complete
  }
  return(
    <L.Marker ref={this.markerRef} 
              position={[request.position.y,request.position.x]} 
              icon={icon} 
              onClick={()=>this.SelectRequest(this.props.request)}
              draggable={true} 
              onDragend={(e)=>this.handleDragEnd(e)}>
      </L.Marker>
      )
  }
}

const mapStateToPropsRequests = store => {
    let privateinfo = store.private
    return {
      requests: privateinfo.requests,
    }
  }

export const RequestIcon = connect(mapStateToPropsRequests)(RequestIcon_);