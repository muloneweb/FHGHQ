import React from 'react';
import markers from '../../../../../_static/markers';
const L = require('react-leaflet');
const NativeL = require('leaflet');
import store from '../../../../../redux/store'
import {connect} from 'react-redux';
import A from '../../../../../redux/actions.js';
import socket from '../../../../../_static/socket';
import RegionImages from '../../../../../_static/region-images';

class MiscIcon_ extends React.Component {
    constructor(props) {
      super(props);
      this.state={
        drag:false,
        displayText:false,
        artyaddon:null
      }
      this.handleMouseOver=this.handleMouseOver.bind(this)
      this.handleMouseOut=this.handleMouseOut.bind(this)
      this.handleCircleClick=this.handleCircleClick.bind(this)
      this.handleDragStart=this.handleDragStart.bind(this)
      this.handleDragEnd=this.handleDragEnd.bind(this)
      }
    shouldComponentUpdate(nextProps,nextState){
      //console.log("Town props",this.props,nextProps)
      if(((this.props.selected.key == this.props.signature) && (nextProps.selected.key != nextProps.signature)) ||
        ((this.props.selected.key != this.props.signature) && (nextProps.selected.key == nextProps.signature))){
        return true
      }
      if(this.state.drag!=nextState.drag){
        if(this.state.displayText!=nextState.displayText){
          return true;
        }
        return false
      }
      if(JSON.stringify(this.props.private[this.props.signature])!=JSON.stringify(nextProps.private[nextProps.signature])){
        return true
      }
      if(JSON.stringify(this.props.zoom)!=JSON.stringify(nextProps.zoom)){
        return true
      }
      if(JSON.stringify(this.state)!=JSON.stringify(nextState)){
        return true
      }
        return false
      }
    HandleSelect(type){
     store.dispatch(A.selectObject("icon",this.props.signature,"misc",type))
   }
    handleMouseOver(e){
      if(this.state.drag!=true){
      this.setState({        //Setting state
        displayText:true
     })
      }
    }
    handleMouseOut(e){
    if(this.state.drag!=true){
      this.setState({        //Setting state
          displayText:false
      })
    }
    }
    handleCircleClick(e){
      let latlng = e.latlng
      this.setState({
        artyaddon:[latlng.lat,latlng.lng]
      })
    }
    handleDragStart(e){
      this.setState({drag:true})
    }
    handleDragEnd(e){
      let obj = this.props.private[this.props.signature]
      let coords = e.target._latlng
      let packet = {position:{x:coords.lng,y:coords.lat},notes:obj.notes,type:obj.type,lastupdate:new Date()}
      store.dispatch(A.updateObject("misc_icon",packet,this.props.signature))
     socket.emit('updateObject',{type:"misc_icon",object:packet,key:this.props.signature})
     this.setState({
       drag:false,
       displayText:false
     })
    }
    GetArtyIcon(obj){
    let addon = null
    let ratio = RegionImages.ratio
    let artysize = markers.MiscIconArray[obj.type].size
    let size = artysize*ratio*Math.pow(2,this.props.zoom)
    let icon = new markers.MiscIcon({iconUrl:markers.MiscIconArray[obj.type].url,shadowUrl:markers.MiscIconArray[obj.type].shadow ,shadowSize: [size, size],shadowAnchor: [size/2, size/2]})
    if(this.state.artyaddon!=null){
        // Converts from radians to degrees.
        function toDegrees(radians) {
          return radians * 180 / Math.PI;
        }
        let distanceraw = [this.state.artyaddon[0]-obj.position.y,this.state.artyaddon[1]-obj.position.x]
        let azimuth = toDegrees(Math.atan(distanceraw[0]/distanceraw[1]))
          if(distanceraw[1]>0){
            azimuth=90-azimuth
          }
          if(distanceraw[1]<0){
            azimuth=270-azimuth
          }
      azimuth = Number((azimuth).toFixed(1));
        //console.log("Raw distance",distanceraw,azimuth)
        let distance = Math.floor(Math.sqrt(Math.pow(distanceraw[0],2)+Math.pow(distanceraw[1],2))/ratio)
        if(distance<(artysize/2)){
        let text = distance+" m<br />"+azimuth+"°"
        var IconText = NativeL.divIcon({className: 'note_icon_arty', html:"<div className='note_arty_text_container'><span class='note_arty_text'><b>"+text+"</b></span></div>"});
          IconText.options.iconSize=[undefined,undefined]   
          IconText.options.iconAnchor = [30,0]
      addon=<React.Fragment><L.Polyline color="black" weight="1" positions={[[obj.position.y,obj.position.x],this.state.artyaddon]} /><L.Marker position={[this.state.artyaddon[0],this.state.artyaddon[1]]} icon={IconText} opacity={1} zIndexOffset={1000}/></React.Fragment>
        }
    }
     return  <React.Fragment><L.Marker position={[obj.position.y,obj.position.x]} icon={icon} zIndexOffset={1000} onClick={()=>this.HandleSelect(obj.type)} draggable={true} onDragend={(e)=>this.handleDragEnd(e)} pane="toppane"
               >
       </L.Marker>
       {(this.props.selected.key == this.props.signature) ?
          <L.Circle center={[obj.position.y,obj.position.x]} 
                    fillColor="gray" 
                    color="gray" 
                    fillOpacity={0}  
                    radius={RegionImages.ratio*artysize/2}  
                    opacity={0} 
                    zIndexOffset={6000} 
                    onClick={this.handleCircleClick} 
                    pane="toppane"/> :
          null}
       {addon}
     </React.Fragment>
    }
    render(){
    let obj = this.props.private[this.props.signature]
    //console.log(this.props)
    let text = obj.notes
    if(text!=""){
      text = JSON.parse(JSON.stringify(this.props.private[this.props.signature].notes))
     text = text.replace(/(?:\r\n|\r|\n)/g, '<br>')
    }
    var IconText = NativeL.divIcon({className: 'note_icon_txtc', html:"<div className='note_icon_text_container'><span class='note_icon_text'><b>"+text+"</b></span></div>"});
          IconText.options.iconSize=[undefined,undefined]   
          IconText.options.iconAnchor = [-10,10]
    let addon = <L.Marker position={[obj.position.y,obj.position.x]} icon={IconText} opacity={1} zIndexOffset={1000}/>
    let icon = new markers.MiscIcon({iconUrl:markers.MiscIconArray[obj.type].url})
    if(obj.type === 25 || obj.type === 26 || obj.type === 27 || obj.type === 28 || obj.type === 34){
      return this.GetArtyIcon(obj)
    }
    if(obj.type==0){
        return(
          <React.Fragment>
        {(this.props.zoom>3.5||this.state.displayText)&&addon}
        <L.Marker position={[obj.position.y,obj.position.x]} icon={icon} zIndexOffset={1000} onMouseOver={(e)=>this.handleMouseOver(e)} onMouseOut={(e)=>this.handleMouseOut(e)} draggable={true} onDragstart={(e)=>this.handleDragStart(e)} onDragend={(e)=>this.handleDragEnd(e)} onClick={()=>this.HandleSelect(obj.type)} />
          </React.Fragment>
    )
    }
    return(
          <React.Fragment>
        <L.Marker position={[obj.position.y,obj.position.x]} icon={icon} zIndexOffset={1000} onClick={()=>this.HandleSelect(obj.type)} draggable={true} onDragend={(e)=>this.handleDragEnd(e)}>
        </L.Marker>
          </React.Fragment>
    )
    }
  }

const mapStateToPropsMiscIcon = store => {
    let privateinfo = store.private
    return {
        private: privateinfo.misc.icon,
        selected: store.selected
    }
}
export const MiscIcon = connect(mapStateToPropsMiscIcon)(MiscIcon_);