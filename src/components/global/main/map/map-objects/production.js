import React from 'react';
import markers from '../../../../../_static/markers';
const L = require('react-leaflet');
import store from '../../../../../redux/store'
import {connect} from 'react-redux';
import A from '../../../../../redux/actions.js';
import { GetUpdate, GetNotes, GetLine } from './funcs';
import { convert } from './funcs';

class Production_ extends React.Component {
    constructor(props) {
    super(props);
    }
  shouldComponentUpdate(nextProps,nextState){
    let signature = this.props.signature
    let prevObj = this.props.production[signature]
    let nextObj = nextProps.production[signature]
    if(prevObj==undefined){
      prevObj={}
    }
    if(nextObj==undefined){
      nextObj={}
    }
      if(JSON.stringify(prevObj)!=JSON.stringify(nextObj)){
        return true
      }
        return false
    }

  handleSelect(e,position){
   store.dispatch(A.selectObject("production",this.props.signature))
   window.selecticon.ChangePosition(position)
 }
  render(){
    let obj = this.props.dynamic
    let position = convert(this.props.regionId,obj.x,obj.y)
    let privateobj = this.props.production[this.props.signature]
    let production= []
        for(var i =0;i<5;i++){
          let element = GetLine("production",i,privateobj);
          production.push(element);
        }
    let tooltip = <L.Tooltip className="tooltip" opacity={1}>
            <p><b>Factory</b></p>
             <div className="row tooltip_row">     
               <div className="col-lg-6 tooltip_row">
                 {production}
               </div>
            </div>
            <br />
            {GetNotes(privateobj)} {GetUpdate(privateobj)}
          </L.Tooltip>
        let opacity =1;
    if(obj.flags&0x04){
      opacity=0.5
    }
    let objicon = markers.GenerateIcon(obj)
        return <React.Fragment><L.Marker position={position} opacity={opacity} icon={objicon} onClick={(e)=>this.handleSelect(e,position)} zIndexOffset={400} >
        {tooltip}
        </L.Marker>
          </React.Fragment>
  }
}

const mapStateToPropsProduction = store => {
    let privateinfo = store.private
    return {
      production: privateinfo.production,
    }
  }

export const Production = connect(mapStateToPropsProduction)(Production_);