let fs = require('fs');
let path = require('path');

module.exports = {
  Handler: require('./handler'),

  // parse version number from package.json
  version: JSON.parse(fs.readFileSync(path.resolve(`${__dirname}/../package.json`))).version
};