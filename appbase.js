var Appbase = require('appbase-js');
var config = require("../appbaseConfig");

var singleton={
  ar:new Appbase(config)
};

module.exports = singleton;
