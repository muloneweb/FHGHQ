import React from 'react';
import socket from '../../../../_static/socket';
import {connect} from 'react-redux';
import A from "../../../../redux/actions";
import U from '../../useful_functions'
// import markers from '../../../../_static/markers';
// const RegionImages = require('../../../../_static/region-images');
const Recharts = require('recharts')
//const RC = require('rc-slider')
const AnimatedNumber = require('react-animated-number')
// const FlipMove = require('react-flip-move')
// const Timelapse = require('./Timelapse')
// const StatsGraph = require('./StatsGraph')
// const CasualtyPanel = require('./CasualtyPanel')
// const StateOfTheWar = require('./StateOfTheWar')
// const Slider = require('./Slider')
// const TopTowns = require('./TopTowns')
import WarHistory from './WarHistory';
//const Graph = require('react-vis')
import store from '../../../../redux/store'

const objimg = [
  {icontype:5,  //TOWN HALL
    c:"https://raw.githubusercontent.com/the-fellowship-of-the-warapi/Assets/master/Map%20Icons/Bases/MapIconStaticBase2Colonial.png",
    w:"https://raw.githubusercontent.com/the-fellowship-of-the-warapi/Assets/master/Map%20Icons/Bases/MapIconStaticBase2Warden.png",
    n:"https://raw.githubusercontent.com/the-fellowship-of-the-warapi/Assets/master/Map%20Icons/Bases/MapIconStaticBase2.png"}, 
  {icontype:29,  //FORT
    c:"https://raw.githubusercontent.com/the-fellowship-of-the-warapi/Assets/master/Map%20Icons/Bases/MapIconFortColonial.png",
    w:"https://raw.githubusercontent.com/the-fellowship-of-the-warapi/Assets/master/Map%20Icons/Bases/MapIconFortWarden.png",
    n:"https://raw.githubusercontent.com/the-fellowship-of-the-warapi/Assets/master/Map%20Icons/Bases/MapIconFort.png"}, 
  {icontype:28,  //OBS TOWER
    c:"https://raw.githubusercontent.com/the-fellowship-of-the-warapi/Assets/master/Map%20Icons/Bases/MapIconObservationTowerColonial.png",
    w:"https://raw.githubusercontent.com/the-fellowship-of-the-warapi/Assets/master/Map%20Icons/Bases/MapIconObservationTowerWarden.png",
    n:"https://raw.githubusercontent.com/the-fellowship-of-the-warapi/Assets/master/Map%20Icons/Bases/MapIconObservationTower.png"}, 
  {icontype:35,  //SAFEHOUSE
    c:"https://raw.githubusercontent.com/the-fellowship-of-the-warapi/Assets/master/Map%20Icons/Bases/SafehouseColonial.png",
    w:"https://raw.githubusercontent.com/the-fellowship-of-the-warapi/Assets/master/Map%20Icons/Bases/SafehouseWarden.png",
    n:"https://raw.githubusercontent.com/the-fellowship-of-the-warapi/Assets/master/Map%20Icons/Bases/Safehouse.png"}, 
  {icontype:17,  //REFINERY
    c:"https://raw.githubusercontent.com/the-fellowship-of-the-warapi/Assets/master/Map%20Icons/Production/MapIconManufacturingColonial.png",
    w:"https://raw.githubusercontent.com/the-fellowship-of-the-warapi/Assets/master/Map%20Icons/Production/MapIconManufacturingWarden.png",
    n:"https://raw.githubusercontent.com/the-fellowship-of-the-warapi/Assets/master/Map%20Icons/Production/MapIconManufacturing.png"}, 
  {icontype:34,  //FACTORY
    c:"https://raw.githubusercontent.com/the-fellowship-of-the-warapi/Assets/master/Map%20Icons/Production/MapIconFactoryColonial.png",
    w:"https://raw.githubusercontent.com/the-fellowship-of-the-warapi/Assets/master/Map%20Icons/Production/MapIconFactoryWarden.png",
    n:"https://raw.githubusercontent.com/the-fellowship-of-the-warapi/Assets/master/Map%20Icons/Production/MapIconFactory.png"}, 
  {icontype:33,  //STORAGE DEPOT
    c:"https://raw.githubusercontent.com/the-fellowship-of-the-warapi/Assets/master/Map%20Icons/Production/MapIconStorageFacilityColonial.png",
    w:"https://raw.githubusercontent.com/the-fellowship-of-the-warapi/Assets/master/Map%20Icons/Production/MapIconStorageFacilityWarden.png",
    n:"https://raw.githubusercontent.com/the-fellowship-of-the-warapi/Assets/master/Map%20Icons/Production/MapIconStorageFacility.png"}, 
  {icontype:36,  //AMMO FACTORY
    c:"https://raw.githubusercontent.com/the-fellowship-of-the-warapi/Assets/master/Map%20Icons/Production/MapIconArmoryColonial.png",
    w:"https://raw.githubusercontent.com/the-fellowship-of-the-warapi/Assets/master/Map%20Icons/Production/MapIconArmoryWarden.png",
    n:"https://raw.githubusercontent.com/the-fellowship-of-the-warapi/Assets/master/Map%20Icons/Production/MapIconArmory.png"}] 
