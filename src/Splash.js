import React from "react";

import "./Splash.css";

const ajectives = ["representative", "inclusive", "diverse", "progressive"];
const careers = ["doctors", "teachers", "veterans", "ceos", "lawyers"];
const values = [
  "a woman’s right to choose",
  "access to affordable health care",
  "encouraging entrepreneurship",
  "creating good jobs",
  "protecting the country"
];

class Chooser extends React.Component {
  state = { i: 0 };

  componentDidMount() {
    this.updateI();
    setInterval(this.updateI, 8000);
  }

  updateI = () => {
    const num = this.props.list.length;
    const i = Math.floor(Math.random() * num);
    this.setState({ i });
  };

  render() {
    const item = this.props.list[this.state.i];
    return item;
  }
}

export default function() {
  return (
    <div className="splash">
      <div className="splash-header">
        <div className="content">
          <h1 className="">Emily's House</h1>
          <h2 className="">Inspiring Female candidates</h2>
        </div>
      </div>
      <div className="pitch">
        On November 6th, we have the opportunity to elect a new congress that
        shares our values. Every candidate here has been vetted by{" "}
        <a href="http://emilyslist.org/">Emily's List</a> and we sincerely hope
        you find one who inspires you.
        <div className="bullets">
          <div className="bullet">
            <div className="number">
              <em>1.</em>
            </div>{" "}
            <div>
              {" "}
              <strong>Volunteer</strong> to phone bank for a campaign
            </div>
          </div>
          <div className="bullet">
            <div className="number">
              <em>2.</em>
            </div>
            <div>
              {" "}
              <strong>Contribute</strong> to a race
            </div>
          </div>
          <div className="bullet">
            <div className="number">
              <em>3.</em>
            </div>
            <div>
              {" "}
              <strong>Share</strong> a candidate's story
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
