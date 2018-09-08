import React, { Component } from 'react';
import YouTube from 'react-youtube';
import candidates from "./candidates"

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
        <div className="bottom">{candidate.location}</div>
      </div>
    </Link>
  );
}

function CandidateList({candidate, selected}) {
  return <div className="candidates">
    {candidateList.map(candidate => <Candidate candidate={candidate} selected={selected} />)}
  </div>
}

function CandidatesRoute({match}) {
  const  { candidateId } = match.params
  const selected = candidateId || "cindy-axne"
  return (
    <div className="App">
      <CandidateList selected={selected} />
      <Bio selected={selected} />
    </div>)
}

class App extends Component {
  render() {
    return ( <MDXProvider>
          <Router>
            <div className="app-wrapper">
            <Route path="/:candidateId" component={CandidatesRoute}/>
            <Route exact path="/" component={CandidatesRoute}/>
            </div>
          </Router>
       </MDXProvider>
    );
  }
}

export default App;
