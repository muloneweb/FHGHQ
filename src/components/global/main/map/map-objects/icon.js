import React from 'react';
import facilitytypes from '../../../../../_static/facilitytypes';
import markers from '../../../../../_static/markers';
const L = require('react-leaflet');
const NativeL = require('leaflet');
const Leaflet_Pulse = require('leaflet-pulse-icon');
import { convert } from './funcs';
import U from '../../../useful_functions';

export class Icon extends React.Component {
    GetNotes(){
        if(!this.props.private){
            return null;
        }
        if(!this.props.private.notes){
            return null
        }
        return(
            <React.Fragment>
                <p className="tooltip_notes">{this.props.private.notes}</p>
            </React.Fragment>
        )
    }
     
   GetUpdate(){
     if(this.props.private==undefined){
      return(<React.Fragment>
         Last Update: <br /> None
      </React.Fragment>) 
      }
      return(<React.Fragment>
         Last Update: <br />
        {facilitytypes.GetDate(this.props.private.lastupdate)}
      </React.Fragment>) 
     
   }
     
     handleSelect(e,position){
       window.selecticon.ChangePosition(position,this.props.type)
       let packet = {refinery:"",factory:"",storage:""}
       if(this.props.type=="town"){
        // console.log("Selecting town",this.props.roominfo.dynamic)
         //console.log(this.props.roominfo.dynamic)
         for(var i=0;i<this.props.roominfo.dynamic.length;i++){
           let region = this.props.roominfo.dynamic[i]
           if(region.regionId==this.props.regionId){
             //console.log("Selected region",region)
             for(var j=0;j<region.data.mapItems.length;j++){
               let item = region.data.mapItems[j]
               if(item.iconType==17||item.iconType==34||item.iconType==33){
                 let distance = Math.sqrt(Math.pow(this.props.obj.y-item.y,2)+Math.pow(this.props.obj.x-item.x,2))
                // console.log("Near facilities",distance,item)
                 let signature = U.signature(item)
                 if(distance<0.092){
                 switch(item.iconType){
                   case 17:
                     packet.refinery=signature;
                     break;
                   case 33:
                     packet.storage=signature;
                     break;
                   case 34:
                     packet.factory=signature;
                     break;
                 }
                 }
               }
             }
             break;
           }
         }
       //store.dispatch(A.selectCollateral(refinery,factory,storage))
       }
       this.props.handler(e,packet)
     }
       GetEventString(obj){
       //console.log(obj)
       let datestring = new Date(JSON.parse(obj.date))
       function GetFaction(obj,reverse){
       if(obj.teamId=="WARDENS"){
         if(reverse){
           return <span style={{color:'#65875e'}}>Colonials</span>
         }else return <span style={{color:'#2d6ca1'}}>Wardens</span>
       }else if(obj.teamId=="COLONIALS"){
         if(reverse){
           return <span style={{color:'#2d6ca1'}}>Wardens</span>
         }else return <span style={{color:'#65875e'}}>Colonials</span> 
       }
       }
       
       let prevItem = JSON.parse(obj.prevItem)
       let newItem = JSON.parse(obj.newItem)
       let actionstring = ""
       let faction = ""
       if(prevItem.teamId!=newItem.teamId){
         if(newItem.teamId=="NONE"){
           //console.log("Checking flags",newItem.flags)
           if(newItem.flags&0x10){
             actionstring = "was nuked by "
             faction = GetFaction(prevItem,true)
           }else{
             actionstring = "was lost by "
             faction = GetFaction(prevItem,false)
           }
         }else{
           if(newItem.flags&4){
                actionstring ="is being built by "
              }else{
                actionstring = "was taken by "
              }
           actionstring = actionstring
           faction = GetFaction(newItem,false)
         }
       }else if(prevItem.iconType!=newItem.iconType||(prevItem.iconType==newItem.iconType&&(prevItem.flags&4)&&!(newItem.flags&4))){
         if(newItem.iconType==5){
           if(prevItem.iconType==5){
              actionstring = "was taken by "
               faction = GetFaction(newItem,false)
           }else{
           actionstring = "was reset to T1"
           }
         }else{
         if(newItem.flags&4){
           actionstring = "is being upgraded "
           }else{
           actionstring ="was upgraded "
           }
         if(newItem.iconType==6){
           actionstring = actionstring+"to T2 by "
         }else if(newItem.iconType==7){
           actionstring = actionstring+"to T3 by "
         }
           actionstring = actionstring
           faction = GetFaction(newItem,false)
         }
       }else if((prevItem.flags&4)&&!(newItem.flags&4)){
             actionstring = "was taken by " 
           faction = GetFaction(newItem,false)
     }else if(prevItem.teamId=="NONE"&&newItem.teamId=="NONE"&&newItem.flags&0x10){
       actionstring="was nuked by Someone"
     }else if(prevItem.iconType==newItem.iconType&&(!(prevItem.flags&4)&&(newItem.flags&4))){
       actionstring="is being rebuilt by "
       faction = GetFaction(newItem,false)
     }
       if(actionstring==""){
         return null
       }
       datestring = GetDateString(datestring) //OK
       function GetDateString(date){
         function addZero(num){
           if(num<10){
           num = "0"+num;
           }
           return num;
         }
         var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
         var day = addZero(date.getDate());
         var month = months[date.getMonth()];
         var hour = date.getHours();
         var minute = addZero(date.getMinutes());
         var string = day+" "+month+" - "+hour+":"+minute;
         return string;
       }
       //console.log(datestring,regionName,townname,actionstring)
       let totalstring = <span>{actionstring}<br/>{faction} {datestring}</span>
       //console.log(totalstring)
       return <p>{totalstring}</p>
     }
     
