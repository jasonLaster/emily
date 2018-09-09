var google = require("google");
var fs = require("fs");

const candidates = require("../src/candidates");

const list = Object.values(candidates);

google.resultsPerPage = 5;
const clinks = {};

function searchCandidate(candidate) {
  return new Promise(r => {
    google(`actblue ${candidate.name}`, function(err, res) {
      // const link = res.links[0];

      const links = res.links
        .slice(0, 8)
        .map(({ link }) => link)
        .filter(l => l.includes("donate"));

      clinks[candidate.id] = links;

      console.log(links);
      //
      // if (link) {
      //   let doc = fs.readFileSync(`./src/bios/${candidate.id}.md`, 'utf8')
      //   doc = doc.replace(/"youtube":.*/, `"youtube": "${link}",`)
      //   fs.writeFileSync(`./src/bios/${candidate.id}.md`, doc)
      // }
      r();
    });
  });
}

function addAB(id, links) {
  const candidate = candidates[id];
  const link = links[0] || "";
  let doc = fs.readFileSync(`./src/bios/${candidate.id}.md`, "utf8");
  doc = doc.replace(/"website":.*/, `"website": "",\n  "actblue": "${link}",`);
  fs.writeFileSync(`./src/bios/${candidate.id}.md`, doc);
}

async function main() {
  // for (const candidate of list) {
  //   await searchCandidate(candidate);
  // }
  // // await Promise.all(list.map(candidate => ));
  // console.log(JSON.stringify(clinks, null, 2));

  for (const id in res) {
    // console.log(id, res[id]);
    addAB(id, res[id]);
  }
}

main();
