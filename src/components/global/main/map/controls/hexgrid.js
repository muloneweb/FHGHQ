import RegionImages from '../../../../../_static/region-images';
const L = require('react-leaflet');
import React from 'react';
import {connect} from 'react-redux';

function HexGrid_(props){
  let k = RegionImages.k, w = RegionImages.w;
  let hexarray = []

//   for(let i=0;i<RegionImages.regionlist.length;i++){
//     let region = RegionImages.regionlist[i]
//     let fillopacity = 0;
//     for(var j=0;j<this.props.info.active.length;j++){
//       let region2 = this.props.info.active[j]
//       if(region2.regionId==i){
//         if(!region2.active){
//           fillopacity=0.7
//         }
//         break;
//       }
//     }

  RegionImages.regionlist.forEach((i,index)=>{
    if(i.center){
    let o = i.center;
    hexarray.push(<L.Polygon 
      positions={[
        [o[0], o[1] - w/2],
        [o[0] + k/2, o[1] - w/4],
        [o[0] + k/2, o[1] + w/4],
        [o[0], o[1] + w/2],
        [o[0] - k/2, o[1] + w/4],
        [o[0] - k/2, o[1] - w/4]
        ]}
      color={'black'}
      fillOpacity={0}
      opacity={0.5}
      weight={1}
      key={"regionhex"+o[0]+o[1]}
      onMouseOver={() => props.selectRegion(index)}
      onClick={() => props.selectRegion(index)}
                      />)
  }})
  
  return <React.Fragment>
    {hexarray}
  </React.Fragment>
}

const mapDispatchToProps = dispatch => {
    return {
        selectRegion: (value) => dispatch({ type: 'SELECT_REGION', payload: value })
    }
}

export const HexGrid = connect(null, mapDispatchToProps)(HexGrid_)