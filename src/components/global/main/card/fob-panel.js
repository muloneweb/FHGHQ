import React from 'react';
import socket from '../../../../_static/socket';
import store from '../../../../redux/store'
import {connect} from 'react-redux';
import A from '../../../../redux/actions.js';
import UR from '../../useful_react';
import clone from 'clone';
import U from '../../useful_functions'

class FobPanel_ extends React.Component{
    constructor(props) {
    super(props);
    this.handleChangeLevel = this.handleChangeLevel.bind(this)
  }
  handleChangeSide(side){
    let obj = clone(this.props.storeObj)
    obj.side=side
    store.dispatch(A.updateObject("fobs",obj,this.props.selected.key))
    socket.emit('updateObject',{type:"fobs",object:obj,key:this.props.selected.key})
  }
  handleChangeLevel(event){
    let value = event.target.value
    let obj = clone(this.props.storeObj)
    if(value==0||value==1||value==2){
      if(obj.level!=value){
        obj.level=value;
        store.dispatch(A.updateObject("fobs",obj,this.props.selected.key))
        socket.emit('updateObject',{type:"fobs",object:obj,key:this.props.selected.key})
      }
    }
  }
render(){
let side = this.props.storeObj.side
let classes = ["fob_radio fob_radio_neutral ","fob_radio fob_radio_colonial ","fob_radio fob_radio_warden "]
for(var i=0;i<3;i++){
  if(side==i){
    classes[i]= classes[i]+"fob_radio_selected"
  }
}
return(
  <React.Fragment>
    <UR.DeletePopover header={"Delete outpost?"} type={"fobs"} signature={this.props.selected.key}/>
    <div className="fob_card_container">
    <button className={classes[0]} disabled={side==0} onClick={()=>this.handleChangeSide(0)}/>
    <button className={classes[1]} disabled={side==1} onClick={()=>this.handleChangeSide(1)}/>
    <button className={classes[2]} disabled={side==2} onClick={()=>this.handleChangeSide(2)}/>
    <select       
          value={this.props.storeObj.level}
          onChange={this.handleChangeLevel}
          className="fob_card_dropdown"
         >
         <option value={0}>Tier 1</option>
         <option value={1}>Tier 2</option>
         <option value={2}>Tier 3</option>
      </select>
    </div>

  </React.Fragment>
  )
}
}

export const FobPanel = connect(U.GetStoreProps)(FobPanel_)