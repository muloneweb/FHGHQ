import React from 'react';
import {connect} from 'react-redux';
import A from "../../../../redux/actions";
import U from '../../useful_functions'
const Recharts = require('recharts')

class StatsGraph extends React.Component {
  shouldComponentUpdate(nextProps, nextState){
    if(this.props.tab.tab!=5&&nextProps.tab.tab==5){
      return true
    }
  //let checkstart = Date.now()
  if(//JSON.stringify(this.props.timeline)!=JSON.stringify(nextProps.timeline)||
     this.props.time!=nextProps.time||
    JSON.stringify(this.props.scale)!=JSON.stringify(nextProps.scale)){
   // console.log("Checked stats graph",Date.now()-checkstart)
    return true
  }
    //console.log("Checked stats graph",Date.now()-checkstart)
  return false
  }
render(){
  let timeline = this.props.timeline
  let timelinecas = this.props.timelinecas
  let selectedlength = Math.ceil((this.props.time-this.props.timerStart)/this.props.scale)+1
  let structuregraph = timeline.slice(0,selectedlength)
  //let structuregraph = timeline.slice(Math.floor(selectedlength-345600000/this.props.scale),selectedlength)
  let sum = (timeline[0].c+timeline[0].n+timeline[0].w)/2
  //console.log("Minus 4 days",selectedlength,Math.floor(selectedlength-345600000/this.props.scale))
  //console.log("Timeline sum",sum)
  let selectedlengthcas = Math.ceil((this.props.time-this.props.timerStart)/600000)+1
  let casgraph=timelinecas.slice(0,selectedlengthcas)
  if(this.props.previous&&this.props.timerStart==this.props.time){
    structuregraph=timeline
    casgraph=timelinecas
  }
  let reducerindex = {normal:0,cas:0}
  function ReduceArray(array,k){
    let rArray = []
    for(let i =0;i<array.length;i+=k){
      rArray.push(array[i])
    }
    return rArray
  }
  if(selectedlength>100){
    reducerindex.normal = Math.floor(selectedlength/100)
    structuregraph = ReduceArray(structuregraph,reducerindex.normal)
  }
    if(selectedlengthcas>100){
    reducerindex.cas = Math.floor(selectedlengthcas/100)
    casgraph = ReduceArray(casgraph,reducerindex.cas)
  }
  const CasTooltip = ({ active, payload, label }) => {
  if (active&&payload!=null) {
    let time = this.props.timerStart+Number(label)*600000
    let casstring  = payload[0].value >0 ? <span className="collie_text">{payload[0].value} more colonial casualties</span> :
    <span className="warden_text">{Math.abs(payload[0].value)} more warden casualties</span>
    return (
      <div id="stats_tooltip_playersgraph">
        <p className="label">{U.GetShortDate(time)}<br /> {casstring}</p>
        {/*<p className="intro">{getIntroOfPage(label)}</p>*/}
      </div>
    );
  }

  return null;
  };
  /*
  if(this.props.timerOn){
    if((selectedlength-345600000/this.props.scale)>0){
    structuregraph = timeline.slice(Math.floor(selectedlength-345600000/this.props.scale),selectedlength)
    }
    if((selectedlengthcas-345600000/600000)>0){
    casgraph=timelinecas.slice(Math.floor(selectedlengthcas-345600000/600000),selectedlengthcas)
    }
  }*/
  /*
  if(document.getElementById('stats_wincondition_row')==null){
    return null
  }
    let width = window.innerWidth-930
    console.log("Stats graph width",document.getElementById('stats_wincondition_row').clientWidth,width)
*/
  return <div style={{ width: '100%', height: '50%' }}>
    <Recharts.ResponsiveContainer>
          <Recharts.AreaChart
            data={structuregraph}
            margin={{
              top: 0, right: 0, left: 0, bottom: 0,
            }}
            stackOffset="expand"
          >
            <Recharts.XAxis dataKey="x" hide={true}/>
            <Recharts.YAxis hide={true} />
            <Recharts.Area type="linear" dataKey="w" stackId="1"  fill="#2d6ca1" opacity="1" fillOpacity="1"/>
            <Recharts.Area type="linear" dataKey="n" stackId="1"  fill="#ffffff" opacity="1" fillOpacity="1"/>
           <Recharts.Area type="linear" dataKey="c" stackId="1"  fill="#65875e" opacity="1" fillOpacity="1"/>
            <Recharts.ReferenceLine y={0.5} stroke="#3c3c3c" />
          </Recharts.AreaChart>
       {/*<Recharts.Label value="Map control" offset={0} position="insideTopLeft" />*/}
        </Recharts.ResponsiveContainer>
    
    <Recharts.ResponsiveContainer>
      
    <Recharts.AreaChart
        data={casgraph}
        margin={{top: 5, right: 0, left: 0, bottom: 0}}
      >
        <Recharts.XAxis dataKey="x" hide={true} />
      <Recharts.YAxis hide={true}>
      
      </Recharts.YAxis>
        <Recharts.Tooltip content={<CasTooltip />}/>
        <defs>
          <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
            <stop offset={gradientOffset(casgraph)} stopColor="#65875e" stopOpacity={1} />
            <stop offset={gradientOffset(casgraph)} stopColor="#2d6ca1" stopOpacity={1} />
          </linearGradient>
        </defs>
        <Recharts.Area type="linear" dataKey="y" stroke="#000" fill="url(#splitColor)" />
      {/*
        <Recharts.Area type="monotone" dataKey="c" stackId="1" stroke="#000000" fill="#65875e" opacity="1" fillOpacity="1"/>
        <Recharts.Area type="monotone" dataKey="w" stackId="1" stroke="#f3f3f3" fill="#2d6ca1" opacity="1" fillOpacity="1"/>
        <Recharts.ReferenceLine y={0.5} stroke="#3c3c3c"/> */}
      </Recharts.AreaChart>
      {/*<Recharts.Label value="Casualty difference" offset={0} position="insideTopLeft" />*/}
  
       </Recharts.ResponsiveContainer>
  </div>
}
}
function gradientOffset(data){
  //console.log("Gradient offset",data)
  const dataMax = Math.max.apply(null,data.map(i => i.y));
  const dataMin = Math.min.apply(null,data.map(i => i.y));
  if (dataMax <= 0) {
    return 0;
  }
  if (dataMin >= 0) {
    return 1;
  }
  return dataMax / (dataMax - dataMin);
};


const mapStateToProps = store => {    //Importing props from store
  return {
    tab:store.tab
  }
}
export default connect(mapStateToProps)(StatsGraph)  