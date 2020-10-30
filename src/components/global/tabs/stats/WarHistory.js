import React from 'react';
import U from '../../useful_functions';

const FlipMove = require('react-flip-move');


// ////////////////////////////////////////////
class WarHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = { // /State
      cas: { 33: 215332, 34: 481845 },
      sorting: 0, // 0 - NUM DESC, 1 - NUM ASC, 2 - CAS DESC, 3 - CAS ASC, 4 - DUR DESC, 5 - DUR ASC
    };
    this.handleChangeSorting = this.handleChangeSorting.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.sorting != nextState.sorting || this.props.warhistory.length != nextProps.warhistory.length) {
      return true;
    }
    return false;
  }

  handleChangeSorting(i) {
    let newsort = 0;
    if (Math.floor(this.state.sorting / 2) == Math.floor(i / 2)) {
      if (this.state.sorting % 2) {
        newsort = this.state.sorting - 1;
      } else {
        newsort = this.state.sorting + 1;
      }
    } else {
      newsort = i;
    }
    this.setState({
      sorting: newsort,
    });
  }

  SplitTime(time) {
    const diffDays = Math.floor(time / 86400000);
    const diffHrs = Math.floor((time % 86400000) / 3600000); // hours
    const diffMins = Math.floor(((time % 86400000) % 3600000) / 60000);
    const timestring = `${diffDays}d, ${diffHrs}h, ${diffMins}m`;
    return timestring;
  }

  GetDate(time) {
    if (time == null) {
      return null;
    }
    let date = new Date(time).toDateString();
    date = date.slice(4, -5);
    date = date.split(' ');
    date = `${date[1]} ${date[0]}`;
    return date;
  }

  GetRow(war) {
    // /oldwars =[{num:32,winner:"COLONIALS",cas:'263.789',duration:'7 days, 20 hours, 55 minutes',start:'8 July',end:'16 July'},
    let rowclass = '';
    let winnerIcon = null;
    if (war.winner == 'COLONIALS') {
      rowclass = 'stats_warhistory_winnercollie';
      winnerIcon = <img className="stats_warhistory_winnericon" src="https://cdn.glitch.com/84b19724-a86b-4caa-8e69-1e9c973e043f%2FlogoColonial64-min.png?v=1567262318680" />;
    } else if (war.winner == 'WARDENS') {
      rowclass = 'stats_warhistory_winnerwarden';
      winnerIcon = <img className="stats_warhistory_winnericon" src="https://cdn.glitch.com/84b19724-a86b-4caa-8e69-1e9c973e043f%2Flogowardl64-min.png?v=1567262313379" />;
    }
    const duration = this.SplitTime(war.duration);
    const cas = U.FormatNumber(war.cas);
    return (
      <tr key={`stats_warhistory_row${war.num}`} className={rowclass}>
        <td>{war.num}</td>
        <td>{winnerIcon}</td>
        <td>{war.vp}</td>
        <td>{cas}</td>
        <td>{duration}</td>
        <td>{war.start}</td>
        <td>{war.end}</td>
      </tr>
    );
  }

  render() {
    // console.log("Rendering war history")
    const rows = [];
    const { oldwars } = this.props;
    for (let i = this.props.warhistory.length - 1; i >= 0; i--) {
      const war = this.props.warhistory[i];
      let duration = null;
      if (war.conquestEndTime != null) {
        duration = war.conquestEndTime - war.conquestStartTime;
      }
      let cas = '';
      if (this.state.cas[war.warNumber] != undefined) {
        cas = this.state.cas[war.warNumber];
      } else if (war.cas != undefined) {
        cas = war.cas;
      }
      if (war.conquestStartTime) {
        rows.push({
          num: war.warNumber,
          winner: war.winner,
          vp: war.requiredVictoryTowns,
          cas,
          duration,
          start: this.GetDate(war.conquestStartTime),
          end: this.GetDate(war.conquestEndTime),
        });
      }
    }
    for (let i = 0; i < oldwars.length; i++) {
      rows.push(oldwars[i]);
    }
    const arrows = ['⬘', '⬘', '⬘'];
    switch (this.state.sorting) {
      case 0:
        rows.sort((a, b) => {
          if (a.num < b.num) return 1;
          if (a.num > b.num) return -1;
          return 0;
        });
        arrows[0] = '⯅';
        break;
      case 1:
        rows.sort((a, b) => {
          if (a.num > b.num) return 1;
          if (a.num < b.num) return -1;
          return 0;
        });
        arrows[0] = '⯆';
        break;
      case 2:
        rows.sort((a, b) => {
          if (a.cas < b.cas) return 1;
          if (a.cas > b.cas) return -1;
          return 0;
        });
        arrows[1] = '⯅';
        break;
      case 3:
        rows.sort((a, b) => {
          if (a.cas > b.cas) return 1;
          if (a.cas < b.cas) return -1;
          return 0;
        });
        arrows[1] = '⯆';
        break;
      case 4:
        rows.sort((a, b) => {
          if (a.duration < b.duration) return 1;
          if (a.duration > b.duration) return -1;
          return 0;
        });
        arrows[2] = '⯅';
        break;
      case 5:
        rows.sort((a, b) => {
          if (a.duration > b.duration) return 1;
          if (a.duration < b.duration) return -1;
          return 0;
        });
        arrows[2] = '⯆';
        break;
    }
    for (let i = 0; i < rows.length; i++) {
      rows[i] = this.GetRow(rows[i]);
    }
    // console.log("War history",this.state,this.props.warhistory)
    return (
      <table id="stats_warhistory_container">
        <thead>
          <tr>
            <td onClick={() => this.handleChangeSorting(0)}>
War
              {arrows[0]}
            </td>
            <td>Victory</td>
            <td>Victory Towns</td>
            <td onClick={() => this.handleChangeSorting(2)}>
Casualties
              {arrows[1]}
            </td>
            <td onClick={() => this.handleChangeSorting(4)}>
Duration
              {arrows[2]}
            </td>
            <td id="startend">Start time</td>
            <td id="startend">End time</td>
          </tr>
        </thead>
        <FlipMove.default typeName="tbody" enterAnimation="accordionVertical" staggerDelayBy="5" staggerDurationBy="5" easing="ease-in-out" delay="5" leaveAnimation="none" duration={600}>
          {rows}
        </FlipMove.default>
      </table>
    );
  }
}

// //////////////

export default WarHistory;
