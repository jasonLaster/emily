import React, { Component } from 'react';
import YouTube from 'react-youtube';
import candidates from "./candidates"

import "./Bio.css"

function _onReady(event) {
  // access to player in all event handlers via event.target
  event.target.pauseVideo();
}


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

   const items = candidate.bio.map((text, index) =>
     index % 2 === 0 ? <h2>{text}</h2> : <p>{text} </p>
   );

   if (candidate.videos && candidate.videos.length > 0) {
     const video = <YouTube
        videoId={candidate.videos[0]}
        opts={{
          height: '312',
          width: '500',
        }}
        onReady={_onReady}
      />

     items.splice(2, 0, video)
   }

   return <article>{items}</article>
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
