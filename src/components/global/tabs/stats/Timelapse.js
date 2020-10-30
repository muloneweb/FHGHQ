import React from 'react';
import socket from '../../../../_static/socket';
import {connect} from 'react-redux';
import A from "../../../../redux/actions";
import U from '../../useful_functions'
import markers from '../../../../_static/markers';
const RegionImages = require('../../../../_static/region-images');
const L = require('react-leaflet')
const NativeL = require('leaflet')
const LeafletControl = require('react-leaflet-control');
const AnimatedNumber = require('react-animated-number')
const FlipMove = require('react-flip-move')
var XMLHttpRequest = require('xhr2');

//////////////////////////////////////////////
class Timelapse_ extends React.Component { //Conquest X, Day Y Underway since
   constructor(props) {
    super(props);
      this.state={      ///State
      war:props.stats.currentwar.startpoint.number
    }
     this.onSwitchWar = this.onSwitchWar.bind(this)
   }

  shouldComponentUpdate(nextProps, nextState){
    //let checkstart = Date.now()
    if(this.props.time!=nextProps.time||this.props.timerOn!=nextProps.timerOn){
      return true
    }
    if(JSON.stringify(this.props.dynamic)==JSON.stringify(nextProps.dynamic)){
      //console.log("Checked timelapse",Date.now()-checkstart)
      return false
    }
    //console.log("Checked timelapse",Date.now()-checkstart)
    //console.log("Updating timelapse",this.props,nextProps)
    return true
  }
  onSwitchWar(e){
    //console.log(e)
    document.getElementById("stats_timelapse_loader").style.display ="flex"
    this.setState({
      war:e.target.value
    })
    this.props.SwitchWar(e.target.value)
  }
  render(){
    //console.log("Timelapse props",this.props.dynamic)
      //console.log("Timelapse props",this.props)
    if(this.refs.worldmap!=undefined){
      this.refs.worldmap.leafletElement.invalidateSize()
    }
    const bounds = RegionImages.bounds
    let markerlist = []
    let resourcelist = []
    let dynamic = this.props.dynamic

    for(let i=0;i<dynamic.length;i++){
      let region = dynamic[i]

      if(region.active===false){
        continue;
      }
      for(let j=0;j<region.data.mapItems.length;j++){
        let item = region.data.mapItems[j]
        switch(item.iconType){
          case 5:  case 6:  case 7:  case 28: case 27:
          case 17:  case 34: case 36: case 29:
          //case 35:
          markerlist.push(<Icon key={"stats_map_marker_"+item.x+item.y} regionId={region.regionId} item={item} />)
          break;
          case 21: case 40: case 41: case 23: case 32: 
          resourcelist.push(<ResourceIcon key={"stats_map_marker_resource+"+item.x+item.y} regionId={region.regionId} item={item} />)
            break;
        }
      }
    }

    let datestring = new Date(this.props.time).toDateString()
    datestring = datestring.split(" ")
    let timestring = new Date(this.props.time).toLocaleTimeString()
    timestring = timestring.split(":")
    let totaldatestring = <p id="stats_timelapse_date">{datestring[1]} {datestring[2]} {datestring[3]} {timestring[0]}:{timestring[1]}</p>
    //console.log("Top towns",toptowns)
    let wars = []
    for(let i=0;i<this.props.stats.currentwar.warstats.length;i++){
      let war = this.props.stats.currentwar.warstats[i]
      wars.push(<option key={"stats_warselect_"+war.warNumber} value={war.warNumber}>War {war.warNumber}</option>)
    }
    wars.reverse()
    return <div id="stats_map_container_inner" className="col"><L.Map ref='worldmap'         
        center={[bounds[1][0]/2,bounds[1][1]/2]} 
         //zoomAnimation={false}
          //zoom={this.state.zoom}
          bounds={bounds}
          crs={NativeL.CRS.Simple}
          maxBounds={bounds}
          maxBoundsViscosity={1.0}
          minZoom={1}
          maxZoom={7}
          zoomDelta={0.5}
          zoomSnap={0.5}
          attributionControl={false}>
        <Tiles />
        {resourcelist}
         {markerlist}
            <LeafletControl.default position="topright" className="leaflet_stats_datecontrol">
              {totaldatestring}
             <button className="stats_timelapse_btn" onClick={()=>this.props.PlayTimelapse()}>{this.props.timerOn? <img className="stats_timelapse_btn_img" src="https://cdn.glitch.com/84b19724-a86b-4caa-8e69-1e9c973e043f%2Fpause.png?v=1566737620901" /> :<img className="stats_timelapse_btn_img" src="https://cdn.glitch.com/84b19724-a86b-4caa-8e69-1e9c973e043f%2Fplay.png?v=1564333525644" />}</button>
             <button className="stats_timelapse_btn"onClick={()=>this.props.StopTimelapse()}><img className="stats_timelapse_btn_img" src="https://cdn.glitch.com/84b19724-a86b-4caa-8e69-1e9c973e043f%2Fstop.png?v=1564333527433"></img></button>
              <select  id="stats_timelapse_warselect"     
          value={this.state.war}
          onChange={this.onSwitchWar}
         name="warnumber">
          {wars}
      </select>
         </LeafletControl.default>
      </L.Map>
      <div id="stats_timelapse_loader" >
        <div />
      </div>
    </div>
  }
}
//////////////////////////////////////////////////////
class Tiles extends React.Component { 
  shouldComponentUpdate(nextProps, nextState){
    return false;
  }
  render(){
    let hexarray = []
    for(let i=0;i<RegionImages.regionlist.length;i++){
      let region = RegionImages.regionlist[i]
      let fillopacity = 0;
      let o = region.center; let k = RegionImages.k; let w = RegionImages.w;
      if(region.name!=''){
        hexarray.push(<L.Polygon 
      positions={[
        [o[0],o[1]-w/2],
        [o[0]+k/2,o[1]-w/4],
        [o[0]+k/2,o[1]+w/4],
        [o[0],o[1]+w/2],
        [o[0]-k/2,o[1]+w/4],
        [o[0]-k/2,o[1]-w/4]
        ]}
    color={'black'}
    fillOpacity={fillopacity}
    opacity={0.5}
    weight={1}
    key={"regionhextimelapse"+o[0]+o[1]}
                        />)
      }
    }
    return <React.Fragment><L.TileLayer
          noWrap={true}
          continuousWorld={true} 
          bounds={[[-256,0],[0,256]]}
          maxNativeZoom={5}
          url='https://raw.githubusercontent.com/Kastow/Foxhole-Map-Tiles/master/Tiles/{z}/{z}_{x}_{y}.png'
          className="stats_map_tiles"
        />
    {hexarray}
    </React.Fragment>
  }
}
/////////////////////////////////////////////////
class Icon extends React.Component { 
  constructor(props) {
    super(props);
    //this.refIcon = React.createRef();
  }

shouldComponentUpdate(nextProps, nextState){
  if(JSON.stringify(this.props.item)==JSON.stringify(nextProps.item)){
    return false
  }
  //console.log("Updating icon")
  return true
}

GetTeamId(){
  let item = this.props.item
  switch(item.teamId){
    case "NONE":
      return "neutral";
    case "COLONIALS":
      return "colonial";
    case "WARDENS":
      return "warden"
  }
}
render(){
  //console.log("Rendering stats icon")
  let item = this.props.item
  let position = RegionImages.convert(this.props.regionId,item.x,item.y)
  let icon = markers.GenerateIcon(item)//markers.iconarray[item.iconType][this.GetTeamId()]
  if(item.iconType==29){
    icon=markers.GenerateIcon(item,'min')//markers.iconarray[item.iconType].min[this.GetTeamId()]
  }
  //this.refIcon=icon
  window.timelapseicon[item.x]=this
  //console.log("Timelapse icon",icon)
  //icon = U.copy(icon)
  
  let sideclass = "map_icon_timelapse_active_neutral"
  if(item.teamId=="COLONIALS"){
    sideclass="map_icon_timelapse_active_colonials"
  }else if(item.teamId=="WARDENS"){
    sideclass="map_icon_timelapse_active_wardens"
  }
  //if(JSON.stringify(this.state.currentItem)!=JSON.stringify(this.state.prevItem)){
    icon.options.className= "map_icon_timelapse_active "+sideclass
  /*}else{
    icon.options.className= "map_icon_timelapse_inactive "
  }*/
  //icon.options.className= "map_icon_timelapse_active"
  let addon_hq=null
      if(item.flags&0x02){
        addon_hq=<L.Marker position={position} icon={markers.GenerateHQIcon(item.teamId)/*markers.iconarray[4][this.GetTeamId()]*/}  opacity={0.6} /> 
      }
  let addon_victory = null
    if(item.flags&0x01){ //Marks victory towns
         addon_victory = markers.GetVictoryAddon(item,position)
    }
  return <React.Fragment>{addon_victory}{addon_hq}
    <L.Marker key={"stats_timelapse_icon_"+item.x+item.y} position={position} icon={icon} zIndexOffset={400} /></React.Fragment>
}
}
////////////////////////////////////////////
class ResourceIcon extends React.Component { 

