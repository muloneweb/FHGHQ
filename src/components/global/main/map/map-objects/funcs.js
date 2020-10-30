import React from 'react';
import facilitytypes from '../../../../../_static/facilitytypes';
import RegionImages from '../../../../../_static/region-images';
const facilitylimit = facilitytypes.limit

export function GetNotes(obj){  ////GET NOTES TEXT FOR TOOLTIP
    if(obj==undefined){
    return null;
    }
    if(obj.notes==undefined){
      return null
      
    }
       let text = obj.notes.replace(/(?:\r\n|\r|\n)/g, '<br>')
  return(<React.Fragment>
      <p>{obj.notes}</p>
    </React.Fragment>)
  }

export function GetUpdate(obj){/// GET UPDATE TEXT FOR TOOLTIP
    if(obj==undefined){
     return(<React.Fragment>
        Last Update: <br /> None
     </React.Fragment>) 
     }
     return(<React.Fragment>
        Last Update: <br />
       {facilitytypes.GetDate(obj.lastupdate)}
     </React.Fragment>) 
  }

export function GetLine(array,index,facilities){ ////GET FACILITY TOOLTIP
    let numberstring = 0+"/"+facilitylimit;
    if(facilities!=undefined){
      if(facilities[facilitytypes.array[array][index].name]!=undefined){
        numberstring = facilities[facilitytypes.array[array][index].name]==facilitylimit ? <img className="tooltip_img" src="https://cdn.glitch.com/6393f3fd-16a7-4641-ae3d-994f8e7cea4e%2Fcheckmark.png?1546938883091" /> : facilities[facilitytypes.array[array][index].name] + "/"+facilitylimit
      }
    }
  return (
    <React.Fragment key={array+index}>
    <img className="tooltip_img" src={facilitytypes.array[array][index].src} />
      {numberstring}
      <br />
    </React.Fragment>
      )
  }

export function convert(regionid, x,y){
    return RegionImages.convert(regionid, x,y)
  }