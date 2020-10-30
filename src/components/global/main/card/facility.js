import React from 'react';
import facilitytypes from '../../../../_static/facilitytypes';
const facilitylimit = facilitytypes.limit;
import {connect} from 'react-redux';
import U from '../../useful_functions'
import UR from '../../useful_react';
import clone from 'clone';

//////////////////////////////////////////////FACILITY COMPONENT//////////////////////////////////
class Facility_ extends React.Component{
  ProcessIncomplete(obj){
    if(obj==undefined){
    if(this.props.type=="refinery"){
      return {bmatlvl:0,rmatlvl:0,ematlvl:0,fuellvl:0,notes:"",lastupdate:'1000-01-01'}
    }else{
      return {smallarms:0,heavyarms:0,utility:0,supplies:0,medical:0,
           notes:"",lastupdate:'1000-01-01'}
    }
 
    }else{
    return obj;
    }
    
  }
  GetObject(){
          //console.log("Props",this.props)
    let obj = {}
    if(this.props.collateral==undefined){
    obj =  this.ProcessIncomplete(this.props.storeObj)
    }else{
      obj=this.ProcessIncomplete(this.props[this.props.type])
    }
    return clone(obj)
  }
  shouldComponentUpdate(nextProps, nextState){
    //console.log("Facility props",this.props.storeObj,nextProps.storeObj)
    let old = this.props.storeObj;  let newobj=nextProps.storeObj
    if(this.props.collateral!=undefined){
    
      if(this.props.selected[this.props.type]!=nextProps.selected[this.props.type]){
        return true
      }
      if(this.props[this.props.type]==undefined&&nextProps[this.props.type]==undefined){
        return false
      }
      if(JSON.stringify(this.props[this.props.type])!=JSON.stringify(nextProps[this.props.type])){
        return true
      }
    }
    if(this.props.type=="refinery"){
      let a ={bmat:old.bmatlvl,rmat:old.rmatlvl,emat:old.ematlvl,fuel:old.fuellvl}
      let b = {bmat:newobj.bmatlvl,rmat:newobj.rmatlvl,emat:newobj.ematlvl,fuel:newobj.fuellvl}
      if(JSON.stringify(a)!=JSON.stringify(b)){
        return true    
      }
    }else{
      let a ={smallarms:old.smallarms,heavyarms:old.heavyarms,utility:old.utility,supplies:old.supplies,medical:old.medical}
      let b = {smallarms:newobj.smallarms,heavyarms:newobj.heavyarms,utility:newobj.utility,supplies:newobj.supplies,medical:newobj.medical}
      if(JSON.stringify(a)!=JSON.stringify(b)){
        return true    
      }
    }
    //console.log("Type",this.props.type)
    return  false
  }
    handleChangeFacility(facility,value){
    //console.log(this.props)
    let obj = this.GetObject()
    if(value!=facilitylimit){
        if(value==""){value=0}
        if(value>facilitylimit){
          value=facilitylimit}
        try{
        if(value>0&&value.charAt(0)==0){
          value = value.slice(1)
        }}catch(err){}
      }
    obj[facility.name]=value
    if(this.props.collateral==undefined){
    UR.UpdateObject(this.props.selected.type,obj,this.props.selected.key)
    }else{
      UR.UpdateObject(this.props.type,obj,this.props.selected[this.props.type])
    }
     //store.dispatch(A.changeFacility(this.props.selected.key,facility.name,value))
  }
  
 render(){
    let obj = this.GetObject()
    let type = this.props.type
    let card = this
    if(this.props.collateral!=undefined&&this.props.selected[type]==""){
      return null
    }
    function RenderLine(facility){
      let input, fillbtn, pbar;
      if(obj[facility.name]==undefined){
        obj[facility.name]=0;
      }
      //console.log("Type:"); console.log(type)
      //console.log("Object:"); console.log(obj)
      if(obj[facility.name]==facilitylimit){
      input = <input className="towninput useronly" type="text" disabled="disabled" value="DONE" />
      fillbtn=<button type="button" className="btn cardbtn useronly" onClick={()=>card.handleChangeFacility(facility,0)}>Empty</button>
      pbar=<div className="progress-bar bg-success progress-bar-striped" style={{width: '100%'}}></div>
      }else{
      input = <input className="towninput useronly" type="number" min="0" max={facilitylimit} value={obj[facility.name]} onChange={(event)=>card.handleChangeFacility(facility,event.target.value)} />
      fillbtn=<button type="button" className="btn cardbtn useronly" onClick={()=>card.handleChangeFacility(facility,facilitylimit)}>Fill</button>
      pbar = <div className="progress-bar bg-warning progress-bar-striped" style={{width: (obj[facility.name]/facilitylimit)*100+"%"}}>{obj[facility.name]+"/"+facilitylimit}</div>
      }
      return(
      <tr style={{height:26}}>
        <td style={{width:25}}><img className="towncardimage" src={facility.src} /> </td>
        <td style={{width:60}}>{input}</td>
        <td style={{width: 50}}>{fillbtn}</td>
        <td>{pbar}</td>
      </tr>)
    }
          
    let rows = facilitytypes.array[type].map((facility) => RenderLine(facility)) 
    return(<React.Fragment>
      <div className="card-body cardheader"><table className="table"><tbody>
        {rows}
        </tbody></table></div>
      </React.Fragment>
    )
 } 
}

export const Facility = connect(U.GetStoreProps)(Facility_)