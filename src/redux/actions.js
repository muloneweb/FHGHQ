import DisplayActions from "./display/actions"

const LOAD_PAGE = 'LOAD_PAGE';
const loadPage = data =>({
  type: LOAD_PAGE,
  data
})

const SET_DYNAMIC = 'SET_DYNAMIC';
const setDynamic = (dynamic,events,stats) => ({
    type: SET_DYNAMIC,
    dynamic,
    events
});

const SET_STATS = 'SET_STATS';
const setStats = (stats) => ({
    type: SET_STATS,
    stats
});

const CHANGE_SETTINGS = 'CHANGE_SETTINGS'
const changeSettings = (kind,data)=>({
  type:CHANGE_SETTINGS,
  kind,
  data
})

const DELETE_SETTINGS = 'DELETE_SETTINGS'
const deleteSettings = (kind)=>({
  type:DELETE_SETTINGS,
  kind,
})

const TOGGLE_SECURE = 'TOGGLE_SECURE';
const toggleSecure = (data) =>({
  type:TOGGLE_SECURE,
  data
})

const CLEAR_ROOM = 'CLEAR_ROOM';
const clearRoom = ()=>({
  type:CLEAR_ROOM  
})

const CLEAR_MAP = 'CLEAR_MAP';
const clearMap =()=>({
  type:CLEAR_MAP
})

const SET_ONLINE_USERS = 'SET_ONLINE_USERS';
const setOnlineUsers = users => ({
    type: SET_ONLINE_USERS,
    users
});

const SET_USERS = 'SET_USERS';
const setUsers = users => ({
    type: SET_USERS,
    users
});

const SET_USER = 'SET_USER';
const setUser = user => ({
    type: SET_USER,
    user
});

const REQUEST_ACCESS = 'REQUEST_ACCESS'
const requestAccess = user => ({
  type:REQUEST_ACCESS,
  user
})

const LEAVE_ROOM = 'LEAVE_ROOM'
const leaveRoom = userid => ({
  type:LEAVE_ROOM,
  userid
})

const SET_ROLE = 'SET_ROLE'
const setRole = user => ({
  type: SET_ROLE,
  user
});

const HAIL_NEW_KING = 'HAIL_NEW_KING';
const hailNewKing = id => ({
    type:HAIL_NEW_KING,
    id
});

const UPDATE_OBJECT = 'UPDATE_OBJECT';
const updateObject = (kind,object,signature) => ({
    type:UPDATE_OBJECT,
    kind,
    object,
    signature
});

const DELETE_OBJECT = 'DELETE_OBJECT';
const deleteObject = (kind,signature) => ({
    type:DELETE_OBJECT,
    kind,
    signature
});

const SELECT_OBJECT = 'SELECT_OBJECT';
const selectObject = (objtype,signature,townname,misctype,refinery,production,storage) => {
  if(townname==undefined){
    townname = ""
  }
  if(misctype==undefined){
    misctype = 0
  }
  if(refinery==undefined){
    refinery=""
  }
  if(production==undefined){
    production=""
  }
  if(storage==undefined){
    storage=""
  }
  return{
  type: SELECT_OBJECT,
  objtype,
  signature,
  townname,
  misctype,
    refinery,
    production,
    storage
}}
 
const SELECT_TOWNFILTER = 'SELECT_TOWNFILTER';
const selectTownFilter = (cat,id) => ({
  type:SELECT_TOWNFILTER,
  cat,
  id
})

const SELECT_TAB = 'SELECT_TAB';
const selectTab = (tab) => ({
  type: SELECT_TAB,
  tab
})

const SELECT_TECH = 'SELECT_TECH'
const selectTech = (tech) =>({
  type: SELECT_TECH,
  tech
})

const UPDATE_TECH = 'UPDATE_TECH'
const updateTech = (techtree) => ({
  type: UPDATE_TECH,
  techtree
})


const ADD_ARTY_RESULT = 'ADD_ARTY_RESULT'
const addArtyResult = (totalstring)=>({
  type:ADD_ARTY_RESULT,
  totalstring
})

const UPDATE_SQUADS = 'UPDATE_SQUADS'
const updateSquads = (data,kind)=>({
  type:UPDATE_SQUADS,
  data,
  kind
})

