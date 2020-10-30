import React from 'react';
const RC = require('rc-slider')
const RCTooltip = require('rc-tooltip')
const createSliderWithTooltip = RC.createSliderWithTooltip;
const Range = createSliderWithTooltip(RC.Range);
const Handle = RC.Handle;

const handle = (props) => {
  //console.log("Handle props",props)
  let value = new Date(props.value)
  return (
    <RCTooltip.default
      prefixCls="rc-slider-tooltip"
      overlay={""+value}
      visible={props.dragging}
      placement="top"
      key={props.index}
    >
      <Handle value={props.value}  disabled={props.disabled} index={props.index} offset={props.offset} max={props.max} min={props.min} ref={props.ref} prefixCls={props.prefixCls} className={props.className}/>
    </RCTooltip.default>
  );
};
//////////////////////////////////////////////
class Slider extends React.Component { //Conquest X, Day Y Underway since
      constructor(props) {
    super(props);
      this.state={      ///State
      slider:props.time,
      prevSlider:props.time
    }
     this.onChangeSlider= this.onChangeSlider.bind(this)
   }
    static getDerivedStateFromProps(props, state){
      //console.log("Deriving slider")
      if(props.time!=state.prevSlider){
      return {prevSlider:props.time,slider:props.time}
      }else return {}
      }
  
  shouldComponentUpdate(nextProps, nextState){
    //let checkstart = Date.now()
    //console.log("this state",this.state.slider,"next state",nextState.slider)
      if(this.state.slider!=nextState.slider){
        return true
      }
      if(JSON.stringify(this.props)==JSON.stringify(nextProps)){
        //console.log("Checked slider",Date.now()-checkstart) 
        return false
      }
        return true
      }
  
  onChangeSlider(e){
    //console.log(e)
    let value= e
    //console.log("Changing slider",value)
    this.setState({
      slider:value})
    }
  
  render(){
    //console.log("Slider state",this.state.slider)
    let max = Date.now()
    if(this.props.previous){
      max=this.props.EndTime
    }
    return <RC.default className="stats_timelapse_slider" onChange={this.onChangeSlider}    value={this.state.slider} min={this.props.timerStart} max={max} step={600000} onAfterChange={this.props.onChangeSlider} handle={handle}/>
  }
}

export default Slider