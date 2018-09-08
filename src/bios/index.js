import React, { Component } from 'react';


const bios = [
  require("./cindy-axne.md"),
  require("./lauren-baer.md"),
  require("./dana-balter.md"),
  require("./nanette-barragan18.md"),
  require("./mary-barzee-flores.md"),
  require("./carolyn-bourdeaux.md"),
  require("./lisa-brown.md"),
  require("./julia-brownley-18.md"),
  require("./cheri-bustos-18.md"),
  require("./kristen-carlson.md"),
  require("./leslie-cockburn.md"),
  require("./linda-coleman.md"),
  require("./angie-craig-18.md"),
  require("./sharice-davids.md"),
  require("./madeleine-dean.md"),
  require("./betsy-dirksen-londrigan.md"),
  require("./gretchen-driskell-18.md"),
  require("./kara-eastman.md"),
  require("./veronica-escobar.md"),
  require("./abby-finkenauer.md"),
  require("./sylvia-garcia.md"),
  require("./theresa-gasper.md"),
  require("./liuba-grechen-shirley.md"),
  require("./deb-haaland.md"),
  require("./jahana-hayes.md"),
  require("./mj-hegar.md"),
  require("./katie-hill.md"),
  require("./chrissy-houlahan-18.md"),
  require("./ann-kirkpatrick-18.md"),
  require("./annie-kuster18.md"),
  require("./susie-lee-18.md"),
  require("./carolyn-long.md"),
  require("./elaine-luria.md"),
  require("./carolyn-maloney18.md"),
  require("./kathy-manning.md"),
  require("./lucy-mcbath.md"),
  require("./diane-mitsch-bush.md"),
  require("./jessica-morse.md"),
  require("./debbie-mucarsel-powell.md"),
  require("./stephanie-murphy1.md"),
  require("./ilhan_omar.md"),
  require("./gina-ortiz-jones.md"),
  require("./Lizzie-Pannill-Fletcher.md"),
  require("./katie-porter-18.md"),
  require("./betsy-rader.md"),
  require("./mary-gay-scanlon.md"),
  require("./kim-schrier.md"),
  require("./donna-shalala.md"),
  require("./mikie-sherrill.md"),
  require("./elissa-slotkin.md"),
  require("./nancy-soderberg.md"),
  require("./abigail-spanberger.md"),
  require("./haley-stevens.md"),
  require("./maura-sullivan.md"),
  require("./hiral-tipirneni.md"),
  require("./rashida-tlaib.md"),
  require("./norma-torres18.md"),
  require("./xochitl-torres-small.md"),
  require("./lauren-underwood.md"),
  require("./liz-watson.md"),
  require("./jennifer-wexton.md"),
  require("./susan-wild.md"),
  require("./kathleen-williams.md")
]

let Bios = {}
export let candidates ={}

for (const candidate of bios) {
  const id = candidate.meta.id
  Bios[id] = candidate.default;
  candidates[id] = candidate.meta
}


export function CandidateBio({id}) {
  const Bio = Bios[id]
  return <Bio />
}

// export const candidates;
