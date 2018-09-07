import React, { Component } from 'react';
import {List} from 'react-virtualized';

import candidates from "./candidates"

import './App.css';

console.log(List)
class App extends Component {

  state = { selected: "cindy-axne" }

  onClick(candidate) {
    this.setState({selected: candidate.id})
  }

  renderCandidateItem(candidate) {
    const selected = candidate.id == this.state.selected ? "selected" : ""
    return <div className={`candidate ${selected}`} onClick={() => this.setState({selected: candidate.id})}>
      <img className="candidate-img" src={candidate.img}></img>
      <div className="candidate-summary">
        <div className="top">{candidate.name}</div>
        <div className="bottom">{candidate.location}</div>
      </div>
   </div>
  }


  renderCandidateBio() {
    if (!this.state.selected) {
      return null;
    }

    const candidate = candidates[this.state.selected];

    return <div key={candidate.id} className="candidate-bio">
      <div className="candidate-header">
        <img className="candidate-img" src={candidate.img}></img>
        <div className="candidate-summary">
          <div className="top">{candidate.name}</div>
          <div className="bottom">{candidate.location}</div>
          {/* <ul className="candidate-list">
            {candidate.summary.map((item,i) => <li key={i} className="summary-item">{item}</li>)}
          </ul> */}

          <div className="candidate-links">
            <a className="button" href={candidate.donate}>Donate</a>
            <a className="facebook" href={candidate.facebook}></a>
            <a className="twitter" href={candidate.twitter}></a>
            <a className="emily" href={candidate.link}>Emily's List</a>
          </div>
        </div>
      </div>
      <div className="candidate-description">
        <article>
        {candidate.bio.map((text, index) =>
          index % 2 === 0 ? <h2>{text}</h2> : <p>{text} </p>
        )}
      </article>
      </div>
   </div>
  }

  render() {
    const candidateList = Object.values(candidates)
    console.log(candidateList)
    return (
      <div className="App">
        <div className="candidates">
        {candidateList.map(candidate => this.renderCandidateItem(candidate))}
      </div>
      {this.renderCandidateBio()}
    </div>

    );
  }
}

export default App;
