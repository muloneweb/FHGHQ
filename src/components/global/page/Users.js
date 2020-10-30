import React from 'react';
const ReactDOM = require("react-dom");
import socket from "../../../_static/socket";
import store from "../../../redux/store";
import {connect} from 'react-redux';
import U from "../useful_functions";
import A from "../../../redux/actions";
const rankclasses = [
  ,
  "row-admin", //1
  "row-mod", //2
  "row-user" //3
];

window.userlist = {
  users: [],
  onlineusers: []
};

////////////////////////////////////////SOCKET AREA BEGINS//////////////////////////////////////////////////
socket.on("onlineusers", function(userlist) {
  //console.log("Online users",userlist)
  window.userlist = userlist;
  for (var i = 0; i < window.userlist.users.length; i++) {
    if (window.userlist.onlineusers.includes(window.userlist.users[i].id)) {
      window.userlist.users[i].online = true;
    } else {
      window.userlist.users[i].online = false;
    }
  }
  store.dispatch(A.setOnlineUsers(window.userlist));
});

//Updates changes of user ranks
socket.on("updateusers", function(newusers) {
  //console.log("Socket users",newusers)
  for (var i = 0; i < newusers.length; i++) {
    if (window.steamid == newusers[i].id) {
      let rank = newusers[i].rank;
      if (rank > 2) {
        let tablink = document.getElementById("managetablink");
        if (tablink != null) {
          if (tablink.classList.contains("active")) {
            let mainlink = document.getElementById("homehref");
            mainlink.click();
          }
        }
      }
      break;
    }
  }
  store.dispatch(A.setUsers(newusers));
});

//Transfers ownership
socket.on("hailnewking", function(newadmin) {
  store.dispatch(A.hailNewKing(newadmin));
});
////////////////////////////////////////SOCKET AREA ENDS//////////////////////////////////////////////////

