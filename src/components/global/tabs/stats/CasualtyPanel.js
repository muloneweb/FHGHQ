import React from 'react';
import U from '../../useful_functions'
const RegionImages = require('../../../../_static/region-images');
const AnimatedNumber = require('react-animated-number')
const FlipMove = require('react-flip-move')
const animDuration = 300
class CasualtyPanel extends React.Component {
      constructor(props) {
    super(props);
    }

  shouldComponentUpdate(nextProps, nextState){
    let oldindex = Math.ceil((this.props.time-this.props.timerStart)/600000)+1
    let newindex = Math.ceil((nextProps.time-nextProps.timerStart)/600000)+1
    if(oldindex!=newindex||this.props.number!=nextProps.number){
      return true
    }
    return false
  }
  render(){
    console.log("Cas panel props",this.props.stats)
    //console.log("Casualty panel",this.props.time)
      let cas={c:0,w:0,total:0,ch:0,wh:0,json:{},jsonold:{},list:[],hourlist:[]}
  let stats = this.props.stats
  let reports = this.props.stats.currentwar.reports
  let selectedlength = Math.ceil((this.props.time-this.props.timerStart)/600000)+1
  if(this.props.previous&&this.props.time==this.props.timerStart){
    selectedlength = reports.length-1
  }
  //console.log("Casualty index",selectedlength)
  let displayedregions=[]
  reports=reports.slice(0,selectedlength)
  try{
      cas.json= JSON.parse(JSON.stringify(reports[reports.length-1]))
      //cas.json.wr = JSON.parse(cas.json.wr)
      try{
        cas.jsonold = JSON.parse(JSON.stringify(reports[reports.length-6]))
        //cas.jsonold.wr = JSON.parse(cas.jsonold.wr)
      }catch(err){}
    for(let i in cas.json.wr){
      let region = cas.json.wr[i]
      if(window.statsignore.includes(Number(i))){
        //console.log("offline region")
        continue;
      }
      cas.list.push({name:RegionImages.regionlist[i].name,c:region.c,w:region.w,index:i})
      cas.w = Number(cas.w)+Number(region.w) 
      cas.c = Number(cas.c)+Number(region.c)
    }
    try{
    for(let i in cas.jsonold.wr){
      if(window.statsignore.includes(Number(i))){
        continue;
      }
      let region = cas.jsonold.wr[i]
      let hourc = cas.json.wr[i].c-region.c
      let hourw = cas.json.wr[i].w-region.w
      if((hourc>20&&hourw>50)||(hourw>20&&hourc>50)){
        cas.hourlist.push({name:RegionImages.regionlist[i].name,c:hourc,w:hourw})
        displayedregions.push(Number(i))
      }
      cas.wh = Number(cas.wh)+Number(region.w) 
      cas.ch = Number(cas.ch)+Number(region.c)
    }}catch(err){}
    cas.list.sort(compareRegions)
    try{cas.hourlist.sort(compareRegions)
        cas.hourlist = cas.hourlist.slice(0,6)
      for(let i=0;i<cas.hourlist.length;i++){
          let el = cas.hourlist[i]
          cas.hourlist[i] = <CasualtyTR key={"stats_castable_hour_"+el.name} el={el} cellclass="stats_castable_hour_td"/>
        }
        while(cas.hourlist.length<6){
          cas.hourlist.push(<tr key={"stats_castable_hour_"+cas.hourlist.length}><td></td></tr>)
        }
       }catch(err){}
    for(let i=0;i<cas.list.length;i++){
      let el = cas.list[i]
      //console.log("casualty region",el,i,displayedregions.includes(i))
      cas.list[i] = <CasualtyTR key={"stats_castable_top_"+el.name} el={el} cellclass="stats_castable_top_td" active={displayedregions.includes(Number(el.index))}/>
    }
    cas.wh=cas.w-cas.wh;
    cas.ch=cas.c-cas.ch;
    //let wr = U.copy(stats.wr)
    }catch(err){ //IF EVENT DATA IS UNAVAILABLE
      for(let i in stats.wr){
        let region = stats.wr[i]
        cas.w = Number(cas.w)+Number(region.w) 
        cas.c = Number(cas.c)+Number(region.c)
      }
      console.log(err)
    }
    //console.log("Displayed regions",displayedregions)
  cas.total = cas.w+cas.c;  
  let totalarrays={cumulative:[],hour:[]}
  if(cas.c>=cas.w){
    totalarrays.cumulative.push(<li className="collie_text">{GetAnimNumber(cas.c)}</li>)
    totalarrays.cumulative.push(<li className="warden_text">{GetAnimNumber(cas.w)}</li>)
  }else{
    totalarrays.cumulative.push(<li className="warden_text">{GetAnimNumber(cas.w)}</li>)
    totalarrays.cumulative.push(<li className="collie_text">{GetAnimNumber(cas.c)}</li>)
  }
  if(cas.ch>=cas.wh){
    totalarrays.hour.push(<li className="collie_text">{GetAnimNumber(cas.ch)}/h</li>)
    totalarrays.hour.push(<li className="warden_text">{GetAnimNumber(cas.wh)}/h</li>)
  }else{
    totalarrays.hour.push(<li className="warden_text">{GetAnimNumber(cas.wh)}/h</li>)
    totalarrays.hour.push(<li className="collie_text">{GetAnimNumber(cas.ch)}/h</li>)
  }
  //cas.total = commas(cas.total); cas.w = commas(cas.w);     cas.c = commas(cas.c);
  return <div id="stats_table_cas" className="stats_div">
        <p className="stats_div_header">Casualties</p>
     <table id="stats_table_cas_table" className="stats_numbers_table">
       <tbody>
       <tr id="stats_casualtytop_tr_colonials"><td className="collie_text">{/*Colonials*/}</td>
         <td className="stats_table_totalcas_total">
           <FlipMove.default typeName="ul" enterAnimation="accordionVertical" staggerDelayBy="0" staggerDurationBy="0" easing="linear" delay="0" leaveAnimation="none" duration={0}>{totalarrays.cumulative}</FlipMove.default>
         </td>
         <td className="stats_table_totalcas_hour"><FlipMove.default typeName="ul" enterAnimation="accordionVertical" staggerDelayBy="0" staggerDurationBy="0" easing="linear" delay="0" leaveAnimation="none" duration={0}>{totalarrays.hour}</FlipMove.default></td>
     
         </tr>
       <tr id="stats_casualtytop_tr_total"><td>Total</td>  
         <CasualtyTD tdclass="stats_table_totalcas_total" number={cas.total} />
         <CasualtyTD tdclass="stats_table_totalcas_hour" number={Number(cas.wh)+Number(cas.ch)} addon="/h"/>
       </tr></tbody></table>
        <p className="stats_div_header">Per Hour</p>
          <table id="stats_table_tophour">
            <FlipMove.default typeName="tbody" enterAnimation="accordionVertical" staggerDelayBy="0" staggerDurationBy="0" easing="linear" delay="0" leaveAnimation="none" duration={0}>{cas.hourlist}</FlipMove.default>
            </table>
        <p  className="stats_div_header">Cumulative</p>
    <table id="stats_cas_toptable">
      <FlipMove.default typeName="tbody" enterAnimation="accordionVertical" staggerDelayBy="10" staggerDurationBy="10" easing="linear" delay="10" leaveAnimation="none" duration={300}>{cas.list}</FlipMove.default>
      </table>
        </div>
    
  }
}
///////////////////////////////////////////////////////
class CasualtyTD extends React.Component{
    shouldComponentUpdate(nextProps, nextState){
    if(JSON.stringify(nextProps.number)==JSON.stringify(this.props.number)){
      return false
    }
    return true;
  }
  render(){
    return <td className={this.props.tdclass}>{GetAnimNumber(this.props.number)}{this.props.addon}</td>
  }
}
///////////////////////////////////////////////////////
class CasualtyTR extends React.Component{
  shouldComponentUpdate(nextProps, nextState){
    if(JSON.stringify(nextProps.el)==JSON.stringify(this.props.el)){
      return false
    }
    return true;
  }
  render(){
    let el = this.props.el
    let nameclass =""
    if(this.props.active||this.props.active===undefined){
      nameclass = "stats_castable_top_td_active"
    }else{
      nameclass = "stats_castable_top_td_inactive"
    }
    if((el.c+el.w)>=20){
      return <tr key={"stats_castable_top_"+el.name}><td className={nameclass}>{el.name}</td><td className={"collie_text "+this.props.cellclass}>{GetAnimNumber(el.c)}</td><td className={"warden_text "+this.props.cellclass}>{GetAnimNumber(el.w)}</td></tr>
    }
    return <tr key={"stats_castable_top_"+el.name}><td></td></tr>
    
  }
} 

function compareRegions(a,b) {
  if (Number(a.c)+Number(a.w) < Number(b.c)+Number(b.w))
    return 1;
  if (Number(a.c)+Number(a.w) > Number(b.c)+Number(b.w))
    return -1;
  return 0;
}

function GetAnimNumber(value){
  return <AnimatedNumber value={value} stepPrecision={0} duration={animDuration} formatValue={(value)=>U.FormatNumber(value)}/>
}
export default CasualtyPanel