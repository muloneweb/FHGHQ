import React from 'react';
import socket from '../../../_static/socket';
import cost from '../../../_static/cost';
import store from '../../../redux/store'
import {connect} from 'react-redux';
import U from '../useful_functions'
import UR from '../useful_react';
import A from '../../../redux/actions.js';
const Popover = require('react-tiny-popover');
import clone from 'clone';
//window.popover = Popover


class RequestContainer extends React.Component {
   constructor(props) {
    super(props);
     this.SubmitItems = this.SubmitItems.bind(this)
     this.RemoveItem = this.RemoveItem.bind(this)
     this.handleAmountChange = this.handleAmountChange.bind(this)
     this.UpdateRequest = this.UpdateRequest.bind(this)
     this.GetRequest = this.GetRequest.bind(this)
   }
      shouldComponentUpdate(nextProps,nextState){
        if(this.props.selected.type!="requests"&&nextProps.selected.type!="requests"){
          return false;
        }                 
        if(JSON.stringify(this.props.requests[this.props.selected.key])!=
                             JSON.stringify(nextProps.requests[nextProps.selected.key])){
          return true;
        }
        return false;
      }
  UpdateRequest(obj){
    store.dispatch(A.updateObject("requests",obj,this.props.selected.key))
    socket.emit('updateObject',{type:"requests",object:obj,key:this.props.selected.key})
  }
  GetRequest(){
    return clone(this.props.requests[this.props.selected.key])
  }
  SubmitItems(){
    let request = this.GetRequest()
    let mywip =request.wip[FindMyProduction(request.wip)]
    if(request.done==undefined){
      request.done=[];
    }
    for(var x = 0;x<mywip.request.length;x++){
      var item = mywip.request[x];
      let obj = request.done.find(obj => obj.catid == item.catid&&obj.itemid == item.itemid);
      //console.log(JSON.parse(JSON.stringify(item)));
      if(obj===undefined){
        request.done.push(clone(item));
                       }else{
                          obj.amount=Number(obj.amount)+Number(item.amount);
                           obj.crates=Number(obj.crates)+Number(item.crates);
      }
    }
    let packet = {type:1,  date:JSON.stringify(new Date()), 
                  packet:JSON.stringify({wip:mywip,request:this.props.selected.key})}
    store.dispatch(A.submitEvent(packet))
    socket.emit('submitEvent',packet)
    mywip.request=[]
    
    function CheckCompleted(){
    if(request.done==undefined){
      return false
    }
    let donestring = JSON.stringify(request.done)
    if(donestring==""){
      return false
    }
    let done = JSON.parse(donestring)
    for(var i=0;i<3;i++){
      for(var j =0;j<request.request[i].length;j++){
        let obj = request.request[i][j]
        let item = done.find(item => obj.catid == item.catid&&obj.itemid == item.itemid);
        //console.log("Request items",obj,item)
        if(item==undefined){
          return false;
        }else{
          if(obj.crates>item.crates){
            return false;
          }else{
            item.crates = item.crates-obj.crates
          }
        }
      }
    }
    return true;
  }
    if(CheckCompleted()){
      let packet ={type:2,date:JSON.stringify(new Date()),packet:this.props.selected.key}
      store.dispatch(A.submitEvent(packet))
      socket.emit('submitEvent',packet)
    }
    this.UpdateRequest(request);
  }
  
  RemoveItem(index){
     let request = this.GetRequest()
     let mywip =FindMyProduction(request.wip)
     request.wip[mywip].request.splice(index,1);
    this.UpdateRequest(request);
  }
  
