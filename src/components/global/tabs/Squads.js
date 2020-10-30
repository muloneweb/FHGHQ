import React from 'react';
import store from '../../../redux/store'
import {connect} from 'react-redux';
import socket from '../../../_static/socket';
import A from "../../../redux/actions";
import U from '../useful_functions'
import clone from 'clone';
const repo = 'https://raw.githubusercontent.com/the-fellowship-of-the-warapi/Assets/master/Item Icons/Vehicles/'
socket.on('updateSquads', function (packet) {
      store.dispatch(A.updateSquads(packet.data,packet.type))
    })
function UpdateSquads (obj,type){
store.dispatch(A.updateSquads(obj,type))
socket.emit('updateSquads',{data:obj,type:type})  
}
const vehicleArray = [
  {name:"Truck",url:[repo+'TruckColonial.png',repo+'TruckWarden.png'],roles:["Driver","Passenger"]},  
  {name:"LUV",url:[repo+'LUV_Colonial.png',repo+'LUV_Warden.png'],roles:["Driver","Passenger 1","Passenger 2","Passenger 3"]},
  {name:"Armored Car",url:[repo+'ArmoredCarColonial.png',repo+'ArmoredCarWarden.png'],roles:["Driver","Gunner"]},  
  {name:"Half Track",url:[repo+'HalfTrackColonial.png',repo+'HalfTrackWarden.png'],roles:["Driver","Machine Gunner","Medic"]},
  {name:"Light Tank",url:[repo+'LightTankColonial.png',repo+'LightTankWarden.png'],roles:["Driver","Gunner","Commander"]},
  {name:"Battle Tank",url:[repo+'BattleTankColonial.png',repo+'BattleTankWarden.png'],roles:["Driver","Machine gunner","Turret gunner","Engineer","Commander"]},
  {name:"Gunboat",url:[repo+'GunboatColonial.png',repo+'GunboatWarden.png'],roles:["Driver","Machine Gunner","Artillery Gunner","Commander"]},
  {name:"Field Artillery",url:[repo+'FieldArtilleryColonial.png',repo+'FieldArtilleryWarden.png'],roles:["Driver","Gunner"]},
  // {name:"",url:["",""],roles:["",""]},          
                     ]
///////////////////////////////////////////////////////////
function LeaveEverything(squadarray){
         for(var i=squadarray.length-1;i>=0;i--){
         for(var j=0;j<squadarray[i].users.length;j++){
           if(squadarray[i].users[j]==window.steamid){
            if(squadarray[i].users.length==1){
                squadarray.splice(i,1)
              break
            }else{
             squadarray[i].users.splice(j,1);
              break
           }
           }
         }
       }
  return squadarray
}
/////////////////////////////////////////////////////
function GetCurrentSquad(squadarray){
  for(var i=0;i<squadarray.length;i++){
    for(var j=0;j<squadarray[i].users.length;j++){
           if(squadarray[i].users[j]==window.steamid){
             let packet={index:i,alone:false}
             if(squadarray[i].users.length==1){
               packet.alone=true
           }
             return packet
    }
  }
  }
  return {index:-1,alone:false}
}
//////////////////////////////////////////////
function DeleteAnonymous(squadarray,users){
  let changed = false
   for(var i=squadarray.length-1;i>=0;i--){
      for(var j=squadarray[i].users.length-1;j>=0;j--){
        let user = U.GetUser(users,squadarray[i].users[j])
           if(!user.valid){
             //console.log("deleting user",squadarray,squadarray[i].users[j])
            if(squadarray[i].users.length==1){
                squadarray.splice(i,1)
              changed=true
              break
            }else{
             squadarray[i].users.splice(j,1);
              changed=true
              break
           }
           }
         }
   }
  if(changed){
  UpdateSquads (squadarray,"squads")
  }
}
////////////////////////////////////////////
class SquadsCore extends React.Component {  ////Component generation
  constructor(props) {
    super(props);
    this.state={      ///State
      var:""
    }
    this.CreateSquad = this.CreateSquad.bind(this)
  }

