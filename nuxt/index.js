/*
Nuxt.js module for vue-ethereum

Usage:
    - Install vue-ethereum package
    - Add this into your nuxt.config.js file:
    {
        modules: [ 'vue-ethereum/nuxt' ],
        // Optionally passing options in module top level configuration
        ethereum: { useVuex: true }
    }
*/

const {resolve} = require('path');

module.exports = function nuxtVueEthereumModule(moduleOptions) {
    const options = Object.assign({}, this.options.ethereum, moduleOptions);

    // Register plugin
    this.addPlugin({
        src: resolve(__dirname, 'vue-ethereum-plugin.template.js'),
        fileName: 'vue-ethereum-plugin.js',
        options: options
    })
};

// required by nuxt
module.exports.meta = require('../package.json');
