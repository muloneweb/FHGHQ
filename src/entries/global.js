import React from 'react';
import { ArtyCalc } from '../components/global/main/artycalc';
import ReactDOM from 'react-dom';
import store from '../redux/store.js';
const ReactRedux = require('react-redux');
import A from "../redux/actions";
import { WarMap } from '../components/global/main/map/Map';
import { Card } from '../components/global/main/card';
import RequestCard from '../components/global/main/Card-Request';
import Chat from '../components/global/main/Chat';
import * as Tabs from '../components/global/tabs';
import TabsPanel from '../components/global/page/TabsPanel';
import Events from '../components/global/main/Event_Log';
import ModalContainer from '../components/global/page/ModalContainer';
window.Ranks = require('../_static/ranks');
import UserList from '../components/global/page/Users';
window.timelapseicon = {}

Object.defineProperty( window, 'steamid', {
  value: document.cookie.substring(document.cookie.indexOf(" steamid=")+9,document.cookie.indexOf(" steamid=")+26).replace(';',''),
  writable: false,
  enumerable: true,
  configurable: true
});
Object.defineProperty( window, 'statsignore', {
  value: [], //OFFLINE REGIONS FOR THIS WAR (MANUAL FOR NOW)
  writable: false,
  enumerable: true,
  configurable: true
});
var id

$(function() {

$('[data-toggle="popover"]').popover()
  id =$(location).attr('href');
  id = id.replace(window.location.origin+'/room/','');
   $.post('/getroom?' + $.param({ id:id}), function(roominfo) {
    store.dispatch(A.loadPage(roominfo))
    document.cookie="redir_room=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/"   
        ReactDOM.render(
      <ReactRedux.Provider store={store}>
        
        <ModalContainer.ModalContainer ref={(modalcontainer) => {window.modalcontainer = modalcontainer }}/>
        <ModalContainer.RequestModalContainer ref={(requestmodalcontainer) => {window.requestmodalcontainer = requestmodalcontainer }}/>
        
      </ReactRedux.Provider>,
      document.getElementById('ModalContainer')); 
    ReactDOM.render(
      <ReactRedux.Provider store={store}>
        <React.StrictMode>
        <App  />
        </React.StrictMode>
      </ReactRedux.Provider>,
      document.getElementById('root')); 
     
   });   
})

function App (){
  return(<React.Fragment>
      <TabsPanel />
            <div className="row" id="general_container_row">    
          <UserList />
      <div className="col total" >  
    <div className="tab-content">                                                           
    <div id="home" className="container tab-pane active">
      <div className="row"> 
        <div id="map-workspace" className="col workspace" > 
       <p>Right-click to place markers</p>
       <div id="mapcontainer">
         <WarMap />
         <Chat.ChatCore />
          </div> 
              <div id="cl1" className="row">   
              <div  id="lgm" className="col-sm-12 col-lg-6"> 
          <div id="ch1" className="eventLog">
          <ul id="ulid" style={{listStyleType:"none"}}>
             <Events.PrivateEvents />
            </ul>
          </div>
         </div>
        <div id="lgm2" className="col-sm-12 col-lg-6"> 
          <div id="ch1" className="eventLog">
          <ul id="ulid" style={{listStyleType:"none"}}>
            <Events.Events />
            </ul>
          </div>
         </div>
          </div>
       </div>

        <div id="ctpn" className="col-sm-12 col-lg-3 nomargin" >     
          <Chat.ChatPersonal />
          <Card />
          <RequestCard />  
          <ArtyCalc />
        </div>         
       </div>
      </div>
      <div id="squadtab" className="container tab-pane">
      <p>Squads Management</p>
      <Tabs.Squads />
      </div>
          
      <div id="refinery" className="container tab-pane">
      <Tabs.Refinery />
      </div>
          
      <div id="logicalc" className="container tab-pane">
      <Tabs.LogiCalc />
      </div>
      
      <div id="techtree" className="container tab-pane">
        <p>Technology Tree</p>
        <Tabs.TechTree />
      </div>
      <div id="statstab" className="container tab-pane">
        <Tabs.Stats />
      </div>
      <Tabs.Settings />
    </div>
        </div>
    </div>
    
      <div id="mastercontainer">
        
      </div>
      </React.Fragment>)
}
//////////////////////////////////////////////////////////

store.subscribe(()=>{
  //console.log("Updated store",store.getState());
})
