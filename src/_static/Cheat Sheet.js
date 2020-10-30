/////////This file stores the common code chunks that im gonna copy
import React from 'react';
import store from '../../redux/store'
import {connect} from 'react-redux';
const Top = require('../../components/Top.js');
const socket = Top.socket;
import cost from '../../_static/cost.js';

class Name extends React.Component {  ////Component generation
  constructor(props) {
    super(props);
    this.state={      ///State
      var:""
    }
    this.function = this.function.bind(this)    //Function binding
  }
  componentDidUpdate(){}
  componentDidMount(){}
  shouldComponentUpdate(nextProps, nextState){}
  function(){
      this.setState(state => {        //Setting state
      return {
      var: 1
   }})
    this.setState({
      item:0
    })
  }
  render(){
  let filters = cost.filters.map((obj,index) => this.function(obj,index))
  return null
  }
}
/////////////////////////////////////////////////
const mapStateToProps = store => {    //Importing props from store
  //console.log(store) 
  return {
    roominfo: store.roominfo,
    tab: store.tab,
  }
}
//////////////////////////////////////
store.dispatch(A.updateObject("requests",obj,this.props.selected.key))
    socket.emit('updateObject',{type:"requests",object:obj,key:this.props.selected.key})
////////////////////////////////////
export default connect(mapStateToProps)(Name)     //Connecting components