import React, { Component } from 'react';
import { candidates } from "./bios"
import Bio from './Bio'

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'


import './App.css';

const candidateList = Object.values(candidates)

function Candidate({candidate, selected, search}) {
  const isSelected = candidate.id === selected ? "selected" : ""
  return (
    <Link className={`candidate ${isSelected}`} to={`/${candidate.id}`}>
      <img className="candidate-img" src={candidate.img}></img>
      <div className="candidate-summary">
        <div className="top">{candidate.name}</div>
        <div className="location">{candidate.location}</div>
        <div className="keywords">{candidate.keywords.map(key =>
          <span key={key} onClick={() => search(key)} className="keyword">{key}</span>)}
        </div>
      </div>
    </Link>
  );
}

function matchCandidate(query, candidate) {
  const rQuery = new RegExp(query, "i");
  return query === "" ||
    candidate.name.match(rQuery) ||
    candidate.location.match(rQuery) ||
    candidate.keywords.join(" ").match(rQuery)
}

function CandidateList({candidates, selected, search}) {
  return  <div className="candidates">
      {candidates.map(candidate => <Candidate key={candidate.id} search={search} candidate={candidate} selected={selected} />)}
    </div>
}

function scrollToSelectedEl() {
  const selectedEl = document.querySelector(".selected")
  const top = selectedEl.getBoundingClientRect().top;
  if (top < 0 || top > window.outerHeight) {
    selectedEl.scrollIntoView({block: "center", behavior: "instant"})
  }
}

class App extends Component {
  selected = null;
  state = {query: ""};

  onSearch(e) {
    const {value} = e.target;
    this.setState({query: value})
  }

  search = query => {
    this.setState({query})
  }

  componentDidMount() {
    scrollToSelectedEl()
  }

  CandidatesRoute = ({match}) =>{
    const  { candidateId } = match.params
    const {query} = this.state;
    const filteredList = candidateList.filter(candidate => matchCandidate(query, candidate))

    let selected = filteredList.length > 0 ? filteredList[0].id : null;
    if (candidateId && filteredList.map(c => c.id).includes(candidateId)) {
      selected = candidateId;
    }

    this.selected = selected;
    return (
      <div className="App">
        <div  className="sidebar">
          <div className="searchbar">
            <input value={query} className="search" placeholder="Search..." type="text" onChange={e => this.onSearch(e)} />
          </div>
          {filteredList.length > 0 ?
             <CandidateList selected={selected} candidates={filteredList} search={this.search} />
             : <div className="no-matches">No Matches...</div>}

        </div>

          <Bio selected={selected} />

      </div>)
  }


  render() {
    const {query} = this.state
    return (
      <Router>
        <div className="app-wrapper">
          <Route key="a" path="/:candidateId" component={this.CandidatesRoute}/>
          <Route key="b" exact path="/" component={this.CandidatesRoute}/>
        </div>
      </Router>

    );
  }
}

export default App;
