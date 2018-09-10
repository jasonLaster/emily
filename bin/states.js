const candidates = require("../src/candidates");
const locs = Object.values(candidates).map(c => c.location);

var fs = require("fs");
var request = require("request-promise-native");

const states = locs.map(loc => {
  if (loc.split(",").length == 0) {
    return loc;
  }

  return loc.split(",")[0];
});

var uniqueArray = function(arrArg) {
  return arrArg.filter(function(elem, pos, arr) {
    return arr.indexOf(elem) == pos;
  });
};

const ustates = uniqueArray(states);

const _urls = ustates.map(state =>
  [...Array(20).keys()].map(
    num =>
      `https://projects.fivethirtyeight.com/2018-midterm-election-forecast/house/${state}/${num}/`
  )
);
const list = [].concat(..._urls).map(i => i.toLowerCase().replace(/ /, "-"));

var urls = list;
const goodUrls = [];
async function main() {
  for (var i = 0; i < urls.length; i++) {
    var url = urls[i];

    try {
      const body = await request(url);
      if (body) {
        console.log(`good`, url);
        goodUrls.push(url);
      } else {
        console.log(`bad 1`, url);
      }
    } catch (e) {
      console.log(`bad`, url);
    }
  }

  fs.writeFileSync("./districts.json", JSON.stringify(goodUrls, null, 2));
}

main();