  CreateSquad(){
    let squad = { icon:0, name:"New Squad", users:[window.steamid] }
    let squadarray = [];
    if(this.props.squads.squads!=undefined){
    squadarray = clone(this.props.squads.squads)
    }
    squadarray = LeaveEverything(squadarray)
    squadarray.push(squad)
    UpdateSquads(squadarray,"squads")
  }
  render(){
  let squadlist = []
  if(this.props.squads.squads!=undefined){
    DeleteAnonymous(clone(this.props.squads.squads),this.props.users.users) 
  squadlist = this.props.squads.squads.map((obj,index) => <Squad key={"squad"+obj.users[0]} users={this.props.users} index={index} squads={this.props.squads.squads}/>);                                 
     }

  //let filters = cost.filters.map((obj,index) => this.function(obj,index))
  return <React.Fragment>
  <button id="squads_create_btn" onClick={this.CreateSquad}>Create squad</button>
  <div id="squads_totalcontainer">{squadlist}</div> 
  <RoleList users={this.props.users} />
  <p id="squads_armycomp_header">Army Composition</p>
  <ArmyComp squads={this.props.squads} users={this.props.users} faction={this.props.faction} />
  </React.Fragment>}
}
  
////////////////////////////////////////
class Squad extends React.Component {  ////Component generation
  constructor(props) { 
    super(props);
  }
  GetUser(index){
  try{
  let squad = this.props.squads[this.props.index]
  let user = U.GetUser(this.props.users.users,squad.users[index])
  
  let name = <p className="squad_user_name"><img className="card_ambush_removeimage" src={U.roleicons[user.role[0]].url} />{user.name}</p>
  return <tr className="squad_user_row" key={"squaduser"+user.id}><td className="squad_user_avatar_cell"><img className="squad_user_avatar" src={user.avatar}/></td>
    <td className="squad_user_name_cell">{name}</td></tr>
  }catch(err){}
  }
  CheckIfMine(){ //CODE 0:NOT IN SQUAD //CODE 1:SQUAD MEMBER //CODE 2:SQUAD LEADER
    let squad = this.props.squads[this.props.index]
    for(var i=0;i<squad.users.length;i++){
      if(window.steamid==squad.users[i]){
        if(i==0){
          return 2
        }else{
          return 1
        }
      }
    }
    return 0
  }
  LeaveJoin(code){
  let squad = this.props.squads[this.props.index]
  let squadarray = clone(this.props.squads)
  
    if(code>0){
      if(squad.users.length==1){
        squadarray.splice(this.props.index,1)
      }else{
        for(var i =0;i<squad.users.length;i++){
          if(window.steamid==squad.users[i]){
            squadarray[this.props.index].users.splice(i,1)
          }
        }
      }
    }else{
       let index = GetCurrentSquad(squadarray)
       let num = Number(this.props.index)
       if(index.index<num && index.alone){
         num = num-1;
       }
       squadarray = LeaveEverything(squadarray)
       squadarray[num].users.push(window.steamid)
    }
    UpdateSquads(squadarray,"squads")
  }
  handleChangeName(event){
    let value = event.target.value;
     let squadarray = clone(this.props.squads)
     squadarray[this.props.index].name=value;
      UpdateSquads(squadarray,"squads")
  }
  render(){
  let squad = this.props.squads[this.props.index]
  //console.log("Squad",squad)
  let rolecode=this.CheckIfMine()
  let squadname = <p className="squad_name_text" >{squad.name}</p>
  if(rolecode==2){
    squadname = <span className="squad_name_span"><input type="text" maxLength="16" className="squad_name_input" style={{display:'inline-block'}} value={squad.name} onChange={(e)=>this.handleChangeName(e)}/></span>
  }
  let buttonlabel =rolecode>0 ? "Leave" :"Join"
  let userlist = squad.users.map((obj,index) => this.GetUser(index));
  return <div className="squads_squadcontainer">
    <div className="squad_name_row"><img className="squads_squadcontainer_descIcon" src={U.squadnumbers[this.props.index]}/> {squadname}</div>
    <table className="squads_squadtable"><tbody>
      {userlist}
      </tbody></table>
    <button className="squads_btn_leavejoin" onClick={()=>this.LeaveJoin(rolecode)}>{buttonlabel}</button>
  </div>
  }
}
//////////////////////////////////////////////
class RoleList extends React.Component {  ////Component generation
  constructor(props) {
    super(props);
    this.ChangeRole = this.ChangeRole.bind(this)
    this.handleRoleCheckbox = this.handleRoleCheckbox.bind(this)
  }
  ChangeRole(index,type){
    //console.log(index);
    let user = clone(U.GetUser(this.props.users.users,window.steamid))
    user.role[type]=index
    store.dispatch(A.setRole(user))
    socket.emit('setRole',user)
  }
  handleRoleCheckbox(type){
    let role = 0;
     let user = clone(U.GetUser(this.props.users.users,window.steamid))
    if(user.role[1]!=type){
      role = type
    }
    this.ChangeRole(role,1)
  }
  GetRole(index){
    return <td className="popover_role_cell"><button className="popover_submit_btn" onClick={()=>this.ChangeRole(index,0)} ><img className="popover_submit_img" src={U.roleicons[index].url}/>{U.roleicons[index].name}</button></td>
  }
  GetImage(index,counter){
    let textclass = "squad_role_empty"
    //console.log(index,counter)
    if(counter!=0){
      textclass="squad_role_notempty"
    }
    return <p className={textclass}><img className="popover_submit_img" src={U.roleicons[index].url}/>{counter}</p>
  }
  render(){
    let rolecounter=[]
    let rolecounter2=[0,0,0]
    let tablerows=[]
    let tablerows2=[]
    let myuser = U.GetUser(this.props.users.users,window.steamid)
    for(let i =0;i<U.roleicons.length;i++){
      rolecounter.push(0)
    }
      for(let i=0;i<this.props.users.users.length;i++){
        //console.log("User",this.props.users.users[j])
        let user = this.props.users.users[i]
        if(user.online){
        rolecounter[user.role[0]]++;
        rolecounter2[user.role[1]]++;
        }
      }
    
    let roleoptions = []

    //console.log("rolecounter",rolecounter)
    //////ROLE SELECT PANEL
    for(let i =0;i<4;i++){
      let role0=this.GetRole(i);
      let role1 = this.GetRole(i+4);
      let role2 = null;
      if((i+8)<U.roleicons.length){
        role2=this.GetRole(i+8)
      }
      tablerows2.push(<tr key={"roleselectpanel"+i}>{role0}{role1}{role2}</tr>)
    }
    //////ROLE LIST
    for(let i=0;i<3;i++){
      let row = []
      for(var j=0;j<4;j++){
        if(rolecounter[i+1+j*3]!=undefined){
          row.push(<td key={"rolecounter"+i+"|"+j}>{this.GetImage(i+1+j*3,rolecounter[i+1+j*3])}</td>)
        }else{
          row.push(<td key={"rolecounter"+i+"|"+j}></td>)
        }
      }
          tablerows.push(<tr key={"rolerow"+i}>{row}</tr>)
      } 
    return <React.Fragment>
      <div id="squads_rolecounter_table">
        <table>
        <thead  className="squads_roleselect_header">
          <tr>
          <th><p>Logi {rolecounter2[1]}</p></th><th><p>Combat {rolecounter2[2]}</p></th>
            </tr>
            </thead>
        </table>    
        <table>
          <tbody>{tablerows}</tbody>
      </table>
      </div>
     <table id="squads_roleselect_table"><thead className="squads_roleselect_header">
       <tr>
       <th>Select role</th><th><input type="checkbox" 
          className="form-check-input" 
          name="role" 
          value="1" 
          checked={myuser.role[1]==1}
          onChange={()=>this.handleRoleCheckbox(1)} 
                                                                          />Logi</th><th><input type="checkbox" 
          className="form-check-input" 
          name="role" 
          value="2" 
          checked={myuser.role[1]==2}
          onChange={()=>this.handleRoleCheckbox(2)} 
                                                                          />Combat</th></tr></thead><tbody>
       {tablerows2}
       </tbody></table></React.Fragment>
    
  }
}
///////////////////////////////////////////////
class ArmyComp extends React.Component {  ////Component generation
  constructor(props) { 
    super(props);
    this.state={      ///State
      selectedCategory:100
    }
    this.UpdateVehicle = this.UpdateVehicle.bind(this)
    this.SelectCategory = this.SelectCategory.bind(this)
    this.RemoveVehicle = this.RemoveVehicle.bind(this)
  }
  AddVehicle(index){
    let vehicles = clone(this.props.squads.vehicles)
    let vehiclename = vehicleArray[index].name
    //console.log("Adding vehicle",vehicles)
    if(vehicles[vehiclename]==undefined){
      //console.log("No category",vehiclename,vehicles)
      vehicles[vehiclename]=[]
    }
    vehicles[vehiclename].push({})
    //console.log("Updating vehicles",vehicles)
    UpdateSquads (vehicles,"vehicles")
  }
  UpdateVehicle(index,vehicle,t){
    let vehicleList = clone(this.props.squads.vehicles)
    for(let type in vehicleList){
    for(var i=0;i<vehicleList[type].length;i++){
      for(var prop in vehicleList[type][i]){
        if(vehicleList[type][i][prop]==window.steamid){
          delete vehicleList[type][i][prop]
          }
      }
    }
    }
    let type = vehicleArray[t].name
    vehicleList[type][index]= vehicle;
    UpdateSquads (vehicleList,"vehicles")
  }
  RemoveVehicle(t,index){
    let vehicleList = clone(this.props.squads.vehicles)
    let type = vehicleArray[t].name
    vehicleList[type].splice(index,1)
    UpdateSquads (vehicleList,"vehicles")
  }
  SelectCategory(index){
    //console.log("Selecting category",index)
    if(index == this.state.selectedCategory){
      //console.log("Setting category 100")
      this.setState({
        selectedCategory:100
      })
    }else{
      //console.log("Setting category",index)
      this.setState({
        selectedCategory:index
      })
    }
  }
  
