import React from 'react';

const L = require('leaflet');
const ReactL = require('react-leaflet');

const Leaflet_Pulse = require('leaflet-pulse-icon');

const repo = 'https://raw.githubusercontent.com/the-fellowship-of-the-warapi/Assets/master/Map%20Icons/';
const repo2 = 'https://raw.githubusercontent.com/the-fellowship-of-the-warapi/Assets/master/Item%20Icons/';
const MapIcon = L.Icon.extend({
	 	options: {
    iconSize: [16, 16],
    iconAnchor: [8, 8],
    popupAnchor: [0, 0],
  },
});
const MineIcon = L.Icon.extend({
	 	options: {
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, 0],
  },
});
const TownIcon = L.Icon.extend({
	 	options: {
    iconSize: [24, 24], // 34
    iconAnchor: [12, 12],
    popupAnchor: [0, 0],
    className: 'map_townicon',
  },
});
const HQIcon = L.Icon.extend({
	 	options: {
    iconSize: [34, 34], // 34
    iconAnchor: [17, 17],
    popupAnchor: [0, 0],
  },
});
const PulseTownIcon = L.icon.pulse({
	 	options: {
    iconSize: [34, 34],
    iconAnchor: [17, 17],
    popupAnchor: [0, 0],
  },
});
const FortIcon = L.Icon.extend({
	 	options: {
    iconSize: [20, 20],
    iconAnchor: [10, 10],
    popupAnchor: [0, 0],
    className: 'map_townicon',
  },
});
const min_FortIcon = L.Icon.extend({
	 	options: {
    iconSize: [16, 16],
    iconAnchor: [8, 8],
    popupAnchor: [0, 0],
  },
});

const SelectIcon = L.Icon.extend({
	 	options: {
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, 0],
    iconUrl: 'https://cdn.glitch.com/dd3f06b2-b7d4-4ccc-8675-05897efc4bb5%2Fgfds-3.png?v=1560690535457',
    className: 'map_icon_selected',
  },
});
const FilterIcon = L.Icon.extend({
	 	options: {
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, 0],
    iconUrl: 'https://cdn.glitch.com/dd3f06b2-b7d4-4ccc-8675-05897efc4bb5%2Ffdsa.png?v=1561113652307',
  },
});
const RequestIconBase = L.Icon.extend({
	 	options: {
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, 0],
    iconUrl: 'https://cdn.glitch.com/6393f3fd-16a7-4641-ae3d-994f8e7cea4e%2FIconStatusEncumberedRed.png?1549573551066',
    className: 'map_icon_request',
  },
});
const RequestIcon = {
  incomplete: new RequestIconBase({ iconUrl: 'https://cdn.glitch.com/6393f3fd-16a7-4641-ae3d-994f8e7cea4e%2FIconStatusEncumberedRed.png?1549573551066' }),
  complete: new RequestIconBase({ iconUrl: 'https://cdn.glitch.com/dd3f06b2-b7d4-4ccc-8675-05897efc4bb5%2FIconStatusEncumbered.png?1554591180726' }),
};
const FobIconBase = L.Icon.extend({
	 	options: {
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, 0],
  },
});
const FobIcon = [[new FobIconBase({ iconUrl: `${repo}Bases/MapIconForwardBase1.png` }), // LVL 0 NEUT
  new FobIconBase({ iconUrl: `${repo}Bases/MapIconForwardBase1Colonial.png` }), // LVL 0 COL
  new FobIconBase({ iconUrl: `${repo}Bases/MapIconForwardBase1Warden.png` })], [ // LVL 0 WAR
  new FobIconBase({ iconUrl: `${repo}Bases/MapIconForwardBase2.png` }), // LVL 1 NEUT
  new FobIconBase({ iconUrl: `${repo}Bases/MapIconForwardBase2Colonial.png` }), // LVL 1 COL
  new FobIconBase({ iconUrl: `${repo}Bases/MapIconForwardBase2Warden.png` })], [ // LVL 1 WAR
  new FobIconBase({ iconUrl: `${repo}Bases/MapIconForwardBase3.png` }), // LVL 2 NEUT
  new FobIconBase({ iconUrl: `${repo}Bases/MapIconForwardBase3Colonial.png` }), // LVL 2 COL
  new FobIconBase({ iconUrl: `${repo}Bases/MapIconForwardBase3Warden.png` })]]; // LVL 2 WAR