  handleAmountChange(event,index){
    let request = this.GetRequest()
    let mywip = FindMyProduction(request.wip)
    let value = event.target.value
    let validity = event.target.validity.valid
    if(validity){
      request.wip[mywip].request[index].amount = value;
      request.wip[mywip].request[index].crates = Math.ceil(value/cost.cost[request.wip[mywip].request[index].catid][request.wip[mywip].request[index].itemid].i)
    }
    this.UpdateRequest(request);
  }
  
  
  render(){
    //console.log("Rendering request card")
    if(this.props.selected.type!="requests"){
      return null
    }
    if(this.props.selected.key==""||this.props.selected.key==undefined||this.props.requests[this.props.selected.key]==undefined){
      return null
    }
    let otherProductions = [];
    let otherProductionCounter = 0;
    for(var i=0;i<this.props.requests[this.props.selected.key].wip.length;i++){
      let wip = clone(this.props.requests[this.props.selected.key].wip[i])
      let author = U.GetUsername(this.props.users.users,wip.author)
      if(author=="Anonymous"){
        let obj = this.GetRequest()
        obj.wip.splice(i,1)
        store.dispatch(A.updateObject("requests",obj,this.props.selected.key))
        socket.emit('updateObject',{type:"requests",object:obj,key:this.props.selected.key})
      }
      if(window.steamid!=wip.author&&wip.request.length>0){
        otherProductionCounter++;
        let margin = "other_production_right";
        if(otherProductionCounter%2==1){margin = "other_production_left"}
          otherProductions.push(<OtherProductionCard avatar={U.GetAvatar(this.props.users.users,wip.author)} author={author} request={wip.request} margin={margin}/>)
      }
    }
    //console.log(this.props);
    //console.log("Rendering request card")
    let renderMyProduction = false
    let myproduction = FindMyProduction(this.props.requests[this.props.selected.key].wip)
    if(myproduction!=-1){
      if(this.props.requests[this.props.selected.key].wip[myproduction].request.length>0){
        renderMyProduction=true;
      }
    }
  return(
    <React.Fragment>
    {this.props.selected.type=="requests" ? <React.Fragment>
      <div id="requestcardcontainer">
        <RequestCard ref={(card) => {window.requestcard = card }} users={this.props.users} request={this.props.requests[this.props.selected.key]} signature={this.props.selected.key} /*What needs to be done?*//>
        </div>
        <div id="prodcardcontainer">
          {renderMyProduction && <MyProductionCard ref={(card) => {window.myproductioncard = card }} request={this.props.requests[this.props.selected.key].wip[myproduction]} SubmitItems={this.SubmitItems} RemoveItem={this.RemoveItem} handleAmountChange={this.handleAmountChange}/> /*What am I doing?*/}
      </div>   
        {otherProductions/*What are other folks doing?*/}
    </React.Fragment> : null}
      </React.Fragment>
  )
  }
}

//////////////////////////////////////////////////////////////////
class RequestCard extends React.Component { //What needs to be done?
  constructor(props) {
    super(props);
    this.state={
      author:"",
      isPopoverOpen:false
    }
    this.AcceptItem = this.AcceptItem.bind(this);
    this.MergeWIPs=  this.MergeWIPs.bind(this);
  }
  
  UpdateRequest(obj){
    store.dispatch(A.updateObject("requests",obj,this.props.signature))
    socket.emit('updateObject',{type:"requests",object:obj,key:this.props.signature})
  }

  AcceptItem(obj){
    let index = FindMyProduction(this.props.request.wip)
    let packet = clone(this.props.request)
    let wip
    let defaultitem = cost.cost[obj.catid][obj.itemid]
    //console.log("index = "+index);
    if(index==-1){
      wip={author:window.steamid,request:[{amount:defaultitem.i,crates:1,catid:obj.catid,itemid:obj.itemid}]}
      packet.wip.push(wip)
    }else{
      wip = this.props.request.wip[index]
      let i = cost.findItem(this.props.request.wip[index].request,obj)
      if(i==-1){
        wip.request.push({amount:defaultitem.i,crates:1,catid:obj.catid,itemid:obj.itemid})
      }else{
        wip.request[i].crates++;
        wip.request[i].amount= Number(wip.request[i].amount)+Number(defaultitem.i)
      }
      packet.wip[index]=wip;
    }
    this.UpdateRequest(packet);
  }
  
