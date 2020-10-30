import React from 'react';
const NativeL = require("leaflet");
const L = require("react-leaflet");
import tech from "../../../_static/techtree";
import store from "../../../redux/store";
import {connect} from 'react-redux';
import A from "../../../redux/actions";
import socket from "../../../_static/socket";
const LeafletControl = require("react-leaflet-control");

export class TechTree extends React.Component {
  render() {
    return (
      <div id="techmap">
        <TechMap />
      </div>
    );
  }
}
class TechMap_ extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zoom: -1.75
    };
    this.HandleZoom = this.HandleZoom.bind(this); //Function binding
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.tab.tab != 4 && nextProps.tab.tab == 4) {
      return true;
    }
    if (
      JSON.stringify(this.props.techtree) != JSON.stringify(nextProps.techtree)
    ) {
      return true;
    }
    if (this.state.zoom != nextState.zoom) {
      return true;
    }
    return false;
  }
  HandleZoom(zoom) {
    //console.log(zoom)
    this.setState({
      zoom: zoom
    });
  }
  render() {
    //console.log("Rendering tech map")
    let bounds = [[0, 0], [1170, 2540]];
    let techlist = tech.map((obj, index) => (
      <Tech
        key={index}
        index={index}
        obj={obj}
        zoom={this.state.zoom}
        techtree={this.props.techtree.techtree}
      />
    ));
    if (this.refs.techmap != undefined) {
      this.refs.techmap.leafletElement.invalidateSize();
    }
    return (
      <L.Map
        ref="techmap"
        onZoomend={event => {
          this.HandleZoom(event.target._zoom);
          //zoom=event.target._zoom
          //console.log(zoom)
        }}
        center={[bounds[1][0] / 2, bounds[1][1] / 2]}
        zoomAnimation={false}
        //zoom={this.state.zoom}
        bounds={bounds}
        crs={NativeL.CRS.Simple}
        maxBounds={bounds}
        maxBoundsViscosity={1.0}
        minZoom={-1.75}
        maxZoom={-0.25}
        zoomDelta={0.25}
        zoomSnap={0.25}
        attributionControl={false}
      >
        <L.ImageOverlay
          url="https://cdn.glitch.com/84b19724-a86b-4caa-8e69-1e9c973e043f%2FTechTree11-min.png?v=1569054128985"
          bounds={bounds}
        ></L.ImageOverlay>
        {techlist}
        <LeafletControl.default
          position="topright"
          className="leaflet_control_techcard"
        >
          <div id="techcardcontainer">
            <TechCard />
          </div>
        </LeafletControl.default>
      </L.Map>
    );
  }
}

class Tech extends React.Component {
  constructor(props) {
    super(props);
    this.SelectTech = this.SelectTech.bind(this);
  }
  SelectTech() {
    store.dispatch(A.selectTech(this.props.index));
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.zoom != nextProps.zoom) {
      return true;
    }
    let obj = this.props.obj;
    let prevObj = this.props.techtree[obj.name];
    if (prevObj == undefined) {
      prevObj = 0;
    }
    let newObj = nextProps.techtree[obj.name];
    if (newObj == undefined) {
      newObj = 0;
    }
    if (prevObj != newObj) {
      return true;
    } else {
      return false;
    }
  }
  render() {
    let obj = this.props.obj;
    let size = 112 * Math.pow(2, this.props.zoom);

    let icon = NativeL.Icon.extend({
      options: {
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2],
        iconUrl: obj.url
      }
    });
    //console.log(this.props.obj)
    let techlevel = 0;
    if (this.props.techtree[obj.name] != undefined) {
      techlevel = this.props.techtree[obj.name];
    }
    let color = techlevel >= obj.needtech ? "#0E9A15" : "#0D9989";
    var squaretop = (techlevel / obj.needtech) * 120 + Number(obj.y) - 60;
    var bounds = [[obj.y - 60, obj.x - 60], [squaretop, obj.x + 60]];
    //return L.rectangle(bounds, {color: color, weight: 1,fillOpacity:0.8})

    return (
      <React.Fragment>
        {
          <L.Rectangle
            bounds={bounds}
            color={color}
            weight={1}
            fillOpacity={0.8}
          />
        }
        <L.Marker
          position={[obj.y, obj.x]}
          icon={new icon()}
          onClick={this.SelectTech}
        />
      </React.Fragment>
    );
  }
}

