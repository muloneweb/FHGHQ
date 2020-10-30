import React from 'react';
import socket from "../../../_static/socket";
import store from "../../../redux/store";
import {connect} from 'react-redux';
import A from "../../../redux/actions.js";
import U from "../useful_functions";
import UR from "../useful_react";
const L = require("react-leaflet");
import * as MO from "../main/map/map-objects";
const NativeL = require("leaflet");
import RegionImages from "../../../_static/region-images";
import markers from "../../../_static/markers";
const repo =
  "https://raw.githubusercontent.com/the-fellowship-of-the-warapi/Assets/master/Item Icons/Materials/";
//Images of resources
const refineryStatic = [
  {
    time: 480,
    ratio: 2,
    startName: "Salvage",
    startUrl: repo + "SalvageIcon.png",
    finishName: "Basic Materials",
    finishUrl: repo + "BasicMaterialsIcon.png"
  },
  {
    time: 12000,
    ratio: 10,
    startName: "Salvage",
    startUrl: repo + "SalvageIcon.png",
    finishName: "Diesel",
    finishUrl: repo + "ResourceFuelIcon.png"
  },
  {
    time: 33300,
    ratio: 10,
    startName: "Salvage",
    startUrl: repo + "SalvageIcon.png",
    finishName: "Explosive Materials",
    finishUrl: repo + "ExplosiveMaterialIcon.png"
  },
  {
    time: 40000,
    ratio: 20,
    startName: "Components",
    startUrl: repo + "ComponentsIcon.png",
    finishName: "Refined Materials",
    finishUrl: repo + "RefinedMaterialsIcon.png"
  },
  {
    time: 60000,
    ratio: 20,
    startName: "Sulfur",
    startUrl: repo + "SulfurIcon.png",
    finishName: "Heavy Explosive Materials",
    finishUrl: repo + "HeavyExplosiveMaterialIcon.png"
  },
  {
    time: 363640,
    ratio: 3,
    startName: "Crude Oil",
    startUrl: repo + "CrudeOilIcon.png",
    finishName: "Petrol",
    finishUrl: repo + "RefinedFuelIcon.png"
  },
  {
    time: 60000,
    ratio: 1,
    startName: "Tech Part",
    startUrl: repo + "TechPartIcon.png",
    finishName: "Upgrade Part",
    finishUrl: repo + "UpgradePartIcon.png"
  },
  {
    time: 60000,
    ratio: 1,
    startName: "Tech Part",
    startUrl: repo + "TechPartIcon.png",
    finishName: "Research Part",
    finishUrl: repo + "ResearchPartIcon.png"
  }
];

