import React, { Component } from 'react';
import YouTube from 'react-youtube';
import { candidates } from "./bios"

import { MDXProvider } from '@mdx-js/tag'
import Bio from './Bio'

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'


import './App.css';

const candidateList = Object.values(candidates)

function Candidate({candidate, selected}) {
  const isSelected = candidate.id == selected ? "selected" : ""
  return (
    <Link className={`candidate ${isSelected}`} to={`/${candidate.id}`}>
      <img className="candidate-img" src={candidate.img}></img>
      <div className="candidate-summary">
        <div className="top">{candidate.name}</div>
        <div className="location">{candidate.location}</div>
        <div className="keywords">{candidate.keywords.map(key => <span key={key} className="keyword">{key}</span>)}</div>
      </div>
    </Link>
  );
}

function CandidateList({candidate, selected}) {
  return <div className="candidates">
    {candidateList.map(candidate => <Candidate candidate={candidate} selected={selected} />)}
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
  // state = {selected: null}
  selected = null;

  componentDidUpdate() {
    console.log('yo', this.selected)
  }

  componentDidMount() {
    scrollToSelectedEl()
  }

  CandidatesRoute(match) {
    const  { candidateId } = match.params
    const selected = candidateId || "cindy-axne"
    this.selected = selected;
    return (
      <div className="App">
        <CandidateList selected={selected} />
        <Bio selected={selected} />
      </div>)
  }


  render() {
    return ( <MDXProvider>
          <Router>
            <div className="app-wrapper">
            <Route path="/:candidateId" component={({match}) => this.CandidatesRoute(match)}/>
            <Route exact path="/" component={({match}) => this.CandidatesRoute(match)}/>
            </div>
          </Router>
       </MDXProvider>
    );
  }
}

export default App;
