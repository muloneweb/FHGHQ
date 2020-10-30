import React from 'react';
import cost from "../../../_static/cost";
import clone from 'clone';
export class LogiCalc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: 0,
      category: 0,
      array: []
    };
    this.SetFilter = this.SetFilter.bind(this);
    this.AddItem = this.AddItem.bind(this);
    this.ChangeItem = this.ChangeItem.bind(this);
    this.RemoveItem = this.RemoveItem.bind(this);
  }
  AddItem(cat, id) {
    this.setState(state => {
      let array = clone(state.array);
      let item = {
        amount: cost.cost[cat][id].i,
        crates: 1,
        catid: cat,
        itemid: id
      };
      let obj = array.find(
        obj => obj.catid == item.catid && obj.itemid == item.itemid
      );
      if (obj === undefined) {
        array.push(item);
      } else {
        obj.amount = Number(obj.amount) + Number(cost.cost[cat][id].i);
        obj.crates++;
      }
      return {
        array: array
      };
    });
  }
  ChangeItem(index, event) {
    let array = this.state.array;
    let value = event.target.value;
    if (value <= 10000) {
      let item = array[index];
      if (value === "") {
        value = 0;
      }
      item.crates = value;
      item.amount = cost.cost[item.catid][item.itemid].i * item.crates;
      this.setState({ array: array });
    }
  }
  RemoveItem(index) {
    this.setState(state => {
      let array = JSON.parse(JSON.stringify(state.array));
      array.splice(index, 1);
      return {
        array: array
      };
    });
  }
  SetFilter(filter) {
    this.setState({
      filter: filter
    });
  }

  GetButton(cat, id) {
    return (
      <button
        className="requestmodal_itembtn"
        onClick={() => this.AddItem(cat, id)}
        key={"logicalc" + cat + "|" + id}
      >
        <img className="requestmodal_itemimg" src={cost.cost[cat][id].src} />
      </button>
    );
  }
  GetTotal(type) {
    let amount = 0;
    this.state.array.forEach(k => {
      if (cost.cost[k.catid][k.itemid][type] != undefined) {
        amount += cost.cost[k.catid][k.itemid][type] * k.crates;
      }
    });
    return <a>{amount}</a>;
  }
  GetCrates() {
    let crates = 0;
    let array = this.state.array;
    for (let i = 0; i < array.length; i++) {
      if (array[i].catid < 7) {
        crates += Number(array[i].crates);
      }
    }
    return crates;
  }
  GetVehicles() {
    let crates = 0;
    this.state.array.forEach(k => {
      if (k.catid == 7) {
        crates += Number(k.crates);
      }
    });
    return crates;
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
    //console.log(this.state.array)
    //console.log("Rendering logi calc")
    return (
      <React.Fragment>
        <p>Orders Calculator</p>
        <div className="row">
          <div className="col-12 col-sm-12 col-md-5">
            <div className="categoryrow">
              <cost.filterrow
                filter={this.state.filter}
                setfilter={this.SetFilter}
              />
            </div>
            <br />
            <div id="category">{this.GetButtons()}</div>
          </div>

          <div className="col-md-7">
            <div>
              <form>
                <h4 className="totalh">
                  Total cost:
                  <img
                    className="totalicon"
                    src={cost.cost[0][0].src}
                  />
                  {this.GetTotal("b")}
                  <img
                    className="totalicon"
                    src={cost.cost[0][1].src}
                  />
                  {this.GetTotal("r")}
                  <img
                    className="totalicon"
                    src={cost.cost[0][2].src}
                  />
                  {this.GetTotal("e")}
                  <img
                    className="totalicon"
                    src={cost.cost[0][8].src}
                  />
                  {this.GetTotal("he")}
                  <img
                    className="totalicon"
                    src="https://cdn.glitch.com/6393f3fd-16a7-4641-ae3d-994f8e7cea4e%2FCrateItemIcon.png?1548192460894"
                  />
                  <a id="totalcrates">{this.GetCrates()}</a>
                  <img
                    className="totalicon"
                    src="https://cdn.glitch.com/98ac14b2-4603-4541-b92e-320b855d2e65%2FTruckVehicleIcon.png?1542349073226"
                  />
                  <a id="totalvehicles">{this.GetVehicles()}</a>
                </h4>
              </form>

            </div>

            <div id="itemlist" className="container indextable">
              <table
                className="table table-condensed indextable"
                id="itemtable"
              >
                <colgroup>
                  <col width="40" className="tablecol" />
                  <col width="60" className="tablecol" />
                  <col />
                  <col width="60" className="tablecolwide" />
                  <col width="60" className="tablecol" />
                  <col width="60" className="tablecol" />
                  <col width="60" className="tablecol" />
                  <col width="60" className="tablecol" />
                  <col width="60" className="tablecol" />
                </colgroup>
                <thead className="indextable darkheader">
                  <tr>
                    <th className="tablecol"></th>
                    <th></th>
                    <th>
                      <p>Item</p>
                    </th>
                    <th>
                      <img
                        className="crate"
                        src="https://cdn.glitch.com/6393f3fd-16a7-4641-ae3d-994f8e7cea4e%2FCrateItemIcon.png?1548192460894"
                        style={{ width: 34, height: 34 }}
                      />
                    </th>
                    <th>
                      <p>#</p>
                    </th>
                    <th>
                      <img
                        className="tabletotalicon"
                        src={cost.cost[0][0].src}
                      />
                    </th>
                    <th>
                      <img
                        className="tabletotalicon"
                        src={cost.cost[0][1].src}
                      />{" "}
                    </th>
                    <th>
                      <img
                        className="tabletotalicon"
                        src={cost.cost[0][2].src}
                      />
                    </th>
                    <th>
                      <img
                        className="tabletotalicon"
                        src={cost.cost[0][8].src}
                      />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.array.map((obj, index) => (
                    <Item key={index} index={index} obj={obj} parent={this} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div id="logi_image_container">
            <img
              id="logi_image"
              src="https://cdn.glitch.com/84b19724-a86b-4caa-8e69-1e9c973e043f%2Ftabl-min.jpg?v=1568729797701"
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}
///////////////////////////////////
function Item(props) {
  //console.log("Item props",props)
  function GetCost(type) {
    if (cost.cost[props.obj.catid][props.obj.itemid][type] == undefined) {
      return null;
    } else {
      return (
        <p>{cost.cost[props.obj.catid][props.obj.itemid][type] * props.obj.crates}</p>
      );
    }
  }
  return (
    <tr>
      <td>
        <button
          type="button"
          className="removebutton"
          onClick={() => props.parent.RemoveItem(props.index)}
        >
          <img
            className="removebutton"
            src="https://cdn.glitch.com/dd3f06b2-b7d4-4ccc-8675-05897efc4bb5%2FX.png?v=1557668374293"
          />
        </button>
      </td>
      <td>
        <img
          className="requestmodal_itemimg"
          src={cost.cost[props.obj.catid][props.obj.itemid].src}
        />
      </td>
      <td>
        <p>{cost.cost[props.obj.catid][props.obj.itemid].name}</p>
      </td>
      <td>
        <input
          type="number"
          min={0}
          value={props.obj.crates}
          style={{ width: 60 }}
          onChange={event => props.parent.ChangeItem(props.index, event)}
        ></input>
      </td>
      <td>
        <p>{props.obj.amount}</p>
      </td>
      <td>
        {GetCost("b")}
      </td>
      <td>
        {GetCost("r")}
      </td>
      <td>
        {GetCost("e")}
      </td>
      <td>
        {GetCost("he")}
      </td>
    </tr>
  );
}
