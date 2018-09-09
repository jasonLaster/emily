import React, { Component } from "react";
import { candidates } from "./bios";
import Bio from "./Bio";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "./App.css";

const candidateList = Object.values(candidates);

function Candidate({ candidate, selected, starred, toggleStar, search }) {
  const id = candidate.id;
  const isSelected = id === selected ? "selected" : "";
  return (
    <Link className={`candidate ${isSelected}`} to={`/${id}`}>
      <img className="candidate-img" src={candidate.img} />
      <div className="candidate-summary">
        <div className="top">{candidate.name}</div>
        <div className="location">{candidate.location}</div>
        <div className="keywords">
          {candidate.keywords.map(key => (
            <span key={key} onClick={() => search(key)} className="keyword">
              {key}
            </span>
          ))}
        </div>
      </div>
      {
        <div
          className={`candidate-star ${starred ? "star-selected" : ""}`}
          onClick={e => {
            e.stopPropagation();
            e.preventDefault();
            toggleStar(id);
          }}
        />
      }
    </Link>
  );
}

function matchCandidate(query, candidate) {
  const rQuery = new RegExp(query, "i");
  return (
    query === "" ||
    candidate.name.match(rQuery) ||
    candidate.location.match(rQuery) ||
    candidate.keywords.join(" ").match(rQuery)
  );
}

function starCount(stars) {
  return Object.values(stars).reduce(
    (count, star) => count + (star ? 1 : 0),
    0
  );
}

function scrollToSelectedEl() {
  const selectedEl = document.querySelector(".selected");
  const top = selectedEl.getBoundingClientRect().top;
  if (top < 0 || top > window.outerHeight) {
    selectedEl.scrollIntoView({ block: "center", behavior: "instant" });
  }
}

class App extends Component {
  selected = null;
  state = {
    query: "",
    stars: JSON.parse(localStorage.getItem("stars")) || {},
    showStars: false
  };

  onSearch(e) {
    const { value } = e.target;
    this.setState({ query: value });
  }

  toggleStar = id => {
    let { stars } = this.state;

    const star = stars[id] ? !stars[id] : true;
    stars = { ...stars, [id]: star };

    this.setState({ stars });
    localStorage.setItem("stars", JSON.stringify(stars));
  };

  search = query => {
    this.setState({ query });
  };

  toggleShowStars = () => {
    this.setState({ showStars: !this.state.showStars });
  };

  componentDidMount() {
    scrollToSelectedEl();
  }

  CandidatesRoute = ({ match }) => {
    const { candidateId } = match.params;
    const { query, stars, showStars } = this.state;
    const filteredList = candidateList.filter(
      candidate =>
        matchCandidate(query, candidate) &&
        (showStars ? stars[candidate.id] : true)
    );

    let selected = filteredList.length > 0 ? filteredList[0].id : null;
    if (candidateId && filteredList.map(c => c.id).includes(candidateId)) {
      selected = candidateId;
    }

    this.selected = selected;
    return (
      <div className={`App ${candidateId ? "selected" : ""}`}>
        <div className="sidebar">
          <div className="searchbar">
            <input
              value={query}
              className="search"
              placeholder="Search..."
              type="text"
              onChange={e => this.onSearch(e)}
            />
          </div>
          {filteredList.length > 0 ? (
            <div className="candidates">
              {filteredList.map(candidate => (
                <Candidate
                  key={candidate.id}
                  search={this.search}
                  starred={stars[candidate.id]}
                  toggleStar={this.toggleStar}
                  candidate={candidate}
                  selected={selected}
                />
              ))}
            </div>
          ) : (
            <div className="no-matches">No Matches...</div>
          )}
        </div>

        <Bio
          selected={selected}
          starCount={starCount(stars)}
          toggleShowStars={this.toggleShowStars}
          showStars={showStars}
        />
      </div>
    );
  };

  render() {
    const { query } = this.state;
    return (
      <Router>
        <div className="app-wrapper">
          <Route path="/:candidateId" component={this.CandidatesRoute} />
          <Route exact path="/" component={this.CandidatesRoute} />
        </div>
      </Router>
    );
  }
}

export default App;
