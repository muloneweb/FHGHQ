import React from 'react';
import socket from '../../../../../_static/socket';
import store from '../../../../../redux/store'
import A from '../../../../../redux/actions';
const RLD = require('react-leaflet-draw');
const RLT = require('react-leaflet-textpath');
var PropTypes = require('prop-types');
import {connect} from 'react-redux';
const LeafletControl = require('react-leaflet-control');
const L = require('react-leaflet')
const NativeL = require('leaflet')
const ReactColor = require('react-color')
//const RotatedMarker = require('./Arrow')
var createReactClass = require('create-react-class');
//const ArrowMarker = require('./Arrow')
//Props: PanRegion(index) - moves the camera to the selected region
class RLDComp_ extends React.Component {
    constructor(props) {
    super(props);
    this.handleCreate=this.handleCreate.bind(this)
    this.handleEdit=this.handleEdit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleDrawStart = this.handleDrawStart.bind(this)
    this.handleDrawStop = this.handleDrawStop.bind(this)
    this.handleChangeColor = this.handleChangeColor.bind(this)
    this.handleChangeStyle = this.handleChangeStyle.bind(this)
    this.state={ 
     draw:false,
     style:0,
     color:'#FF0000'
    }
    }
  convertArray(arr){
      let coords = []
      arr.forEach(i=>{
        coords.push([i.lat,i.lng])
      })
      return coords
    }
  
  handleCreate(e){
    //console.log(e)
    let packet = {}
    let key = ""
    switch(e.layerType){
      case "circle":
        packet={position:[e.layer._latlng.lat,e.layer._latlng.lng],radius:e.layer._mRadius}
        key = Number(packet.position[0])+Number(packet.position[1])
        break;
      case "polygon":
        packet={position:this.convertArray(e.layer._latlngs[0])}
        key = Number(packet.position[0][0])+Number(packet.position[0][1])
        break;
      case "polyline":
        packet={position:this.convertArray(e.layer._latlngs)}
        key = Number(packet.position[0][0])+Number(packet.position[0][1])
        break;
    }
    packet.type=e.layerType;
    packet.color=this.state.color
    packet.style=this.state.style
    store.dispatch(A.updateObject("misc_rld",packet,key))
    socket.emit('updateObject',{type:"misc_rld",object:packet,key:key})
    e.layer.remove()
  }
  
