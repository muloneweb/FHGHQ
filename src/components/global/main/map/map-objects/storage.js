import React from 'react';
import markers from '../../../../../_static/markers';
const L = require('react-leaflet');
import store from '../../../../../redux/store'
import {connect} from 'react-redux';
import A from '../../../../../redux/actions.js';
import { convert} from './funcs'

class Storage_ extends React.Component {
    constructor(props) {
    super(props);
    }
    handleSelect(e,position){
   store.dispatch(A.selectObject("storage",this.props.signature))
   window.selecticon.ChangePosition(position)
 }
    render(){
        let obj = this.props.dynamic
        let position = convert(this.props.regionId,obj.x,obj.y)
        let opacity =1;
        if(obj.flags&0x04){
        opacity=0.5
        }
    return <L.Marker position={position} 
                    opacity={opacity} 
                    icon={markers.GenerateIcon(obj)} 
                    onClick={(e)=>this.handleSelect(e,position)} 
                    zIndexOffset={400} />
  }
}

const mapStateToPropsStorage = store => {
    let privateinfo = store.private
    return {
      storage: privateinfo.storage,
    }
  }

export const Storage = connect(mapStateToPropsStorage)(Storage_);