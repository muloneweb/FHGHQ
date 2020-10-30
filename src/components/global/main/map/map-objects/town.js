import React from 'react';
import store from '../../../../../redux/store'
import {connect} from 'react-redux';
import A from '../../../../../redux/actions.js';
import { Icon } from './icon';

class Town_ extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        object : props.stockpiles[props.signature]
      }
      this.HandleSelect = this.HandleSelect.bind(this);
      }
  
   HandleSelect(e,packet){
     store.dispatch(A.selectObject("stockpiles",this.props.signature,this.props.name,"",packet.refinery,packet.factory,packet.storage))
   }
    shouldComponentUpdate(nextProps,nextState){
      if(JSON.stringify(this.props.stockpiles)!=JSON.stringify(nextProps.stockpiles)){
        if(this.props.stockpiles[this.props.signature]==undefined&&nextProps.stockpiles[this.props.signature]==undefined){
          return false
        }
        if(JSON.stringify(this.props.stockpiles[this.props.signature])===JSON.stringify(nextProps.stockpiles[this.props.signature])){
        return false
        }
        return true
      }
      if(JSON.stringify(this.props.dynamic)!=JSON.stringify(nextProps.dynamic)){
        return true
      }
      if(JSON.stringify(this.props.events)!=JSON.stringify(nextProps.events)){
        return true
      }
      return false
    }
  
   render(){
     let opacity = 1;
     if(this.props.dynamic.flags&4){
       opacity=0.7
     }
   return(
   <Icon obj={this.props.dynamic} 
     private={this.props.stockpiles[this.props.signature]} 
     events={this.props.events}
     opacity={opacity}
     regionId={this.props.regionId}
     name={this.props.name}
     type="town" 
     handler={this.HandleSelect}
     roominfo={this.props.roominfo}
     />
   )
   }
  }

  const mapStateToPropsTowns = store => {
    let events = store.events
    let privateinfo = store.private
    return {
      stockpiles: privateinfo.stockpiles,
      events:  events.events,
      roominfo: store.roominfo
    }
  }

export const Town = connect(mapStateToPropsTowns)(Town_)