const MiscIcon = L.Icon.extend({
	 	options: {
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, 0],
  },
});
const MiscIconArray = [
  { name: 'Note', url: 'https://cdn.glitch.com/dd3f06b2-b7d4-4ccc-8675-05897efc4bb5%2Ffdsag.png?1554889393144' }, // 0 NOTE

  { name: 'Enemy', url: 'https://cdn.glitch.com/6393f3fd-16a7-4641-ae3d-994f8e7cea4e%2FIndicator_queue.png?1548525724233' }, // 1

  { name: 'Attack', url: 'https://cdn.glitch.com/dd3f06b2-b7d4-4ccc-8675-05897efc4bb5%2Fattack.png?1554589500531' }, // 2

  { name: 'Defend', url: 'https://cdn.glitch.com/dd3f06b2-b7d4-4ccc-8675-05897efc4bb5%2Fdefend.png?v=1554589500846' }, // 3

  { name: 'Move', url: 'https://cdn.glitch.com/dd3f06b2-b7d4-4ccc-8675-05897efc4bb5%2Fmove.png?1554589501432' }, // 4

  { name: 'Howitzer', url: 'https://cdn.glitch.com/dd3f06b2-b7d4-4ccc-8675-05897efc4bb5%2Ffsdd-9.png?1558099235579' }, // 5

  { name: 'CV', url: 'https://cdn.glitch.com/dd3f06b2-b7d4-4ccc-8675-05897efc4bb5%2Fcv.png?1554890422722' }, // 6

  { name: 'Build', url: 'https://cdn.glitch.com/dd3f06b2-b7d4-4ccc-8675-05897efc4bb5%2FUndsfsed-6.png?1558094804796' }, // 7

  { name: ' Squad 1', url: 'https://cdn.glitch.com/dd3f06b2-b7d4-4ccc-8675-05897efc4bb5%2F1s.png?1557484360213' }, // 8
  { name: ' Squad 2', url: 'https://cdn.glitch.com/dd3f06b2-b7d4-4ccc-8675-05897efc4bb5%2Fs2.png?1557485248288' }, // 9
  { name: ' Squad 3', url: 'https://cdn.glitch.com/dd3f06b2-b7d4-4ccc-8675-05897efc4bb5%2Fs3.png?1557485249108' }, // 10
  { name: ' Squad 4', url: 'https://cdn.glitch.com/dd3f06b2-b7d4-4ccc-8675-05897efc4bb5%2Fs4.png?1557485250384' }, // 11
  { name: ' Squad 5', url: 'https://cdn.glitch.com/dd3f06b2-b7d4-4ccc-8675-05897efc4bb5%2Fs5.png?1557485251552' }, // 12

  { name: ' Objective 1', url: 'https://cdn.glitch.com/dd3f06b2-b7d4-4ccc-8675-05897efc4bb5%2FOBJ1.png?1554589501515' }, // 13
  { name: ' Objective 2', url: 'https://cdn.glitch.com/dd3f06b2-b7d4-4ccc-8675-05897efc4bb5%2FOBJ2.png?1554589501600' }, // 14
  { name: ' Objective 3', url: 'https://cdn.glitch.com/dd3f06b2-b7d4-4ccc-8675-05897efc4bb5%2FOBJ3.png?1554589501849' }, // 15

  { name: ' Truck', url: 'https://cdn.glitch.com/dd3f06b2-b7d4-4ccc-8675-05897efc4bb5%2Fsh21.png?1558524397895' }, // 16
  { name: ' Bus', url: 'https://cdn.glitch.com/dd3f06b2-b7d4-4ccc-8675-05897efc4bb5%2Fsh1.png?1558524400417' }, // 17
  { name: ' Storm Tank', url: 'https://cdn.glitch.com/dd3f06b2-b7d4-4ccc-8675-05897efc4bb5%2Fsh31.png?1558524397110' }, // 18
  { name: ' Tractor', url: 'https://cdn.glitch.com/dd3f06b2-b7d4-4ccc-8675-05897efc4bb5%2Ffdsa1.png?1558524670995' }, // 19
  { name: ' Staff Car', url: 'https://cdn.glitch.com/dd3f06b2-b7d4-4ccc-8675-05897efc4bb5%2Fsh3.png?1558524399172' }, // 20

  { name: ' Barge', url: 'https://cdn.glitch.com/dd3f06b2-b7d4-4ccc-8675-05897efc4bb5%2FBRG-2.png?1558692837627' }, // 21
  { name: ' Gunboat', url: 'https://cdn.glitch.com/dd3f06b2-b7d4-4ccc-8675-05897efc4bb5%2FGBT2.png?1558692846451' }, // 22
  { name: ' APC', url: 'https://cdn.glitch.com/dd3f06b2-b7d4-4ccc-8675-05897efc4bb5%2FAPC-2.png?1558692836707' }, // 23
  { name: ' Cargo', url: 'https://cdn.glitch.com/dd3f06b2-b7d4-4ccc-8675-05897efc4bb5%2FCARGO.png?1558692847027' }, // 24

  {
    name: 'Mortar',
    url: `${repo2}Items/MortarItemIcon.png`,
    shadow: '/_static/assets/arty/shadow_mortar.png',
    size: 130,
  }, // 25
  {
    name: 'Gunboat',
    url: `${repo2}Vehicles/GunboatColonial.png`,
    shadow: '/_static/assets/arty/shadow_gunboat.png',
    size: 200,
  }, // 26
  {
    name: 'Field Artillery',
    url: `${repo2}Vehicles/FieldArtilleryColonial.png`,
    shadow: '/_static/assets/arty/shadow_fa.png',
    size: 300,
  }, // 27
  {
    name: 'Howitzer',
    url: `${repo2}Structures/StaticArtilleryStructureIcon.png`,
    shadow: '/_static/assets/arty/shadow_howi.png',
    size: 300,
  }, // 28

  { name: ' CV', url: 'https://cdn.glitch.com/dd3f06b2-b7d4-4ccc-8675-05897efc4bb5%2Fcv.png?1554890422722' }, // 29
  { name: ' Crane', url: 'https://cdn.glitch.com/84b19724-a86b-4caa-8e69-1e9c973e043f%2Fcrane1.png?v=1563106383574' }, // 30
  { name: ' Flatbed', url: 'https://cdn.glitch.com/84b19724-a86b-4caa-8e69-1e9c973e043f%2Ffltbd.png?v=1563106384699' }, // 31
  { name: ' Container', url: 'https://cdn.glitch.com/84b19724-a86b-4caa-8e69-1e9c973e043f%2Fconta1.png?v=1563106385043' }, // 32
  { name: ' Oil Truck', url: 'https://cdn.glitch.com/84b19724-a86b-4caa-8e69-1e9c973e043f%2Foilta.png?v=1563106384068' }, // 33

  {
    name: 'Storm Cannon',
    url: `${repo2}Structures/LongRangedArtilleryIcon.png`,
    shadow: '/_static/assets/arty/shadow_stormcannon.png',
    size: 2000,
  }, // 34
];

