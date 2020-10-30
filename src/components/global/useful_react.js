import React from 'react';
import A from "../../redux/actions";
import socket from "../../_static/socket";
import store from "../../redux/store";
import {connect} from 'react-redux';
import U from "./useful_functions";
const Popover = require("react-tiny-popover");
////////////////////////////SOCKET EVENTS//////////////////////
socket.on("deleteObject", function(packet) {
  store.dispatch(A.deleteObject(packet.type, packet.key));
});
////////
socket.on("updatedynmap", function(packet) {
  store.dispatch(A.setDynamic(packet.dynamic, packet.events));
});
socket.on("updatestats", function(packet) {
  store.dispatch(A.setStats(packet));
});
socket.on("updateObject", function(packet) {
  store.dispatch(A.updateObject(packet.type, packet.object, packet.key));
});
////////
socket.on("updateTech", function(packet) {
  store.dispatch(A.updateTech(packet.techtree));
});
////////
socket.on("deleteroom", function() {
  window.modalcontainer.ShowModal(1);
});
socket.on("setRole", function(user) {
  store.dispatch(A.setRole(user));
});
socket.on("deleteblueprint", function(id) {
  store.dispatch(A.deleteBlueprint(id));
});
socket.on("submitEvent", function(packet) {
  store.dispatch(
    A.submitEvent({
      type: packet.type,
      date: packet.date,
      packet: packet.packet
    })
  );
});
socket.on("submitOpTimer", function(packet) {
  store.dispatch(A.submitOpTimer(packet.date));
});
socket.on("toggleSecure", function(packet) {
  store.dispatch(A.toggleSecure(packet));
});
socket.on("clearRoom", function() {
  store.dispatch(A.clearRoom());
});
socket.on("clearMap", function() {
  store.dispatch(A.clearMap());
});
socket.on("changeSettings", function(type, data) {
  store.dispatch(A.changeSettings(type, data));
});
socket.on("deleteSettings", function(type) {
  store.dispatch(A.deleteSettings(type));
});
socket.on("disconnectDiscord", function() {
  store.dispatch(A.disconnectDiscord());
});
socket.on("addMessage", function(packet, category) {
  store.dispatch(A.addMessage(packet, category));
});
socket.on("requestaccess", function(user) {
  //console.log("Requesting access",user)
  user.role = 0;
  store.dispatch(A.requestAccess(user));
});
socket.on("leaveroomroom", function(userid) {
  store.dispatch(A.leaveRoom(userid));
});
/////////////////////////////////////////////////
function UpdateObject(type, obj, key) {
  store.dispatch(A.updateObject(type, obj, key));
  socket.emit("updateObject", { type: type, object: obj, key: key });
}
//////////////////////////////////////////
class Notes extends React.Component {
  constructor(props) {
    super(props);
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.storeObj == undefined && nextProps.storeObj == undefined) {
      return false;
    }
    let obj = this.props.storeObj;
    if (obj == undefined) {
      obj = {};
    }
    let newobj = nextProps.storeObj;
    if (obj.notes == undefined && newobj.notes == undefined) {
      return false;
    }
    if (obj.notes === newobj.notes) {
      return false;
    }
    return true;
  }

  ChangeNotes(event) {
    let obj = JSON.parse(JSON.stringify(this.props.storeObj));
    obj.notes = event.target.value;
    let kind = this.props.selected.type;
    if (this.props.selected.townname == "misc") {
      kind = "misc_" + this.props.selected.type;
    }
    store.dispatch(A.updateObject(kind, obj, this.props.selected.key));
    socket.emit("updateObject", {
      type: kind,
      object: obj,
      key: this.props.selected.key
    });
  }
  render() {
    let obj = this.props.storeObj;
    let classname = "card-body cardheader collapse show ";
    if (obj.type != undefined) {
      classname = classname + "misc_notes_height";
    }
    //console.log("Notes obj",obj)
    if (obj == undefined || obj.notes == undefined) {
      return (
        <React.Fragment>
          <div className={classname} id="cardnotes">
            <textarea
              className="card_notes_input useronly"
              spellCheck="false"
              value=""
              onChange={event => this.ChangeNotes(event)}
            ></textarea>
          </div>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <div className={classname} id="cardnotes">
          <textarea
            className="card_notes_input useronly"
            spellcheck="false"
            value={obj.notes}
            onChange={event => this.ChangeNotes(event)}
          ></textarea>
        </div>
      </React.Fragment>
    );
  }
}
///////////////////////////////////////////////////////////////////////////////////////////
class LastUpdate_ extends React.Component {
  render() {
    if (
      this.props.storeObj == undefined ||
      this.props.storeObj.lastupdate == undefined
    ) {
      return (
        <div
          className="card-header cardheader"
          data-toggle="collapse"
          href="#cardnotes"
        >
          Last Update: None
        </div>
      );
    } else {
      return <U.GetUpdate obj={this.props.storeObj} />;
    }
  }
}
////////////////////////////////////////////////////////////////////////////////////////////
class DeletePopover extends React.Component {
  ////PROPS: handleDelete, header
  constructor(props) {
    super(props);
    this.state = {
      isPopoverOpen: false
    };
  }
  handleDelete() {
    store.dispatch(A.deleteObject(this.props.type, this.props.signature));
    socket.emit("deleteObject", {
      type: this.props.type,
      key: this.props.signature
    });
  }
  render() {
    return (
      <Popover.default
        isOpen={this.state.isPopoverOpen}
        position={"left"} // preferred position
        onClickOutside={() => this.setState({ isPopoverOpen: false })}
        content={
          <div id="submit_popover">
            <p>{this.props.header}</p>
            <button
              className="popover_submit_btn"
              onClick={() => this.handleDelete()}
            >
              <img
                className="popover_submit_img"
                src="https://cdn.glitch.com/6393f3fd-16a7-4641-ae3d-994f8e7cea4e%2Fcheckmark.png?1546938883091"
              />
            </button>
            <button
              className="popover_submit_btn"
              onClick={() => this.setState({ isPopoverOpen: false })}
            >
              <img
                className="popover_submit_img"
                src="https://cdn.glitch.com/6393f3fd-16a7-4641-ae3d-994f8e7cea4e%2FX%20icon%20small.png?1546753641488"
              />
            </button>
          </div>
        }
      >
        <button
          className="card_remove_btn"
          onClick={() =>
            this.setState({ isPopoverOpen: !this.state.isPopoverOpen })
          }
        >
          <img
            className="card_remove_image"
            src="https://cdn.glitch.com/dd3f06b2-b7d4-4ccc-8675-05897efc4bb5%2FX.png?1557668374293"
          />
        </button>
      </Popover.default>
    );
  }
}
const LastUpdate = connect(U.GetStoreProps)(LastUpdate_);
const connectedNotes = connect(U.GetStoreProps)(Notes);
export default {
  Notes: connectedNotes,
  UpdateObject: UpdateObject,
  LastUpdate: LastUpdate,
  DeletePopover: DeletePopover
};
