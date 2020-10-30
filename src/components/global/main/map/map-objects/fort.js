import React from 'react';
import store from '../../../../../redux/store'
import {connect} from 'react-redux';
import A from '../../../../../redux/actions.js';
import { Icon } from './icon';

class Fort_ extends React.Component {
    constructor(props) {
      super(props);
      this.HandleSelect = this.HandleSelect.bind(this);
      }
     HandleSelect(){
     store.dispatch(A.selectObject("stockpiles",this.props.signature,"Fort"))
   }
      shouldComponentUpdate(nextProps,nextState){
      if(JSON.stringify(this.props.dynamic)!=JSON.stringify(nextProps.dynamic)){
        return true
      }
        if(JSON.stringify(this.props.stockpiles[this.props.signature])!=JSON.stringify(nextProps.stockpiles[this.props.signature])){
          return true
        }
        
        return false
      }
    render(){
      console.log("Updating fort")
      let opacity = 1;
     if(this.props.dynamic.flags&4){
       opacity=0.7
     }
    return(
   <Icon obj={this.props.dynamic} 
     private={this.props.stockpiles[this.props.signature]} 
     regionId={this.props.regionId}
     opacity={opacity}
     type="fort"
     handler={this.HandleSelect}
     />
   )
    }
  }
  const mapStateToPropsForts = store => {
    let privateinfo = store.private
    return {
      stockpiles: privateinfo.stockpiles,
    }
  }

export const Fort = connect(mapStateToPropsForts)(Fort_)