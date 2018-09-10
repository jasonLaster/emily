const candidates = require("../src/candidates");
const fs = require("fs");

const list = Object.values(candidates);

const index = fs.readFileSync("./build/index.html", "utf8");

function writeMeta(candidate) {
  const meta = `<meta name="twitter:title" content="Emily's House - discover progressive female candidates">
  <meta name="twitter:description" content="${candidate.name} for congress.">
  <meta name="twitter:image" content="${candidate.img}">
  <meta property="og:title" content="Emily's House - discover progressive female candidates">
  <meta property="og:description" content="${candidate.name} for congress.">
  <meta property="og:image" content="${candidate.img}">
  <meta property="og:url" content="https://emilys-house.rocks/${
    candidate.id
  }">`;

  const doc = index.replace("<span/>", meta);
  fs.writeFileSync(`./build/${candidate.id}.html`, doc);
  // console.log(index);
}

list.forEach(writeMeta);

const redirects = list
  .map(candidate => `/candidate/${candidate.id} /${candidate.id}.html  200`)
  .join("\n");

console.log(redirects);
