import React from 'react';
const AnimatedNumber = require('react-animated-number')
const objimg = [
  {icontype:5,  //TOWN HALL
    n:"https://raw.githubusercontent.com/the-fellowship-of-the-warapi/Assets/master/Map%20Icons/Bases/MapIconStaticBase2.png"}, 
  {icontype:29,  //FORT
    n:"https://raw.githubusercontent.com/the-fellowship-of-the-warapi/Assets/master/Map%20Icons/Bases/MapIconFort.png"}, 
  {icontype:28,  //OBS TOWER
    n:"https://raw.githubusercontent.com/the-fellowship-of-the-warapi/Assets/master/Map%20Icons/Bases/MapIconObservationTower.png"}, 
  {icontype:35,  //SAFEHOUSE
    n:"https://raw.githubusercontent.com/the-fellowship-of-the-warapi/Assets/master/Map%20Icons/Bases/Safehouse.png"}, 
  {icontype:17,  //REFINERY
    n:"https://raw.githubusercontent.com/the-fellowship-of-the-warapi/Assets/master/Map%20Icons/Production/MapIconManufacturing.png"}, 
  {icontype:34,  //FACTORY
    n:"https://raw.githubusercontent.com/the-fellowship-of-the-warapi/Assets/master/Map%20Icons/Production/MapIconFactory.png"}, 
  {icontype:33,  //STORAGE DEPOT
    n:"https://raw.githubusercontent.com/the-fellowship-of-the-warapi/Assets/master/Map%20Icons/Production/MapIconStorageFacility.png"}, 
  {icontype:36,  //AMMO FACTORY
    n:"https://raw.githubusercontent.com/the-fellowship-of-the-warapi/Assets/master/Map%20Icons/Production/MapIconArmory.png"}] 

class StateOfTheWar extends React.Component{
  shouldComponentUpdate(nextProps, nextState){
    //let checkstart = Date.now()
 if(JSON.stringify(nextProps.state)!=JSON.stringify(this.props.state)||
    JSON.stringify(nextProps.counters)!=JSON.stringify(this.props.counters)||
   this.props.timerOn!=nextProps.timerOn||
    nextProps.timerOn&&(JSON.stringify(nextProps.timelinesnap)!=JSON.stringify(this.props.timelinesnap))){
      return true
    }
    //console.log("Checked state of the war false",Date.now()-checkstart)
    return false
  }
render(){
  //console.log("State of the war props",this.props)
  let percentages =[0,0,0]
  let state = this.props.state
  let counters = this.props.counters
  let timelinesnap = this.props.timelinesnap
  let timeline = this.props.timeline
  if(this.props.timerOn){
    try{
   state = timelinesnap.spec.sum
    counters = [timelinesnap.total[1],timelinesnap.total[2],timeline.total[0][0]+timeline.total[0][1]+timeline.total[0][2]]
      //console.log("State of the war state", state)
    }catch(err){
      console.log("State of the war err",err)
    }
  }
  percentages[0] = (counters[0]/counters[2])*100;        percentages[1] = (counters[1]/counters[2])*100;
  percentages[2] = {width:(100-percentages[0]-percentages[1])+"%"}
  percentages[0]= {width:percentages[0]+"%"};            percentages[1]= {width:percentages[1]+"%"}
  return <React.Fragment>
        <div className="progress" id="stats_progress">
      <div className="progress-bar collie-bg" style={percentages[0]}>
        {counters[0]}
      </div>
      <div className="progress-bar white-bg" style={percentages[2]}>
      </div>
      <div className="progress-bar warden-bg" style={percentages[1]}>
         {counters[1]}
      </div>
    </div> 
      <div className="stats_table_towns">
      <table><tbody>
        <tr>{GetCondition(objimg[0].n,state[1][0],state[2][0])}  {GetCondition(objimg[1].n,state[1][1],state[2][1])}
        {GetCondition(objimg[2].n,state[1][2],state[2][2])}   {GetCondition(objimg[3].n,state[1][3],state[2][3])}
        </tr>
        <tr>
          {GetCondition(objimg[4].n,state[1][4],state[2][4])}    {GetCondition(objimg[5].n,state[1][5],state[2][5])}
          {GetCondition(objimg[6].n,state[1][6],state[2][6])}    {GetCondition(objimg[7].n,state[1][7],state[2][7])}
        </tr>

        {/*<tr className="stats_table_separator"><td></td></tr> 
        <tr>{GetCondition(objimg[0].n,state[0][0])}  {GetCondition(objimg[1].n,state[0][1])}
          {GetCondition(objimg[2].n,state[0][2])}    {GetCondition(objimg[3].n,state[0][3])}
        </tr>
        <tr>
      {GetCondition(objimg[4].n,state[0][4])}    {GetCondition(objimg[5].n,state[0][5])}
      {GetCondition(objimg[6].n,state[0][6])}    {GetCondition(objimg[7].n,state[0][7])}
        </tr>  */}
        </tbody></table>
        </div>
        </React.Fragment>
}}

  function GetCondition(url,number,number2){
    let textclass = "stats_stateofthewar_text"
    return <td><img className="stats_stateofthewar_img" src={url}/><p className={textclass}><span className="collie_text"><AnimatedNumber value={number} duration={600} stepPrecision={0}/></span><span id="separator">-</span><span className="warden_text"><AnimatedNumber value={number2} duration={600} stepPrecision={0}/></span></p>
    </td>
  }
export default StateOfTheWar