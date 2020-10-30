import React from 'react';
import socket from '../../../../_static/socket';
import store from '../../../../redux/store'
import {connect} from 'react-redux';
import A from '../../../../redux/actions.js';
import UR from '../../useful_react';
import markers from '../../../../_static/markers';
import clone from 'clone';
import { Facility, FobPanel } from './index';

//////////////////////////////////////////////CARD COMPONENT///////////////////
class Card_ extends React.Component {
  constructor(props) {
    super(props);
  }
      shouldComponentUpdate(nextProps,nextState){
        function checktype(type){
          switch(type){
            case "stockpiles":
            case "fobs":
            case "refinery":
            case "production":
            case "storage":
            case "icon":
              return true;
            default:
              return false
          }
        }
        if(!checktype(this.props.selected.type)&&!checktype(nextProps.selected.type)){
          return false;
        }                 

        return true;
      }
  
 SelectRefinery(){
   var clickEvent = new MouseEvent("click", {
    "view": window,
    "bubbles": true,
    "cancelable": false
});
   let reftab = document.getElementById("refineryhref");
   reftab.click();
 }
  ToggleNotify(){
    let signature = this.props.selected.key
    let settings = clone(this.props.settings)
    if(settings.notify==undefined){
      settings.notify=[]
    }
    let index = settings.notify.indexOf(signature)
    if(index==-1){
    settings.notify.push(signature)
    }else{
      settings.notify.splice(index,1)
    }
    store.dispatch(A.changeSettings("notify",settings.notify))
     socket.emit('changeSettings',"notify",settings.notify)
  }
 render(){
  //console.log("Rendering card")
   if(this.props.selected.type!="refinery"&&this.props.selected.type!="production"&&this.props.selected.type!="storage"&&this.props.selected.type!="stockpiles"&&this.props.selected.type!="icon"&&this.props.selected.type!="fobs"){
      return null
    }
    if(this.props.selected.key==""||this.props.selected.key==undefined){
      return null
    }

    let title = 1
    let body = ""
    let appendix = null
    let checked = false
    if(this.props.settings.notify!=undefined){
      if(this.props.settings.notify.includes(this.props.selected.key)){
        checked = true;
      }
    }
    switch(this.props.selected.type){
      case "stockpiles":
        title=this.props.selected.townname
        body = <React.Fragment>
          </React.Fragment>
        if(title!="Fort"){
          body=<React.Fragment>
             <Facility type={"refinery"} collateral={true}/>
             <Facility type={"production"}  collateral={true}/>
            </React.Fragment>
        }
        if(this.props.settings.link!=undefined){
        title = <div id="card_notify_headercontainer"><span id="card_header_title">{title}</span> <div id="card_notify_container">Notify in Discord<input type="checkbox" 
          id="card_notify_checkbox" 
          checked={checked}
          onChange={()=>this.ToggleNotify()}  /></div></div>
        }
        break;
      case "fobs":
        title=<React.Fragment><span className="fob_card_text">Outpost</span></React.Fragment>
        body = <React.Fragment>
            <FobPanel />
          </React.Fragment>
        break;
      case "refinery":
        title="Refinery"
        body = <Facility type={"refinery"} />
        appendix = <button id="card_refine_btn" type="button" className="btn" onClick={this.SelectRefinery}>Refine Here</button>
        break;
      case "production":
        title="Factory"
        body = <Facility type={"production"} />
        break;
      case "storage":
        title="Storage Depot"
        body = <React.Fragment>
          </React.Fragment>
        break;
      case "icon":
        title=<React.Fragment>{markers.MiscIconArray[this.props.selected.misctype].name} <UR.DeletePopover header={"Delete icon?"} type={"misc_icon"} signature={this.props.selected.key}/></React.Fragment>
        body= null
    }
    let card = <div className="card">
      <div className="card-header cardheader">{title}</div>
      {body}
      <UR.LastUpdate />
      <UR.Notes />
    </div>      
 return(
   <React.Fragment>
     {card}
     {appendix}
   </React.Fragment>);
 } 
}

const mapStateToProps = store => {
    //console.log(store) 
    let meta = store.meta
    return {
      selected: store.selected,
      settings: meta.settings
    }
  }
export const Card = connect(mapStateToProps,null,null,{forwardRef:true})(Card_)