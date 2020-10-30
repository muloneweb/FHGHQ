import React from 'react';
import store from '../../../../../redux/store'
import {connect} from 'react-redux';
import A from '../../../../../redux/actions.js';
import markers from '../../../../../_static/markers';
const L = require('react-leaflet');

class Fob_ extends React.Component {
    constructor(props) {
      super(props);
      this.HandleSelect = this.HandleSelect.bind(this);
      }
      shouldComponentUpdate(nextProps,nextState){
      if(JSON.stringify(this.props.private.fobs[this.props.signature])!=JSON.stringify(nextProps.private.fobs[this.props.signature])){
        return true
      }
        return false
      }
     HandleSelect(){
     store.dispatch(A.selectObject("fobs",this.props.signature))
   }
    render(){
      let fob = this.props.private.fobs[this.props.signature]
      let icon = markers.FobIcon[fob.level][fob.side]
    return(
        <L.Marker position={[fob.position.y,fob.position.x]} icon={icon} onClick={()=>this.HandleSelect()} >
        </L.Marker>
   )
    }
  }

const mapStateToProps = store => {
    return {
        private: store.private,
    }
}

export const Fob = connect(mapStateToProps)(Fob_)