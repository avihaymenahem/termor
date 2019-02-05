const nodeExternals = require('webpack-node-externals');

module.exports = function override(config, env) {
    config.externals = [ nodeExternals() ];
    return config;
}