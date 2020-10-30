import React from 'react';
import U from '../../useful_functions'
const AnimatedNumber = require('react-animated-number')
const FlipMove = require('react-flip-move')


//////////////////////////////////////////////
class TopTowns extends React.Component { //Conquest X, Day Y Underway since
   constructor(props) {
    super(props);
   }

  shouldComponentUpdate(nextProps, nextState){
    //let checkstart = Date.now()
  if(JSON.stringify(this.props.timelinesnap.spec.toptowns)!=JSON.stringify(nextProps.timelinesnap.spec.toptowns)){
    //console.log("Checked top towns",Date.now()-checkstart)
    return true
  }
    //console.log("Checked top towns",Date.now()-checkstart)
  return false
  }

  render(){
    let toptowns = []
    for(let town in this.props.timelinesnap.spec.toptowns){
      let obj = this.props.timelinesnap.spec.toptowns[town]
      toptowns.push({name:U.GetTownName(obj.rId,obj,this.props.startpoint.static),amount:obj.amount,side:obj.side})
    }
    toptowns.sort(compareTopTowns)
    for(let i =0;i<toptowns.length;i++){
      let sideimg = null
      let trclass = ""
      if(toptowns[i].side==1){
        sideimg=<img className="stats_toptowns_sideimg" src="https://cdn.glitch.com/84b19724-a86b-4caa-8e69-1e9c973e043f%2FlogoColonial64-min.png?v=1567262318680"/>
        trclass="stats_toptowns_tr_collie"
      }else if(toptowns[i].side==2){
        sideimg=<img className="stats_toptowns_sideimg" src="https://cdn.glitch.com/84b19724-a86b-4caa-8e69-1e9c973e043f%2Flogowardl64-min.png?v=1567262313379"/>
         trclass="stats_toptowns_tr_warden"
      }
      toptowns[i]=<tr key={"stats_toptowns_tr_"+toptowns[i].name} className={trclass}><td>{sideimg}</td><td className="stats_toptowns_nametd">{toptowns[i].name}</td><td><AnimatedNumber value={toptowns[i].amount} duration={600} stepPrecision={0}/></td></tr>
    }
    //console.log("Top towns",toptowns)
    
    return <div id="stats_toptowns" className="stats_div">
          <p className="stats_div_header">Most captured towns</p>
         <table> 
            <FlipMove.default typeName="tbody" enterAnimation="accordionVertical" staggerDelayBy="10" staggerDurationBy="10" easing="linear" delay="10" leaveAnimation="none" duration={300}>
           {toptowns}
           </FlipMove.default></table>
      </div>
  }
}

////////////////
function compareTopTowns(a,b) {
  if (a.amount > b.amount)
    return -1;
  if (a.amount < b.amount)
    return 1;
  return 0;
}

export default TopTowns