  GetVehicleTable(){
    let rowarray =[]
      let index =0;
    while(true){
      let row = []
      
      let props = this.props.squads.vehicles
      let over = true
      for(var j=0;j<vehicleArray.length;j++){
        let indexj = j
        let type = vehicleArray[j].name
        let item = null
        //console.log("Checking",type,index)
        if(props[type]!=undefined){
          if(props[type][index]!=undefined){
          over = false;
          let crew =0;
          for(var prop in props[type][index]){
            if(props[type][index][prop]!=""){
              crew++;
            }
          }
            item = <React.Fragment><img className="squads_armycomp_vehicleimg squads_armycomp_vehicle_categoryimg" src={vehicleArray[j].url[this.props.faction]} onClick={()=>this.SelectCategory(indexj)}/>
              <p className="squads_armycomp_crewamount_p">{crew}/{vehicleArray[j].roles.length}</p>
              </React.Fragment>
          }
        }
        row.push(<td className="squads_armycomp_itemcell" key={"armycompvtablecell"+index+"|"+indexj}>{item}</td>)
        
      }
      if(over){
        break
      }
      index++
      rowarray.push(<tr key={"armycompvtable"+index}>{row}</tr>)
      //console.log("Index", index)
      if(index>100){
        break;
      }
    }
    return rowarray
  }
  render(){
    let buttonlist = []
    let vehiclelist=[]
     let rowarray=  []
     //console.log("Army comp state",this.state)
    for(var i =0;i<vehicleArray.length;i++){
      let index = i
      let classname = "squads_armycomp_category_col"
      let AddBtn = null
      if(this.state.selectedCategory==index){
        classname="squads_armycomp_category_col squads_armycomp_category_col_selected"
        AddBtn = <button id="squads_armycomp_category_addbtn" className="btn" onClick={()=>this.AddVehicle(index)}></button>
      }
      buttonlist.push(<th className={classname} key={"squadvtablebutton"+i}><button className="squads_armycomp_vehiclebtn" onClick={()=>this.SelectCategory(index)/*this.AddVehicle(index)*/}><img className="squads_armycomp_vehicleimg " src={vehicleArray[i].url[this.props.faction]}/></button>{AddBtn}</th>)
    }
    rowarray = this.GetVehicleTable()
    if(this.state.selectedCategory!=100){     
      let category = this.props.squads.vehicles[vehicleArray[this.state.selectedCategory].name]
      if(category!=undefined){
      for(var i=0;i<category.length;i++){
        let index = i
        vehiclelist.push(<ArmyCompVehicle users={this.props.users} vehicle={category[i]} faction={this.props.faction} UpdateVehicle={this.UpdateVehicle} index={index} type={this.state.selectedCategory} RemoveVehicle={this.RemoveVehicle}/>)
      }
      }
    }

    return <div id="squad_armycomp_container" className="row">
      <table id="squad_armycomp_table" className="col"><thead><tr id="squads_armycomp_vehicle_list">{buttonlist}</tr></thead>
      <tbody>
        {rowarray}
        </tbody>
      </table>

      <div className="col squads_armycomp_vehicle_row">
      {vehiclelist}
      </div>
        </div>
  }
}
///////////////////////////////////////////////
class ArmyCompVehicle extends React.Component {  ////Component generation
  constructor(props) { 
    super(props);
    this.RemoveVehicle = this.RemoveVehicle.bind(this)
  }
  JoinRole(role){
    let vehicle = clone(this.props.vehicle)
      for(var prop in vehicle){
        if(vehicle[prop]==window.steamid){
          delete vehicle[prop]
          }
      }
    vehicle[role]=window.steamid;
    this.props.UpdateVehicle(this.props.index,vehicle,this.props.type);
  }
  RemoveVehicle(){
    //console.log("Remove vehicle props",this.props)
    let type = this.props.type;
    let index = this.props.index;
    this.props.RemoveVehicle(type,index)
  }
  render(){
    let vehicleStatic = vehicleArray[this.props.type]
    let vehicle = this.props.vehicle
    let rolelist = [];
    for(var i=0; i<vehicleStatic.roles.length;i++){
      let role = vehicleStatic.roles[i]
      let item = null
        if(vehicle[role]==undefined||vehicle[role]==""){
          item = <button onClick={()=>this.JoinRole(role)} className="btn squads_armycomp_card_joinbtn">Join</button>
        }else{
          let user = U.GetUser(this.props.users.users,vehicle[role])
          item = <p className="squads_armycomp_card_p"><img className="profileimg" src={user.avatar}/>{user.name}</p> 
        }
      rolelist.push(<tr><td  className="squads_armycomp_card_td1"><p className="squads_armycomp_card_p">{role}</p></td>
              <td className="squads_armycomp_card_td2">{item}</td></tr>)
    }
    return <div className="squads_armycomp_card"><div className="row squads_armycomp_card_row"><div className="col squads_armycomp_card_img_col"><img className="squads_armycomp_card_img" src={vehicleStatic.url[this.props.faction]}/></div>
      <div className="col squads_armycomp_card_img_col2">
        <table><tbody>{rolelist}</tbody></table>
      </div>
      </div>
             <button className="squads_armycomp_card_remove_btn" onClick={()=>this.RemoveVehicle()}><img className="ref_order_table_smallicon"  src="https://cdn.glitch.com/dd3f06b2-b7d4-4ccc-8675-05897efc4bb5%2FX.png?1557668374293" />
            </button>
    </div>
  }
}
/////////////////////////////////////////////////

const mapStateToProps = store => {    //Importing props from store
  //console.log(store) 
  let meta = store.meta
  return {
    squads: store.squads,
    users: store.users,
    faction:meta.settings.faction
  }
}

//////////////////////////////////////
export const Squads = connect(mapStateToProps)(SquadsCore)     //Connecting components

///Array of icons that could be displayed as squad icon
const squadicons = ["https://cdn.glitch.com/dd3f06b2-b7d4-4ccc-8675-05897efc4bb5%2F1s.png?1557484360213","https://cdn.glitch.com/6393f3fd-16a7-4641-ae3d-994f8e7cea4e%2FMapIconVehicle.png?1547280031111"]