const icons = ['', // 0
  '', // 1
  '', // 2
  '', // 3
  {
    n: 'Bases/MapIconHomeBaseNeutral.png',
    c: 'Bases/MapIconHomeBaseColonial.png',
    w: 'Bases/MapIconHomeBaseWarden.png',
  }, // 4 STAR BASE

  {
    n: 'Bases/MapIconStaticBase1.png',
    c: 'Bases/MapIconStaticBase1Colonial.png',
    w: 'Bases/MapIconStaticBase1Warden.png',
  }, // 5 TOWN HALL T1

  {
    n: 'Bases/MapIconStaticBase2.png',
    c: 'Bases/MapIconStaticBase2Colonial.png',
    w: 'Bases/MapIconStaticBase2Warden.png',
  }, // 6 TOWN HALL T2

  {
    n: 'Bases/MapIconStaticBase3.png',
    c: 'Bases/MapIconStaticBase3Colonial.png',
    w: 'Bases/MapIconStaticBase3Warden.png',
  }, // 7 TOWN HALL T3

  8,
  'Production/MapIconRocketSiteUsed.png', // 9 USED ROCKETSITE
  'Bases/MapIconScorchedTown.png', // 10 NUKED LOCATION
  {
    n: 'Production/MapIconHospital.png',
    c: 'Production/MapIconHospitalColonial.png',
    w: 'Production/MapIconHospitalWarden.png',
  }, // 11 HOSPITAL
  'Production/MapIconVehicle.png', // 12 VEHICLE FACTORY
  13, 14, 15, 16, // 16
  {
    n: 'Production/MapIconManufacturing.png',
    c: 'Production/MapIconManufacturingColonial.png',
    w: 'Production/MapIconManufacturingWarden.png',
  }, // 17 REFINERY

  'Production/MapIconShipyard.png', // 18 SHIPYARD
  19, // 19
  'Resources/ResourceSalvage.png', // 20 SALVAGE NODE
  'Resources/ResourceComponents.png', // 21 COMPONENTS NODE
  22, // 22
  'Resources/ResourceSulfur.png', // 23 SULFUR NODE
  24, 25, 26, // 26
  {
    n: 'Bases/MapIconKeep.png',
    c: 'Bases/MapIconKeepColonial.png',
    w: 'Bases/MapIconKeepWarden.png',
  }, // 27 KEEP

  {
    n: 'Bases/MapIconObservationTower.png',
    c: 'Bases/MapIconObservationTowerColonial.png',
    w: 'Bases/MapIconObservationTowerWarden.png',
  }, // 28 OBSERVATION TOWER

  {
    n: 'Bases/MapIconFort.png',
    c: 'Bases/MapIconFortColonial.png',
    w: 'Bases/MapIconFortWarden.png',
    min: {
      n: 'Bases/min/Fort2.png',
      c: 'Bases/min/Fort2Colonial.png',
      w: 'Bases/min/Fort2Warden.png',
    },
  }, // 29 FORTS
  30, 31,
  'Resources/MineSulfur.png', // 32 SULFUR MINE

  {
    n: 'Production/MapIconStorageFacility.png',
    c: 'Production/MapIconStorageFacilityColonial.png',
    w: 'Production/MapIconStorageFacilityWarden.png',
  }, // 33 STORAGE DEPOTS

  {
    n: 'Production/MapIconFactory.png',
    c: 'Production/MapIconFactoryColonial.png',
    w: 'Production/MapIconFactoryWarden.png',
  }, // 34 FACTORY

  {
    n: 'Bases/Safehouse.png',
    c: 'Bases/SafehouseColonial.png',
    w: 'Bases/SafehouseWarden.png',
  }, // 35 SAFEHOUSE

  {
    n: 'Production/MapIconArmory.png',
    c: 'Production/MapIconArmoryColonial.png',
    w: 'Production/MapIconArmoryWarden.png',
  }, // 36 ADVANCED AMMO FACTORY (ARMORY)

  'Production/MapIconRocketSite.png', // 37 ROCKET SITE
  'Resources/MineSalvage.png', // 38 SALVAGE MINE
  'Production/MapIconConstructionYard.png', // 39 CONSTRUCTION YARD
  'Resources/MineComponents.png', // 40 COMPONENT MINE
  'Resources/MineOil.png', // 41 OIL MINE
  '', // 42
  '', // 43
  '', // 44
  {
    n: 'Bases/MapIconRelicBase.png',
    c: 'Bases/MapIconRelicBaseColonial.png',
    w: 'Bases/MapIconRelicBaseWarden.png',
  },
  {
    n: 'Bases/MapIconRelicBase.png',
    c: 'Bases/MapIconRelicBaseColonial.png',
    w: 'Bases/MapIconRelicBaseWarden.png',
  },
  {
    n: 'Bases/MapIconRelicBase.png',
    c: 'Bases/MapIconRelicBaseColonial.png',
    w: 'Bases/MapIconRelicBaseWarden.png',
  }, // RELIC BASES
  /* {n:'',
     c:'',
     w:''}         */
];

