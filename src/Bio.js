import React from "react";
import { CandidateBio } from "./bios";
import { candidates } from "./bios";
import { Link } from "react-router-dom";
import Helmet, { meta } from "react-helmet";
// import { Share } from "react-twitter-widgets";
import { TwitterShareButton, TwitterIcon } from "react-share";

import "./Bio.css";

// console.log(Share);

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
      <Link className={`back`} to={`/`}>
        ← Back
      </Link>

      <div
        className={`stars ${noStars ? "no-stars" : ""} ${
          showStars ? "active" : ""
        }`}
        onClick={toggleShowStars}
      >
        <div className="star" />
        <span> {noStars ? "Star Candidates" : `${starCount} Candidates`}</span>
      </div>
      <div className="links">
        <a href="https://github.com/jasonlaster/emily">Help</a>
      </div>
    </div>
  );
}

function Meta({ candidate }) {
  return (
    <Helmet>
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@jasonLaster11" />
      <meta
        name="twitter:title"
        content={`Emily's House - discover progressive female candidates`}
      />
      <meta
        name="twitter:description"
        content={`${candidate.name} for congress.`}
      />
      <meta name="twitter:image" content={candidate.img} />

      <meta
        property="og:title"
        content={`Emily's House - discover progressive female candidates`}
      />
      <meta
        property="og:description"
        content={`${candidate.name} for congress.`}
      />
      <meta property="og:image" content={candidate.img} />
      <meta property="og:url" content={document.location.href} />
    </Helmet>
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

        <div className="splash">
          <div className="pitch">
            <div className="title">Emily's House</div>
            <div className="descrpition">
              Discover progressive female house candidates.
            </div>
          </div>
        </div>
      </div>
    );
  }

  const tweet = `I support ${candidate.name} for congress\n\n`;

  return (
    <div key={candidate.id} className="candidate-bio">
      <Meta candidate={candidate} />
      <Banner
        starCount={starCount}
        toggleShowStars={toggleShowStars}
        showStars={showStars}
      />
      <Header candidate={candidate} />
      <div className="actions">
        <div className="row">
          <a className="donate" href={candidate.actblue || candidate.donate}>
            Donate
          </a>
          {/* <a
            class="twitter-share-button"
            href={`https://twitter.com/intent/tweet?text=${tweet.split("%20")}`}
            data-size="large"
          /> */}

          <TwitterShareButton url={document.location.href} title={tweet}>
            <TwitterIcon size={32} />
            <span>Tweet</span>
          </TwitterShareButton>
        </div>
      </div>
      <div className="candidate-description">
        <Article candidate={candidate} />
      </div>
    </div>
  );
}
