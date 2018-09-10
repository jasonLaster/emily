import React from "react";
import YouTube from "react-youtube";

export default function({ id }) {
  let width = 500;
  let height = 312;

  if (window.outerWidth <= 700) {
    width = window.outerWidth * 0.8;
    height = width / 1.6;
  }

  return (
    <div className="youtube">
      <YouTube videoId={id} opts={{ height, width }} />
    </div>
  );
}