  handleEdit(e){
    //console.log("Edit RLD",e)
    let packets = []
    let keys = []
    for(var prop in e.layers._layers){
      let obj = e.layers._layers[prop]
      keys.push(obj.options.signature)
     // console.log(e.layers._layers[prop])
      switch(obj.options.type){
        case "circle":
         packets.push({position:[obj._latlng.lat,obj._latlng.lng],radius:obj._mRadius,type:obj.options.type})
         break;
        case "polygon":
          packets.push({position:this.convertArray(obj._latlngs[0]),type:obj.options.type})
         break;
        case "polyline":
          packets.push({position:this.convertArray(obj._latlngs),type:obj.options.type})
         break;
      }
    }
    for(var i=0;i<packets.length;i++){
      store.dispatch(A.updateObject("misc_rld",packets[i],keys[i]))
      socket.emit('updateObject',{type:"misc_rld",object:packets[i],key:keys[i]})
    }
    
  }
  handleDelete(e){
    //console.log("Delete RLD",e)
    for(var prop in e.layers._layers){
      let obj = e.layers._layers[prop]
      let key = obj.options.signature;
      store.dispatch(A.deleteObject("misc_rld",key))
      socket.emit('deleteObject',{type:"misc_rld",key:key})
    }
  }
  GetObject(obj,signature){
    let color = '#FF0000'
    if(obj.color!=undefined){
      color = obj.color
    }
    switch(obj.type){
      case "circle":
        return <L.Circle color={color} dashArray="5, 5" fillOpacity={0.1} center={obj.position} radius={obj.radius} signature={signature} type="circle"/>
      case "polygon":
        return <L.Polygon color={color} dashArray="5, 5" fillOpacity={0.1} positions={obj.position} signature={signature} type="polygon"/>
      case "polyline":
        if(obj.style==1){
          return <Arrow obj={obj} color={color} signature={signature}/>
        }
        return <L.Polyline color={color} dashArray="5, 5" fillOpacity={0.1} dashOffset='0' positions={obj.position} signature={signature} type="polyline"/>
    }
  }
  handleDrawStart(e){
    this.setState({ draw:true })
  }
  handleDrawStop(e){
    this.setState({ draw:false })
  }
  handleChangeColor(e){
    let color = e.hex
    this.setState({ color:color })
  }
  handleChangeStyle(e){
    let value = e.target.value
    this.setState({ style:value })
  }
 render(){
   console.log(this.state)
   let rld = this.props.misc.rld
   let objects = []
   if(rld==undefined){
     rld={}
   }
    for(var obj in rld){
      objects.push(this.GetObject(rld[obj],obj))
    }
   //for(var i=0;i<)
   return <L.FeatureGroup>
    <RLD.EditControl
      ref={(e) => {this.editcontrol = e}}
      position='topleft'
      onEdited={this.handleEdit}
      onCreated={this.handleCreate}
      onDeleted={this.handleDelete/*this._onDeleted*/}
      onDrawStart={this.handleDrawStart}
      onDrawStop={this.handleDrawStop}
      draw={{
        polyline:{showLength:false,shapeOptions:{color:"#790000", dashArray: '20, 20', dashOffset: '0'}},
        circle:{showRadius:false,shapeOptions:{color:"#790000"}},
        polygon:{shapeOptions:{color:"#790000"}},
        rectangle: false,
        marker:false,
        circlemarker:false
      }}
    /> {this.state.draw ? <LeafletControl.default position="topleft" className="leaflet_control_pan">
      <span>Style</span> <select       
          value={this.state.style}
          onChange={this.handleChangeStyle}
         >
        <option value={0}>None</option>
        <option value={1}>Arrow</option>
        <option value={2}>Defense line</option>
      </select>
      <ReactColor.GithubPicker triangle={'hide'} colors={['#516C4B','#235683','#800f0f','#dc6e00','#d3d300','#FFFF00','#1a4012','#0404B4','#000000','#FAFAFA','#585858','#8709a6']}  onChangeComplete={this.handleChangeColor} />
        </LeafletControl.default>  :null}
  {  this.props.zoom>1&&this.props.draw ? objects :null
  }
  </L.FeatureGroup>
 }
}
/////////////////////////////////////////////////////
class Arrow extends React.Component {
    constructor(props) {
    super(props);
    }
  componentDidUpdate(){
    console.log(this)
  }
  componentDidMount(){
    console.log(this.refs.arrow_icon)
  }
  render(){
    let obj = this.props.obj
    console.log("Arrow obj",obj)
        var arrow_icon = NativeL.divIcon({className:"arrow_icon",html:"►"});
        arrow_icon.options.iconSize=[20,20]   
        arrow_icon.options.iconAnchor = [10,10]
        console.log("Arrow icon",arrow_icon)
        //myIcon.options.iconAnchor[0]=myIcon.options.iconSize[0]/2;
        //myIcon.options.iconAnchor[1]=myIcon.options.iconSize[1]/2;
        let icon = <L.Marker  position={obj.position[obj.position.length-1]} icon={arrow_icon}/>
    return <L.FeatureGroup><L.Polyline color={this.props.color} dashArray="5, 5" fillOpacity={0.1} positions={obj.position} signature={this.props.signature} type="polygon"/>{icon}
   
    </L.FeatureGroup>
  }
}
const mapStateToPropsRLD = store =>{
  let info = store.private;
  let display = store.display;
  return{
    misc:info.misc,
    draw: display.custom.lines
  }
}

export const RLDComp = connect(mapStateToPropsRLD)(RLDComp_)