export class Refinery extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <p>Material Refinement</p>
        <div className="row">
          <div id="ref_col_container" className="col-sm-12 col-lg-3 nomargin">
            <RefinerySubmitMenu
              ref={e => {
                window.refmenu = e;
              }}
            />
          </div>
          <div id="ref_col_container2" className="col">
            <RefTotalTable />
          </div>
        </div>
      </React.Fragment>
    );
  }
}
///////////////////////////////////////////////////////////////////////////////
class RefinerySubmitMenu_ extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resource: 0,
      amount: 0,
      townname: "",
      signature: "",
      orderfilter: 0,
      selectedorder: { tableindex: -1 },
      subtract_value: 0
    };
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.handleResourceChange = this.handleResourceChange.bind(this);
    this.handleTownNameChange = this.handleTownNameChange.bind(this);
    this.handleOrderFilterChange = this.handleOrderFilterChange.bind(this);
    this.handleSelectOrder = this.handleSelectOrder.bind(this);

    this.handleDelete = this.handleDelete.bind(this);
    this.handleChangeSubtract = this.handleChangeSubtract.bind(this);
    this.handleSubtract = this.handleSubtract.bind(this);
    this.handleSubmitToTotal = this.handleSubmitToTotal.bind(this);
  }
  handleAmountChange(event) {
    let value = event.target.value;
    let validity = event.target.validity.valid;
    if (validity) {
      if (value.length > 1 && value[0] == 0) {
        value = value.slice(1);
      }
      this.setState({
        amount: value
      });
    }
  }
  handleTownNameChange(position, region, signature) {
    //console.log(position,region)
    let coords = { x: position[1], y: position[0] };
    let name = U.GetTownName(region, position, this.props.static);
    this.setState({ townname: name, signature: signature });
  }
  handleResourceChange(i) {
    //console.log(i)
    this.setState({
      resource: i
    });
    this.refs.amount_input.focus();
  }
  handleOrderFilterChange(e) {
    //console.log(e.target.value)
    this.setState({ orderfilter: e.target.value });
  }
  handleSelectOrder(packet) {
    console.log(this.props.refinery[packet.signature]);
    if (
      this.props.refinery[packet.signature].orders[packet.index].author ==
      window.steamid
    ) {
      this.setState({ selectedorder: packet });
    }
  }
  SubmitRefinery() {
    if (this.state.amount == 0) {
      alert("Select an amount first");
    } else if (this.state.signature == "") {
      alert("Select a refinery");
    } else {
      let time = Math.floor(
        (this.state.amount * refineryStatic[this.state.resource].time) /
          refineryStatic[this.state.resource].ratio
      );
      let finishtime = new Date(new Date().getTime() + time);
      //console.log(new Date(finishtime))
      let result = Math.floor(
        this.state.amount / refineryStatic[this.state.resource].ratio
      );
      let packet = {
        amount: result,
        startDate: new Date(),
        finishDate: finishtime,
        type: this.state.resource,
        author: window.steamid
      };
      let obj = this.props.refinery[this.state.signature];
      if (obj == undefined) {
        obj = { orders: [] };
      } else {
        obj = JSON.parse(JSON.stringify(obj));
        if (obj.orders == undefined) {
          obj.orders = [];
        }
      }
      obj.name = this.state.townname;
      obj.orders.push(packet);
      store.dispatch(A.updateObject("refinery", obj, this.state.signature));
      socket.emit("updateObject", {
        type: "refinery",
        object: obj,
        key: this.state.signature
      });
    }
  }

  handleDelete() {
    let packet = this.state.selectedorder;
    let refinery = JSON.parse(
      JSON.stringify(this.props.refinery[packet.signature])
    );
    refinery.orders.splice(packet.index);
    store.dispatch(A.updateObject("refinery", refinery, packet.signature));
    socket.emit("updateObject", {
      type: "refinery",
      object: refinery,
      key: packet.signature
    });
    this.setState({ selectedorder: { tableindex: -1 } });
  }
  handleForceComplete() {
    let packet = this.state.selectedorder;
    let refinery = JSON.parse(
      JSON.stringify(this.props.refinery[packet.signature])
    );
    let order = refinery.orders[packet.index];
    order.finishDate = new Date();
    store.dispatch(A.updateObject("refinery", refinery, packet.signature));
    socket.emit("updateObject", {
      type: "refinery",
      object: refinery,
      key: packet.signature
    });
  }
  handleChangeSubtract(e) {
    let value = e.target.value;
    let validity = e.target.validity.valid;
    if (validity) {
      this.setState({ subtract_value: value });
    }
  }
  handleSubtract() {
    let packet = this.state.selectedorder;
    let refinery = JSON.parse(
      JSON.stringify(this.props.refinery[packet.signature])
    );
    let order = refinery.orders[packet.index];
    if (this.state.subtract_value == order.amount) {
      this.handleDelete();
    } else {
      order.amount = Number(order.amount) - Number(this.state.subtract_value);
      store.dispatch(A.updateObject("refinery", refinery, packet.signature));
      socket.emit("updateObject", {
        type: "refinery",
        object: refinery,
        key: packet.signature
      });
      console.log("Ref values", this.state.subtract_value, order.amount);
      if (this.state.subtract_value > order.amount) {
        this.setState({ subtract_value: order.amount });
      }
    }
  }
  handleSubmitToTotal() {
    let packet = this.state.selectedorder;
    let refinery = JSON.parse(
      JSON.stringify(this.props.refinery[packet.signature])
    );
    let order = refinery.orders[packet.index];
    let reftotal = this.props.reftotal;
    if (!reftotal) {
      reftotal = {};
    }
    let obj = reftotal[order.author];
    if (!obj) {
      obj = {};
    }
    if (!obj[order.type]) {
      obj[order.type] = 0;
    }
    obj[order.type] = Number(obj[order.type]) + Number(order.amount);
    UR.UpdateObject("misc_reftotal", obj, order.author);
  }

  render() {
    //console.log("Rendering refinery submit menu")
    let maxsubtract = 0;
    if (this.state.selectedorder.tableindex != -1) {
      maxsubtract = this.props.refinery[this.state.selectedorder.signature]
        .amount;
    }
    let time = Math.floor(
      (this.state.amount * refineryStatic[this.state.resource].time) /
        refineryStatic[this.state.resource].ratio
    );
    let result = Math.floor(
      this.state.amount / refineryStatic[this.state.resource].ratio
    );
    let timestring = U.SplitTime(time);
    let panel_images = [[], [], []];
    for (var i = 0; i < refineryStatic.length; i++) {
      let index = i;
      let obj = refineryStatic[i];
      let buttonclass = "refinery_topbutton";
      if (this.state.resource == index) {
        buttonclass = "refinery_topbutton refinery_topbutton_selected";
      }
      let ref = this.props.refinery[this.state.signature];
      panel_images[0].push(
        <td key={"refinery0" + index}>
          <button
            className={buttonclass}
            onClick={() => this.handleResourceChange(index)}
          >
            <img className="refinery_topimg" src={obj.startUrl} />
          </button>
        </td>
      );
      panel_images[1].push(
        <td key={"refinery1" + index}>
          <img
            className="refinery_arrow"
            src="https://cdn.glitch.com/dd3f06b2-b7d4-4ccc-8675-05897efc4bb5%2Farrow.png?1557343719187"
          />
        </td>
      );
      panel_images[2].push(
        <td key={"refinery2" + index}>
          <img className="refinery_bottomimg" src={obj.finishUrl} />
        </td>
      );
    }
    let orders = [];
    let tableindex = 0;
    for (var sig in this.props.refinery) {
      let refinery = this.props.refinery[sig];
      if (refinery.orders != undefined) {
        if (refinery.orders.length > 0 && refinery.name != undefined) {
          for (var i = 0; i < refinery.orders.length; i++) {
            let index = refinery.orders.length - 1 - i;
            let order = refinery.orders[index];
            if (
              this.state.orderfilter != 3 ||
              refinery.orders[index].author == window.steamid
            ) {
              orders.push(
                <RefineryOrder
                  key={
                    "refineryorder" +
                    sig +
                    order.author +
                    order.startDate +
                    order.finishDate
                  }
                  signature={sig}
                  index={index}
                  order={refinery.orders[index]}
                  townname={refinery.name}
                  tableindex={tableindex}
                  handleSelectOrder={this.handleSelectOrder}
                  selectedorder={this.state.selectedorder}
                />
              );
            }
            tableindex++;
          }
        }
      }
    }
    //console.log("Ref orders",orders)
    function compareRef(a, b) {
      if (
        new Date(a.props.order.finishDate) > new Date(b.props.order.finishDate)
      )
        return 1;
      if (
        new Date(a.props.order.finishDate) < new Date(b.props.order.finishDate)
      )
        return -1;
      return 0;
    }
    function compareRefDate(a, b) {
      if (new Date(a.props.order.startDate) > new Date(b.props.order.startDate))
        return -1;
      if (new Date(a.props.order.startDate) < new Date(b.props.order.startDate))
        return 1;
      return 0;
    }
    if (this.state.orderfilter == 0) {
      orders.sort(compareRefDate);
    } else if (this.state.orderfilter == 1) {
      orders.sort(compareRef);
    }
    return (
      <React.Fragment>
        <div id="ref_submit_container">
          <div id="ref_select_table">
            <table>
              <tbody>
                <tr>{panel_images[0]}</tr>
                <tr>{panel_images[1]}</tr>
                <tr>{panel_images[2]}</tr>
              </tbody>
            </table>
          </div>
          <div className="row">
            <div className="col" id="ref_map_container">
              <div id="ref_refname_container">
                <p>Location: {this.state.townname}</p>
              </div>
              <Map />
            </div>
            <div className="col" id="ref_tab_amount_container">
              <p className="ref_tab_text">
                <input
                  ref="amount_input"
                  id="ref_amount_input"
                  type="number"
                  min="0"
                  value={this.state.amount}
                  onChange={event => this.handleAmountChange(event)}
                />
                <button
                  id="refinery_submit_btn"
                  onClick={() => this.SubmitRefinery()}
                >
                  Submit
                </button>{" "}
                <br />
                <div id="ref_calc_span">
                  Result:{result} <br />
                  Time: {timestring}{" "}
                </div>
              </p>{" "}
              <br />
              <div id="ref_order_panel">
                <button
                  disabled={this.state.selectedorder.tableindex == -1}
                  className="ref_panel_btn"
                  onClick={() => this.handleSubtract()}
                >
                  Subtract
                </button>
                <input
                  disabled={this.state.selectedorder.tableindex == -1}
                  type="number"
                  min="0"
                  max={maxsubtract}
                  value={this.state.subtract_value}
                  onChange={e => this.handleChangeSubtract(e)}
                  id="ref_subtract_amount_input"
                />
                <br />
                <button
                  disabled={this.state.selectedorder.tableindex == -1}
                  className="ref_panel_btn"
                  onClick={() => this.handleDelete()}
                >
                  Remove order
                </button>{" "}
                <br />
                <button
                  disabled={this.state.selectedorder.tableindex == -1}
                  className="ref_panel_btn"
                  onClick={() => this.handleForceComplete()}
                >
                  Force complete
                </button>{" "}
                <br />
                <button
                  disabled={this.state.selectedorder.tableindex == -1}
                  className="ref_panel_btn"
                  onClick={() => this.handleSubmitToTotal()}
                >
                  Submit to total table
                </button>
              </div>
              <select
                id="ref_tab_orderfilter"
                value={this.state.orderfilter}
                onChange={this.handleOrderFilterChange}
              >
                <option value={0}>Most recent</option>
                <option value={1}>Completed first</option>
                <option value={2}>Group by towns</option>
                <option value={3}>My orders only</option>
              </select>
            </div>
          </div>
        </div>
        <div id="ref_submit_menu">
          <table id="ref_order_table">
            <tbody>{orders}</tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }
}
///////////////////////////////////////////////////////////////////////////
class RefineryOrder_ extends React.Component {
  ////Component generation
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      isPopoverOpen: false //,
      //subtract_value:0
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
  GetRealTimeTimer(datestring) {
    if (new Date().getTime() > new Date(datestring).getTime()) {
      return "Complete";
    }
    var time = new Date(datestring).getTime() - new Date().getTime();
    return U.SplitTime(time);
  }
  render() {
    let trclass = "ref_order_tr";
    if (
      this.props.selectedorder.signature == this.props.signature &&
      this.props.selectedorder.index == this.props.index
    ) {
      trclass = "ref_order_tr ref_order_tr_selected";
    }
    //console.log("Rendering refinery order")
    let order = this.props.order;
    //console.log("Ref order props",this.props)
    //let removebutton = null
    let timeclass = "ref_order_table_timetd";
    if (
      new Date().getTime() > new Date(this.props.order.finishDate).getTime()
    ) {
      timeclass = "ref_order_table_timetd_complete";
    }
    let user = U.GetUser(this.props.users.users, order.author);
    return (
      <tr
        className={trclass}
        onClick={() =>
          this.props.handleSelectOrder({
            tableindex: this.props.tableindex,
            index: this.props.index,
            signature: this.props.signature
          })
        }
      >
        {/*<td className="ref_order_table_removetd">{removebutton}</td>*/}
        <td className="ref_order_table_nametd">
          <img className="ref_order_table_smallicon" src={user.avatar} />
          {user.name}
        </td>
        <td className="ref_order_table_townnametd">{this.props.townname}</td>
        <td className="ref_order_table_resourcetd">
          <img
            className="ref_order_table_smallicon"
            src={refineryStatic[order.type].finishUrl}
          />
        </td>
        <td className="ref_order_table_amounttd">{order.amount}</td>
        <td className={timeclass}>
          {this.GetRealTimeTimer(this.props.order.finishDate)}
        </td>
      </tr>
    );
  }
}
//////////////////////////////////////////////////////////////////////////
class RefineryMap extends React.Component {
  ////Component generation
  constructor(props) {
    super(props);
    this.state = {
      ///State
      selectedtown: -1
    };
    this.function = this.function.bind(this); //Function binding
  }
  function() {
    this.setState(state => {
      //Setting state
      return {
        selectedtown: 1
      };
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    //console.log("Map props",this.props,nextProps)
    if (this.props.tab.tab != 2 && nextProps.tab.tab == 2) {
      return true;
    }
    if (this.props.tab.tab != 2 && nextProps.tab.tab != 2) {
      return false;
    }
    return true;
  }
  render() {
    //console.log("Rendering refinery map")
    const bounds = RegionImages.bounds;
    let refineries = [];
    if (this.refs.refmap != undefined) {
      this.refs.refmap.leafletElement.invalidateSize();
    }
    for (var i = 0; i < RegionImages.regionCounter; i++) {
      for (var j = 0; j < this.props.dynamic[i].data.mapItems.length; j++) {
        let obj = this.props.dynamic[i].data.mapItems[j];
        switch (obj.iconType) {
          case 17:
            //REFINERIES
            refineries.push(
              <MO.Refinery
                key={U.signature(obj)}
                signature={U.signature(obj)}
                regionId={this.props.dynamic[i].regionId}
                dynamic={obj}
                maptype={"refinery"}
              />
            );
        }
      }
    }
    //let filters = cost.filters.map((obj,index) => this.function(obj,index))
    return (
      <div id="ref_map_innercontainer">
        <L.Map
          ref="refmap"
          center={[bounds[1][0] / 2, bounds[1][1] / 2]}
          zoomAnimation={false}
          //zoom={this.state.zoom}
          bounds={bounds}
          crs={NativeL.CRS.Simple}
          maxBounds={bounds}
          maxBoundsViscosity={1.0}
          minZoom={0}
          maxZoom={3}
          zoomDelta={1}
          zoomSnap={1}
          attributionControl={false}
        >
          <L.TileLayer
            noWrap={true}
            continuousWorld={true}
            bounds={[[-256, 0], [0, 256]]}
            url="https://raw.githubusercontent.com/Kastow/Foxhole-Map-Tiles/master/Tiles/{z}/{z}_{x}_{y}.png"
          />
          <L.LayerGroup>{refineries}</L.LayerGroup>
          <SelectIcon
            ref={e => {
              window.selecticonref = e;
            }}
            refmap={this}
          />
        </L.Map>
      </div>
    );
  }
}
///////////////////////////////////////////////////////////////////
class SelectIcon_ extends React.Component {
  ////Component generation
  constructor(props) {
    super(props);
    this.state = {
      ///State
      position: [-10000, -10000]
    };
    this.ChangePosition = this.ChangePosition.bind(this);
    this.SelectPrivate = this.SelectPrivate.bind(this);
  }
  ChangePosition(position, region, obj, signature) {
    //console.log("refmap",this.props.refmap)
    let coords = position;
    if (position.y != undefined) {
      coords = [position.y, position.x];
    }
    window.refmenu.handleTownNameChange(obj, region, signature);
    this.setState({ position: coords });
  }
  SelectPrivate(action) {
    let obj = {};
    //console.log("Select icon",action)
    if (action.townname == "misc") {
      obj = this.props.private.misc[action.objtype][action.signature];
    } else {
      obj = this.props.private[action.objtype][action.signature];
    }
    if (obj == undefined) {
      return false;
    }
    this.ChangePosition(obj.position);
    return true;
  }
  render() {
    return (
      <L.Marker
        position={this.state.position}
        icon={new markers.SelectIcon()}
      />
    );
  }
}
//////////////////////////////////////////////////////////
class RefTotalTable_ extends React.Component {
  ////Component generation
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e, i, userid) {
    let value = e.target.value;
    let validity = e.target.validity.valid;
    let reftotal = this.props.reftotal;
    if (validity) {
      let obj = {};
      if (reftotal != undefined) {
        if (reftotal[userid] != undefined) {
          obj = reftotal[userid];
        }
      }
      console.log(value.toString()[0] == 0);
      if (value.length > 1 && value[0] == 0) {
        value = value.slice(1);
      }
      obj[i] = value;
      UR.UpdateObject("misc_reftotal", obj, userid);
    }
  }
  render() {
    let resourceheaders = [];
    let resourcetotals = [];
    let usertotals = [];
    let reftotal = this.props.reftotal;
    let users = this.props.users.users;
    for (let i = 0; i < refineryStatic.length; i++) {
      resourceheaders.push(
        <th>
          <img
            className="refinery_bottomimg"
            src={refineryStatic[i].finishUrl}
          />
        </th>
      );
      resourcetotals.push(0);
    }
    if (reftotal != undefined) {
      for (let userid in reftotal) {
        let user = U.GetUser(users, userid);
        if (!user.valid) {
          user.name = "Anonymous";
          user.avatar =
            "https://cdn.glitch.com/dd3f06b2-b7d4-4ccc-8675-05897efc4bb5%2Fdasd.jpg?1556805827222";
        }
        let show = false;
        for (let prop in reftotal[userid]) {
          if (prop != "lastupdate") {
            resourcetotals[prop] =
              Number(resourcetotals[prop]) + Number(reftotal[userid][prop]);
            if (reftotal[userid][prop] > 0) {
              show = true;
            }
          }
        }
        if (show && userid != window.steamid) {
          let props = [];
          for (let x = 0; x < refineryStatic.length; x++) {
            let value = 0;
            if (reftotal[userid][x] != undefined) {
              value = reftotal[userid][x];
            }
            if (value == 0) {
              value = "";
            }
            if (this.props.users.myrank < 3) {
              props.push(
                <td>
                  <input
                    className="ref_total_myinput"
                    type="number"
                    min="0"
                    value={value}
                    onChange={e => this.handleChange(e, x, userid)}
                  />
                </td>
              );
            } else {
              props.push(<td>{value}</td>);
            }
          }
          usertotals.push(
            <tr key={"reftotal" + userid}>
              <td className="ref_total_name_cell">
                <img className="ref_order_table_smallicon" src={user.avatar} />
                {user.name}
              </td>
              {props}
            </tr>
          );
        }
      }
    }
    let resource_total_cells = [];
    for (let i = 0; i < refineryStatic.length; i++) {
      resource_total_cells.push(<th>{resourcetotals[i]}</th>);
    }
    let me = U.GetUser(users, window.steamid);
    let my_inputs = [];
    for (let i = 0; i < refineryStatic.length; i++) {
      let value = 0;
      if (reftotal != undefined) {
        if (reftotal[window.steamid] != undefined) {
          if (reftotal[window.steamid][i] != undefined) {
            value = reftotal[window.steamid][i];
          }
        }
      }
      my_inputs.push(
        <td>
          <input
            className="ref_total_myinput"
            type="number"
            min="0"
            value={value}
            onChange={e => this.handleChange(e, i, window.steamid)}
          />
        </td>
      );
    }

    return (
      <table id="ref_total_table">
        <thead id="ref_total_thead">
          <tr>
            <th></th>
            {resourceheaders}
          </tr>
          <tr>
            <th>Total</th>
            {resource_total_cells}
          </tr>
        </thead>
        <tbody id="ref_total_tbody">
          <tr>
            <td className="ref_total_name_cell">
              <img className="ref_order_table_smallicon" src={me.avatar} />
              {me.name}
            </td>
            {my_inputs}
          </tr>
          {usertotals}
        </tbody>
      </table>
    );
  }
}
///////////////////////////////////////////////////////
const mapStateToPropsRefTotal = store => {
  //console.log(store)
  let roominfo = store.private;
  return {
    users: store.users,
    reftotal: roominfo.misc.reftotal
  };
};

const mapStateToProps = store => {
  //console.log(store)
  let roominfo = store.roominfo;
  return {
    dynamic: roominfo.dynamic,
    static: roominfo.static,
    tab: store.tab
  };
};
const mapStateToPropsRefineryOrder = store => {
  //console.log(store)
  let privateinfo = store.private;
  return {
    users: store.users,
    refinery: privateinfo.refinery,
    reftotal: privateinfo.misc.reftotal
  };
};
const mapStateToPropsSubmit = store => {
  //console.log(store)
  let roominfo = store.roominfo;
  let privateinfo = store.private;
  return {
    static: roominfo.static,
    selected: store.selected,
    refinery: privateinfo.refinery,
    reftotal: privateinfo.misc.reftotal
  };
};
const Map = connect(mapStateToProps)(RefineryMap);
const mapStateToPropsSelectIcon = store => {
  //console.log(store)
  return {
    private: store.private
  };
};
const RefineryOrder = connect(mapStateToPropsRefineryOrder)(RefineryOrder_);
const RefinerySubmitMenu = connect(
  mapStateToPropsSubmit,
  null,
  null,
  { forwardRef: true }
)(RefinerySubmitMenu_);
const SelectIcon = connect(
  mapStateToPropsSelectIcon,
  null,
  null,
  { forwardRef: true }
)(SelectIcon_);
const RefTotalTable = connect(mapStateToPropsRefTotal)(RefTotalTable_);
