import { repo } from './repo';

export default [
    {name:'Abandoned Ward',
    item: 'abandoned'},

    {name:'Brine Glen',
    item: 'brine'},

    {name: "Callahan's Boot", 
    item: 'cal-boot'},

    {name:"Callahan's Gate",
    item: 'cal-gate'},

    {name:'Liberation Point', 
    item: 'liberation'},

    {name:'The Spine',
    colonial:'spine_col.mp3',
    warden:'spine_ward.mp3'},
  
    {name:"The Salt Farms",
    colonial:'salt_col.mp3',
    warden:'salt_ward.mp3'},
].map(item => {
    return {
        name: item.name,
        colonial: repo + 'Deadlands/' + item.item + '_col.mp3',
        warden: repo + 'Deadlands/' + item.item + '_ward.mp3'
    }
})