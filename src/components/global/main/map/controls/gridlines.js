import React from "react";
const  L = require('react-leaflet')
import NativeL from 'leaflet'
import RegionImages from '../../../../../_static/region-images';
const {connect} = require('react-redux');

function GridLines_(props){
    if(!props.display) {
        return null;
    }

    if(props.index==0){
        return null
    }

    let k = RegionImages.k, w = RegionImages.w, o = RegionImages.regionlist[props.index].center;
    let gridlines = [];

    for(let xcoord = o[1]-w/2; xcoord<o[1]+w/2; xcoord += RegionImages.ratio*125){
        gridlines.push(<L.Polyline key={'x'+xcoord} positions={[[o[0]-k/2,xcoord],[o[0]+k/2,xcoord]]} color='#29292985' weight={1}/>)
    }
    for(let ycoord = o[0]+k/2; ycoord>o[0]-k/2; ycoord -= RegionImages.ratio*125){
        gridlines.push(<L.Polyline key={'y'+ycoord} positions={[[ycoord,o[1]-w/2],[ycoord,o[1]+w/2]]} color='#29292985' weight={1}/>)
    }
    if(props.zoom >= 3.5){
        for(let i=0;i*RegionImages.ratio*125<w;i++){
            for(let j=0;j*RegionImages.ratio*125<k;j++){
                let horgrid = String.fromCharCode(i+65)
                var myIcon = NativeL.divIcon({html:"<span class='gridtext'>"+horgrid+""+(j+1)+"</span>"});
                myIcon.options.iconSize=[20,20]   
                myIcon.options.iconAnchor = [-1,2]
                gridlines.push(<L.Marker key={i+'|'+j} position={[o[0]+k/2-j*RegionImages.ratio*125,o[1]-w/2+i*RegionImages.ratio*125]} 
                    icon={myIcon} className="map_grid_divicon"/>)
            }
        }
    }
    return <React.Fragment>{gridlines}</React.Fragment>
}

const mapStateToProps = store => {
    return {
      display: store.display.grid,
      index: store.display.selected_region
    }
}

export const GridLines =  connect(mapStateToProps)(GridLines_);