import React from 'react';
import { CandidateBio } from "./bios"
import { candidates } from "./bios"

import "./Bio.css"

function Header({candidate}) {

  const youtube = candidate.youtube || `https://www.youtube.com/results?search_query=${candidate.name.replace(/ /, '+')}`

  return <div className="candidate-header">
    <img alt={candidate.name} className="candidate-img" src={candidate.img}></img>
    <div className="candidate-summary">
      <div className="top">{candidate.name}</div>
      <div className="bottom">{candidate.location}</div>

      <div className="candidate-links">
        <a className="button" href={candidate.donate}>Donate</a>
        <a className="icon facebook" href={candidate.facebook}></a>
        <a className="icon twitter" href={candidate.twitter}></a>
        <a className="icon youtube" href={youtube}></a>
        <a className="icon emily" href={candidate.link}></a>
      </div>
    </div>
  </div>
}

function Article({candidate}) {
   return <article><CandidateBio id={candidate.id} /></article>
}

export default function renderCandidateBio({selected}) {
  const candidate = candidates[selected];
  if (!candidate) {
    return <div className="candidate-bio">
      <div className="header">
        <div class="links">
          <a href="https://github.com/jasonlaster/emily">Help</a>
        </div>
      </div>
    </div>
  }

  return <div key={candidate.id} className="candidate-bio">
    <div className="header">

      <div class="links">
        <a href="https://github.com/jasonlaster/emily">Help</a>
      </div>
    </div>
      <Header candidate={candidate} />
      <div className="candidate-description">
        <Article candidate={candidate} />
      </div>
 </div>
}