function GetIconURL(icontype, prop) {
  const item = icons[icontype];
  if (prop == undefined || item[prop] == undefined) {
    return repo + item;
  }
  return repo + item[prop];
}

class SimpleIcon extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (JSON.stringify(this.props.obj) != JSON.stringify(nextProps.obj)) {
      return true;
    }
    return false;
  }

  render() {
    const { obj } = this.props;
    const { position } = this.props;

    let opacity = 1;
    if (obj.flags & 0x04) {
      opacity = 0.5;
    }
    const objicon = GenerateIcon(obj);
    /* if(obj.flags&0x10&&obj.iconType!=37){
      objicon = iconarray[10]
    } */
    return (
      <ReactL.Marker key={`${position[0]}|${position[1]}|${obj.iconType}`} opacity={opacity} position={position} icon={objicon}>
      </ReactL.Marker>
    );
  }
}

function GetVictoryAddon(obj, position) {
  let victorycolor = '#a0a0a0';
  let fillOpacity = 0;
  if (obj.flags & 0x20) {
    if (obj.teamId == 'COLONIALS') {
      victorycolor = '#516c4b';
      fillOpacity = 0.6;
    } else if (obj.teamId == 'WARDENS') {
      victorycolor = '#235683';
      fillOpacity = 0.6;
    }
  }
  return <ReactL.CircleMarker key={`stats_map_victoryaddon${fillOpacity}${obj.teamId}${obj.x}${obj.y}`} center={position} color="#000000" fillColor={victorycolor} fillOpacity={fillOpacity} radius={18} weight={1} />;
}