  GetPriority(index,totalwip,done){
    let card = this
  if(this.props.request.request!=undefined){
    if(this.props.request.request[index].length==0){
      return null;
    }
  }
    function GetLine(array,y){
      let obj = array[y]
      let item = done.find(item => obj.catid == item.catid&&obj.itemid == item.itemid);
      let itemwip = totalwip.find(item => obj.catid == item.catid&&obj.itemid == item.itemid);
      let doneWidth = 0; let wipWidth = 0;
      let abbrDoneCrates = 0;  let abbrWipCrates = 0;
      let abbrDoneAmount = 0;  let abbrWipAmount = 0;
      let cratesLeft = obj.crates
      let alignclass = ""
      if(y%2==0){
        alignclass = "pb_request_row_even"
      }
      if(item!=undefined){////////SCANNING IN 'DONE' ARRAY
        abbrDoneCrates = item.crates;
        abbrDoneAmount = item.crates*cost.cost[item.catid][item.itemid].i
        if(item.crates>obj.crates){
          doneWidth=100;
          item.crates = item.crates-obj.crates
        }else{
        doneWidth=Number(item.crates)/Number(obj.crates)*100
          cratesLeft = Number(obj.crates)-Number(item.crates)
        item.crates=0;
        }}
       if(itemwip!=undefined){
        abbrWipCrates = itemwip.crates;
        abbrWipAmount = itemwip.crates*cost.cost[itemwip.catid][itemwip.itemid].i
         if(doneWidth<100){ //SCANNING IN 'WIP' ARRAY
         if(itemwip.crates>cratesLeft){
           wipWidth=100-doneWidth;
           itemwip.crates = itemwip.crates-cratesLeft
         }else{
           wipWidth=Number(itemwip.crates)/Number(obj.crates)*100
           itemwip.crates=0;
         }
       }
       }
      
      return (
      <tr className="requestrow" onClick={()=>{card.AcceptItem(obj)}}>
          
        <td className="progress pb_request_container">
           <div className={"progress-bar progress-bar-striped pb_request pb_request_done "+alignclass} style={{width:doneWidth+'%'}}></div>
           <div className={"progress-bar progress-bar-striped progress-bar-animated pb_request pb_request_wip "+alignclass} style={{width:wipWidth+'%'}}></div>
          </td>  
        <td className="reqtd" style={{width: 20}}><img className="card_req_itemimage" src={cost.cost[obj.catid][obj.itemid].src} /></td>
        <td className="reqtd">{cost.cost[obj.catid][obj.itemid].name}</td>
        <td className="reqtd" style={{width: 30}}><abbr title={"Required: "+obj.crates+'\n'+"Delivered: "+abbrDoneCrates+'\n'+"In production: "+abbrWipCrates} >{obj.crates}</abbr></td>
        <td className="reqtd" style={{width: 40}}><abbr title={"Required: "+obj.amount+'\n'+"Delivered: "+abbrDoneAmount+'\n'+"In production: "+abbrWipAmount} >{obj.amount}</abbr></td>
        </tr>)
    }
  
    let headerclass;
    let headertype;
    switch(index){
      case 0:
        headerclass= "requestmodal_priority_high"
        headertype = "High"
        break;
      case 1:
        headerclass= "requestmodal_priority_medium"
        headertype = "Medium"
        break;
      case 2:
        headerclass= "requestmodal_priority_low"
        headertype = "Low"
        break;
    }
    let lines = [];
    //console.log(this.state);
    if(this.props.request.request!=undefined){
    for(var i=0;i<this.props.request.request[index].length;i++){
     lines.push(GetLine(this.props.request.request[index],i))
    }}
    return(<React.Fragment>
      <div data-toggle="collapse" href={"#cardreq"+headertype} className={"card-header cardheader "+headerclass}>
        <table>
          <thead>
            <tr>
          <th></th>
           <th style={{width:20}}><i className="fas fa-chevron-down align-right" /></th>
           <th>{headertype+" Priority"}</th>
           <th style={{width:30}}><img className="card_req_manufacturerimage" src="https://cdn.glitch.com/6393f3fd-16a7-4641-ae3d-994f8e7cea4e%2FCrateItemIcon.png?1548192460894"/></th>
           <th style={{width:40}}>#</th>
           
            </tr>
          </thead>
        </table>
        </div>
      <div className="card-body cardheader collapse show" id={"cardreq"+headertype}>
        <table className="table"><tbody>
          {lines}
          </tbody></table></div>
    </React.Fragment>
    )
  }
  
  DeleteRequest(){   
    store.dispatch(A.deleteObject("requests",this.props.signature))
    socket.emit('deleteObject',{type:"requests",key:this.props.signature})
  }
  
