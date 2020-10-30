import React from "react";
import A from "../../../redux/actions.js";
import U from "../useful_functions";
import cost from "../../../_static/cost";
import socket from "../../../_static/socket";
import store from "../../../redux/store";
import clone from 'clone'
import { connect } from "react-redux";

class ModalContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      body: "",
      footer: ""
    };
    this.ShowModal = this.ShowModal.bind(this);
    this.CloseModal = this.CloseModal.bind(this);
  }

  CloseModal() {
    this.setState(() => {
      return {
        title: "",
        body: "",
        footer: "",
        show: false
      };
    });
  }

  HailNewKing(user) {
    //console.log("Transfering ownership")
    socket.emit("hailnewking", user.id, window.steamid);
    store.dispatch(A.hailNewKing(user.id));
    this.CloseModal();
  }

  ToggleSecure(data) {
    let type = 0;
    if (data == "secure") {
      type = 1;
    }
    socket.emit("toggleSecure", type);
    store.dispatch(A.toggleSecure(type));
    this.CloseModal();
  }

  ClearRoom() {
    store.dispatch(A.clearRoom());
    socket.emit("clearRoom");
    this.CloseModal();
  }

  ReturnToProfile() {
    window.location.replace("/");
  }

  ShowModal(type, data) {
    switch (type) {
      case 0: //Admin transfer modal
        if (data.id.includes("anonymous")) {
          this.setState({
            title: "Transfer ownership",
            body: <h5>You can't transfer ownership to anonymous users.</h5>,
            footer: (
              <React.Fragment>
                <button
                  type="button"
                  className="btn"
                  onClick={() => this.CloseModal()}
                >
                  Close
                </button>
              </React.Fragment>
            ),
            show: true
          });
        } else {
          this.setState({
            title: "Transfer ownership",
            body: (
              <h5>
                Are you sure you want to transfer ownership of room{" "}
                {this.props.meta.settings.name} to {data.name}?
              </h5>
            ),
            footer: (
              <React.Fragment>
                <button
                  type="button"
                  className="btn"
                  onClick={() => this.HailNewKing(data)}
                >
                  Yes
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => this.CloseModal()}
                >
                  No
                </button>
              </React.Fragment>
            ),
            show: true
          });
        }
        break;
      case 1: //Room deleted modal
        this.setState({
          title: "This room has been deleted",
          body: <h5>This room has been deleted by admin</h5>,
          footer: (
            <button
              type="button"
              className="btn"
              onClick={() => this.ReturnToProfile()}
            >
              Return to profile
            </button>
          ),
          show: true
        });
        break;
      case 2:
        this.setState({
          title: "You have been banned",
          body: (
            <h5>You have been banned from this room by admin or moderator</h5>
          ),
          footer: (
            <button
              type="button"
              className="btn"
              onClick={() => this.ReturnToProfile()}
            >
              Return to profile
            </button>
          ),
          show: true
        });
        break;
      case 3:
        let line =
          "Changing this room to secure will kick all anonymous users.";
        if (data == "unsecure") {
          line = "Changing this room to unsecure will allow any user to join.";
        }
        this.setState({
          title: "Are you sure you want to change the room to " + data + "?",
          body: <h5>{line}</h5>,
          footer: (
            <React.Fragment>
              <button
                type="button"
                className="btn"
                onClick={() => this.ToggleSecure(data)}
              >
                Yes
              </button>
              <button
                type="button"
                className="btn"
                onClick={() => this.CloseModal()}
              >
                No
              </button>
            </React.Fragment>
          ),
          show: true
        });
        break;
      case 4:
        this.setState({
          title: "Reset room",
          body: (
            <h5>
              This action will remove all private data except for the users. Use
              this at the start of a new conquest.
            </h5>
          ),
          footer: (
            <React.Fragment>
              <button
                type="button"
                className="btn"
                onClick={() => this.ClearRoom()}
              >
                Yes
              </button>
              <button
                type="button"
                className="btn"
                onClick={() => this.CloseModal()}
              >
                No
              </button>
            </React.Fragment>
          ),
          show: true
        });
        break;
    }
  }

  render() {
    //console.log("Rendering modal")
    return (
      <React.Fragment>
        <div
          className={this.state.show ? "modal show" : "modal"}
          style={{ display: this.state.show ? "block" : "none" }}
        >
          <div id="general-modal-dialog" className="modal-dialog">
            <div id="general-modal" className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">{this.state.title}</h4>
                {/*<button type="button" className="close" onClick={()=>this.CloseModal()}>&times;</button>*/}
              </div>
              <div className="modal-body">{this.state.body}</div>
              <div className="modal-footer">{this.state.footer}</div>
            </div>
          </div>
        </div>
        <div
          className="modal-backdrop show"
          style={{ display: this.state.show ? "block" : "none" }}
        ></div>
      </React.Fragment>
    );
  }
}

