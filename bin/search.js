var google = require('google')
var fs = require("fs")

const candidates = require("../src/candidates")

const list = Object.values(candidates)

google.resultsPerPage = 5

function searchCandidate(candidate) {
  google(`twitter ${candidate.name}`, function (err, res){
    const link = res.links[0];

    let doc = fs.readFileSync(`./src/bios/${candidate.id}.md`, 'utf8')

    doc = doc.replace(/"twitter":.*/, `"twitter": "${link.link}",`)
    fs.writeFileSync(`./src/bios/${candidate.id}.md`, doc)
    console.log(link.link)
  })

}

function main() {
  list.map(candidate => searchCandidate(candidate))
}

main()
