import React from 'react';
import store from "../../../redux/store";
import {connect} from 'react-redux';
import VoiceEvents from "../../../_static/voice";

function Meta(props) {
  document.title = props.meta.settings.name;
  return (
    <React.Fragment>
      {props.meta.settings.name} HQ by{" "}
      <a
        id="tr"
        href={"https://steamcommunity.com/profiles/" + props.meta.adminid}
      >
        {props.meta.adminname}
      </a>{" "}
      <SoundControl
        ref={e => {
          window.soundcontrol = e;
        }}
      />
    </React.Fragment>
  );
}
///////////////////////////////
class SoundControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ///State
      toggle: true,
      volume: 50,
      prevDateLogi: new Date("1970-01-01"),
      prevDateRelic: new Date("1970-01-01"),
      prevDateOp: new Date("1970-01-01")
    };
    this.ToggleSound = this.ToggleSound.bind(this);
    this.handleChangeVolume = this.handleChangeVolume.bind(this);
    this.PlayArray = this.PlayArray.bind(this);
    this.PlaySingle = this.PlaySingle.bind(this);
    this.PlayAnyFile = this.PlayAnyFile.bind(this);
  }
  PlayArray(array) {
    if (this.state.toggle) {
      let i = array.length - 1;
      function GetAudio() {
        //console.log("Getting audio")
        let side = array[i].faction
          .toLowerCase()
          .substring(0, array[i].faction.length - 1);
        let url = VoiceEvents[array[i].id][side];
        //console.log("Got audio",url)
        return url;
      }
      let audio = new Audio(GetAudio());
      audio.volume = Number(this.state.volume) / 100;
      audio.addEventListener("ended", function() {
        if (i > 0) {
          i--;
          audio.src = GetAudio();
          audio.pause();
          audio.load();
          //console.log("Playing audio",audio.src)
          audio.play();
        }
      });
      audio.play();
    }
  }
  PlayAnyFile(link) {
    let audio = new Audio(link);
    audio.volume = Number(this.state.volume) / 100;
    audio.play();
  }
  PlaySingle(obj) {
    let prop = "";
    console.log("Sound obj", obj);
    if (
      obj ==
      "https://cdn.glitch.com/dd3f06b2-b7d4-4ccc-8675-05897efc4bb5%2Frelic.mp3"
    ) {
      prop = "prevDateRelic";
    } else if (
      obj ==
        "https://cdn.glitch.com/dd3f06b2-b7d4-4ccc-8675-05897efc4bb5%2Fsupp%20completed.mp3" ||
      obj ==
        "https://cdn.glitch.com/dd3f06b2-b7d4-4ccc-8675-05897efc4bb5%2Fsupplies.mp3"
    ) {
      prop = "prevDateLogi";
    } else if (
      obj ==
      "https://cdn.glitch.com/dd3f06b2-b7d4-4ccc-8675-05897efc4bb5%2FOP.mp3"
    ) {
      prop = "prevDateOp";
    }
    //console.log("Sound prop",prop)
    var timediff = new Date() - this.state[prop];
    if (timediff > 30000) {
      if (this.state.toggle) {
        let audio = new Audio(obj);
        audio.volume = Number(this.state.volume) / 100;
        audio.play();
      }
      this.setState({ [prop]: new Date() });
    }
  }
  ToggleSound() {
    this.setState(state => {
      return {
        toggle: !state.toggle
      };
    });
  }
  handleChangeVolume(event) {
    let value = event.target.value;
    this.setState(state => {
      return {
        volume: value
      };
    });
  }
  render() {
    //console.log("Updating sound control")
    let img =
      "https://cdn.glitch.com/dd3f06b2-b7d4-4ccc-8675-05897efc4bb5%2FUntitled-2.png?1559249870353";
    if (!this.state.toggle) {
      img =
        "https://cdn.glitch.com/dd3f06b2-b7d4-4ccc-8675-05897efc4bb5%2F42.png?1559249871623";
    }
    return (
      <React.Fragment>
        <button onClick={this.ToggleSound} id="audio_btn">
          <img src={img} style={{ width: 25, height: 25 }} />
        </button>
        <input
          type="range"
          min="1"
          max="100"
          value={this.state.volume}
          className="slider"
          id="myRange"
          style={{ width: 50 }}
          onChange={this.handleChangeVolume}
        />
      </React.Fragment>
    );
  }
}
const mapStateToProps = store => {
  return {
    meta: store.meta
  };
};

export default connect(
  mapStateToProps,
  null,
  null,
  { forwardRef: true }
)(Meta);