////////////////////////////////////////

class TechCard_ extends React.Component {
  constructor(props) {
    super(props);
    this.handleChangeTech = this.handleChangeTech.bind(this);
  }
  shouldComponentUpdate(nextProps, nextState) {
    //console.log("Tech card props",this.props,nextProps)
    if (this.props.selected.tech !== nextProps.selected.tech) {
      return true;
    }
    if (this.props.selected.tech === "" && nextProps.selected.tech === "") {
      return false;
    }
    let prevTech = 0;
    if (tech[this.props.selected.tech] != undefined) {
      prevTech = this.props.techtree.techtree[
        tech[this.props.selected.tech].name
      ];
    }
    let nextTech = 0;
    if (tech[nextProps.selected.tech] != undefined) {
      nextTech =
        nextProps.techtree.techtree[tech[nextProps.selected.tech].name];
    }
    if (prevTech != nextTech) {
      return true;
    }
    return false;
  }

  handleChangeTech(value) {
    let techtree = JSON.parse(JSON.stringify(this.props.techtree.techtree));
    //console.log("Techtree",techtree)
    let obj = tech[this.props.selected.tech];
    if (value != obj.needtech) {
      if (value == "") {
        value = 0;
      }
      if (value > obj.needtech) {
        //console.log(value); console.log(limit)
        value = obj.needtech;
      }
      try {
        if (value > 0 && value.charAt(0) == 0) {
          value = value.slice(1);
        }
      } catch (err) {}
    }
    techtree[obj.name] = value;
    if (value == obj.needtech) {
      let packet = {
        type: 0,
        date: JSON.stringify(new Date()),
        packet: this.props.selected.tech
      };
      store.dispatch(A.submitEvent(packet));
      socket.emit("submitEvent", packet);
    }
    store.dispatch(A.updateTech(techtree));
    socket.emit("updateTech", { techtree: techtree });
  }

  render() {
    let techtree = JSON.parse(JSON.stringify(this.props.techtree.techtree));
    let obj = tech[this.props.selected.tech];
    if (obj == undefined) {
      return null;
    }
    let input, fillbtn, pbar;
    if (techtree[obj.name] == undefined) {
      techtree[obj.name] = 0;
    }
    if (techtree[obj.name] == obj.needtech) {
      input = (
        <input
          className="towninput useronly"
          type="text"
          disabled="disabled"
          value="DONE"
        />
      );
      fillbtn = (
        <button
          type="button"
          className="btn cardbtn useronly"
          onClick={() => this.handleChangeTech(0)}
        >
          Empty
        </button>
      );
      pbar = (
        <div
          className="progress-bar bg-success progress-bar-striped"
          style={{ width: "100%" }}
        ></div>
      );
    } else {
      input = (
        <input
          id="techtree_card_input"
          className="towninput useronly"
          type="number"
          min="0"
          max={obj.needtech}
          value={techtree[obj.name]}
          onChange={event => this.handleChangeTech(event.target.value)}
        />
      );
      fillbtn = (
        <button
          type="button"
          className="btn cardbtn useronly"
          onClick={() => this.handleChangeTech(obj.needtech)}
        >
          Fill
        </button>
      );
      pbar = (
        <div
          className="progress-bar bg-warning progress-bar-striped"
          style={{ width: (techtree[obj.name] / obj.needtech) * 100 + "%" }}
        >
          {techtree[obj.name] + "/" + obj.needtech}
        </div>
      );
    }

    let card = (
      <div className="card">
        <div className="card-header cardheader">{obj.name}</div>
        <div className="card-body cardheader">
          <table className="table">
            <tbody>
              <tr style={{ height: 26 }}>
                <td style={{ width: 25 }}>
                  <img className="towncardimage" src={obj.url} />{" "}
                </td>
                <td style={{ width: 60 }}>{input}</td>
                <td style={{ width: 50 }}>{fillbtn}</td>
                <td style={{ width: 100 }}>{pbar}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
    return card;
  }
}

const mapStateToProps = store => {
  //console.log(store)
  return {
    techtree: store.techtree,
    tab: store.tab
  };
};
const mapStateToPropsCard = store => {
  //console.log(store)
  return {
    techtree: store.techtree,
    selected: store.selected
  };
};
let TechCard = connect(mapStateToPropsCard)(TechCard_);
let TechMap = connect(mapStateToProps)(TechMap_);

