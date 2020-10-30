const { combineReducers } = require('redux');
import A from "./actions";
import DisplayReducer from './display/reducer';
import U from '../components/global/useful_functions';
import socket from '../_static/socket';

const initialStateMap = {
  dynamic: [],
  static: {},

  fobs: {},
  requests: {},
  misc: {},
  stats: { totalplayers: 0 },
};
const initialStateMapPrivate = {
  refinery: {},
  production: {},
  storage: {},
  stockpiles: {},
  fobs: {},
  requests: {},
  misc: {},
};
const initialStateTech = {
  techtree: {},
};
const initialStateUsers = {
  users: [],
  myrank: 3,
};
const initialStateMeta = {
  adminid: '',
  adminname: '',
  settings: {},
  users: [],
};
const initialStateSelected = {
  type: '',
  key: '',
  refinery: '',
  production: '',
  storage: '',
  townname: '',
  tech: '',
  misctype: 0,
  refselect: '',
};
const initialStateTab = {
  tab: 0,
  messages: 0,
  user: 0,
  messagespersonal: {},
};
const initialStateArty = {
  arty: [],
};
const initialStateRefinery = {

};
const initialStateSquads = {
  squads: [],
  vehicles: {},
};
const initialStateEvents = {
  events: [],
  privateEvents: [],
};
const initialStateMouse = {
  mouse: [-10000, -10000],
};
// ////////////////////////////////////////////////////////////////////////////////
const RoomInfoReducer = (state = initialStateMap, action) => {
  let info = {};
  switch (action.type) {
    case A.LOAD_PAGE:
      return { ...state, dynamic: action.data.dynamic,
            static: action.data.static,

            fobs:TransformArray(action.data.private.fobs),
            requests:TransformArray(action.data.private.requests),
            misc:action.data.private.misc,
            stats:action.data.stats};

    case A.SET_DYNAMIC: // Updates the map from API
      return { ...state, dynamic: action.dynamic,};
    case A.SET_STATS: // Updates the map from API
      return { ...state, stats: action.stats,};
    case A.UPDATE_OBJECT:
      info = JSON.parse(JSON.stringify(state));
      // console.log(action)
      // console.log(info)
      // console.log("State",state)
      if (action.kind.includes('misc')) {
        const kind = action.kind.slice(5);
        if (info.misc[kind] == undefined) {
          info.misc[kind] = {};
        }
        if (action.object.type > 24 && info.misc[kind][action.signature] != undefined) {

        }
        info.misc[kind][action.signature] = TransformObject(action.object);
        return { ...state, misc: info.misc };
      }
      if (action.kind != 'refinery' && action.kind != 'production' && action.kind != 'storage' && action.kind != 'stockpiles' && action.kind != 'artypanel') {
        info[action.kind][action.signature] = TransformObject(action.object);
        // console.log(action)
        return { ...state, [action.kind]: info[action.kind]};
      }

      break;
    case A.DELETE_OBJECT:
      info = JSON.parse(JSON.stringify(state));
      if (action.kind.includes('misc')) {
        const kind = action.kind.slice(5);
        if (info.misc[kind] == undefined) {
          info.misc[kind] = {};
        }
        delete info.misc[kind][action.signature];
        return { ...state, misc: info.misc};
      }
      if (action.kind != 'towns' && action.kind != 'forts') {
        delete info[action.kind][action.signature];
        return { ...state, [action.kind]: info[action.kind]};
      }

    case A.CLEAR_ROOM:
      window.selecticon.ChangePosition([-10000, -10000]);
      return { ...state, fobs:{},
            requests:{},
            misc:{}};
    case A.CLEAR_MAP:
      window.selecticon.ChangePosition([-10000, -10000]);
      info = JSON.parse(JSON.stringify(state));
      info.misc.icon = {};
      info.misc.rld = {};
      return { ...state, fobs:{},
            requests:{},
            misc:info.misc,};
  }

  return state;
};
// //////////////////////////////////////////////////////////////////////////////////////////////////////////
const PrivateReducer = (state = initialStateMapPrivate, action) => {
  // console.log("info:")
  // console.log(state)
  let info = {};
  switch (action.type) {
    case A.LOAD_PAGE:
      return { ...state, refinery:action.data.private.refinery,
            production:action.data.private.production,
            storage:action.data.private.storage,
            stockpiles:action.data.private.stockpiles,
            fobs:action.data.private.fobs,
            requests:action.data.private.requests,
            misc:action.data.private.misc,};
    case A.UPDATE_OBJECT:
      info = JSON.parse(JSON.stringify(state));
      if (action.kind.includes('misc')) {
        const kind = action.kind.slice(5);
        if (info.misc[kind] == undefined) {
          info.misc[kind] = {};
        }
        info.misc[kind][action.signature] = JSON.parse(JSON.stringify(action.object));
        info.misc[kind][action.signature].lastupdate = new Date();

        return { ...state, misc: info.misc};
      }
      info[action.kind][action.signature] = action.object;
      info[action.kind][action.signature].lastupdate = new Date();
      return { ...state, [action.kind]: info[action.kind]};

    case A.DELETE_OBJECT:
      info = JSON.parse(JSON.stringify(state));
      if (action.kind.includes('misc')) {
        const kind = action.kind.slice(5);
        if (info.misc[kind] == undefined) {
          info.misc[kind] = {};
        }
        delete info.misc[kind][action.signature];
        return { ...state, misc: info.misc};
      }
      delete info[action.kind][action.signature];
      return { ...state, [action.kind]: info[action.kind]};

      break;
    case A.ADD_MESSAGE:
      info = JSON.parse(JSON.stringify(state));
      console.log('Adding message', state.misc.chat);
      if (info.misc.chat == undefined) {
        info.misc.chat = {};
        info.misc.chat[action.category] = [];
      }
      if (info.misc.chat[action.category] == undefined) {
        info.misc.chat[action.category] = [];
      }
      info.misc.chat[action.category].push(action.packet);
      console.log('Added message', info.misc.chat);
      return { ...state, misc: info.misc};
    case A.CLEAR_ROOM:
      return { ...state, refinery:{},
            production:{},
            storage:{},
            stockpiles:{},
            fobs:{},
            requests:{},
            misc:{},};
    case A.CLEAR_MAP:
      info = JSON.parse(JSON.stringify(state));
      info.misc.icon = {};
      info.misc.rld = {};
      return { ...state, fobs:{},
            requests:{},
            misc:info.misc,};
  }

  return state;
};
// ///////////////////////////////////////////////////////////////////////////////////////////////////////
const TechtreeReducer = (state = initialStateTech, action) => {
  switch (action.type) {
    case A.LOAD_PAGE:
      return { ...state, techtree: action.data.private.techtree };
    case A.UPDATE_TECH:
      return { ...state, techtree: action.techtree };
    case A.CLEAR_ROOM:
      return { ...state, techtree: {} };
  }
  return state;
};
// ///////////////////////////////////////////////////////////////////////////////////////////////////////
const UserReducer = (state = initialStateUsers, action) => {
  let { users } = state;
  // let meta = state.meta

  switch (action.type) {
    case A.LOAD_PAGE:
      if (users[0] == undefined) {
        users = JSON.parse(JSON.stringify(action.data.users));
      }
      for (var i = 0; i < users.length; i++) {
        try {
          users[i].role = JSON.parse(users[i].role);
        } catch (err) {}
      }
      return {
        ...state,
        users,
        myrank: U.GetMyRank(action.data.users),
      };
    case A.SET_ONLINE_USERS:
      for (var i = 0; i < action.users.users.length; i++) {
        action.users.users[i].role = JSON.parse(action.users.users[i].role);
      }
      return { ...state, users: action.users.users };
    case A.SET_USERS:
      let rank = 3;
      const userlist = action.users;
      // console.log("State users",users)
      for (var i = 0; i < userlist.length; i++) {
        if (window.steamid == userlist[i].id) {
          rank = userlist[i].rank;
        }
        try {
          userlist[i].role = JSON.parse(userlist[i].role);
        } catch (err) {}
        for (let j = 0; j < users.length; j++) {
          if (userlist[i].id == users[j].id) {
            userlist[i].online = users[j].online;
            break;
          }
        }
      }
      // console.log("Store",store)
      if (rank == 4) { // kicks if banned
        window.modalcontainer.ShowModal(2);
        socket.close();
      }
      return {
        ...state,
        users: action.users,
        myrank: rank, // U.GetMyRank(action.users)
      };

    case A.SET_USER: // Changes user rank in settings
      users = JSON.parse(JSON.stringify(users));
      for (var i = 0; i < users.length; i++) {
        if (users[i].id == action.user.id) {
          users[i].rank = action.user.rank;
        }
      }
      // console.log("Redux top",Top,socket)

      socket.emit('updateusers', users, window.steamid);
      return {
        ...state,
        users,
        myrank: U.GetMyRank(users),
      };
    case A.REQUEST_ACCESS:
      users = JSON.parse(JSON.stringify(users));
      users.push(action.user);
      return { ...state, users };
    case A.LEAVE_ROOM:
      users = JSON.parse(JSON.stringify(users));
      for (var i = 0; i < users.length; i++) {
        if (users[i].id == action.userid) {
          users.splice(i, 1);
        }
      }
      return { ...state, users };
    case A.SET_ROLE:
      users = JSON.parse(JSON.stringify(users));
      for (var i = 0; i < users.length; i++) {
        if (users[i].id == action.user.id) {
          users[i].role = action.user.role;
        }
      }
      return { ...state, users };
    case A.HAIL_NEW_KING: // Transfers ownership
      users = JSON.parse(JSON.stringify(users));
      for (var i = 0; i < users.length; i++) {
        if (users[i].rank == 1) {
          users[i].rank = 2;
        }
        if (users[i].id == action.id) {
          users[i].rank = 1;
        }
      }
      return {
        ...state,
        users,
        myrank: U.GetMyRank(users),
      };
  }
  return state;
};
// //////////////////////////////////////////////////////////////////////////////////////////////////
const MetaReducer = (state = initialStateMeta, action) => {
  let settings = JSON.parse(JSON.stringify(state.settings));
  switch (action.type) {
    case A.LOAD_PAGE:
      return {
        ...state,
        adminid: action.data.meta.adminid,
        adminname: action.data.meta.adminname,
        settings: action.data.meta.settings,
        users: action.data.users,
      };
    case A.HAIL_NEW_KING: // Transfers ownership
      return {
        ...state,
        adminid: action.id,
        adminname: U.GetUsername(state.users, action.id),
      };
    case A.SUBMIT_OPTIMER:
      settings = JSON.parse(JSON.stringify(state.settings));
      settings.optimer = action.date;
      return { ...state, settings };
    case A.DELETE_OPTIMER:
      // console.log("deleting optimer")
      settings = JSON.parse(JSON.stringify(state.settings));
      delete settings.optimer;
      return { ...state, settings };
    case A.CHANGE_SETTINGS:
      settings = JSON.parse(JSON.stringify(state.settings));
      settings[action.kind] = action.data;
      return { ...state, settings };
    case A.DELETE_SETTINGS:
      settings = JSON.parse(JSON.stringify(state.settings));
      delete settings[action.kind];
      return { ...state, settings };
    case A.TOGGLE_SECURE:
      settings = JSON.parse(JSON.stringify(state.settings));
      settings.secure = action.data;
      if (action.data == 1 && window.steamid.includes('anonymous')) {
        window.modalcontainer.ShowModal(2);
        socket.close();
      }
      return { ...state, settings };
  }
  return state;
};
// /////////////////////////////////////////////////////////////////////////////////////////////////////
const SelectedReducer = (state = initialStateSelected, action) => {
  let kind = '';
  switch (action.type) {
    case A.SELECT_OBJECT:
      // console.log("Selecting object")
      let selectbool = true;
      if (action.objtype != 'refinery' && action.objtype != 'production' && action.objtype != 'storage' && action.objtype != 'stockpiles' && action.objtype != 'artypanel') {
        selectbool = window.selecticon.SelectPrivate(action);
      }
      if (action.objtype != 'artypanel') {
        const refdropdown = document.getElementById('map_artycontrol_dropdown');
        if (refdropdown.classList.contains('show')) {
          const reftab = document.getElementById('map_artycontrol_btn');

          reftab.click();
        }
      }
      if (selectbool) {
        return {
          ...state,
          type: action.objtype,
          key: action.signature,
          townname: action.townname,
          misctype: action.misctype,
          refinery: action.refinery,
          production: action.production,
          storage: action.storage,
        };
      }
    case A.DELETE_OBJECT:
      kind = action.kind;
      if (action.kind.includes('misc')) {
        kind = action.kind.slice(5);
      }
      if (state.type == kind && state.key == action.signature) {
        window.selecticon.ChangePosition([-10000, -10000]);
        return {
          ...state,
          type: '',
          key: '',
        };
      }
    case A.SELECT_TECH:
      return { ...state, tech: action.tech };
    case A.CLEAR_MAP:
    case A.CLEAR_ROOM:
      return {
        ...state,
        type: '',
        key: '',
        townname: '',
        misctype: '',
      };
    case A.UPDATE_OBJECT:
      kind = action.kind;
      if (action.kind.includes('misc')) {
        kind = action.kind.slice(5);
      }
      if (state.type == kind && state.key == action.signature) {
        if (action.object.position != undefined) {
          window.selecticon.ChangePosition([action.object.position.y, action.object.position.x]);
        }
      }
      break;
  }

  return state;
};
// ////////////////////////////////////////////////////////////////////////////////////////////////
const TabReducer = (state = initialStateTab, action) => {
  let info = {};
  switch (action.type) {
    case A.SELECT_TAB:
      if (action.tab == 5) {
        socket.emit('joinStats');
      } else {
        socket.emit('leaveStats');
      }
      if (action.tab == 7) {
        return {
          ...state,
          tab: action.tab,
          messages: 0,
        };
      }
      return { ...state, tab: action.tab };
    case A.ADD_MESSAGE:
      info = JSON.parse(JSON.stringify(state));
      if (state.tab != 7 && (action.category == 'general' || action.category == 'announcements')) {
        return { ...state, messages: info.messages + 1 };
      }
      if (info.user != action.category) {
        info.messagespersonal[action.category] = true;
        return { ...state, messagespersonal: info.messagespersonal };
      }
      break;
    case A.SELECT_USER:
      info = JSON.parse(JSON.stringify(state));
      info.messagespersonal[action.id] = false;
      return {
        ...state,
        user: action.id,
        messagespersonal: info.messagespersonal,
      };
  }
  return state;
};
// ////////////////////////////////////////////////////////////////////////////////////////////////
const ArtyReducer = (state = initialStateArty, action) => {
  let arty = JSON.parse(JSON.stringify(state.arty));
  switch (action.type) {
    case A.LOAD_PAGE:
      arty = action.data.private.arty;
      if (arty.constructor != Array) { arty = []; }
      return { ...state, arty };
    case A.ADD_ARTY_RESULT:
      arty.push(action.totalstring);
      if (arty.length > 5) {
        arty.splice(0, 1);
      }
      return { ...state, arty };
    case A.CLEAR_ROOM:
      return { ...state, arty: [] };
  }
  return state;
};
// /////////////////////////////////////////////////////////////////////////////////////////
const SquadsReducer = (state = initialStateSquads, action) => {
  // console.log("State1",state)
  let squads = [];
  if (state.squads != undefined) {
    squads = state.squads;
  }
  switch (action.type) {
    case A.LOAD_PAGE:
      // console.log("State2",state,action.data.private.squads)
      squads = action.data.private.squads;
      // console.log("Loading squads:",action.data.private.squads)
      if (squads == null || squads == undefined) {
        squads = {};
      }
      if (squads.squads == null || squads.squads == undefined) {
        squads.squads = [];
      }
      if (squads.vehicles == null || squads.vehicles == undefined) {
        squads.vehicles = {};
      }
      return {
        ...state,
        squads: squads.squads,
        vehicles: squads.vehicles,
      };
    case A.UPDATE_SQUADS:
      // console.log("State3",state)
      return { ...state, [action.kind]: action.data };
    case A.CLEAR_ROOM:
      return {
        ...state,
        squads: [],
        vehicles: {},
      };
  }
  return state;
};
// //////////////
const EventsReducer = (state = initialStateEvents, action) => {
  let privateEvents = [];
  if (state.privateEvents != undefined) {
    privateEvents = JSON.parse(JSON.stringify(state.privateEvents));
  }
  switch (action.type) {
    case A.LOAD_PAGE:
      // console.log("Action")
      // console.log(action)
      return {
        ...state,
        events: action.data.events.events,
        privateEvents: action.data.private.events,
      };
    case A.SET_DYNAMIC: // Updates the map from API
      // console.log("Action")
      // console.log(action)
      // console.log("Adding new event")
      return { ...state, events: action.events };
    case A.SUBMIT_EVENT:
      privateEvents.push(action.packet);
      // console.log("Submit event",action.packet)
      switch (action.packet.type) {
        case 2:
          window.soundcontrol.PlaySingle('https://cdn.glitch.com/dd3f06b2-b7d4-4ccc-8675-05897efc4bb5%2Fsupp%20completed.mp3');
          break;
        case 3:
          window.soundcontrol.PlaySingle('https://cdn.glitch.com/dd3f06b2-b7d4-4ccc-8675-05897efc4bb5%2Fsupplies.mp3');
          break;
        case 4:
          window.soundcontrol.PlaySingle('https://cdn.glitch.com/dd3f06b2-b7d4-4ccc-8675-05897efc4bb5%2Frelic.mp3');
          break;
      }
      if (privateEvents > 50) {
        privateEvents = privateEvents.slice(1);
      }
      return { ...state, privateEvents };
    case A.CLEAR_ROOM:
      return { ...state, privateEvents: [] };
  }
  return state;
};
// /////////////////////////////////////////
export const rootReducer = combineReducers({
  roominfo: RoomInfoReducer,
  private: PrivateReducer,
  techtree: TechtreeReducer,
  users: UserReducer,
  meta: MetaReducer,
  selected: SelectedReducer,
  tab: TabReducer,
  events: EventsReducer,
  display: DisplayReducer,

  arty: ArtyReducer,
  squads: SquadsReducer,

});

function TransformArray(array) {
  const newarray = {};
  for (const obj in array) {
    newarray[obj] = { position: array[obj].position };
  }
  return newarray;
}

function TransformObject(obj) {
  let newobj = {};
  newobj = { position: obj.position };
  return newobj;
}
function CoordsOnly(obj) {
  return {
    position: obj.position,
  };
}