/////////////////////////////////////////////////////////////////////////////////////////

class RequestModalContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      position: { lat: 0, lng: 0 },
      request: [[], [], []],
      show: false,
      type: 0
    };
    this.ShowModal = this.ShowModal.bind(this);
    this.CloseModal = this.CloseModal.bind(this);
    this.AddItem = this.AddItem.bind(this);
    this.RemoveItem = this.RemoveItem.bind(this);
    this.ChangeItem = this.ChangeItem.bind(this);
    this.EmptyRequest = this.EmptyRequest.bind(this);
  }
  shouldComponentUpdate(nextProps, nextState) {
    //console.log("Request modal container - check")
    if (JSON.stringify(this.state) != JSON.stringify(nextState)) {
      return true;
    }
    return false;
  }
  CloseModal() {
    this.setState(() => {
      return {
        position: { lat: 0, lng: 0 },
        show: false
      };
    });
  }

  ShowModal(event, type) {
    //console.log('Modal props')
    //console.log(this.props);
    let position = {};
    let request = [];
    if (type == 0) {
      position = event.latlng;
      if (this.state.type == 0) {
        request = clone(this.state.request);
      } else {
        request = [[], [], []];
      }
    } else {
      position = event;
      request = clone(this.props.requests[event].request);
    }
    //console.log(position)
    this.setState(() => {
      return {
        request: request,
        position: position,
        show: true,
        type: type
      };
    });
  }

  AddItem(cat, id, priority) {
    this.setState(state => {
      let array = clone(state.request);
      let item = {
        amount: cost.cost[cat][id].i,
        crates: 1,
        catid: cat,
        itemid: id
      };
      let obj = array[priority].find(
        obj => obj.catid == item.catid && obj.itemid == item.itemid
      );
      if (obj === undefined) {
        array[priority].push(item);
        array[priority].sort(this.comparereq);
      } else {
        obj.amount = Number(obj.amount) + Number(cost.cost[cat][id].i);
        obj.crates++;
      }
      return {
        request: array,
        show: true
      };
    });
  }

  RemoveItem(priority, index) {
    this.setState(state => {
      let request = clone(state.request);
      request[priority].splice(index, 1);
      return {
        request: request
      };
    });
  }

  ChangeItem(priority, index, event) {
    //console.log("Changing item")
    let request = clone(this.state.request);
    let value = event.target.value;
    let item = request[priority][index];
    if (value === "") {
      value = 0;
    }
    request[priority][index].amount = value;
    var crates = Math.ceil(value / cost.cost[item.catid][item.itemid].i);
    request[priority][index].crates = crates;
    //console.log(request);
    this.setState({ request: request });
  }

  EmptyRequest() {
    this.setState({ request: [[], [], []] });
  }

  GetRequest() {
    let ChangeItem = this.ChangeItem;
    let RemoveItem = this.RemoveItem;
    function RenderLine(obj, priority, index) {
      return (
        <tr className="req_modal_item_tr">
          <td
            className="removebutton"
            onClick={() => RemoveItem(priority, index)}
          >
            <img
              className="removebutton"
              src="https://cdn.glitch.com/dd3f06b2-b7d4-4ccc-8675-05897efc4bb5%2Ffdssred.png?1554997544338"
            />
          </td>
          <td>
            <img
              className="removebutton"
              src={cost.cost[obj.catid][obj.itemid].src}
            />
          </td>
          <td>
            <p>{cost.cost[obj.catid][obj.itemid].name}</p>
          </td>
          <td>
            <p>{obj.crates}</p>
          </td>
          <td>
            <input
              type="number"
              min={cost.cost[obj.catid][obj.itemid].i}
              step={cost.cost[obj.catid][obj.itemid].i}
              value={obj.amount}
              style={{ width: 90 }}
              onChange={event => ChangeItem(priority, index, event)}
            ></input>
          </td>
        </tr>
      );
    }

    return (
      <React.Fragment>
        {this.state.request[0].length > 0 ? (
          <tr>
            <td className="requestmodal_priority_high" colSpan="5">
              High Priority
            </td>
          </tr>
        ) : null}
        {this.state.request[0].map((obj, index) => RenderLine(obj, 0, index))}
        {this.state.request[1].length > 0 ? (
          <tr>
            <td className="requestmodal_priority_medium" colSpan="5">
              Medium Priority
            </td>
          </tr>
        ) : null}
        {this.state.request[1].map((obj, index) => RenderLine(obj, 1, index))}
        {this.state.request[2].length > 0 ? (
          <tr>
            <td className="requestmodal_priority_low" colSpan="5">
              Low Priority
            </td>
          </tr>
        ) : null}
        {this.state.request[2].map((obj, index) => RenderLine(obj, 2, index))}
      </React.Fragment>
    );
  }

  comparereq(a, b) {
    if (a.catid < b.catid) return -1;
    if (a.catid > b.catid) return 1;
    if (a.catid == b.catid) {
      if (a.itemid < b.itemid) return -1;
      if (a.itemid > b.itemid) return 1;
    }
    return 0;
  }
  CreateRequest() {
    //console.log("Creating request");
    //console.log(this.state)
    let key = U.signature({
      x: this.state.position.lng,
      y: this.state.position.lat
    });
    if (
      this.state.request[0].length == 0 &&
      this.state.request[1].length == 0 &&
      this.state.request[2].length == 0
    ) {
      alert("The request is empty!");
    } else {
      this.CloseModal();
      //socket.emit('hailnewking',user.id,window.steamid)
      if (this.state.type == 0) {
        let object = {
          author: window.steamid,
          lastupdate: new Date(),
          wip: [],
          done: [],
          notes: "",
          request: this.state.request,
          position: { x: this.state.position.lng, y: this.state.position.lat }
        };
        //console.log("Request object");
        //console.log(object)
        store.dispatch(A.updateObject("requests", object, key));
        socket.emit("updateObject", {
          type: "requests",
          object: object,
          key: key
        });
        let packet = { type: 3, date: JSON.stringify(new Date()), packet: key };
        store.dispatch(A.submitEvent(packet));
        socket.emit("submitEvent", packet);
        this.EmptyRequest();
      } else {
        if (this.props.requests[this.state.position] == undefined) {
          //this.CloseModal();
          alert("This request has been deleted while you were editing.");
        } else {
          key = this.state.position;
          let object = JSON.parse(
            JSON.stringify(this.props.requests[this.state.position])
          );
          object.request = this.state.request;
          //console.log("changing request",object)
          store.dispatch(A.updateObject("requests", object, key));
          socket.emit("updateObject", {
            type: "requests",
            object: object,
            key: key
          });
          this.EmptyRequest();
        }
      }
      //window.worldmap.CreateRequest(this.state.request,this.state.position);
    }
  }

  render() {
    //console.log("Request:")
    //console.log(this.state);
    //console.log("Rendering request modal")
    return (
      <React.Fragment>
        <div
          className={this.state.show ? "modal show" : "modal"}
          style={{ display: this.state.show ? "block" : "none" }}
          id="createrequestModal"
        >
          <div className="modal-dialog request_modal_content">
            <div className="modal-content request_modal_content">
              <div id="req_modal_header" className="modal-header">
                <h4 className="modal-title" id="createrequesttitle">
                  {this.state.type == 0 ? "Create" : "Edit"} logi request
                </h4>
                <button
                  type="button"
                  className="close"
                  onClick={() => this.CloseModal()}
                >
                  &times;
                </button>
              </div>
              <div className="modal-body request_modal_body">
                <div className="row">
                  <div className="col-lg-6 nomargin">
                    <FilterContainer AddItem={this.AddItem} />
                  </div>
                  <div className="col-lg-6 nomargin">
                    <h3>Current request</h3>
                    <table
                      className="table table-condensed "
                      id="reqmodaltable"
                    >
                      <thead className="indextable">
                        <tr>
                          <th className="tablecol"></th>
                          <th></th>
                          <th>
                            <p>Item</p>
                          </th>
                          <th>
                            <p>Crates</p>
                          </th>
                          <th>
                            <p>Amount</p>
                          </th>
                        </tr>
                      </thead>
                      <tbody>{this.GetRequest()}</tbody>
                      <colgroup>
                        <col width="30" className="tablecol" />
                        <col width="30" className="tablecol" />
                        <col />
                        <col width="40" className="tablecolwide" />
                        <col width="30" className="tablecol" />
                      </colgroup>
                    </table>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn"
                  id="createrequestBtn"
                  onClick={() => this.CreateRequest()}
                >
                  Submit Request
                </button>
                <button
                  type="button"
                  className="btn"
                  id="emptyrequestBtn"
                  onClick={() => this.EmptyRequest()}
                >
                  Empty Request
                </button>
                <button
                  type="button"
                  className="btn requestmodal_cancelbtn"
                  onClick={() => this.CloseModal()}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          id="req_modal_backdrop"
          className="modal-backdrop show"
          style={{ display: this.state.show ? "block" : "none" }}
        ></div>
      </React.Fragment>
    );
  }
}
///////////////////////////////////////////////////////////////////////////////////////////////////
class FilterContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      filter: 0,
      priority: 0
    };
    this.SetPriority = this.SetPriority.bind(this);
    this.SetFilter = this.SetFilter.bind(this);
  }

  SetPriority(event) {
    let value = event.target.value;
    this.setState(() => {
      return {
        priority: value,
        show: true
      };
    });
  }

  SetFilter(filter) {
    //console.log("Setting filter "+filter);
    this.setState(() => {
      return {
        filter: filter,
        show: true
      };
    });
  }

  GetButton(cat, id) {
    return (
      <button
        key={cat + "|" + id}
        className="requestmodal_itembtn"
        onClick={() => this.props.AddItem(cat, id, this.state.priority)}
      >
        <img className="requestmodal_itemimg" src={cost.cost[cat][id].src} />
      </button>
    );
  }

  GetButtons() {
    let buttons = [];
    if (this.state.filter == 0) {
      for (var i = 0; i < 7; i++) {
        for (var x = 0; x < cost.cost[i].length; x++) {
          buttons.push(this.GetButton(i, x));
        }
      }
    } else {
      var i = this.state.filter;
      for (var x = 0; x < cost.cost[i - 1].length; x++) {
        buttons.push(this.GetButton(i - 1, x));
      }
    }
    return buttons;
  }

  render() {
    return (
      <React.Fragment>
        {" "}
        <div
          className="btn-group request_modal_btngroup"
          id="request_modal_btngroup"
        >
          <button
            type="button"
            name="reqmodalpriority"
            value="0"
            className="btn requestmodal_btn requestmodal_priority_high"
            onClick={event => this.SetPriority(event)}
            disabled={this.state.priority == 0}
          >
            High Priority
          </button>
          <button
            type="button"
            name="reqmodalpriority"
            value="1"
            className="btn requestmodal_btn requestmodal_priority_medium"
            onClick={event => this.SetPriority(event)}
            disabled={this.state.priority == 1}
          >
            Medium Priority
          </button>
          <button
            type="button"
            name="reqmodalpriority"
            value="2"
            className="btn requestmodal_btn requestmodal_priority_low"
            onClick={event => this.SetPriority(event)}
            disabled={this.state.priority == 2}
          >
            Low Priority
          </button>
        </div>
        <div id="request_modal_filter_container">
          <cost.filterrow
            filter={this.state.filter}
            setfilter={this.SetFilter}
          />
        </div>
        <div id="request_modal_button_container">{this.GetButtons()}</div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = store => {
  return {
    meta: store.meta
  };
};

const mapStateToPropsRequest = store => {
  let privateinfo = store.private;
  return {
    requests: privateinfo.requests
  };
};
export default {
  ModalContainer: connect(
    mapStateToProps,
    null,
    null,
    { forwardRef: true }
  )(ModalContainer),
  RequestModalContainer: connect(
    mapStateToPropsRequest,
    null,
    null,
    { forwardRef: true }
  )(RequestModalContainer)
};