/////////
const oldwars =[
                {num:32,winner:"COLONIALS",vp:'19',cas:263789,duration:680100000,start:'8 Jul',end:'16 Jul'},
                {num:31,winner:"WARDENS",vp:'25',cas:181171,duration:266940000,start:'5 Jul',end:'8 Jul'},
                {num:30,winner:"COLONIALS",vp:'25',cas:1052225,duration:1374960000,start:'19 Jun',end:'5 Jul'},
                {num:29,winner:"WARDENS",vp:'11',cas:214372,duration:1050300000,start:'5 Jun',end:'17 Jun'},
                {num:28,winner:"WARDENS",vp:'13',cas:401653,duration:1897800000,start:'14 May',end:'5 Jun'},
                {num:27,winner:"WARDENS",vp:'11',cas:123248,duration:458100000,start:'7 May',end:'13 May'},
                {num:26,winner:"WARDENS",vp:'11',cas:54422,duration:187800000,start:'4 May',end:'6 May'},
                {num:25,winner:"COLONIALS",vp:'11',cas:218217,duration:655500000,start:'25 Apr',end:'3 May'},
                {num:24,winner:"WARDENS",vp:'12',cas:641406,duration:1608300000,start:'4 Apr ',end:'23 Apr'},
                {num:23,winner:"COLONIALS",vp:'14',cas:696934,duration:1566600000,start:'13 Mar',end:'31 Mar'},
                {num:22,winner:"COLONIALS",vp:'10',cas:549749,duration:1608000000,start:'21 Feb',end:'12 Mar'},
                {num:21,winner:"WARDENS",vp:'31',cas:747731,duration:1823700000,start:'29 Jan',end:'19 Feb'},
                {num:20,winner:"WARDENS",vp:'32-27',cas:1618037,duration:2200500000,start:'1 Jan',end:'26 Jan'},
                {num:19,winner:"COLONIALS",vp:'32',cas:1709581,duration:1618800000,start:'12 Dec',end:'31 Dec'},
                {num:18,winner:"WARDENS",vp:'15*',cas:499006,duration:1862400000,start:'16 Nov',end:'8 Dec'},
                {num:17,winner:"WARDENS",vp:'15*',cas:333406,duration:1159500000,start:'1 Nov',end:'15 Nov'},
                {num:16,winner:"COLONIALS",vp:'15*',cas:252087,duration:1046700000,start:'12 Oct',end:'24 Oct'},
                {num:15,winner:"COLONIALS",vp:'15*',cas:401935,duration:1194600000,start:'27 Sep',end:'11 Oct'},           
                {num:14,winner:"COLONIALS",vp:'15*',cas:462234,duration:2202300000,start:'29 Aug',end:'24 Sep'},
                {num:13,winner:"WARDENS",vp:'15*',cas:553692,duration:1938900000,start:'2 Aug',end:'25 Aug'},
                {num:12,winner:"WARDENS",vp:'15*',cas:200248,duration:609300000,start:'24 Jul',end:'31 Jul'},
                {num:11,winner:"COLONIALS",vp:'15*',cas:608501,duration:1845000000,start:'29 Jun',end:'21 Jul'},
                {num:10,winner:"COLONIALS",vp:'15*',cas:229111,duration:710100000,start:'19 Jun',end:'27 Jun'},
                {num:9,winner:"WARDENS",vp:'15*',cas:62715,duration:312900000,start:'7 Jun',end:'11 Jun'},
                {num:8,winner:"WARDENS",vp:'15*',cas:335457,duration:1560000000,start:'18 May',end:'5 Jun'},
                {num:7,winner:"COLONIALS",vp:'15*',cas:163326,duration:849300000,start:'8 May',end:'18 May'},
                {num:6,winner:"WARDENS",vp:'15*',cas:141850,duration:733860000,start:'27 Apr',end:'6 May'},
                {num:5,winner:"COLONIALS",vp:'15*',cas:156202,duration:805200000,start:'15 Apr',end:'24 Apr'},
                {num:4,winner:"WARDENS",vp:'15*',cas:67979,duration:264600000,start:'11 Apr',end:'14 Apr'},
                {num:3,winner:"WARDENS",vp:'15*',cas:94299,duration:285600000,start:'5 Apr',end:'9 Apr'},
                {num:2,winner:"COLONIALS",vp:'15*',cas:193960,duration:616200000,start:'23 Mar',end:'30 Mar'},
                {num:1,winner:"WARDENS",vp:'15*',cas:151132,duration:618000000,start:'14 Mar',end:'21 Mar'} 
               //{num:,winner:"WARDENS",cas:'',duration:'',start:'',end:''},
               ]
class StatsCore extends React.Component {
   constructor(props) {
        super(props);
      this.state={      ///State
      players:0,
      warnumber:null,//props.stats.currentwar.startpoint.number,
      currentwar:null,//props.stats.currentwar,
      previous:false
    }
    this.SwitchWar=this.SwitchWar.bind(this)
   }
  SwitchWar(warnumber){
    console.log("Selecting war",warnumber)
    if(warnumber==this.state.warnumber){
      this.setState({
        currentwar:this.props.stats.currentwar,
        previous:false
      })
      document.getElementById("stats_timelapse_loader").style.display ="none"
      return
    }
    let comp = this
    var request = new XMLHttpRequest();
    request.responseType = "json"
    request.open('GET', window.location.origin+'/getwar/'+warnumber, true); 
    request.onload = function () {
      if (request.status >= 200 && request.status < 400) {
        try{
          let data= this.response
          console.log("War data",data)
          if(data.warstats!=""){
            data.warstats = JSON.parse(data.warstats)
          }
          if(data.events!=""){
            data.events = JSON.parse(data.events)
            console.log("Switching events",data.events)
          }
          if(data.reports!=""){
            data.reports = JSON.parse(data.reports)
          }
          if(data.startpoint!=""){
            data.startpoint=JSON.parse(data.startpoint)
          }
          //console.log("Setting war",data.startpoint.number,comp)
      if(data.startpoint.number==comp.state.warnumber){
        data.reports = FillReportGaps(data.reports,data.startpoint.date,Date.now(),data.startpoint)
        comp.setState({
          currentwar:data,
          //warnumber:data.startpoint.number,
          previous:false
        })
      }else{
        data.reports = FillReportGaps(data.reports,data.startpoint.date,data.warstats.conquestEndTime,data.startpoint)
        comp.setState({
          currentwar:data,
          //warnumber:data.startpoint.number,
          previous:true
        })
      }
    document.getElementById("stats_timelapse_loader").style.display ="none"
        }catch(err){}
      }
    }
    request.send()
  }
  VerifyEvent(event,mapstate,timeline,scale,startdate){
    try{
    let team = getTeamText(event.ntId)
    for(let i=0;i<mapstate[event.rId].length;i++){
     //console.log(mapstate[event.rId]) 
      let item = mapstate[event.rId][i]
      if(event.x==item.x&&event.y==item.y){
        //console.log(event,item)
        if(event.niT==item.iconType&&team==item.teamId&&event.nf==item.flags){
          //console.log("False event",event,item)
          return false
        }
        let timeindex = Math.ceil((event.d-startdate)/scale)
        if((event.niT==5||event.niT==6||event.niT==7)&&event.f&0x01){
        if(team!=item.teamId){
          if(team=="NONE"){
            timeline.wincondition[timeindex][getTeamId(item)-1][item.iconType-5]--;
            //console.log("Win condition lose",U.copy(item),event)
            if(item.flags&0x20){
            //  console.log("Win condition lose victory",U.copy(item),event)
              timeline.wincondition[timeindex][getTeamId(item)-1][3]--;
            }
          }else{
            if(item.teamId!="NONE"){
             // console.log("Win condition capture from someone",U.copy(item),event)
              timeline.wincondition[timeindex][getTeamId(item)-1][item.iconType-5]--;
            }
            //console.log("Win condition capture",U.copy(item),event)
            timeline.wincondition[timeindex][event.ntId-1][event.niT-5]++;
          }
        }else if(event.niT!=item.iconType&&item.teamId!="NONE"){
          //console.log("Win condition upgrade",U.copy(item),event)
          timeline.wincondition[timeindex][getTeamId(item)-1][item.iconType-5]--;
          timeline.wincondition[timeindex][getTeamId(item)-1][event.niT-5]++;
        }else if(event.nf!=item.flags&&event.nf&0x20){
          //console.log("Win condition upgrade to victory",U.copy(item),event)
          timeline.wincondition[timeindex][getTeamId(item)-1][3]++;
        }
        }
        if(event.niT==5||event.niT==6||event.niT==7){
          if(team!=item.teamId&&team!="NONE"){
            if(timeline.spec.toptowns[timeindex][event.rId+event.x+event.y]==undefined){
              timeline.spec.toptowns[timeindex][event.rId+event.x+event.y]={rId:event.rId,x:event.x,y:event.y,amount:0,side:event.ntId}
            }
            timeline.spec.toptowns[timeindex][event.rId+event.x+event.y].amount++
            timeline.spec.toptowns[timeindex][event.rId+event.x+event.y].side=event.ntId
          }
        }
        item.teamId=team;
        item.flags=event.nf;
        item.iconType=event.niT;
        return true
      }
    }
    }catch(err){
      //console.log(event.rId,mapstate[event.rId],err)
    }
  }
    