class UserList extends React.Component {
  ////Component generation
  constructor(props) {
    super(props);
  }
  shouldComponentUpdate(nextProps, nextState) {
    //console.log(this.props.tab,nextProps.tab)
    if (
      JSON.stringify(this.props.tab.messagespersonal) !=
      JSON.stringify(nextProps.tab.messagespersonal)
    ) {
      return true;
    }
    if (
      this.props.tab.tab != nextProps.tab.tab &&
      (this.props.tab.tab == 5 || nextProps.tab.tab == 5)
    ) {
      return true;
    }
    if (JSON.stringify(this.props.users) != JSON.stringify(nextProps.users)) {
      return true;
    }
    if (JSON.stringify(this.props.squads) != JSON.stringify(nextProps.squads)) {
      return true;
    }
    if (
      JSON.stringify(this.props.private) != JSON.stringify(nextProps.private)
    ) {
      return true;
    }
    return false;
  }
  render() {
    if (this.props.tab.tab == 5) {
      return null;
    }
    //console.log("Rendering users")
    let userlist = {
      online: [],
      offline: []
    };
    let users = this.props.users.users;
    for (let user of users) {
      if (user.online) {
        userlist.online.push(user);
      } else {
        userlist.offline.push(user);
      }
    }
    userlist.online = userlist.online
      .sort(U.compare)
      .map(user => (
        <UserlistUnit
          key={user.id}
          user={user}
          private={this.props.private}
          squads={this.props.squads}
          tab={this.props.tab}
        />
      ));
    userlist.offline = userlist.offline
      .sort(U.compare)
      .map(user => (
        <UserlistUnit
          key={user.id}
          user={user}
          private={this.props.private}
          squads={this.props.squads}
          tab={this.props.tab}
        />
      ));
    //console.log('Rendering Online Users'); do you see me?ya
    return (
      <div id="usrow" className="col-sm-12 col-lg-2 user_panel">
        <table className="usertable">
          <colgroup>
            <col width="60" />
          </colgroup>
          <thead></thead>
          <tbody id="usertablebody">{userlist.online}</tbody>
        </table>

        <table className="usertable">
          <colgroup>
            <col width="60" />
          </colgroup>
          <thead></thead>
          <tbody id="usertablebodyoffline">{userlist.offline}</tbody>
        </table>
      </div>
    );
  }
}
////////////////////////////////////////////////////////////
class UserlistUnit extends React.Component {
  ////Component generation
  constructor(props) {
    super(props);
    this.state = {
      time: 0
    };
  }
  componentDidMount() {
    this.interval = setInterval(
      () => this.setState({ time: Date.now() }),
      1000
    );
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  handleSelect() {
    //if(this.props.user.id!=window.steamid){
    store.dispatch(A.selectUser(this.props.user.id));
    //}
  }
  render() {
    //console.log("Rendering user",props)
    if (this.props.user.id == "anonymous") {
      return null;
    }
    let statusflags = [false, false, false, false];
    let squadindex = 0;
    if (this.props.user.role != 0) {
      statusflags[0] = true;
    }
    for (var obj in this.props.private.requests) {
      let wip = this.props.private.requests[obj].wip;
      for (var i = 0; i < wip.length; i++) {
        if (wip[i].author == this.props.user.id && wip[i].request.length > 0) {
          statusflags[3] = true;
          break;
          break;
        }
      }
    }
    for (var i = 0; i < this.props.squads.squads.length; i++) {
      let squad = this.props.squads.squads[i];
      for (var j = 0; j < squad.users.length; j++) {
        if (this.props.user.id == squad.users[j]) {
          statusflags[1] = true;
          squadindex = i;
          break;
          break;
        }
      }
    }
    for (var refinery in this.props.private.refinery) {
      let ref = this.props.private.refinery[refinery];
      if (ref.orders != undefined) {
        if (ref.orders.length > 0) {
          for (var i = 0; i < ref.orders.length; i++) {
            if (ref.orders[i].author == this.props.user.id) {
              let now = new Date();
              if (now < ref.orders[i].finishDate) {
                //console.log("got refinery",ref)
                statusflags[2] = true;
                break;
                break;
              }
            }
          }
        }
      }
    }

    if (this.props.user.rank < 4) {
      let online = " user-offline";
      let rowclass = "user-row_offline";
      if (this.props.user.online) {
        online = " user-online";
        rowclass = "user-row_online";
      }
      let messagesicon = null;
      if (this.props.tab.messagespersonal[this.props.user.id]) {
        messagesicon = (
          <img
            className="userlist_chat_notification"
            src="https://cdn.glitch.com/84b19724-a86b-4caa-8e69-1e9c973e043f%2Fimage.png?v=1566043066208"
          />
        );
      }
      return (
        <tr
          className={"user-row " + rowclass}
          onClick={() => this.handleSelect()}
        >
          <td className="userlist_icon_cell">
            <div className="userlist_status_cell">
              <div className="userlist_status_container_userimg">
                <img
                  className="profileimg"
                  src={
                    this.props.user.id.includes("anonymous")
                      ? "https://cdn.glitch.com/dd3f06b2-b7d4-4ccc-8675-05897efc4bb5%2Fdasd.jpg?1556805827222"
                      : this.props.user.avatar
                  }
                ></img>{" "}
              </div>
              <div className="userlist_status_container">
                {statusflags[0] && (
                  <img
                    className="userlist_status_icon"
                    src={U.roleicons[this.props.user.role[0]].url}
                  />
                )}
              </div>
              <div className="userlist_status_container">
                {statusflags[1] && (
                  <img
                    className="userlist_status_icon"
                    src={U.squadnumbers[squadindex]}
                  />
                )}
              </div>
              <div className="userlist_status_container">
                {statusflags[2] && (
                  <img
                    className="userlist_status_icon"
                    src="https://cdn.glitch.com/dd3f06b2-b7d4-4ccc-8675-05897efc4bb5%2Fcog.png?1557599395034"
                  />
                )}
              </div>
              <div className="userlist_status_container">
                {statusflags[3] && (
                  <img
                    className="userlist_status_icon"
                    id="userlist_truck_icon"
                    src="https://cdn.glitch.com/dd3f06b2-b7d4-4ccc-8675-05897efc4bb5%2Ftruckmove.png?1554654847337"
                  />
                )}
              </div>
            </div>
          </td>
          <td className={"userlist_cell " + rowclass}>
            <h6
              className={
                "userlist_header " + rankclasses[this.props.user.rank] + online
              }
            >
              {messagesicon}
              {this.props.user.name}
            </h6>
          </td>
        </tr>
      );
    } else {
      return null;
    }
  }
}

function compareonline(a, b) {
  if (a.online < b.online) return 1;
  if (a.online > b.online) return -1;
  return 0;
}

const mapStateToProps = store => {
  //console.log(store)
  let privateinfo = store.private;
  return {
    users: store.users,
    private: { requests: privateinfo.requests, refinery: privateinfo.refinery },
    squads: store.squads,
    tab: store.tab
  };
};
const mapStateToPropsUser = store => {
  //console.log(store)
  let privateinfo = store.private;
  return {
    users: store.users,
    private: { requests: privateinfo.requests, refinery: privateinfo.refinery },
    squads: store.squads
  };
};
export default connect(mapStateToProps)(UserList);