function GenerateHQIcon(team) {
  let iconUrl = icons[4][team[0].toLowerCase()];
  iconUrl = repo + iconUrl;
  return new HQIcon({ iconUrl });
}

function GenerateIcon(obj, param) {
  let iconUrl = '';
  if (obj.flags & 0x10) {
    if (obj.iconType == 37) {
      iconUrl = icons[11];
    } else {
      iconUrl = icons[10];
    }
  } else {
    switch (obj.iconType) {
      case 5: case 6: case 7: case 11: case 17: case 27: case 28: case 29: case 33: case 34: case 35: case 36: case 45: case 46: case 47:
        if (param == 'min') {
          iconUrl = icons[obj.iconType].min[obj.teamId[0].toLowerCase()];
        } else {
          iconUrl = icons[obj.iconType][obj.teamId[0].toLowerCase()];
        }
        break;
      default:
        iconUrl = icons[obj.iconType];
        break;
    }
  }
  iconUrl = repo + iconUrl;
  switch (obj.iconType) {
    case 5: case 6: case 7: case 27: case 28: case 35:
      if (obj.flags & 0x02) {
        return new MapIcon({ iconUrl });
      }
      return new TownIcon({ iconUrl });

    case 12: case 17: case 20: case 23: case 33: case 34: case 36: case 37: case 39:
      return new MapIcon({ iconUrl });
    case 32: case 38: case 40: case 41:
      return new MineIcon({ iconUrl });
    default: return new MapIcon({ iconUrl });
  }
}
export default {
  // iconarray:iconarray,
  icons,
  FilterIcon,
  SelectIcon,
  RequestIcon,
  // GetIcon:GetIcon,
  MiscIcon,
  FobIcon,
  MiscIconArray,
  SimpleIcon,
  GetIconURL,
  GetVictoryAddon,
  GenerateIcon,
  GenerateHQIcon,
};

/*    PortBase(4)

    StaticBase1(5)
    StaticBase2(6)
    StaticBase3(7)

    ForwardBase1(8)
    ForwardBase2(9)
    ForwardBase3(10)

    Hospital          (11)
    VehicleFactory    (12)
    Armory            (13)
    SupplyStation     (14)
    Workshop          (15)
    ManufacturingPlant(16)
    Refinery          (17)
    Shipyard          (18)
    TechCenter        (19)

    SalvageField    (20)
    ComponentField  (21)
    FuelField       (22)
    SulfurField     (23)
    WorldMapTent    (24)
    TravelTent      (25)
    TrainingArea    (26)
    SpecialBase     (27) v0.14
    ObservationTower(28) v0.14
    Fort            (29) v0.14
    TroopShip       (30) v0.14
    ScrapMine       (31) v0.16
    SulfurMine      (32) v0.16
    StorageFacility (33) v0.17
    Factory         (34) v0.17
    Garrison Station(35) v0.20
    Ammo Factory	(36) v0.20
    Rocket Site 	(37) v0.20     */


/*  IsVictoryBase           (0x01)
    IsHomeBase              (0x02)
    IsBuildSite             (0x04)
    IsScorched              (0x10) v0.22
    IsTownClaimed           (0x20) v0.26 */
