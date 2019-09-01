import Vue from 'vue'

import VueEthereum from 'vue-ethereum'

Vue.use(VueEthereum)

export default ({app}) => {
    // inject options from module
    const pluginOptions = [<%= serialize(options) %>][0]
    app.veth = new VueEthereum(pluginOptions)
}
