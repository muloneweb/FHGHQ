const TOGGLE_DISPLAY_ITEM = 'TOGGLE_DISPLAY_ITEM';
const toggleDisplayItem = (payload) => ({
    type: TOGGLE_DISPLAY_ITEM,
    payload
})

const TOGGLE_DISPLAY_CATEGORY = 'TOGGLE_DISPLAY_CATEGORY';
const toggleDisplayCategory = (payload) => ({
    type: TOGGLE_DISPLAY_CATEGORY,
    payload
})

const TOGGLE_SAT_MAP = 'TOGGLE_SAT_MAP';
const toggleSatMap = () => ({
    type: TOGGLE_SAT_MAP
})

const TOGGLE_GRID = 'TOGGLE_GRID';
const toggleGrid = () => ({
    type: TOGGLE_GRID
})

const TOGGLE_RANGES = 'TOGGLE_RANGES';
const toggleRanges = () => ({
    type: TOGGLE_RANGES
})

const SELECT_REGION = 'SELECT_REGION';
const selectRegion = (payload) => ({
    type: SELECT_REGION,
    payload
})

export default {
    TOGGLE_DISPLAY_ITEM: TOGGLE_DISPLAY_ITEM,  
    TOGGLE_DISPLAY_CATEGORY: TOGGLE_DISPLAY_CATEGORY, 
    TOGGLE_SAT_MAP: TOGGLE_SAT_MAP, 
    TOGGLE_GRID: TOGGLE_GRID,
    TOGGLE_RANGES: TOGGLE_RANGES,
    SELECT_REGION: SELECT_REGION,

    toggleDisplayItem: toggleDisplayItem,
    toggleDisplayCategory: toggleDisplayCategory,        
    toggleSatMap: toggleSatMap,                     
    toggleGrid: toggleGrid,                       
    toggleRanges: toggleRanges,
    selectRegion: selectRegion
}