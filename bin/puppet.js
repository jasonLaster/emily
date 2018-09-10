const HCCrawler = require("headless-chrome-crawler");
const candidates = require("../src/candidates");

function getURLS() {
  const locs = Object.values(candidates).map(c => c.location);

  const states = locs
    .map(loc => {
      if (loc.split(",").length == 0) {
        return loc;
      }

      return loc.split(",")[0];
    })
    .map(state => state.toLowerCase().replace(/ /, "-"));

  var uniqueArray = function(arrArg) {
    return arrArg.filter(function(elem, pos, arr) {
      return arr.indexOf(elem) == pos;
    });
  };

  var uniqEs6 = arrArg => {
    return arrArg.filter((elem, pos, arr) => {
      return arr.indexOf(elem) == pos;
    });
  };

  const ustates = uniqueArray(states);

  const urls = ustates.map(state =>
    [...Array(60).keys()].map(
      num =>
        `https://projects.fivethirtyeight.com/2018-midterm-election-forecast/house/${state}/${num}/`
    )
  );
  return [].concat(...urls);
}

let results = {};
(async () => {
  const crawler = await HCCrawler.launch({
    // Function to be evaluated in browsers
    evaluatePage: () => {
      function t(selector) {
        return $(selector)
          .text()
          .trim();
      }

      return {
        district: t(".district-header h1"),
        category: t(".district-header .category"),
        democrat: t(".dem .name"),
        republican: t(".gop .name"),
        odds: t(".dem-p")
      };
    },
    // Function to be called with evaluated results from browsers
    onSuccess: ({ result }) => {
      results[result.district] = result;
      if (result.district) {
        console.log(result.district);
      }
    }
  });
  // Queue a request
  // await crawler.queue(
  //   "https://projects.fivethirtyeight.com/2018-midterm-election-forecast/house/virginia/5/"
  // );
  // Queue multiple requests

  const urls = getURLS();
  // console.log(urls);
  await crawler.queue(urls);
  // Queue a request with custom options
  // await crawler.queue({
  //   url: "https://example.com/"
  // });
  await crawler.onIdle(); // Resolved when no queue is left
  await crawler.close(); // Close the crawler

  fs.writeFileSync("./538.json", JSON.stringify(results, null, 2));
})();