  shouldComponentUpdate(nextProps, nextState){
    return false
  }
  render(){
    let item = this.props.item
    let position = RegionImages.convert(this.props.regionId,item.x,item.y)
    let color = ""
    switch(item.iconType){
      case 21:
      case 40:
        color="#680c00"
        break;
      case 41:
        color="#c16b00"
        break;
      case 23:
      case 32:
        color="#ffc924"
        break;
      default:
        color="#ffffff"
        break;
    }
    return <L.CircleMarker center={position} color={"#3c3c3c"} fillColor={color} fillOpacity={1} radius={3} className={"stats_timelapse_resource_marker"} weight={1}/>
  }
}
////////////////
class FortIcon extends React.Component { 
  constructor(props) {
    super(props);
    this.state={      ///State
      sideclass:"map_icon_timelapse_active_neutral"
    }
    //this.refIcon = React.createRef();
  }

shouldComponentUpdate(nextProps, nextState){
  if(JSON.stringify(this.props.item)==JSON.stringify(nextProps.item)){
    return false
  }
  return true
}

render(){
  let item = this.props.item
  let position = RegionImages.convert(this.props.regionId,item.x,item.y)
  //window.timelapseicon[item.x]=this
  //console.log("Timelapse icon",icon)
  //icon = U.copy(icon)
  let sideclass = "map_icon_timelapse_active_neutral"
  let color = "#ffffff"
  if(item.teamId=="COLONIALS"){
    sideclass="map_icon_timelapse_active_colonials"
    color="#516c4b"
  }else if(item.teamId=="WARDENS"){
    sideclass="map_icon_timelapse_active_wardens"
    color="#235683"
  }
    sideclass= "map_icon_timelapse_active "+sideclass
    //console.log("Rerendering fort icon",item,sideclass,color)

  return <L.CircleMarker key={"stats_timelapse_forticon"+item.teamId+item.x+item.y} center={position} fillColor={color} color={"#000000"} radius={4} className={sideclass} fillOpacity={1} weight={1}/>
}
}
//////
const mapStateToPropsTimelapse = store => {    //Importing props from store
  //console.log(store) 
  return {
    tab:store.tab
  }
}
export default connect(mapStateToPropsTimelapse)(Timelapse_)