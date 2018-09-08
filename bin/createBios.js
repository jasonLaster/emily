const candidates = require("./src/candidates")
const fs = require('fs')
// console.log(candidates)
//
for (id in candidates) {
  const candidate = candidates[id]
  printBio(candidate)
  // console.log(candidate.id)
}


function printBio(candidate) {

    let bio = ''
    let bold = true

    bio += 'import Video from "../Video"\n\n'
    for (p of candidate.bio) {
      bio += `${bold ?"## " : ""}${p}\n\n`
      bold = !bold
    }

    console.log(bio)
    fs.writeFileSync(`./src/bios/${candidate.id}.md`, bio)
}

// printBio(Object.values(candidates)[0])
