import React, { Component } from 'react';
import candidates from "./candidates"
import { CandidateBio } from "./bios"

import "./Bio.css"

function Header({candidate}) {
  return <div className="candidate-header">
    <img className="candidate-img" src={candidate.img}></img>
    <div className="candidate-summary">
      <div className="top">{candidate.name}</div>
      <div className="bottom">{candidate.location}</div>

      <div className="candidate-links">
        <a className="button" href={candidate.donate}>Donate</a>
        <a className="icon facebook" href={candidate.facebook}></a>
        <a className="icon twitter" href={candidate.twitter}></a>
        <a className="icon youtube" href={`https://www.youtube.com/results?search_query=${candidate.name.replace(/ /, '+')}`}></a>
        <a className="icon emily" href={candidate.link}></a>
      </div>
    </div>
  </div>
}

function Article({candidate}) {
   return <article><CandidateBio id={candidate.id} /></article>
}

export default function renderCandidateBio({selected}) {
  if (!selected) {
    return null;
  }

  const candidate = candidates[selected];

  return <div key={candidate.id} className="candidate-bio">
    <Header candidate={candidate} />
    <div className="candidate-description">
      <Article candidate={candidate} />
    </div>
 </div>
}
