import { repo } from './repo';

export default [
    {name:'Abandoned Ward',
    colonial:'abandoned_col.mp3',
    warden:'abandoned_ward.mp3'},

    {name:'Brine Glen',
    colonial:'brine_col.mp3',
    warden:'brine_ward.mp3'},

    {name:"Callahan's Boot", 
    colonial:'cal-boot_col.mp3',
    warden:'cal-boot_ward.mp3'},

    {name:"Callahan's Gate",
    colonial:'cal-gate_col.mp3',
    warden:'cal-gate_ward.mp3'},

    {name:'Liberation Point', 
    colonial:'liberation_col.mp3',
    warden:'liberation_ward.mp3'},

    {name:'The Spine',
    colonial:'spine_col.mp3',
    warden:'spine_ward.mp3'},
  
    {name:"The Salt Farms",
    colonial:'salt_col.mp3',
    warden:'salt_ward.mp3'},
].map(item => {
    return {
        name: item.name,
        colonial: repo + 'Allods Bight/' + item.colonial,
        warden: repo + 'Allods Bight/' + item.warden
    }
})