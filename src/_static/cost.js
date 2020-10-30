//database of items
import React from 'react';
const repo = 'https://raw.githubusercontent.com/the-fellowship-of-the-warapi/Assets/master/Item Icons/'
//repo+''
var iteminfo= [
[//Resources 0
  {name:"Basic Material", i:100, b:100,src:'Materials/BasicMaterialsIcon.png'},
  {name:"Refined Material", i:100,  r:100,src:'Materials/RefinedMaterialsIcon.png'},
  {name:"Explosive Material", i:100, e:100,src:'Materials/ExplosiveMaterialIcon.png'},
  {name:"Tech Part", i:1, src:'Materials/TechPartIcon.png'},
  {name:"Upgrade Part", i:1, src:'Materials/UpgradePartIcon.png'},
  {name:"Research Part", i:10, src:'Materials/ResearchPartIcon.png'},
  {name:"Fuel", i:100, src:'Materials/ResourceFuelIcon.png'},
  {name:"Refined Fuel", i:100, src:'Materials/RefinedFuelIcon.png'},
  {name:"Heavy Explosive Material", i:100, he:100,src:'Materials/HeavyExplosiveMaterialIcon.png'}
], 
[ // Light Arms 1
{name:"Revolver", i:20, b:60, t:50, src:'Items/RevolverItemIcon.png'}, 
{name:".44", i:40, b:40, t:40, src:'Items/RevolverAmmoItemIcon.png'},
{name : "Rifle", i : 20, b : 100, t:70, src : 'Items/RifleItemIcon.png'},
{name : "7.62mm", i : 40, b : 80,  t:50,  src : 'Items/RifleAmmoItemIcon.png'},
{name:"Carbine", i:20, b:140, t:80, src:'Items/CarbineItemIcon.png'},
{name:"7.62mm Carbine", i:40, b:80, t:50, src:'Items/CarbineAmmoItemIcon.png'},
{name:"SMG", i:20, b:120, t:80, src:'Items/SubMachineGunIcon.png'},
{name:"9mm SMG", i:40, b:80, t:50, src:'Items/SubMachineGunAmmoIcon.png'},
{name : "Shotgun", i: 20,  b: 120, t:80, src : 'Items/ShotgunItemIcon.png'},
{name : "Buckshot", i: 40,  b: 80, t:50, src: 'Items/ShotgunAmmoItemIcon.png'},
{name:"Storm Rifle", i:20, r:20, t:100, src:'Items/AssaultRifleItemIcon.png'},
{name:"7.92mm", i:40, b:120, t:60, src:'Items/AssaultRifleAmmoItemIcon.png'},
{name:"Sniper Rifle", i:5, b:200, r:15, t:125, src:'Items/SniperRifleItemIcon.png'},
{name:"7.92mm Sniper", i:10, b:150, t:100, src:'Items/SniperRifleAmmoItemIcon.png'},
{name:"Smoke Grenade", i:10, b:120, t:75, src:'Items/SmokeGrenade.png'},
{name:"Light Machine Gun", i:10, r:20, t:75, src:'Items/LightMachineGunIcon.png'}
//{i:, b:, name:"",src:""},
],
[ //Heavy Arms 2
{name:"Machine Gun", i:10, r:30, t:100, src:'Items/MachineGunItemIcon.png'},
{name:"12.7mm", i:20, b:100, t:70, src:'Items/MachineGunAmmoIcon.png'},
{name:"Mortar", i:5, b:100, r:25, t:50, src:'Items/MortarItemIcon.png'},
{name:"Mortar Shell", i:15, b:60, he:15, t:112, src:'Items/MortarShellIcon.png'},
{name:"Mortar Shrapnel Shell", i:15, b:90, e:30, t:112, src:'Items/MortarShellShrapnel.png'},
{name:"Mortar Flare Shell", i:15, b:60, e:15, t:112, src:'Items/MortarShellFlare.png'},
{name:"Green Ash", i:20, b:140, t:100, src:'Items/DeadlyGas01Icon.png'},
{name:"RPG", i:5, b:100,r:25, t:50, src:'Items/RpgItemIcon.png'},
{name:"RPG Shell", i:15, b:60, e:75, t:112, src:'Items/RpgAmmoItemIcon.png'},
{name:"Sticky Bomb", i:10, b:50, e:50, t:75, src:'Items/StickyBombIcon.png'},
{name:"HE Grenade", i:20, b:180, e:40, t:120, src:'Items/HEGrenadeItemIcon.png'},
{name:"14.5mm", i:20, b:200, t:100, src:'Items/FieldMGAmmo.png'},
{name:"Anti-Tank Rifle", i:5, b:150, t:37, src:'Items/ATRifleItemIcon.png'},
{name:"13.5mm", i:10, b:100, t:100, src:'Items/ATRifleAmmoItemIcon.png'},
{name:"Lt. Arty Shell", i:20, b:160, he:40, t:150, src:'Items/Light_Artillery_Ammo.png'},
{name:"Artillery Shell", i:20, b:200, he:100, t:200, src:'Items/ArtilleryAmmoIcon.png'},
{name:"Howitzer Shell", i:20, b:80, he:20, t:200, src:'Items/HowitzerShell.png'},
{name:"Howitzer Smoke Shell", i:20, b:120, e:40, t:200, src:'Items/HowitzerShellSmoke.png'},
{name:"Howitzer Green Ash Shell", i:20, b:120, e:80, t:200, src:'Items/HowitzerShellGreenAsh.png'},
{name:"Frag Grenade", i:20, b:100, e:20, t:100,  src:'Items/GrenadeItemIcon.png'},
{name:"40mm Round", i:20, b:160, e:120, t:200, src:'Items/LightTankAmmoItemIcon.png'}, 
{name:"75mm Round", i:20, b:200, e:400, t:200,src:'Items/BattleTankAmmoItemIcon.png'}
  //{i:, b:, name:"",src:""},
],
[//Utility 3
{name:"Binoculars", i:5, b:75, t:50, src:'Items/BinocularsItemIcon.png'},
{name:"Gas Mask", i:20, b:160, t:100, src:'Items/GasmaskIcon.png'},
{name:"Gas Mask Filter", i:20, b:100,src:'Items/GasMaskFilterIcon.png'}, 
{name:"Wrench", i:5, b:75, t:50, src:'Items/WorkWrench.png'},
{name:"Radio", i:5, b:100, t:50, src:'Items/RadioItemIcon.png'},
{name:"Radio Backpack", i:5, b:150, t:75, src:'Items/RadioBackpackItemIcon.png'},
{name:"Bayonet", i:20, b:40, t:30, src:'Items/BayonetIcon.png'},
{name:"Grenade Launcher", i:20, b:40, r:60, t:30, src:'Items/GrenadeAdapterIcon.png'},
{name:"Satchel Charge", i:5, b:100, he:15, t:100, src:'Items/SatchelCharge.png'},
{name:"Sledge Hammer", i:10, b:200, t:100, src:'Items/SledgeHammerItemIcon.png'},
{name:"Anti-Tank Mine", i:10, b:100,e:10, t:200, src:'Items/MineItemIcon.png'},
{name:"Rocket Booster",i:1, r:800, t:600, src:'Items/RocketBoosterIcon.png'},
{name:"Shovel", i:10, b:200, t:50, src:'Items/ShovelIcon.png'}

  //{i:, b:, name:"",src:""},
],
[//Medicine 4
{name:"Bandages", i:80, b:160, t:25, src:'Items/BandagesItemIcon.png'},
{name:"First Aid Kit", i:10, b:60, t:35, src:'Items/FirstAidKitIcon.png'},
{name:"Trauma Kit", i:10, b:80, t:50, src:'Items/TraumaKitItemIcon.png'},
{name:"Blood Plasma", i:80, b:80, t:50, src:'Items/BloodPlasmaItemIcon.png'}
  //{i:, b:, name:"",src:""},
],
[//Supplies 5 
{name:"Soldier Supplies", i:10, b:80, t:120, src:'Items/SoldierSupplies.png'},
{name:"Garrison Supplies", i:150, b:75, t:300, src:'Items/GarrisonSuppliesIcon.png'}
  //{i:, b:, name:"",src:""},
],
[//Special ammo 6
  {name:"Warhead", i:1, r:200, he:1000, t:600, src:'Items/RocketWarheadIcon.png'},
  {name:"40mm HE Round", i:20, b:160, he:140, t:200, src:'Items/40mmHER.png'},
  {name:"75mm HE Round", i:20, b:200, he:400, t:200, src:'Items/75mmHER.png'},
  {name: "Artillery HE Shell", i:20, b:200, he:200,  src:'Items/ArtyHES.png' },
  {name:"40mm AP Round", i:20, b:160, r:60, e:120, t:200, src:'Items/40mmAPR.png'},
  {name:"75mm AP Round", i:20, b:200, r:200, e:400, t:200, src:'Items/75mmAPR.png'},
  {name: "Artillery AP Shell", i:20, b:200, r:200,  src:'Items/ArtyAPS.png' },
  {name:"40mm Shrapnel Round", i:20, b:160, r:40, t:200, src:'Items/40mmSR.png'},
  {name:"75mm Shrapnel Round", i:20, b:200, r:80, t:200, src:'Items/75mmSR.png'}
],
[//Vehicles
{name:"Ambulance", i:1, b:150, v:true, src:'Vehicles/Ambulance.png'},
{name:"Armored Car", i:1, r:40, v:true, src:'Vehicles/ArmoredCarColonial.png'},
{name:"Battle Tank", i:1, r:400, v:true, src:'Vehicles/BattleTankColonial.png'},
{name:"Crane", i:1, b:125, v:true, src:'Vehicles/CraneVehicleIcon.png'},
{name:"Construction Vehicle", i:1, b:100, v:true, src:'Vehicles/ConstructionVehicleIcon.png'},
{name:"Field Artillery", i:1, r:240,  v:true, src:'Vehicles/FieldArtilleryColonial.png'},
{name:"Field MG", i:1, r:25, v:true, src:'Vehicles/FMGColonial.png'},
{name:"Flatbed Truck", i:1, r:30, v:true, src:'Vehicles/FlatbedTruckVehicleIcon.png'},
{name:"Half-Track", i:1, r:70, v:true, src:'Vehicles/HalfTrackColonial.png'},
{name:"Landing APC", i:1, r:20, v:true, src:'Vehicles/APC_Colonial.png'},
{name:"Light Tank", i:1, r:140, v:true, src:'Vehicles/LightTankColonial.png'},
{name:"Motorcycle", i:1, b:85, v:true, src:'Vehicles/MotorcycleVehicleIcon.png'},
{name:"Fuel Tanker", i:1, b:100, v:true, src:'Vehicles/FuelTankerColonial.png'},
{name:"Truck", i:1, b:100, v:true, src:'Vehicles/TruckColonial.png'},
{name:"L. Utility Vehicle", i:1, r:10, v:true, src:'Vehicles/LUV_Colonial.png'}

  /*{name:"Vehicle", i:1, b:0, r:0, e:0, t:0, v:true, src:""}*/
  //{i:, b:, name:"",src:""},
],
[//Navy
{name:"Barge", i:1, b:150, v:true, src:'Vehicles/BargeVehicleIcon.png'},
{name:"Freighter", i:1, r:300, v:true, src:'Vehicles/FreighterVehicleIcon.png'},
{name:"Gunboat", i:1, r:120, v:true, src:'Vehicles/GunBoat.png'},
{name:"Cargo Ship", i:1, r:300, v:true, src:'Vehicles/Cargoship.png'}
]
]
for(let i =0;i<iteminfo.length;i++){
  for(let j=0;j<iteminfo[i].length;j++){
    iteminfo[i][j].src= repo + iteminfo[i][j].src
  }
}
var filters=[
  repo+'Filters/IconFilterAll.png',
  repo+'Materials/BasicMaterialsIcon.png',
  repo+'Filters/IconFilterSmallWeapons.png',
  repo+'Filters/IconFilterHeavyWeapons.png',
  repo+'Filters/IconFilterUtility.png',
  repo+'Filters/IconFilterMedical.png',
  repo+'Filters/IconFacilitiesSupplies.png',
  repo+'Filters/IconFacilitiesExplosive.png',
  repo+'Filters/IconFilterVehicle.png'
  ]
class Filter extends React.Component{
  constructor(props) {
    super(props);
  }
  
  render(){
  let filterrow =[];
  filterrow = filters.map((obj,index) => <button key={obj+index} type="button" name="filter" value={index} className={this.props.filter==index ? "btn card_filterbtn selectedfilter" : "btn card_filterbtn"} disabled={this.props.filter==index} onClick={()=>this.props.setfilter(index)}>
        <img className="card_ambush_removeimage" src={obj}/>
      </button>)  
    
  return <div className="btn-group card_filtergroup">{filterrow}</div>
  }
}

function FindItem(array,item){
  //console.log("Looking for "); console.log(item); console.log("in"); console.log(array);
  for(var i=0;i<array.length;i++){
    if(item.catid==array[i].catid&&item.itemid==array[i].itemid){
      return i
    }
  }
  return -1
}

export default {
  cost:iteminfo,
  filters:filters,
  filterrow:Filter,
  findItem:FindItem
}
//disabled={this.state.selectedfilter==index} onClick={()=>this.SelectFilter(index)}