  MergeWIPs(){
    let request = clone(this.props.request)
    let merge = []
    for(var i=0;i<request.wip.length;i++){
    let mywip = request.wip[i]
      for(var x = 0;x<mywip.request.length;x++){
        var item = mywip.request[x];
        let obj = merge.find(obj => obj.catid == item.catid&&obj.itemid == item.itemid);
        //console.log(JSON.parse(JSON.stringify(item)));
        if(obj===undefined){
          merge.push(clone(item));
        }else{
          obj.amount = Number(obj.amount)+Number(item.amount);
          obj.crates = Number(obj.crates)+Number(item.crates);
        }
      }
    }
    return merge
  }
  
  render(){
    //console.log(this.props.request)
    let priorities = [];
    let totalwip = this.MergeWIPs()
    let done = []
    if(this.props.request.done){
    done = clone(this.props.request.done)}
    for(var i=0;i<3;i++){
      priorities.push(this.GetPriority(i,totalwip,done))
    }
   // console.log("Total WIP");
   // console.log(totalwip)
    return(
    <React.Fragment> <div className="card">
  <div className="card-header cardheader">
  <table>
    <tbody>
      <tr><td style={{width:27}}><button className="card_req_manufacturerbtn" onClick={()=>window.requestmodalcontainer.ShowModal(this.props.signature,1)}><img className="card_req_manufacturerimage" src="https://cdn.glitch.com/6393f3fd-16a7-4641-ae3d-994f8e7cea4e%2FIconFilterUtility.png?1548935226605" /></button></td>
      <td className="card_ambush_0cell noclip" style={{minWidth:50}}>{"Request by "+U.GetUsername(this.props.users.users,this.props.request.author)}</td>
      <td style={{width:24}}>
        <Popover.default
            isOpen={this.state.isPopoverOpen}
            position={'left'} // preferred position
            onClickOutside={() => this.setState({ isPopoverOpen: false })}
            content={(
                <div id="submit_popover">
                <p>Delete request?</p>
                <button className="popover_submit_btn" onClick={()=>this.DeleteRequest()}>
              <img className="popover_submit_img" src="https://cdn.glitch.com/6393f3fd-16a7-4641-ae3d-994f8e7cea4e%2Fcheckmark.png?1546938883091" />
            </button>
            <button className="popover_submit_btn" onClick={()=>this.setState({ isPopoverOpen: false })}>
              <img className="popover_submit_img" src="https://cdn.glitch.com/6393f3fd-16a7-4641-ae3d-994f8e7cea4e%2FX%20icon%20small.png?1546753641488" />
            </button>
                </div>
          )} >
          <img className="card_ambush_removeimage" onClick={() => this.setState({ isPopoverOpen: !this.state.isPopoverOpen })} src="https://cdn.glitch.com/dd3f06b2-b7d4-4ccc-8675-05897efc4bb5%2FX.png?1557668374293" />
        </Popover.default></td>
      </tr>
    </tbody>
    </table>
  </div>
  {priorities}
  <UR.LastUpdate />
  <UR.Notes />
</div>
   </React.Fragment>);
  }
}
//////////////////////////////////////////////////////////////////////////////////////////////////
class MyProductionCard extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      isPopoverOpen:""
    }
    this.SubmitItems = this.SubmitItems.bind(this)
  }
  SubmitItems(){
    this.setState({ isPopoverOpen: false })
    this.props.SubmitItems()   
  }
  
  GetLine(index){
    let obj = this.props.request.request[index]

    return(<tr style={{height:26}}>
      <td className="card_ambush_removebutton useronly" style={{width:24}} onClick={()=>this.props.RemoveItem(index)}><img className="card_ambush_removeimage" src="https://cdn.glitch.com/dd3f06b2-b7d4-4ccc-8675-05897efc4bb5%2Ffdsgafd.png?1556797745838" /></td>
      <td><img className="card_req_itemimage" src={cost.cost[obj.catid][obj.itemid].src}/></td>
      <td>{cost.cost[obj.catid][obj.itemid].name}</td>
      <td>{obj.crates}</td>
      <td style={{width:60}}><input type="number" min={cost.cost[obj.catid][obj.itemid].i} value={obj.amount} step={cost.cost[obj.catid][obj.itemid].i} onChange={(event)=>this.props.handleAmountChange(event,index)}className="towninput"></input></td>
      </tr>)
  }
  
  render(){
    //console.log("Rendering production card");
    //console.log(this.props.request);
    if(this.props.request.length==0){return null}else{
  let show = this.props.request.request.length>0
  let prodlines = []
  for(var i=0;i<this.props.request.request.length;i++){
    prodlines.push(this.GetLine(i))
  }
      //console.log("Prodlines");
      //console.log(prodlines);
    return (<div className="card">
        <Popover.default
            isOpen={this.state.isPopoverOpen}
            position={'left'} // preferred position
            onClickOutside={() => this.setState({ isPopoverOpen: false })}
            content={(
                <div id="submit_popover">
                     <p>Submit items?</p>
                <button className="popover_submit_btn" onClick={()=>this.SubmitItems()}>
              <img className="popover_submit_img" src="https://cdn.glitch.com/6393f3fd-16a7-4641-ae3d-994f8e7cea4e%2Fcheckmark.png?1546938883091" />
            </button>
            <button className="popover_submit_btn" onClick={()=>this.setState({ isPopoverOpen: false })}>
              <img className="popover_submit_img" src="https://cdn.glitch.com/6393f3fd-16a7-4641-ae3d-994f8e7cea4e%2FX%20icon%20small.png?1546753641488" />
            </button> 
                </div>
            )} >
              <button type="button" className="btn card_req_submitmenubtn" onClick={() => this.setState({ isPopoverOpen: !this.state.isPopoverOpen })}>
                <img className="card_req_submitmenu_img" src="https://cdn.glitch.com/dd3f06b2-b7d4-4ccc-8675-05897efc4bb5%2Fgsds.jpg?1555235385083"/>
            </button>
        </Popover.default>
        <div className="card-header cardheader">
          Your production
          </div>
        <div className="card-body cardheader">
     <table className="table">
    <thead>
      <tr>
        <td></td>
        <td></td>
        <td>Item</td>
        <td style={{width:30}}><img className="card_req_manufacturerimage" src="https://cdn.glitch.com/6393f3fd-16a7-4641-ae3d-994f8e7cea4e%2FCrateItemIcon.png?1548192460894"/></td>
        <td style={{width:40}}>#</td>
      </tr>
       </thead>
       <tbody id="yourprodtbody">
         {prodlines}
       </tbody>
          </table>
          </div>
          </div>)
  }}
}
/////////////////////////////////////////////////////////////////////////////////////////////////
class OtherProductionCard extends React.Component{
    constructor(props) {
    super(props);
    this.GetLine=this.GetLine.bind(this)
  }
  GetLine(index){
    let obj = this.props.request[index]
    return <tr>
    <td><img className="card_req_itemimage" src={cost.cost[obj.catid][obj.itemid].src}/></td>
      {/*<td>{cost.cost[obj.catid][obj.itemid].name}</td>*/}
      <td>{obj.crates}</td>
      <td style={{width:60}}>{obj.amount}</td>
    </tr>
  }
  render(){
    let lines = [];
    for(var i=0;i<this.props.request.length;i++){
      lines.push(this.GetLine(i));
    }
    return(<div className={"card other_production_card "+this.props.margin}>
        <div className="card-header cardheader other_production_cardheader noclip">  
          <img className="other_production_avatar" src={this.props.avatar}/>
          <span className="other_production_headertext">{this.props.author}</span>
        </div>
        <div className="card-body cardheader">
          <table className="table">
              <thead>
              <tr>
                <td></td>
                {/*<td>Item</td>*/}
                <td style={{width:30}}><img className="card_req_manufacturerimage" src="https://cdn.glitch.com/6393f3fd-16a7-4641-ae3d-994f8e7cea4e%2FCrateItemIcon.png?1548192460894"/></td>
                <td style={{width:40}}>#</td>
              </tr>
               </thead> 
            <tbody>
              {lines}
            </tbody>
          </table>
        </div>            
      </div>)
  }
}


const mapStateToProps = store => {
  //console.log(store) 
  let privateinfo = store.private;
  return {
    requests:privateinfo.requests,
    users: store.users,
    selected: store.selected
  }
}

function FindMyProduction(wip){
    if(wip!=undefined){
      if(wip.length>0){
        for(var i=0;i<wip.length;i++){
          if(wip[i].author==window.steamid){
            return i;
          }
        }
        return -1;
      }
    }
    return -1
  }
export default connect(mapStateToProps,null,null,{forwardRef:true})(RequestContainer);


