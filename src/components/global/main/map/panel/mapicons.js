import React from 'react';
import {connect} from 'react-redux';
const L = require('react-leaflet');
import RegionImages from '../../../../../_static/region-images';
import markers from '../../../../../_static/markers';
import U from '../../../useful_functions';
import * as MO from '../map-objects';

class MapIcons_ extends React.Component {

    convert(regionid, x,y){
        return RegionImages.convert(regionid, x, y) 
    }
    GetIcon(obj,regionId){
        let position = this.convert(regionId,obj.x,obj.y)
        return <markers.SimpleIcon obj={obj} 
                                   position={position} 
                                   key={regionId+obj.x+obj.y}/>
    }
      GetRange(obj,regionId,range=150){
        let position = this.convert(regionId,obj.x,obj.y)
        let color = ""
        let bordercolor = ""
        switch(obj.teamId){
          case "NONE":
            color='#d6d6d6'
            break;
          case "COLONIALS":
            color='#516C4B'
            bordercolor="#32522b"
            break;
          case "WARDENS":
            color='#235683'
            bordercolor="#235683"
            break;
        }
        return <L.Circle key={position[0]+position[1]} center={position} color={bordercolor} weight={2} fillColor={color} opacity={1} fillOpacity={0.2}  radius={RegionImages.ratio*range} />
      }

    GetObsRange(obj,regionId){
        let position = this.convert(regionId,obj.x,obj.y)
        let color = ""
        switch(obj.teamId){
          case "NONE":
            color='#d6d6d6'
            break;
          case "COLONIALS":
            color='#516C4B'
            break;
          case "WARDENS":
            color='#235683'
            break;
        }
        return <L.Circle key={position[0]+position[1]} center={position} color={color} weight={1} opacity={0.7} fillOpacity={0}  radius={RegionImages.ratio*200} />
      }
      
    GetPrivateIcons() { 
      const { roominfo, display } = this.props;
      const objects = [];

      if(display.custom.fobs) {
        for(var fob in roominfo.fobs){
        objects.push(<MO.Fob key={"fob"+fob} signature={fob} />)
        }
      }
      if(display.custom.requests) {
        for(var request in roominfo.requests){
          let obj = this.props.roominfo.requests[request];
          objects.push(<MO.RequestIcon key={"request"+request} request={obj} />)
        }
      }
      if(display.custom.miscicons) {
        for(var miscicon in roominfo.misc.icon) {
          objects.push(<MO.MiscIcon key={miscicon} signature={miscicon} zoom={this.props.zoom}/>)
        };
      }

      return objects
    }

    GetDynamicIcons() {
      const { roominfo, display } = this.props;
      let ranges = []
      const iconlist = [];     

      roominfo.dynamic.forEach(map => {
        const region = map.regionId
        map.data.mapItems.forEach(obj => {
            switch(obj.iconType){
            //OBJECTIVES//////////////////////////
              case 4:
              case 5:
              case 6:
              case 7: //TOWNS
                if(display.objectives.towns) {
                  iconlist.push(<MO.Town key={U.signature(obj)} signature={U.signature(obj)} 
                             regionId={region} 
                             dynamic={obj} 
                             name={U.GetTownName(region,obj,this.props.roominfo.static)}/>);
                  ranges.push(this.GetRange(obj,region))
                }
                break;
              case 45: //FORTS
              case 46:
              case 47:
                if(display.objectives.forts) {
                  iconlist.push(<MO.Fort key={U.signature(obj)} signature={U.signature(obj)} regionId={region} dynamic={obj} />);
                  ranges.push(this.GetRange(obj,region))
                }
                break;
              case 28: //OBSERVATION TOWERS
                if(display.objectives.towers) {
                  iconlist.push(this.GetIcon(obj,region));
                  ranges.push(this.GetObsRange(obj,region));
                }
                break;
              case 35: //SAFEHOUSES
                if(display.objectives.safehouses) {
                  iconlist.push(this.GetIcon(obj,region));
                  ranges.push(this.GetRange(obj,region,100))
                }
                break;
              //PRODUCTION SECTION///////////////////////
                case 11://HOSPITALS
                  if(display.production.hospitals) {
                    iconlist.push(this.GetIcon(obj,region));
                  }
                  break;
                case 17://REFINERIES
                  if(display.production.refineries) {
                    iconlist.push(<MO.Refinery key={U.signature(obj)} signature={U.signature(obj)} 
                      regionId={region} dynamic={obj} />)
                  }
                  break;            
                case 34://FACTORIES
                  if(display.production.productions) {
                    iconlist.push(<MO.Production key={U.signature(obj)} signature={U.signature(obj)} 
                      regionId={region} dynamic={obj} />)
                  }
                  break;
                case 36://ADVANCED AMMO FACTORIES
                  if(display.production.armories) {
                    iconlist.push(this.GetIcon(obj,region))
                  }
                  break;
                case 37://ROCKET SITES
                  if(display.production.rocketsites) {
                    iconlist.push(this.GetIcon(obj,region))
                  }
                  break;
                case 12://VEHICLE FACTORIES
                  if(display.production.vfactories) {
                    iconlist.push(this.GetIcon(obj,region))
                  }
                  break;
                case 18://SHIPYARDS
                  if(display.production.shipyards) {
                    iconlist.push(this.GetIcon(obj,region));
                  }
                  break;
                case 33://STORAGE DEPOTS
                  if(display.production.storages) {
                    iconlist.push(<MO.Storage key={U.signature(obj)} signature={U.signature(obj)} 
                    regionId={region} dynamic={obj} />)
                  }
                  break;
                case 39://CONSTRUCTION YARDS
                  if(display.production.constructions) {
                    iconlist.push(this.GetIcon(obj,region))
                  }
                  break;
              //RESOURCE SECTION/////////////////////
                case 20:
                  if(display.resources.salvage) {
                    iconlist.push(this.GetIcon(obj,region))
                  }
                  break;
                case 21:
                  if(display.resources.components) {
                    iconlist.push(this.GetIcon(obj,region))
                  }
                  break;
                case 23:
                  if(display.resources.sulfur) {
                    iconlist.push(this.GetIcon(obj,region)) 
                  }
                  break;
              //MINE SECTION/////////////////////////
                case 38:
                  if(display.resources.mine_salvage) {
                    iconlist.push(this.GetIcon(obj,region)) 
                  }
                  break;
                case 32:
                  if(display.resources.mine_sulfur) {
                    iconlist.push(this.GetIcon(obj,region))
                  }
                  break;
                case 40:
                  if(display.resources.mine_components) {
                    iconlist.push(this.GetIcon(obj,region)) 
                  }
                  break;
                case 41:
                  if(display.resources.mine_oil) {
                    iconlist.push(this.GetIcon(obj,region)) 
                  }
                  break;
            }
          })
        })
      
      return ((this.props.zoom >= 4.5) && display.ranges) ? iconlist.concat(ranges) : iconlist;
    }

    render(){
      const { zoom } = this.props;
      const items = (zoom > 1) ? this.GetDynamicIcons() : [];
      const privateItems = (zoom > 1) ? this.GetPrivateIcons(): [];
      return(
          <React.Fragment>
            { items }
            { privateItems }
          </React.Fragment>
      );
    }
}
const mapStateToProps = store => {
    return {
        display: store.display,
        roominfo: store.roominfo
    }
}

export const MapIcons = connect(mapStateToProps)(MapIcons_);