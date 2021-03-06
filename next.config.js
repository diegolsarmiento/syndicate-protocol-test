const webpack = require('webpack');

/*
  Handles env variables
*/

const { parsed: myEnv } = require('dotenv').config({
    path: 'ethereum/.env'
});

module.exports = {
    webpack(config) {
        config.plugins.push(new webpack.EnvironmentPlugin(myEnv))
        return config;
    }
}