const SUBMIT_EVENT = 'SUBMIT_EVENT'
const submitEvent = (packet) =>({
  type:SUBMIT_EVENT,
  packet
})

const SUBMIT_OPTIMER = 'SUBMIT_OPTIMER'
const submitOpTimer = (date) =>({
  type:SUBMIT_OPTIMER,
  date
  
})

const DELETE_OPTIMER = 'DELETE_OPTIMER'
const deleteOpTimer = ()=>({
  type:DELETE_OPTIMER
})

const ADD_MESSAGE = 'ADD_MESSAGE'
const addMessage = (packet,category)=>({
  type:ADD_MESSAGE,
  packet,
  category
})

const SELECT_USER = 'SELECT_USER'
const selectUser = (id)=>({
  type:SELECT_USER,
  id
})

export default {
  ////////////////////////PAGE INITIALIZATION//////////////////
  LOAD_PAGE:LOAD_PAGE,                    loadPage:loadPage,
  
  SET_DYNAMIC:SET_DYNAMIC,                setDynamic:setDynamic,
  
  SET_STATS:SET_STATS,                    setStats:setStats,
  
  CHANGE_SETTINGS:CHANGE_SETTINGS,        changeSettings:changeSettings,
  
  DELETE_SETTINGS:DELETE_SETTINGS,        deleteSettings:deleteSettings,
  
  TOGGLE_SECURE:TOGGLE_SECURE,            toggleSecure:toggleSecure,
  
  CLEAR_ROOM:CLEAR_ROOM,                  clearRoom:clearRoom,
  
  CLEAR_MAP:CLEAR_MAP,                    clearMap:clearMap,
  ////////////////////////USER SECTION////////////////////////
  SET_ONLINE_USERS:SET_ONLINE_USERS,      setOnlineUsers:setOnlineUsers,
  
  SET_USERS:SET_USERS,                    setUsers:setUsers,
  
  SET_USER:SET_USER,                      setUser:setUser,
  
  REQUEST_ACCESS:REQUEST_ACCESS,          requestAccess:requestAccess,
  
  LEAVE_ROOM:LEAVE_ROOM,                  leaveRoom:leaveRoom,
  
  SET_ROLE:SET_ROLE,                      setRole:setRole,
  
  HAIL_NEW_KING:HAIL_NEW_KING,            hailNewKing:hailNewKing,
  ///////////////////////OBJECT MANAGEMENT//////////////////////////
  UPDATE_OBJECT:UPDATE_OBJECT,            updateObject:updateObject,
  
  DELETE_OBJECT:DELETE_OBJECT,            deleteObject:deleteObject,
  
  SELECT_TOWNFILTER:SELECT_TOWNFILTER,    selectTownFilter:selectTownFilter,
  
  SELECT_OBJECT:SELECT_OBJECT,            selectObject:selectObject,
  
  SELECT_TAB:SELECT_TAB,                  selectTab:selectTab,
  
  ///////////////////////TECH SECTION///////////////////////////////
  SELECT_TECH:SELECT_TECH,                selectTech:selectTech,
  
  UPDATE_TECH:UPDATE_TECH,                updateTech:updateTech,
  ///////////////////////ARTY SECTION///////////////////////////////
  ADD_ARTY_RESULT:ADD_ARTY_RESULT,        addArtyResult:addArtyResult,
  //////////////////////SQUADS SECTION/////////////////////////////
  UPDATE_SQUADS:UPDATE_SQUADS,            updateSquads:updateSquads,
  //////////////////////EVENTS SECTION////////////////////////////
  SUBMIT_EVENT:SUBMIT_EVENT,              submitEvent:submitEvent,
  
  ADD_MESSAGE:ADD_MESSAGE,                addMessage:addMessage,
  
  SELECT_USER:SELECT_USER,                selectUser:selectUser,
  //////////////////////TIMERS SECTION////////////////////////////////
  SUBMIT_OPTIMER:SUBMIT_OPTIMER,          submitOpTimer:submitOpTimer,
  
  DELETE_OPTIMER:DELETE_OPTIMER,          deleteOpTimer:deleteOpTimer,

  ...DisplayActions
}

