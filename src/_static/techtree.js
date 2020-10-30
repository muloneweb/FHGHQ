//This file, AS THE NAME SUGGESTS, contains the tech tree of the game
//tech - current tech, needtech - tech required, bp - blueprint production time in minutes
const repo =
  "https://raw.githubusercontent.com/the-fellowship-of-the-warapi/Assets/master/Item Icons/";
var techtree = [
  {
    name: "Bayonet",
    tech: 0,
    needtech: 75,
    y: 870,
    x: 110,
    url: repo + "Items/BayonetIcon.png"
  },

  {
    name: "Bandages",
    tech: 0,
    needtech: 50,
    y: 660,
    x: 110,
    url: repo + "Items/BandagesItemIcon.png"
  },
  {
    name: "First Aid Kit",
    tech: 0,
    needtech: 100,
    y: 660,
    x: 280,
    url: repo + "Items/FirstAidKitIcon.png"
  },
  {
    name: "Trauma Kit",
    tech: 0,
    needtech: 150,
    y: 660,
    x: 450,
    url: repo + "Items/TraumaKitItemIcon.png"
  },

  {
    name: "Shotgun",
    tech: 0,
    needtech: 200,
    y: 940,
    x: 330,
    url: repo + "Items/ShotgunItemIcon.png"
  },
  {
    name: "SMG",
    tech: 0,
    needtech: 200,
    y: 800,
    x: 330,
    url: repo + "Items/SubMachineGunIcon.png"
  },

  {
    name: "Revolver",
    tech: 0,
    needtech: 250,
    y: 870,
    x: 550,
    url: repo + "Items/RevolverAmmoItemIcon.png"
  },
  {
    name: "Grenade Launcher",
    tech: 0,
    needtech: 200,
    y: 940,
    x: 770,
    url: repo + "Items/GrenadeAdapterIcon.png"
  },
  {
    name: "Green Ash",
    tech: 0,
    needtech: 200,
    y: 800,
    x: 770,
    url: repo + "Items/DeadlyGas01Icon.png"
  },

  {
    name: "Motorcycle",
    tech: 0,
    needtech: 250,
    y: 870,
    x: 990,
    url: repo + "Vehicles/MotorcycleVehicleIcon.png"
  },
  {
    name: "Garrison Supplies",
    tech: 0,
    needtech: 50,
    y: 1010,
    x: 990,
    url: repo + "Items/GarrisonSuppliesIcon.png"
  },
  {
    name: "AT Pillbox",
    tech: 0,
    needtech: 300,
    y: 730,
    x: 990,
    url: repo + "Structures/SunkenPillboxIcon.png"
  },

  {
    name: "Field MG",
    tech: 0,
    needtech: 300,
    y: 940,
    x: 1210,
    url: repo + "Vehicles/FieldMGVehicleIcon.png"
  },
  {
    name: "Gas Mask",
    tech: 0,
    needtech: 200,
    y: 800,
    x: 1210,
    url: repo + "Items/GasmaskIcon.png"
  },
  //{name:"Shipping Container",tech:0,needtech:100,y:660,x:1210,url:'https://cdn.glitch.com/dd3f06b2-b7d4-4ccc-8675-05897efc4bb5%2FShippingContainerStructureIcon.png?v=1560477615277'},

  {
    name: "Reinforced Wall",
    tech: 0,
    needtech: 400,
    y: 1010,
    x: 1870,
    url: repo + "Structures/MetalWallIcon.png"
  },
  {
    name: "Sniper Rifle",
    tech: 0,
    needtech: 300,
    y: 1010,
    x: 1430,
    url: repo + "Items/SniperRifleItemIcon.png"
  },
  {
    name: "Binoculars",
    tech: 0,
    needtech: 250,
    y: 730,
    x: 1430,
    url: repo + "Items/BinocularsItemIcon.png"
  },

  {
    name: "Howitzer",
    tech: 0,
    needtech: 300,
    y: 940,
    x: 1650,
    url: repo + "Structures/StaticArtilleryStructureIcon.png"
  },
  {
    name: "Smoke Grenade",
    tech: 0,
    needtech: 300,
    y: 800,
    x: 1650,
    url: repo + "Items/SmokeGrenade.png"
  },

  {
    name: "Transport Bus",
    tech: 0,
    needtech: 200,
    y: 870,
    x: 1430,
    url: repo + "Vehicles/BusColonial.png"
  },
  {
    name: "Garrisoned House",
    tech: 0,
    needtech: 600,
    y: 870,
    x: 1870,
    url: repo + "Structures/GarrisonStructureIcon.png"
  },
  //{name:"Sulfur Mine",tech:0,needtech:400,y:730,x:1870,url:'https://cdn.glitch.com/6393f3fd-16a7-4641-ae3d-994f8e7cea4e%2FIcon_SulfurMine.png?1548194104374'},

  {
    name: "HE Grenade",
    tech: 0,
    needtech: 450,
    y: 870,
    x: 2090,
    url: repo + "Items/HEGrenadeItemIcon.png"
  },
  {
    name: "Heavy Gate",
    tech: 0,
    needtech: 200,
    y: 1010,
    x: 2090,
    url: repo + "Structures/GateStructureIcon.png"
  },
  //{name:"Scrap Mine",tech:0,needtech:400,y:730,x:2090,url:'https://cdn.glitch.com/6393f3fd-16a7-4641-ae3d-994f8e7cea4e%2FScrapMineIcon.png?1548192483952'},

  {
    name: "Sledge Hammer",
    tech: 0,
    needtech: 450,
    y: 870,
    x: 2260,
    url: repo + "Items/SledgeHammerItemIcon.png"
  },
  {
    name: "L. Utility Vehicle",
    tech: 0,
    needtech: 200,
    y: 730,
    x: 2260,
    url: repo + "Vehicles/LUV_Colonial.png"
  },
  {
    name: "Armored Car",
    tech: 0,
    needtech: 300,
    y: 1010,
    x: 2260,
    bp: 180,
    url: repo + "Vehicles/ArmoredCarColonial.png"
  },

  {
    name: "Field Base",
    tech: 0,
    needtech: 750,
    y: 870,
    x: 2430,
    url: repo + "Structures/ForwardBase2Icon.png"
  },
  {
    name: "HMG",
    tech: 0,
    needtech: 750,
    y: 730,
    x: 2430,
    url: repo + "Items/HeavyMachineGunIcon.png"
  },
  {
    name: "Carbine",
    tech: 0,
    needtech: 750,
    y: 1010,
    x: 2430,
    url: repo + "Items/CarbineItemIcon.png"
  },

  // {name:"AT Sticky Bomb",tech:0,needtech:525,y:230,x:240,url:'https://cdn.glitch.com/6393f3fd-16a7-4641-ae3d-994f8e7cea4e%2FStickyBombIcon.png?1548192483582'},
  {
    name: "AT Rifle",
    tech: 0,
    needtech: 525,
    y: 160,
    x: 120,
    url: repo + "Items/ATRifleItemIcon.png"
  },
  {
    name: "Mortar",
    tech: 0,
    needtech: 525,
    y: 440,
    x: 120,
    url: repo + "Items/MortarItemIcon.png"
  }, //290
  {
    name: "Freighter",
    tech: 0,
    needtech: 300,
    y: 300,
    x: 120,
    url: repo + "Vehicles/FreighterVehicleIcon.png"
  },
  //{name:"Flatbed truck",tech:0,needtech:525,y:300,x:120,url:'https://cdn.glitch.com/dd3f06b2-b7d4-4ccc-8675-05897efc4bb5%2FFlatbedTruckVehicleIcon.png?v=1560477615277'},

  {
    name: "Radio Backpack",
    tech: 0,
    needtech: 750,
    y: 440,
    x: 290,
    url: repo + "Items/RadioBackpackItemIcon.png"
  },
  {
    name: "Tank Trap",
    tech: 0,
    needtech: 450,
    y: 300,
    x: 290,
    url: repo + "Structures/TankStopIcon.png"
  },
  {
    name: "Gun Nest",
    tech: 0,
    needtech: 750,
    y: 160,
    x: 290,
    url: repo + "Structures/GunNestTurretIcon.png"
  }, //460

  {
    name: "Landing APC",
    tech: 0,
    needtech: 750,
    y: 300,
    x: 460,
    url: repo + "Vehicles/APC_Colonial.png"
  },
  {
    name: "Harvester",
    tech: 0,
    needtech: 500,
    y: 300,
    x: 630,
    url: repo + "Vehicles/Harvester.png"
  },
  {
    name: "Fortress Wall",
    tech: 0,
    needtech: 750,
    y: 300,
    x: 800,
    url: repo + "Structures/ConcreteWallIcon.png"
  },
  //630 800 970

  {
    name: "Gun Turret",
    tech: 0,
    needtech: 750,
    y: 300,
    x: 970,
    url: repo + "Structures/GunTurretStructureIcon.png"
  },
  {
    name: "Cargo Ship",
    tech: 0,
    needtech: 200,
    y: 440,
    x: 970,
    url: repo + "Vehicles/Cargoship.png"
  },
  {
    name: "Halftrack",
    tech: 0,
    needtech: 600,
    y: 160,
    x: 970,
    url: repo + "Vehicles/HalfTrackColonial.png"
  }, //1140
  {
    name: "Advanced Construction",
    tech: 0,
    needtech: 600,
    y: 300,
    x: 1140,
    url: repo + "Tech/AdvancedConstructionIcon.png"
  },

  {
    name: "Gunboat",
    tech: 0,
    needtech: 400,
    y: 440,
    x: 1360,
    url: repo + "Vehicles/GunboatColonial.png"
  },
  {
    name: "Outpost",
    tech: 0,
    needtech: 1000,
    y: 300,
    x: 1360,
    url: repo + "Structures/OutpostStructureIcon.png"
  },
  {
    name: "RPG",
    tech: 0,
    needtech: 400,
    y: 160,
    x: 1360,
    url: repo + "Items/RpgItemIcon.png"
  },

  {
    name: "Bunker",
    tech: 0,
    needtech: 1000,
    y: 300,
    x: 1530,
    url: repo + "Structures/BunkerWallIcon.png"
  },
  {
    name: "Storm Rifle",
    tech: 0,
    needtech: 1000,
    y: 300,
    x: 1700,
    url: repo + "Items/AssaultRifleItemIcon.png"
  },

  {
    name: "Field Artillery",
    tech: 0,
    needtech: 1725,
    y: 160,
    x: 2040,
    url: repo + "Vehicles/ArtilleryIcon.png"
  },
  {
    name: "Pillbox",
    tech: 0,
    needtech: 1000,
    y: 300,
    x: 1870,
    url: repo + "Structures/PillboxTurretIcon.png"
  },
  {
    name: "Satchel Charge",
    tech: 0,
    needtech: 1725,
    y: 160,
    x: 1870,
    url: repo + "Items/SatchelCharge.png"
  },
  {
    name: "Light Tank",
    tech: 0,
    needtech: 2250,
    y: 440,
    x: 1870,
    url: repo + "Vehicles/LightTankColonial.png"
  },

  {
    name: "40mm HE Round",
    tech: 0,
    needtech: 100,
    y: 440,
    x: 2260,
    url: repo + "Items/LightTankAmmoHighExplosiveItemIcon.png"
  },
  {
    name: "Battle Tank",
    tech: 0,
    needtech: 5000,
    y: 300,
    x: 2260,
    url: repo + "Vehicles/BattleTankColonial.png"
  },
  {
    name: "75mm HE Round",
    tech: 0,
    needtech: 100,
    y: 440,
    x: 2430,
    url: repo + "Items/BattleTankAmmoHighExplosiveItemIcon.png"
  },
  {
    name: "Rocket Booster",
    tech: 0,
    needtech: 1500,
    y: 300,
    x: 2430,
    url: repo + "Items/RocketBoosterIcon.png"
  }
];
//  {name:"",tech:0,needtech:},
// ,y:,x:

try {
  module.exports = techtree;
} catch (err) {}
try {
  exports.techtree = techtree;
} catch (err) {} //this allows server side to use this file