  static getDerivedStateFromProps(props, state){
    if(props.stats.warstats==undefined&&props.tab.tab==5){
      return {}
    }
    if(props.stats.warstats!=undefined&&props.tab.tab==5&&state.currentwar==null){
      let currentwar = U.copy(props.stats.currentwar)
      if(currentwar.startpoint!=undefined){
      if(currentwar.startpoint.date!=null){
      currentwar.reports = FillReportGaps(currentwar.reports,currentwar.startpoint.date,Date.now(),currentwar.startpoint)
      }
        return {warnumber:currentwar.startpoint.number,
              currentwar:currentwar}
      }else{
        return {currentwar:currentwar}
      }
    }
    return {}
  }
  
  shouldComponentUpdate(nextProps, nextState){
      if(nextProps.tab.tab!=5){
      return false
    }
    if(nextProps.stats.warstats==undefined&&nextProps.tab.tab==5){
      //console.log("Loading stats...")
      var request = new XMLHttpRequest();
      request.responseType = "json"
      request.open('GET', window.location.origin+'/getcurrentwar', true); 
      request.onload = function () {
      if (request.status >= 200 && request.status < 400) {
        try{
          //let data= this.response
          store.dispatch(A.setStats(this.response))
          //console.log("Setting war",data.startpoint.number,comp)
          }catch(err){}
        }
      }
      request.send()
    }
    return true
  }
  render(){
    //console.log("Rendering stats core")
     if(this.props.stats.warstats==undefined){
      return <div id="stats_placeholder" >
      <div />
      </div>
      
    }
    /*console.log("Stats core state",this.state,this.props)
    let startpoint = {}
    try{
    startpoint = {original:JSON.parse(JSON.stringify(this.state.currentwar.startpoint))}
    }catch(err){
      return null
    }
    startpoint.dynamic=JSON.parse(startpoint.original.dynamic)
    startpoint.static = JSON.parse(startpoint.original.static)
    //console.log("Start point",startpoint.dynamic)
    let timeline ={total:[[0,0,0]],spec:{events:[[[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0]]],
                                         sum:[[[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0]]],
                                        delta:[[[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0]]],
                                        caplost:[[0,0]],//[i][0][0] - cap c, [i][0][1] - cap w, [i][1][0] - lose c, [i][1][1 - lose w]
                                        caplosteach:[[[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0]]],
                                        toptowns:[{}]},
                  cas:[],totalgraph:[],
                  wincondition:[[[0,0,0,0],[0,0,0,0]]]} 
    //let timeline = [[0,0,0]]//TIMELINE FOR STRUCTURES, 0 - NONE, 1 - COLONIAL, 2 - WARDEN
    //let spectimeline = [[[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0]]]
    let stats = JSON.parse(JSON.stringify(this.props.stats))
    let dynamic = JSON.parse(JSON.stringify(this.props.dynamic))
    let scale = 300000
    let timecounter = Number(startpoint.original.date)
    let timelimit = new Date().getTime()
    stats.currentwar.reports = this.state.currentwar.reports
    if(this.state.previous){
      timelimit = this.state.currentwar.warstats.conquestEndTime
      stats.currentwar.events = this.state.currentwar.events
    }
    //console.log(timecounter,timelimit)
    while(timecounter<timelimit){
      timeline.total.push([0,0,0])
      timeline.spec.events.push([[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0]])
      timeline.spec.sum.push([[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0]])
      timeline.spec.delta.push([[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0]])
      timeline.spec.caplost.push([0,0])
      timeline.spec.caplosteach.push([[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0]])
      timeline.spec.toptowns.push({})
      timeline.wincondition.push([[0,0,0,0],[0,0,0,0]])
      timecounter=timecounter+scale;
    }
   
    let mapstate= {}
    for(let i in startpoint.dynamic){
      if(window.statsignore.includes(startpoint.dynamic[i].regionId)){
        continue;
      }
      try{
      startpoint.dynamic[i].data=JSON.parse(startpoint.dynamic[i].data)
      }catch(err){}
      mapstate[startpoint.dynamic[i].regionId]=U.copy(startpoint.dynamic[i].data.mapItems)
      for(let x in startpoint.dynamic[i].data.mapItems){
        let item = startpoint.dynamic[i].data.mapItems[x]
        switch(item.iconType){
          case 5:  case 6:  case 7:  
            if(item.flags&0x01&&item.teamId!="NONE"){
              timeline.wincondition[0][getTeamId(item)-1][item.iconType-5]++
            }
          case 29:  case 28: case 27:
          case 35:case 17:  case 34: case 33:  case 36:
            timeline.total[0][getTeamId(item)]++
            timeline.spec.sum[0][getTeamId(item)][GetCounter(item.iconType)]++;
            timeline.spec.events[0][getTeamId(item)][GetCounter(item.iconType)]++;
            //timeline.spec.delta[0][getTeamId(item)][GetCounter(item.iconType)]++
        }
      }
    }
    for(let i in startpoint.static){
      if(window.statsignore.includes(startpoint.static[i].regionId)){
        continue;
      }
        startpoint.static[i].data=JSON.parse(startpoint.static[i].data)
    }
    /////////////CASUALTY GRAPH///////////////////////////////////////////////
    //console.log("Maps",maplist)
    let prevtotalcas = undefined
    for(let i =0;i<this.state.currentwar.reports.length;i++){
      let report = this.state.currentwar.reports[i]
      let wr = report.wr
      let totalcas = {c:0,w:0}
      let newcas = {c:0,w:0}
      for(let region in wr){
        try{
        totalcas.c +=wr[region].c
        totalcas.w +=wr[region].w
        }catch(err){
          //console.log(wr,region,err)
        }
      }
      timeline.cas.push({x:i,y:totalcas.c-totalcas.w})
    }
    let safehousecount =0;
    ////////////STRUCTURE COUNT SECTION
    let scount={captured:{c:0,w:0},each:{}}
    for(let i=0;i<objimg.length;i++){
      scount.each[objimg[i].icontype]={c:0,w:0}
    }
    for(let i=0;i<this.state.currentwar.events.length;i++){
      if(window.statsignore.includes(this.state.currentwar.events[i].rId)){
        continue;
      }
      let recorded = false
      function recordEvent(obj){
        //console.log(obj.iT,action)
        let event = JSON.parse(JSON.stringify(obj))
        if(event.iT==35){
          //console.log("Safehouse event",action,event)
          safehousecount++;
        }
        let teamprop = "c"
        if(event.tId==2){
          teamprop = "w"
        }
        if(event.iT==6||event.iT==7){
          event.iT=5;
        }
        try{
        scount.each[event.iT][teamprop]++;
        }catch(err){}
      }
      let event = JSON.parse(JSON.stringify(this.state.currentwar.events[i]))
      if(!this.VerifyEvent(event,mapstate,timeline,scale,startpoint.original.date)){
        continue;
      }
      let timeindex = Math.floor((event.d-startpoint.original.date)/scale)+1
      let counter = GetCounter(event.iT)
      //console.log(new Date(event.d),timeindex,event)
      let building=[false,false]
      if(event.f&0x04){
        building[0]=true;
      }
      if(event.nf&0x04){
        building[1]=true
      }
      if((event.ntId==0&&event.tId!=0&&((!building[0])||event.niT==6||event.niT==7))||
         (event.ntId!=0&&event.tId==event.ntId&&!building[0]&&building[1]&&event.niT!=6&&event.niT!=7)){
        recorded=true
        //console.log("Lose event")
        timeline.total[timeindex][0]++
        timeline.spec.events[timeindex][0][counter]++
        if(event.tId==1){
          timeline.total[timeindex][1]--
          timeline.spec.events[timeindex][1][counter]--
        }else if(event.tId==2){
          timeline.total[timeindex][2]--
          timeline.spec.events[timeindex][2][counter]--
        }else{
          console.log("error event lose",event)
        }
      }
      if(event.niT!=6&&event.niT!=7&&event.ntId!=0&&(!building[1])&&((building[0])||((!building[0])&&event.tId==0))){
        recorded=true
        timeline.total[timeindex][0]--
        timeline.spec.events[timeindex][0][counter]--
        if(event.ntId==1){
          scount.captured.c++;
          timeline.total[timeindex][1]++
          timeline.spec.events[timeindex][1][counter]++
          timeline.spec.caplost[timeindex][0]++
          timeline.spec.caplosteach[timeindex][0][counter]++
        }else if(event.ntId==2){
          scount.captured.w++;
          timeline.total[timeindex][2]++
          timeline.spec.events[timeindex][2][counter]++
          timeline.spec.caplost[timeindex][1]++
          timeline.spec.caplosteach[timeindex][1][counter]++
        }else{
          console.log("error event win",event)
        }
        //console.log(event,"win")
        recordEvent(event)
      }
      if(!recorded&&!(event.f&0x04&&event.tId!=0&&event.ntId==0)){
  
        //console.log("Not recorded",event)
      }
    }
    for(let i=1;i<timeline.total.length;i++){
      for(let town in timeline.spec.toptowns[i-1]){
        if(timeline.spec.toptowns[i][town]!=undefined){
          timeline.spec.toptowns[i][town].amount+=timeline.spec.toptowns[i-1][town].amount
        }else{
          timeline.spec.toptowns[i][town]=U.copy(timeline.spec.toptowns[i-1][town])
        }
        
      }
      //for(let j=0;j<2;j++){
        for(let k=0;k<2;k++){
          timeline.spec.caplost[i][k]+=timeline.spec.caplost[i-1][k]
          for(let n=0;n<8;n++){
            timeline.spec.caplosteach[i][k][n]+=timeline.spec.caplosteach[i-1][k][n]
          }
          for(let j=0;j<4;j++){
          timeline.wincondition[i][k][j]+=timeline.wincondition[i-1][k][j]
          }
        }
      
        
      //}
      for(let j=0;j<3;j++){
        timeline.total[i][j]+=timeline.total[i-1][j]
        for(let k=0;k<8;k++){
          timeline.spec.sum[i][j][k]=timeline.spec.sum[i-1][j][k]+timeline.spec.events[i][j][k]
          timeline.spec.delta[i][j][k]=timeline.spec.delta[i-1][j][k]+timeline.spec.events[i][j][k]
         
        }
      }
      let snap = timeline.total[i]
      timeline.totalgraph.push({x:i,n:snap[0],c:snap[1],w:snap[2]})
      
    }
        //console.log("Timeline",timeline)
    //console.log(timeline)
    //console.log("Safehouse count",safehousecount)

    //STRUCTURE COUNT SECTION ENDS
    ///CONDITION SECTION
    //let cas={c:0,w:0,total:0,ch:0,wh:0,json:{},jsonold:{},list:[],hourlist:[]}
    let condition = [[0,0,0,0],[0,0,0,0]]
    let state = [[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0]] //0 NEUTRAL, 1 COLONIAL, 2 WARDEN       //0 TOWN HALLS, 1 FORTS, 2 OBS TOWERS, 3 SAFEHOUSES, 4 REFINERIES, 5 FACTORIES, 6 STORAGES, 7 ARMORIES
    let totalvictory = 0;
    let nuked = 0;
    let counters=[0,0,0] // 0 - COLONIAL, 1 - WARDEN, 2 - TOTAL
    ///////////////////////////////////ANALYZE CURRENT WAR STATE//////////////////////////////////
    for(var i =0;i<this.props.dynamic.length;i++){
      let region = this.props.dynamic[i]
      if(!region.active){
        continue;
      }
      for(var j =0;j<region.data.mapItems.length;j++){
        let obj = region.data.mapItems[j];
        let team = getTeamId(obj)
        let stateid = 1000;
        switch(obj.iconType){
          case 5:
          case 6:
          case 7:
            stateid=0;  break;
          case 29:
          case 27:
            stateid=1;  break;
          case 28:
            stateid=2;  break;
          case 35:
            stateid=3;  break;
          case 17:
            stateid=4;  break;
          case 34:
            stateid=5;  break;
          case 33:
            stateid=6;  break;
          case 36:
            stateid=7;  break;
        }
        if(stateid!=1000){
          if(obj.flags&0x04&&obj.iconType==5){}else{
          state[team][stateid]++;
          }
        }
        switch(obj.iconType){
          case 5: case 6: case 7: case 29: case 28: case 27:
          case 35: case 17: case 34: case 33: case 36:
            counters[2]++;
            if(obj.teamId=="NONE"||obj.flags&0x04){
            }else if(obj.teamId=="COLONIALS"){
              counters[0]++
            }else{
              counters[1]++
            }
          break;
          default:
        }
        if(obj.flags&0x01){
          totalvictory++;
          if(obj.flags&0x10){
            nuked++;
          }else{
            if(obj.teamId!="NONE"){
              let team =0;
              if(obj.teamId=="WARDENS"){
                team =1;
              }
              if(obj.flags&0x20){
                 condition[team][3]++;
              }
              switch(obj.iconType){
                case 5:
                  condition[team][0]++;  break;
                case 6:
                  condition[team][1]++;  break;
                case 7:
                  condition[team][2]++;  break;
              }
            }
          }
        }
      }
    }*/
    //////////////////////////////////////RENDERING
    return <StatsGraphic stats={this.props.stats} /*dynamic={dynamic} SwitchWar={this.SwitchWar} condition={condition} timeline={timeline} counters={counters} state={state} startpoint={startpoint} scount={scount} scale={scale} previous={this.state.previous} 
            currentwar={this.state.currentwar}*//>
  }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class StatsGraphic extends React.Component {
    constructor(props) {
    super(props);
    this.state={      ///State
      time:Date.now(),
      zoom:0,
      timelapseOn:false,
      timerOn: false,
      //timerStart: props.startpoint.original.date,
      eventIndex:0,
      //dynamic:props.dynamic,
      //timeline:props.timeline,
      scale:300000, //time jump per tick in ms (60000 = 1 minute)
      updateRate:120,
      //warnumber:props.startpoint.original.number,
      //structurecount:{count:props.scount,tr:props.structurecounttr}
    }
    this.ApplyEvent = this.ApplyEvent.bind(this)
    this.PlayTimelapse = this.PlayTimelapse.bind(this)
    this.StopTimelapse=this.StopTimelapse.bind(this)
    this.onChangeSlider=this.onChangeSlider.bind(this)
    }
    /*static getDerivedStateFromProps(props, state){
      //console.log("Deriving slider",props.startpoint.original.number,state.warnumber)
      
      if(props.startpoint.original.number==state.warnumber){
        return {}
      }else{
      let obj = {time:props.startpoint.original.date,timerStart:props.startpoint.original.date,timelapseOn:true,
                 dynamic:props.dynamic,timeline:props.timeline,warnumber:props.startpoint.original.number,
                 structurecount:{count:props.scount,tr:props.structurecounttr}}
      if(props.previous){
        obj.dynamic =props.startpoint.dynamic
      }else{
        obj.time=Date.now()
        obj.timelapseOn=false
        obj.timerOn=false
      }
        return obj
      }
    }*/
  ApplyEvent(olddynamic,event,eventIndex){   
    //console.log("Applying event")
    let dynamic = JSON.parse(JSON.stringify(olddynamic))
    /*if(window.statsignore.includes(event.rId)){
        return dynamic;
    }*/
    for(let i=0;i<dynamic.length;i++){
      let region = dynamic[i]
      if(region.regionId==event.rId){
        for(let j=0;j<region.data.mapItems.length;j++){
          let item =region.data.mapItems[j]
          if(item.x==event.x&&item.y==event.y){
            item.iconType=event.niT;
            item.flags = event.nf
            switch(event.ntId){
              case 0:
                item.teamId="NONE";
                break;
              case 1:
                item.teamId="COLONIALS"
                break;
              case 2:
                item.teamId="WARDENS"
                break;
            }
            //console.log("Applying event",olddynamic,dynamic,event,eventIndex)
            return dynamic;
            break;
          }
        }
        break;
      }
    }
    console.log("No match",event,eventIndex)
    return dynamic
  }
    PlayTimelapse(){
    if(this.state.timerOn){
      clearInterval(this.timer);
      this.setState({timerOn:false})
    }else{
    if(this.state.timelapseOn){
      this.setState({timerOn:true})
    }else{
    this.setState({
      time:this.state.timerStart,
      eventIndex:0,
      dynamic:U.copy(this.props.startpoint.dynamic),
      timelapseOn:true,
      timerOn:true})
    }
      this.timer = setInterval(() => {
        if(this.state.time>Date.now()/*||this.props.previous&&this.state.time>this.props.EndTime*/){
          //console.log(this.state.dynamic)
          clearInterval(this.timer);
        }else{
        let events = this.props.currentwar.events//this.props.stats.currentwar.events
        let eventIndex = this.state.eventIndex
        let dynamic = this.state.dynamic
        //let eventcounter = 0
        try{
          //console.log("time",this.state.time,"events",events[eventIndex])
          //console.log("Applying event 1",new Date(this.state.time), new Date(events[eventIndex].d))
        while(events[eventIndex].d<this.state.time){
          //console.log(eventIndex)
          //console.log("Applying event 2")
          dynamic = this.ApplyEvent(dynamic,events[eventIndex],eventIndex)
          eventIndex++
          //eventcounter++
        }
        }catch(err){}
        let newtime = this.state.time+this.state.scale
        if(this.props.previous&&newtime>this.props.currentwar.warstats.conquestEndTime||newtime>Date.now()){
          this.StopTimelapse()
        }
          //console.log("eventcounter",eventcounter)
        this.setState({
          time: newtime,
          eventIndex:eventIndex,
          dynamic:dynamic
        });}
      }, this.state.updateRate);
    }
  }
  StopTimelapse(){
    clearInterval(this.timer);
    let e = {timerOn:false}
    if(this.props.previous){
      e.time=this.props.startpoint.original.date
      e.dynamic=this.props.startpoint.dynamic
    }else{
      e.timelapseOn=false;
      e.time=Date.now()
      e.dynamic=this.props.dynamic
    }
    this.setState(e)
  }
  onChangeSlider(e){
    let eventindex = 0;
     let dynamic= U.copy(this.props.startpoint.dynamic)
     //console.log("Changing time",e,dynamic,this.props.currentwar.events)
      for(let i=0;i<this.props.currentwar.events.length;i++){
        let event = this.props.currentwar.events[i]
        if(event.d>e){
          //console.log("Timelapse event index",i)
          eventindex=i
          break
        }else{
          //console.log("Prev dynamic",dynamic)
          try{
          dynamic=this.ApplyEvent(dynamic,event,i)
          }catch(err){
            console.log(err)
            console.log(dynamic,event,i,this.props.time)
            break;
          }
        }
  }
     this.setState({timelapseOn:true,time:e,dynamic:dynamic,eventIndex:eventindex})
  }
  render(){
    //console.log("Stats state",this.state)
    //console.log("Stats graphic props",this.props,this.state.dynamic)
   /* let condition = this.props.condition
    let counters = this.props.counters
    let state=this.props.state
    let startpoint = this.props.startpoint
    let timeline = this.props.timeline
    let timelineindex = Math.ceil((this.state.time-this.state.timerStart)/this.props.scale)
    if(this.props.previous&&this.state.time==this.state.timerStart){
      timelineindex = timeline.total.length-1
    }
    let timelinesnap = {}
    //if(this.state.timerOn||this.state.sliderOn){
      timelinesnap = {total:timeline.total[timelineindex],spec:{
      sum:timeline.spec.sum[timelineindex],
      delta:timeline.spec.delta[timelineindex],
      caplost:timeline.spec.caplost[timelineindex],
      caplosteach:timeline.spec.caplosteach[timelineindex],
      toptowns:timeline.spec.toptowns[timelineindex]},
      wincondition:timeline.wincondition[timelineindex]}
    //}
    let diverge = this.state.timerOn||this.state.sliderOn*/
    return <React.Fragment>
    <p>Statistics {/*<span id="statsp">Press F11 for Fullscreen</span>*/}</p> 
    {/*
       <div  className="row">  
      <div id="stats_cas_col" className="col">
        <PlayersGraph stats={this.props.stats} timerOn={this.state.timelapseOn} time={this.state.time} timerStart={this.state.timerStart} previous={this.props.previous}/>
        <WarStats stats={this.props.stats} />
        <CasualtyPanel  stats={this.props.stats} time={this.state.time} timerStart={this.state.timerStart} sliderOn={this.state.timelapseOn} previous={this.props.previous} number={this.props.currentwar.startpoint.number}/>
      </div>
      <div className="col">
          <div id="stats_wincondition_row" className="row">
            <div id="stats_victory_col" className="col">
              <StatsGraph timeline={this.state.timeline.totalgraph} time={this.state.time} timerStart={this.state.timerStart} scale={this.props.scale}  stats={this.props.stats} timelinecas={this.state.timeline.cas} previous={this.props.previous} timerOn={this.state.timelapseOn} />
            </div>
            <div id="stats_stateofthewar_col" className="col">
              <div  className="stats_div">
              <WinCondition condition={condition} limit={this.props.stats.warstats.requiredVictoryTowns} timerOn={this.state.timelapseOn} timeline={timeline} timelinesnap={timelinesnap} stats={this.props.stats}/>  
              <StateOfTheWar stats={this.props.stats} state={state} counters={counters} timerOn={this.state.timelapseOn} time={this.state.time} timelinesnap={timelinesnap}  timeline={timeline}/>
              </div>
            </div>
          </div>
        <div>
          <div id="stats_map_container">
          <Slider timerStart={this.state.timerStart} time={this.state.time} onChangeSlider={this.onChangeSlider} previous={this.props.previous} EndTime={this.props.currentwar.warstats.conquestEndTime}/> 
          <div className="row">
        <Timelapse dynamic={this.state.dynamic} PlayTimelapse={this.PlayTimelapse} StopTimelapse={this.StopTimelapse} timerOn={this.state.timerOn} time={this.state.time}  timerStart={this.state.timerStart} timelapseOn={this.state.timelapseOn}  ApplyEvent={this.ApplyEvent} startpoint={startpoint} stats={this.props.stats}  SwitchWar={this.props.SwitchWar}/>
               <StructureCount scount={this.state.structurecount.count} timerOn={this.state.timelapseOn}  timelinesnap={timelinesnap}/>
            </div>
          </div>*/}
       <WinCount warhistory={this.props.stats.currentwar.warstats}/>
        <WarHistory warhistory={this.props.stats.currentwar.warstats} oldwars={oldwars}/> 
      {/*</div>
      </div>
      <div id="stats_scount_col" className="col">
        <WinCount warhistory={this.props.stats.currentwar.warstats}/>
        <TopTowns timelinesnap={timelinesnap} startpoint={startpoint}/>
         </div>
      </div> */}
    </React.Fragment>
  }
}
/////////////////////////////////////////////////
class PlayersGraph extends React.Component {
     constructor(props) {
    super(props);
      this.state={      ///State
      dayscale:3,
      oneday:144
    }
   }
    shouldComponentUpdate(nextProps, nextState){
      if(JSON.stringify(this.props.stats.currentwar.reports.length)!=JSON.stringify(nextProps.stats.currentwar.reports.length)||
   this.props.timerOn!=nextProps.timerOn||
    nextProps.timerOn&&(JSON.stringify(nextProps.time)!=JSON.stringify(this.props.time))){
        return true
      }
      return false
    }
  render(){
    //console.log("Players graph stats",this.props)
  const PlayerTooltip = ({ active, payload, label }) => {
  if (active&&payload!=null) {
    let time = this.props.timerStart+Number(label)*600000
    return (
      <div id="stats_tooltip_playersgraph">
        <p className="label">{U.GetShortDate(time)}<br /> {payload[0].value} players</p>
        {/*<p className="intro">{getIntroOfPage(label)}</p>*/}
      </div>
    );
  }

  return null;
  };
    let datapoints =[]
    let timeindex = this.props.stats.currentwar.reports.length-1
    let totalplayers = this.props.stats.totalplayers 
    if(this.props.previous&&this.props.time==this.props.timerStart){
      for(let i=0;i<this.props.stats.currentwar.reports.length;i++){
        try{
         datapoints.push({x:i,y:this.props.stats.currentwar.reports[i].pop}) 
        }catch(err){}
      }
    }else{
    if(this.props.timerOn){
      timeindex = Math.ceil((this.props.time-this.props.timerStart)/600000)
      try{
        totalplayers = this.props.stats.currentwar.reports[timeindex].pop
      }catch(err){}
    }
  let startindex = timeindex>(this.state.dayscale*this.state.oneday)? (timeindex-this.state.dayscale*this.state.oneday):0
      for(let i = startindex;i<timeindex;i++){
        try{datapoints.push({x:i,y:this.props.stats.currentwar.reports[i].pop})}catch(err){console.log("Pop error",i)}
      }
    }
    //console.log("Player graph datapoints",datapoints,this.props.previous,this.props.timerOn)
   return <div  className="stats_div">
        <p className="stats_div_header">Players Online: <AnimatedNumber value={totalplayers} duration={600} stepPrecision={0}/></p> 
     <Recharts.LineChart
        width={280}
        height={50}
        data={datapoints}
        margin={{
          top: 0, right: 0, left: 0, bottom: 0,
        }}
      >
        <Recharts.XAxis dataKey="x"  hide={true}/>
        <Recharts.YAxis hide={true}/>
        <Recharts.Tooltip content={<PlayerTooltip />} />
        <Recharts.Line dot={false} type="monotone" dataKey="y" stroke="#d6d6d6" />
      </Recharts.LineChart>
     {/*
      <Graph.XYPlot width={280} height={50} margin={{left:0, right:0, top:0, bottom:0}} >
      <Graph.LineSeries data={datapoints} color="#d6d6d6"/>
    </Graph.XYPlot>*/}
        </div>
  }
}
//////////////////////////////////////////////////////
class StructureCount extends React.Component {
  constructor(props) {
    super(props);
  }
  shouldComponentUpdate(nextProps, nextState){
    let checkstart = Date.now()
  try{ if(JSON.stringify(nextProps.scount)!=JSON.stringify(this.props.scount)||this.props.timerOn!=nextProps.timerOn||
    nextProps.timerOn&&(JSON.stringify(nextProps.timelinesnap)!=JSON.stringify(this.props.timelinesnap))){
    //console.log("Checked structure count",Date.now()-checkstart)
      return true
    }}catch(err){}
      return false
  }
render(){
  //console.log("Structure count props",this.props)
  let scount = this.props.scount;
  if(this.props.timerOn){
    try{
    let s = this.props.timelinesnap.spec //[i][0][0] - cap c, [i][0][1] - cap w, [i][1][0] - lose c, [i][1][1] - lose w]
    //console.log(s)
    scount={captured:{c:s.caplost[0],w:s.caplost[1]},each:{}}
    for(let i=0;i<objimg.length;i++){
      scount.each[objimg[i].icontype]={c:s.caplosteach[0][i],w:s.caplosteach[1][i]}
    }}catch(err){}
  }
  let structurecounttr=[[],[]]
  for(let i =0;i<objimg.length;i++){
    let item = objimg[i]
    function GetCell(src,amount){
      return <td><img className="stats_scount_img" src={src} /><span className="stats_scount_span"><AnimatedNumber value={amount} duration={600} stepPrecision={0}/></span></td>
    }
    structurecounttr.push(<tr className="stats_scount_tr">{GetCell(item.c,scount.each[item.icontype].c)}{GetCell(item.w,scount.each[item.icontype].w)}</tr>)
  }
  return <div id="stats_table_scount" className="col stats_div">
        <p className="stats_div_header">Captured Structures</p>
            <table>
              <tbody>
                <tr >
                <td className="collie_text"><AnimatedNumber value={scount.captured.c} duration={600} stepPrecision={0}/></td>
                <td className="warden_text"><AnimatedNumber value={scount.captured.w} duration={600} stepPrecision={0}/></td>
                </tr>
                <tr id="stats_scount_separator"><td></td><td></td></tr>
                {structurecounttr}
              </tbody></table>
        </div>;
}
}
//////////////////////////////////////////////////////
class WarStats extends React.Component { //Conquest X, Day Y Underway since
   constructor(props) {
    super(props);
      this.state={      ///State
      time:0
    }
   }
  shouldComponentUpdate(nextProps, nextState){
    //let checkstart = Date.now()
    if(this.state.time!=nextState.time){
      return true
    }
    if(this.props.stats.warstats.warNumber!=nextProps.stats.warstats.warNumber||
       this.props.stats.warstats.conquestEndTime!=nextProps.stats.warstats.conquestEndTime){
      return true
    }
    /*
    if(JSON.stringify(this.props.stats)!=JSON.stringify(nextProps.stats)){
     console.log("Checked war stats",Date.now()-checkstart)
       return true
    }*/
    //console.log("Checked war stats",Date.now()-checkstart)
    return false
  }
  componentDidMount() {
  this.interval = setInterval(() => this.setState({ time: Date.now() }), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  SplitTime(time){
    var diffDays = Math.floor(time / 86400000)
    var diffHrs = Math.floor((time % 86400000) / 3600000); // hours
    if(diffHrs<10){diffHrs = "0"+diffHrs}
    var diffMins = Math.floor(((time % 86400000) % 3600000) / 60000); 
    if(diffMins<10){diffMins = "0"+diffMins}
    var diffSec = Math.floor((((time % 86400000) % 3600000) % 60000)/1000); 
    if(diffSec<10){diffSec = "0"+diffSec}
    var timestring = diffDays+" : "+diffHrs+" : "+diffMins+" : "+diffSec;
  return timestring
  }
  render(){
    let day = 0; let warnumber =0; let wartime=0;
    let victoryaddon = null
    let underway = "Underway"
    try{
    if(this.props.stats.wr.DeadLandsHex!=undefined){
      day=this.props.stats.wr.DeadLandsHex.dayOfWar
    }
    if(this.props.stats.warstats!=undefined){
      warnumber=this.props.stats.warstats.warNumber
    if(this.props.stats.warstats.conquestEndTime>1&&
       this.props.stats.warstats.conquestEndTime>this.props.stats.warstats.conquestStartTime){
      let victoryfaction = <span className="collie_text">Colonials</span>
          if(this.props.stats.warstats.winner=="WARDENS"){
            victoryfaction = <span className="warden_text">Wardens</span>
          }
      let conquesttime = this.SplitTime(this.props.stats.warstats.conquestEndTime-this.props.stats.warstats.conquestStartTime)
      victoryaddon=<p>{victoryfaction} have won Conquest {warnumber} in {conquesttime}</p>
      if(this.props.stats.warstats.resistanceStartTime>this.props.stats.warstats.conquestEndTime){
      var time = new Date().getTime() - new Date(this.props.stats.warstats.resistanceStartTime).getTime();
      wartime= this.SplitTime(time)
        underway="Resistance underway"
      }
    }else{
      var time = new Date().getTime() - new Date(this.props.stats.warstats.conquestStartTime).getTime();
      wartime= this.SplitTime(time)
    }}
    }catch(err){}
    return <div  className="stats_div">
        <p className="stats_div_header">Conquest {warnumber}, Day {day}</p>
        {victoryaddon}
          <p>{underway} since:</p>
          <p>{wartime}</p>
        </div>
  }
}
//////////////////////////////////////////////////////////////
class  WinCondition extends React.Component {
    shouldComponentUpdate(nextProps, nextState){
 if(JSON.stringify(nextProps.condition)!=JSON.stringify(this.props.condition)||
   this.props.timerOn!=nextProps.timerOn||
    nextProps.timerOn&&(JSON.stringify(nextProps.timelinesnap)!=JSON.stringify(this.props.timelinesnap))){
      return true
    }
    return false
  }
  
  render(){
    let condition = JSON.parse(JSON.stringify(this.props.condition))
    if(this.props.timerOn){
      //console.log("ayy")
    try{
      condition=this.props.timelinesnap.wincondition
    }catch(err){
      console.log("Win condition error",err)
    }
  }
    //console.log("Win condition",condition)
    let warmode = null
      if(this.props.stats.warstats!=undefined){
    if(this.props.stats.warstats.conquestEndTime>1&&
       this.props.stats.warstats.conquestEndTime>this.props.stats.warstats.conquestStartTime){
      warmode= "Resistance"
    }else{warmode= "Conquest"}
        }
    return <React.Fragment>
      <p className="stats_div_header">State of the war: {warmode}</p>
        <div className="stats_table_towns">
        <table><tbody>
          <tr>{GetCondition("https://raw.githubusercontent.com/the-fellowship-of-the-warapi/Assets/master/Map%20Icons/Bases/MapIconStaticBase1Colonial.png",condition[0][0])}
            {GetCondition("https://raw.githubusercontent.com/the-fellowship-of-the-warapi/Assets/master/Map%20Icons/Bases/MapIconStaticBase2Colonial.png",condition[0][1])}
            {GetCondition("https://raw.githubusercontent.com/the-fellowship-of-the-warapi/Assets/master/Map%20Icons/Bases/MapIconStaticBase3Colonial.png",condition[0][2],<span>(<span className="stats_table_counter_special">{condition[0][0]+condition[0][1]+condition[0][2]}</span>)</span>,true)}
            {GetCondition("https://cdn.glitch.com/dd3f06b2-b7d4-4ccc-8675-05897efc4bb5%2FCivicCenterColonial.png?v=1560693262971",condition[0][3],<React.Fragment>/<span className="stats_table_counter_special">{this.props.limit}</span></React.Fragment>,true)}
          </tr>
          <tr>{GetCondition("https://raw.githubusercontent.com/the-fellowship-of-the-warapi/Assets/master/Map%20Icons/Bases/MapIconStaticBase1Warden.png",condition[1][0])}
            {GetCondition("https://raw.githubusercontent.com/the-fellowship-of-the-warapi/Assets/master/Map%20Icons/Bases/MapIconStaticBase2Warden.png",condition[1][1])}
            {GetCondition("https://raw.githubusercontent.com/the-fellowship-of-the-warapi/Assets/master/Map%20Icons/Bases/MapIconStaticBase3Warden.png",condition[1][2],<span>(<span className="stats_table_counter_special">{condition[1][0]+condition[1][1]+condition[1][2]}</span>)</span>,true)}
            {GetCondition("https://cdn.glitch.com/dd3f06b2-b7d4-4ccc-8675-05897efc4bb5%2FCivicCenterWarden.png?v=1560693266377",condition[1][3],<React.Fragment>/<span className="stats_table_counter_special">{this.props.limit}</span></React.Fragment>,true)}
          </tr></tbody></table></div></React.Fragment> 
}}
//////////////////////////////////
class  WinCount extends React.Component {
  AddCounter(winner,count){
    if(winner=="COLONIALS"){
        count.c++;
      }else if (winner=="WARDENS"){
        count.w++;
      }
  }
  render(){
    let count={c:0,w:0}
    for(let i =0;i<oldwars.length;i++){
      this.AddCounter(oldwars[i].winner,count)
    }
    for(let i=0;i<this.props.warhistory.length;i++){
      this.AddCounter(this.props.warhistory[i].winner,count)
    }
    return <div  className="stats_div" id="stats_wincount">
          <p className="stats_div_header">Wins</p>
            <table id="stats_win_table"><tbody><tr>
      <td><img className="stats_faction_img" src="https://cdn.glitch.com/84b19724-a86b-4caa-8e69-1e9c973e043f%2Fcoll.png?v=1567263083742"/></td>
      <td><img className="stats_faction_img" src="https://cdn.glitch.com/84b19724-a86b-4caa-8e69-1e9c973e043f%2Fward.png?v=1567263084512"/></td>
          </tr><tr><td>{count.c}</td><td>{count.w}</td>
          </tr></tbody></table>
           </div>
  }
}
//////////////////////////////////
const mapStateToProps = store => {    //Importing props from store
  //console.log(store) 
  let roominfo = store.roominfo
  return {
    dynamic:roominfo.dynamic,
    stats:roominfo.stats,
    tab:store.tab
  }
}
//////////////////////////////////////
export const Stats = connect(mapStateToProps)(StatsCore)  

  function GetCondition(url,number,addon,total){
    let textclass = "stats_condition_text"
    if(total){
       textclass = "stats_condition_text_total"
    }
    return <td><img className="stats_condition_img" src={url}/><p className={textclass}><AnimatedNumber value={number} duration={600} stepPrecision={0}/>{addon}</p></td>
  }

function getTeamId(obj){
  switch(obj.teamId){
    case "NONE":
      return 0;
    case "COLONIALS":
      return 1;
    case "WARDENS":
      return 2;
  }
}

function getTeamText(teamid){
  switch(teamid){
    case 0:
      return "NONE"
    case 1:
      return "COLONIALS"
    case 2:
      return "WARDENS"
  }  
}

function compareStructure(a,b) {
  if (a.amount < b.amount)
    return 1;
  if (a.amount > b.amount)
    return -1;
  return 0;
}

function GetCounter(icontype){
  switch(icontype){
    case 5:  case 6:  case 7:  
      return 0
    case 29: case 27:
      return 1
    case 28: 
      return 2
    case 35:
      return 3
    case 17:
      return 4
    case 34:    
      return 5
    case 33:   
      return 6
    case 36:   
      return 7
    default:
      return -1
        }
}
function FillReportGaps(reports,starttime,endtime,startpoint){
    if(reports.length==0){
      return []
    }
    let i = 0;
    let scale = 600000
    let timecounter = starttime
    while(timecounter<endtime){
      try{
      if(Math.abs(reports[i].d-timecounter)>scale){
        if(i==0){
          reports.splice(0,0,U.copy(reports[0]))
          let wr = JSON.parse(reports[0].wr)
          for(let region in wr){
            wr[region].e=0;
            wr[region].c=0;
            wr[region].w=0;
          }
          reports[0].wr=JSON.stringify(wr)
        }else{
          reports.splice(i,0,U.copy(reports[i-1]))
        }
        reports[i].d = timecounter;
      }
      }catch(err){}
      timecounter +=scale
      i++;
    }
    
    let fixedreports = []
    let maplist = []
    let dynamic = JSON.parse(startpoint.dynamic)
    for(let i in dynamic){
      maplist.push(dynamic[i].regionId)
    }
    //console.log("Maps",maplist)
    let prevtotalcas = undefined
    for(let i =0;i<reports.length;i++){
      let report = reports[i]
      let wr = JSON.parse(report.wr)
      let oldwr = i>0 ? fixedreports[i-1].wr: {}
      for(let j in wr){
        if(!maplist.includes(Number(j))){
          delete wr[j]
        }
      }
      for(let j in maplist){
        if((!wr[maplist[j]]||wr[maplist[j]]<oldwr[maplist[j]])&&i>0){
          //console.log("Fixing report",maplist[j],oldwr)
          wr[maplist[j]]=oldwr[maplist[j]]
        }
      }
      fixedreports.push({d:report.d,pop:report.pop,wr:wr})
    }
    return fixedreports
  }

