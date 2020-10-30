const repo = "https://raw.githubusercontent.com/the-fellowship-of-the-warapi/Assets/master/Item Icons/"
import React from 'react';
import store from "../../../../redux/store";
import {connect} from 'react-redux';
import U from "../../useful_functions";
import A from "../../../../redux/actions.js";
import socket from "../../../../_static/socket";

const maxdistance = [[75, 150], [75, 150], [50, 100], [45, 65]];

socket.on("addArtyResult", function(packet) {
  store.dispatch(A.addArtyResult(packet.totalstring));
});

///////////////////////////////////////////////////////
class ArtyCalc_ extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      enemy_distance: 0,
      enemy_azimuth: 0,
      arty_distance: 0,
      arty_azimuth: 0,
      arty_type: 0
    };
    this.handleArtyChange = this.handleArtyChange.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.ShareResult = this.ShareResult.bind(this);
    this.calc_data = this.calc_data.bind(this);
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.props.selected.type != "artypanel" &&
      nextProps.selected.type != "artypanel"
    ) {
      return false;
    }
    if (
      (this.props.selected.type != "artypanel" &&
        nextProps.selected.type == "artypanel") ||
      (this.props.selected.type == "artypanel" &&
        nextProps.selected.type != "artypanel")
    ) {
      return true;
    }
    if (JSON.stringify(this.state) != JSON.stringify(nextState)) {
      return true;
    }
    if (JSON.stringify(this.props.arty) == JSON.stringify(nextProps.arty)) {
      return false;
    }
    return true;
  }
  handleArtyChange(value, event) {
    event.target.parentNode.blur();
    this.setState({
      arty_type: value
    });
  }
  handleFieldChange(event) {
    let name = event.target.name;
    let value = event.target.value;
    let validity = event.target.validity.valid;
    if (validity) {
      this.setState({
        [name]: value
      });
    }
  }

  ShareResult(result) {
    function transformDate(string) {
      if (Number(string) < 10) {
        return "0" + string;
      } else {
        return string;
      }
    }
    let date = new Date();
    let dateString =
      transformDate(date.getHours()) +
      ":" +
      transformDate(date.getMinutes()) +
      ":" +
      transformDate(date.getSeconds());
    let username = U.GetUsername(this.props.users.users, window.steamid);
    let totalstring = {
      date: dateString,
      text: result.distance + "m " + result.azimuth + "° - " + username
    };
    store.dispatch(A.addArtyResult(totalstring));
    socket.emit("addArtyResult", { totalstring: totalstring });
  }

  convertAngle(angle) {
    return angle > 360 ? angle - 360 : angle;
  }

  rad(angle) {
    return (Math.PI * angle) / 180;
  }

  deg(angle) {
    return (angle * 180) / Math.PI;
  }

  calc_data() {
    let e_dist = Number(this.state.enemy_distance);
    let e_azi = Number(this.state.enemy_azimuth);
    let f_dist = Number(this.state.arty_distance);
    let f_azi = Number(this.state.arty_azimuth);
    let a_delt = 0;
    let r_dist = 0;
    let a_step = 0;
    let r_azi = 0;

    a_delt = e_azi > f_azi ? this.rad(e_azi - f_azi) : this.rad(f_azi - e_azi);
    r_dist = Math.sqrt(
      e_dist * e_dist + f_dist * f_dist - 2 * e_dist * f_dist * Math.cos(a_delt)
    );
    a_step = Math.round(
      this.deg(
        Math.acos(
          (-(e_dist * e_dist) + f_dist * f_dist + r_dist * r_dist) /
            (2 * f_dist * r_dist)
        )
      )
    );
    if (this.convertAngle(this.deg(a_delt)) > 180) {
      r_azi = e_azi > f_azi ? +f_azi + 180 + +a_step : +f_azi + 180 - +a_step;
    } else {
      r_azi = e_azi > f_azi ? +f_azi + 180 - +a_step : +f_azi + 180 + +a_step;
    }
    r_azi = r_azi > 360 ? r_azi - 360 : r_azi;
    if (isNaN(r_azi)) {
      r_azi = this.state.enemy_azimuth;
    }
    return { distance: r_dist.toFixed(1), azimuth: r_azi };
  }

  GetLine(index) {
    let obj = this.props.arty.arty[index];
    return (
      <li key={index}>
        <p title={obj.date}>{obj.text}</p>
      </li>
    );
  }
  render() {
    if (this.props.selected.type != "artypanel") {
      return null;
    }
    let result = this.calc_data();
    let distance;
    let text = <span></span>;
    let limit = maxdistance[this.state.arty_type];
    if (result.distance < limit[0]) {
      text = <p className="arty_text_warning">Too close</p>;
      distance = <p className="arty_text_warning">{result.distance} m</p>;
    } else if (result.distance > limit[1]) {
      text = <p className="arty_text_warning">Out of range</p>;
      distance = <p className="arty_text_warning">{result.distance} m</p>;
    } else {
      text = <br />;
      distance = <p>{result.distance} m</p>;
    }
    let lines = [];
    for (var i = 0; i < this.props.arty.arty.length; i++) {
      lines.push(this.GetLine(this.props.arty.arty.length - 1 - i));
    }
    return (
      <React.Fragment>
        <div id="arty_calc_col_container">
          <div id="box" className="horizontal container">
            <button
              className={
                this.state.arty_type == 0
                  ? "arty_type_btn arty_type_btn_selected"
                  : "arty_type_btn"
              }
              onClick={e => this.handleArtyChange(0, e)}
            >
              <img
                className="arty_type"
                src={repo + 'Structures/StaticArtilleryStructureIcon.png'}
              />
            </button>
            <button
              className={
                this.state.arty_type == 1
                  ? "arty_type_btn arty_type_btn_selected"
                  : "arty_type_btn"
              }
              onClick={e => this.handleArtyChange(1, e)}
            >
              <img
                className="arty_type"
                src={repo + 'Vehicles/ArtilleryIcon.png'}
              />
            </button>
            <button
              className={
                this.state.arty_type == 2
                  ? "arty_type_btn arty_type_btn_selected"
                  : "arty_type_btn"
              }
              onClick={e => this.handleArtyChange(2, e)}
            >
              <img className="arty_type" src={repo + 'Vehicles/GunboatColonial.png'} />
            </button>
            <button
              className={
                this.state.arty_type == 3
                  ? "arty_type_btn arty_type_btn_selected"
                  : "arty_type_btn"
              }
              onClick={e => this.handleArtyChange(3, e)}
            >
              <img className="arty_type" src={ repo + 'Items/MortarItemIcon.png' } />{" "}
            </button>
          </div>
          <table id="arttb" className="arty_table">
            <colgroup>
              <col width="80" />
              <col width="130" />
              <col width="130" />
              <col width="100" />
            </colgroup>
            <thead>
              <tr>
                <th>
                  <p>Enemy Position</p>
                </th>
                <th></th>
                <th>
                  <p>Friendly Artillery</p>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input
                    className="line"
                    type="number"
                    name="enemy_distance"
                    min="0"
                    max="1000"
                    value={this.state.enemy_distance}
                    onChange={this.handleFieldChange}
                  />
                </td>
                <td>
                  <p>m</p>
                </td>
                <td>
                  <input
                    className="line"
                    type="number"
                    name="arty_distance"
                    min="0"
                    max="1000"
                    value={this.state.arty_distance}
                    onChange={this.handleFieldChange}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    className="line"
                    type="number"
                    name="enemy_azimuth"
                    min="0"
                    max="359"
                    value={this.state.enemy_azimuth}
                    onChange={this.handleFieldChange}
                  />
                </td>
                <td>
                  <p>°</p>
                </td>
                <td>
                  <input
                    className="line"
                    type="number"
                    name="arty_azimuth"
                    min="0"
                    max="359"
                    value={this.state.arty_azimuth}
                    onChange={this.handleFieldChange}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <table id="arty_result_table">
            <tbody>
              <tr>
                <td>
                  <p className="arty_calc_result_cell">{result.distance} m</p>
                </td>
              </tr>
              <tr>
                <td>
                  <p className="arty_calc_result_cell">{result.azimuth} °</p>
                </td>
              </tr>
            </tbody>
          </table>
          {text}
          <button
            className="share_arty_btn"
            onClick={() => this.ShareResult(result)}
          >
            Share result
          </button>
          <div id="artynotesarea">
            <ul id="ulid" style={{ listStyleType: "none" }}>
              {lines}
            </ul>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
/////////////////////////////////////////////////////////////////////////////////////
const mapStateToPropsCalc = store => {
  return {
    users: store.users,
    arty: store.arty,
    selected: store.selected
  };
};

export const ArtyCalc = connect(mapStateToPropsCalc)(ArtyCalc_);