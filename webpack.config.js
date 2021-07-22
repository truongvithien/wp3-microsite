const {configGenerator} = require("./webpack.generator.js");

module.exports = (env, options) => [
	configGenerator(options, 'landing', ['index'], ['all']), 
	configGenerator(options, 'article', ['article'], []), 
];