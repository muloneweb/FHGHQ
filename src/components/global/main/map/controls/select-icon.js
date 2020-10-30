
import React from 'react';
const L = require('react-leaflet');
import {connect} from 'react-redux';
import markers from '../../../../../_static/markers';
import RegionImages from '../../../../../_static/region-images';

class SelectIcon_ extends React.Component {  ////Component generation
    constructor(props) {
      super(props);
      this.state={      ///State
        position:[-10000,-10000],
        addon:null
      }
      this.ChangePosition = this.ChangePosition.bind(this)
      this.SelectPrivate = this.SelectPrivate.bind(this)
    }
    ChangePosition(position,type){
      //console.log("Select type",type)
      let coords = position
      let addon = null
      if(position.y!=undefined){
        coords=[position.y,position.x]
      }
      if(type=="stockpiles"||type=="town"||type=="fort"||type=="fobs"){
        let radius = 150
        if(type=="fobs"){
          radius=80;
        }
       // console.log("Rendering radius")
        addon = <L.Circle center={coords}  dashArray="5, 5" dashOffset='0' fillColor="gray" color="#aa4a1e" fillOpacity={0.4}  radius={RegionImages.ratio*radius} />
      }
       this.setState({ position:coords,addon:addon})
    }
    
    SelectPrivate(action){
      let obj = {}
      //console.log("Select icon",action)
      if(action.townname=="misc"){
        obj = this.props.private.misc[action.objtype][action.signature]
      }else{
        obj = this.props.private[action.objtype][action.signature]
      }
      if(!obj){
        return false
      }
      this.ChangePosition(obj.position,action.objtype)
      return true
    }
    render(){
      return <React.Fragment><L.Marker position={this.state.position} icon={new markers.SelectIcon}/>
      {this.state.addon}
      </React.Fragment>    
    }
  }

const mapStateToPropsSelectIcon = store => {
    return {
        private: store.private
    }
}

export const SelectIcon = connect(mapStateToPropsSelectIcon,null,null,{forwardRef:true})(SelectIcon_)