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

export default{
    ///////////////////////OBJECT MANAGEMENT//////////////////////////
    UPDATE_OBJECT:UPDATE_OBJECT,            updateObject:updateObject,
    
    DELETE_OBJECT:DELETE_OBJECT,            deleteObject:deleteObject,
    
    SELECT_OBJECT:SELECT_OBJECT,            selectObject:selectObject,
    
    SELECT_TAB:SELECT_TAB,                  selectTab:selectTab,
}
  
  