import React from "react";
import { CandidateBio } from "./bios";
import { candidates } from "./bios";

import "./Bio.css";

function Header({ candidate }) {
  const youtube =
    candidate.youtube ||
    `https://www.youtube.com/results?search_query=${candidate.name.replace(
      / /,
      "+"
    )}`;
  return (
    <div className="candidate-header">
      <img alt={candidate.name} className="candidate-img" src={candidate.img} />
      <div className="candidate-summary">
        <div className="top">{candidate.name}</div>
        <div className="bottom">{candidate.location}</div>

        <div className="candidate-links">
          <a className="button" href={candidate.actblue || candidate.donate}>
            Donate
          </a>
          <a className="icon facebook" href={candidate.facebook} />
          <a className="icon twitter" href={candidate.twitter} />
          <a className="icon youtube" href={youtube} />
          <a className="icon emily" href={candidate.link} />
        </div>
      </div>
    </div>
  );
}

function Article({ candidate }) {
  return (
    <article>
      <CandidateBio id={candidate.id} />
    </article>
  );
}

function Banner({ starCount, toggleShowStars, showStars }) {
  const noStars = starCount == 0;
  return (
    <div className="header">
      <div
        className={`stars ${noStars ? "no-stars" : ""} ${
          showStars ? "active" : ""
        }`}
        onClick={toggleShowStars}
      >
        <div className="star" />
        <span> {noStars ? "Star Candidates" : `${starCount} Candidates`}</span>
      </div>
      <div class="links">
        <a href="https://github.com/jasonlaster/emily">Help</a>
      </div>
    </div>
  );
}

export default function renderCandidateBio({
  selected,
  starCount,
  showStars,
  toggleShowStars
}) {
  const candidate = candidates[selected];
  if (!candidate) {
    return (
      <div className="candidate-bio">
        <Banner
          starCount={starCount}
          toggleShowStars={toggleShowStars}
          showStars={showStars}
        />
      </div>
    );
  }

  return (
    <div key={candidate.id} className="candidate-bio">
      <Banner
        starCount={starCount}
        toggleShowStars={toggleShowStars}
        showStars={showStars}
      />
      <Header candidate={candidate} />
      <div className="candidate-description">
        <Article candidate={candidate} />
      </div>
    </div>
  );
}
