import React from 'react';
const ReactDOM = require('react-dom');



class ModalContainer extends React.Component{
    constructor(props) {
      super(props)   
    this.state={
      noauth:false,
      name:""
      }
      this.ToggleNoAuth=this.ToggleNoAuth.bind(this);
      this.handleChangeName=this.handleChangeName.bind(this);
    }
    ToggleNoAuth(){
    this.setState((state)=>{
    return {
      noauth:!state.noauth
    }})
    }
  handleChangeName(event){
        const name = event.target.value
        this.setState({ name:name })
  }
  SubmitNoAuth(){
    if(this.state.name==""){
      alert("Your name is empty!")
    }else{
    $.post('/noauth?' + $.param({ name:this.state.name}), function(packet) {
      if(packet.redir){
        console.log("Redirecting")
        window.location.replace('/room/'+packet.redirId);
      }else{
        console.log("Not redirecting")
        window.location.replace('/');
      }
      //console.log(packet)
       //window.location.replace('/'); 
    }) 
    }
  }
 render(){
   
   return(
      <React.Fragment>
  <div className='modal show' style={{display:'block'}} >
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h4 className="modal-title" id="mt" >Foxhole Global HQ </h4>
      </div>
       <div className="modal-body">
        <div id="wrapper">        
          {this.state.noauth ? <React.Fragment><h5 className="name_input">Name:  <input type="text" value={this.state.name} onChange={this.handleChangeName} /></h5>
            <button type="button" className="btn" onClick={()=>this.SubmitNoAuth()} >Submit</button>
            <button type="button" className="btn" onClick={()=>this.ToggleNoAuth()} >Cancel</button></React.Fragment> : <React.Fragment>
          <button type="button" className="btn" id="stm" onClick={()=>window.location.href='/auth/steam'} ></button>
          <button type="button" className="btn" onClick={()=>this.ToggleNoAuth()} >Without Steam</button>
          </React.Fragment>}
          </div>
         <div id="inf">
       <h5>
        <br /> <p id="crdt">The Steam Authentication process will not gain access to any private Steam data and will use public Steam information and cookies to keep you logged in.</p>
           </h5>
       <br />   <h5>
          <p id="crdt"> Lead Developer: Kastow</p>
          <p id="crdt"> Project Manager & Design: Mulon</p>
           <p id="crdt"> Voiced by: CaptainInArms PressCorps</p>
           </h5>
    
         <h5>
           <br />  Feedback and Suggestions: <a href="https://discord.gg/NzkxyhK"><img src="https://cdn.glitch.com/dd3f06b2-b7d4-4ccc-8675-05897efc4bb5%2Fdisc.png?v=1560206167061" />https://discord.gg/NzkxyhK</a>
          </h5>
            <h5>Patrons: Matthew Bryant, Игорь (Aniki)</h5>
          <h5> <br />
           Foxhole is a registered trademark of Clapfoot Inc, used on this website with their permission.
         </h5>
           </div>
        </div>
    </div>
  </div>
</div>
  <div className='modal-backdrop show' style={{display:'block'}}></div>   
  </React.Fragment>
 )
 } 
  
}

ReactDOM.render(<ModalContainer />,document.getElementById('root')); 