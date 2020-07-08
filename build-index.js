'use strict';

const fs = require('fs');
const lunr = require('./_site/styles/lunr.min.js')

const kStopWordFile = './_site/search-stopwords.json';
const kSearchDataFile = './_site/index.json';
const kPrebuiltFile = './_site/index-prebuilt.json';

let lunrIndex;
let stopWords = null;
let searchData = {};

lunr.tokenizer.separator = /[\s\-\.\(\)]+/;

console.log('Loading ' + kStopWordFile + ' ...');
loadStopWords();

console.log('Loading ' + kSearchDataFile + ' ...');
loadSearchData();

console.log('Building Indexes ...')
buildIndex();

console.log('Saving prebuilt indexes ... => ' + kPrebuiltFile);
saveIndex();

console.log('Done.');

function loadStopWords() {
  let data = fs.readFileSync(kStopWordFile);
  stopWords = JSON.parse(data);
}

function loadSearchData() {
  let data = fs.readFileSync(kSearchDataFile);
  searchData = JSON.parse(data);
}

function buildIndex() {
  if (stopWords !== null && !isEmpty(searchData)) {
    lunrIndex = lunr(function () {
      this.pipeline.remove(lunr.stopWordFilter);
      this.ref('href');
      this.field('title', { boost: 50 });
      this.field('keywords', { boost: 20 });

      for (let prop in searchData) {
        if (searchData.hasOwnProperty(prop)) {
          this.add(searchData[prop]);
        }
      }

      let docfxStopWordFilter = lunr.generateStopWordFilter(stopWords);
      lunr.Pipeline.registerFunction(docfxStopWordFilter, 'docfxStopWordFilter');
      this.pipeline.add(docfxStopWordFilter);
      this.searchPipeline.add(docfxStopWordFilter);
    });
  }
}

function saveIndex() {
  fs.writeFileSync(kPrebuiltFile, JSON.stringify(lunrIndex));
}

function isEmpty(obj) {
  if(!obj) return true;

  for (var prop in obj) {
    if (obj.hasOwnProperty(prop))
      return false;
  }

  return true;
}
