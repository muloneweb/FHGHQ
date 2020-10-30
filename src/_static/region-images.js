//K - this file loads the HD region maps on top of the world map
const L = require("leaflet");
/*
var regionNames = [,//0
  "Deadlands", //1
  "Endless", //2
  "Heartlands", //3
  "Umbral", //4
  "Callahans", //5
  "Weathered", //6
  "Farranac", //7
  "Westgate",//8
  "Mooring",//9
                   ,//10
                   ,//11
  "Fishermans",//12
  "Great March", //13
  "Oarbreaker",//14
  "Reaching Trail",//15
  "Tempest Island"//16
]
*/
const regionCounter = 23;
const regionNames = [
  ,
  ,
  ,
  "DeadLandsHex", //3
  "CallahansPassageHex", //4
  "MarbanHollow", //5
  "UmbralWildwoodHex", //6
  "MooringCountyHex", //7
  "HeartlandsHex", //8
  "LochMorHex", //9
  "LinnMercyHex", //10
  "ReachingTrailHex", //11
  "StonecradleHex", //12
  "FarranacCoastHex", //13
  "WestgateHex", //14
  "FishermansRowHex", //15
  "OarbreakerHex", //16
  "GreatMarchHex", //17
  "TempestIslandHex", //18
  "GodcroftsHex", //19
  "EndlessShoreHex", //20
  "AllodsBightHex", //21
  "WeatheredExpanseHex", //22
  "DrownedValeHex", //23
  "ShackledChasmHex", //24
  "ViperPitHex"
]; //25
const bounds = [[-228, 0], [-28, 256]];
const o = { y: -128, x: 128 };
const height = bounds[1][0] - bounds[0][0];
const width = bounds[1][1] - bounds[0][1];
const mapwidth = 12012;
const ratio = (bounds[1][1] - bounds[0][1]) / mapwidth;
let w = width / 5.5;
let k = (w * Math.sqrt(3)) / 2;

const regionlist = [
  { name: "", center: [-1000, -1000] }, //0
  { name: "", center: [-1000, -1000] }, //1
  { name: "", center: [-1000, -1000] }, //2
  { name: "Deadlands", center: [o.y, o.x] }, //3
  { name: "Callahan's Passage", center: [o.y + k, o.x] }, //4
  { name: "Marban Hollow", center: [o.y + 0.5 * k, o.x + 0.75 * w] }, //5
  { name: "Umbral Wildwood", center: [o.y - k, o.x] }, //6
  { name: /*The*/ "Moors", center: [o.y + 1.5 * k, o.x - 0.75 * w] }, //7
  { name: /*The*/ "Heartlands", center: [o.y - 1.5 * k, o.x - 0.75 * w] }, //8
  { name: "Loch Mor", center: [o.y - 0.5 * k, o.x - 0.75 * w] }, //9
  { name: /*The*/ "Linn of Mercy", center: [o.y + 0.5 * k, o.x - 0.75 * w] }, //10
  { name: "Reaching Trail", center: [o.y + 2 * k, o.x] }, //11
  { name: "Stonecradle", center: [o.y + k, o.x - 1.5 * w] }, //12
  { name: "Farranac Coast", center: [o.y, o.x - 1.5 * w] }, //13
  { name: "Westgate", center: [o.y - k, o.x - 1.5 * w] }, //14
  { name: "Fisherman's Row", center: [o.y - 0.5 * k, o.x - 2.25 * w] }, //15
  { name: /*The*/ "Oarbreaker Isles", center: [o.y + 0.5 * k, o.x - 2.25 * w] }, //16
  { name: "Great March", center: [o.y - 2 * k, o.x] }, //17
  { name: "Tempest Island", center: [o.y - 0.5 * k, o.x + 2.25 * w] }, //18
  { name: "Godcrofts", center: [o.y + 0.5 * k, o.x + 2.25 * w] }, //19
  { name: "Endless Shore", center: [o.y, o.x + 1.5 * w] }, //20
  { name: "Allod's Bight", center: [o.y - k, o.x + 1.5 * w] }, //21
  { name: "Weathered Expanse", center: [o.y + k, o.x + 1.5 * w] }, //22
  { name: /*The*/ "Drowned Vale", center: [o.y - 0.5 * k, o.x + 0.75 * w] }, //23
  { name: "Shackled Chasm", center: [o.y - 1.5 * k, o.x + 0.75 * w] }, //24
  { name: "Viper Pit", center: [o.y + 1.5 * k, o.x + 0.75 * w] } //25
];

function GetBounds(index) {
  let region = regionlist[index];
  return [
    [region.center[0] - k / 2, region.center[1] - w / 2],
    [region.center[0] + k / 2, region.center[1] + w / 2]
  ];
}
function convert(regionid, x, y) {
  var coords = GetBounds(regionid); //RegionImages.regionlist[regionid].bounds
  var xcoord = coords[0][1] + (coords[1][1] - coords[0][1]) * x;
  var ycoord = coords[1][0] - (coords[1][0] - coords[0][0]) * y;
  return [ycoord, xcoord];
}
function GetRegionIndex(name) {
  for (let i = 0; i < regionNames.length; i++) {
    if (regionNames[i] == name || regionlist[i].name == name) {
      return i;
    }
  }
}
export default {
  regionlist: regionlist,
  GetBounds: GetBounds,
  convert: convert,
  regionNames: regionNames,
  bounds: bounds,
  regionCounter: regionCounter,
  o: o,
  k: k,
  w: w,
  ratio: ratio,
  GetRegionIndex: GetRegionIndex
};