    render(){
      //console.log(this.props);
      let addon_victory = ""
      let addon_hq = null
      let pulse = null
       let obj = this.props.obj
       let position = convert(this.props.regionId,obj.x,obj.y)
       let side = function(){
           switch(obj.teamId){
             case "COLONIALS":
               return "colonial";
             case "WARDENS":
               return "warden";
             case "NONE":
               return "neutral";
             default:
           }
         }  
      let tooltip = <L.Tooltip />
         if(obj.flags&0x02){
           addon_hq=<L.Marker position={position} icon={markers.GenerateHQIcon(obj.teamId)/*markers.iconarray[4][side()]*/} /> 
         }
       switch(this.props.type){
         case "town":
           if(this.props.obj.flags&0x01){ //Marks victory towns
             addon_victory=markers.GetVictoryAddon(obj,position)
           }
           //addon2 = <L.Circle center={position} fillColor="red" color="red" fillOpacity={0.2}  radius={RegionImages.ratio*200}  zIndexOffset={2000} />
           //console.log("Events",this.props)
           let eventstring = null;
           let foundevent = false
           for(var i =0;i<this.props.events.length;i++){
             let event = this.props.events[i]
             var timediff = new Date() - new Date(JSON.parse(event.date));
           
             if(this.props.regionId==event.region){
               let item = JSON.parse(event.prevItem)
               let newItem=JSON.parse(event.newItem)
               
               if(this.props.obj.x==item.x&&this.props.obj.y==item.y&&!foundevent){
                 //console.log("Found event",this.props.name,event)
                 eventstring= this.GetEventString(event)
                 foundevent=true;
               }
               if(this.props.obj.x==item.x&&this.props.obj.y==item.y&&item.teamId!=newItem.teamId){
               if(timediff<1800000){
                 pulse = <L.Marker
           position={position}
           icon= {new NativeL.icon.pulse({iconSize:[20,20],color:'white',heartbeat:2})}
           ></L.Marker>
               }
                 break;
               }
             }
             //console.log("Timediff",timediff)
           }
           
           tooltip = <L.Tooltip className="tooltip" opacity={1}>
               <p><b>{this.props.name}</b></p>
               {eventstring}
                <div className="row tooltip_row">     
               </div>
               <br />
               
               {this.GetNotes()} {this.GetUpdate()}
             </L.Tooltip>
             break;
         case "fort":
           tooltip = <L.Tooltip className="tooltip">
               {this.GetNotes()}{this.GetUpdate()}
             </L.Tooltip>
             break;
       }
       let opacity= 1;
      if(this.props.opacity!=undefined){
        opacity = this.props.opacity
      }
       let objicon = markers.GenerateIcon(obj)   
       return(
         <React.Fragment>
         {addon_victory}
         {addon_hq}
         {pulse}
         <L.Marker position={position} icon={objicon} opacity={opacity} onClick={(e)=>this.handleSelect(e,position)} zIndexOffset={400}>
           {tooltip}
         </L.Marker>
           </React.Fragment>
           )
    
    } 
   }