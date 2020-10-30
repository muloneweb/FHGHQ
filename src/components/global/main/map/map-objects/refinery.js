import React from 'react';
import markers from '../../../../../_static/markers';
const L = require('react-leaflet');
import store from '../../../../../redux/store'
import {connect} from 'react-redux';
import A from '../../../../../redux/actions.js';
import { GetNotes, GetUpdate, GetLine, convert } from './funcs';
import facilitytypes from '../../../../../_static/facilitytypes';
const facilitylimit = facilitytypes.limit

class Refinery_ extends React.Component {
    constructor(props) {
        super(props);
    }
    shouldComponentUpdate(nextProps,nextState){
    let signature = this.props.signature
    let prevObj = this.props.refinery[signature]
    let nextObj = nextProps.refinery[signature]
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
  
  handleSelect(e,position,obj){
   store.dispatch(A.selectObject("refinery",this.props.signature))
    window.selecticonref.ChangePosition(position,this.props.regionId,obj,this.props.signature)
    window.selecticon.ChangePosition(position)
    if(this.props.maptype=="refinery"){
    document.getElementById("ref_amount_input").focus();
    }
 }
  render(){
     //console.log("Updating refinery")
    let obj = this.props.dynamic
    let position = convert(this.props.regionId,obj.x,obj.y)
    let privateobj = this.props.refinery[this.props.signature]
    let refinery = []
        for(var i =0;i<4;i++){
          let element = GetLine("refinery",i,privateobj);
          refinery.push(element);
        }
        let tooltip = null
    if(this.props.maptype!="refinery"){
    tooltip = <L.Tooltip className="tooltip" opacity={1}>
            <p><b>Refinery</b></p>
             <div className="row tooltip_row">     
               <div className="col-lg-6 tooltip_row">
                 {refinery}
               </div>
            </div>
            <br />
            {GetNotes(privateobj)} {GetUpdate(privateobj)}
          </L.Tooltip>
    }
    let addon = null;
        let opacity =1;
    if(obj.flags&0x04){
      opacity=0.5
    }
      let objicon = markers.GenerateIcon(obj)
        return <React.Fragment><L.Marker position={position} opacity={opacity} icon={objicon} onClick={(e)=>this.handleSelect(e,position,obj)} zIndexOffset={16000} >
        {tooltip}
        </L.Marker>
          {addon}
        </React.Fragment>
  }
}

const mapStateToPropsRefinery = store => {
    let privateinfo = store.private
    return {
      refinery: privateinfo.refinery,
    }
  }

export const Refinery = connect(mapStateToPropsRefinery)(Refinery_);