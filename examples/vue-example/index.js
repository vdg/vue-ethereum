import Vue from 'vue'
import VueEthereum from '../../src/index.js'
import { OrbitSpinner } from 'epic-spinners'

import main from './main.vue'

Vue.use(VueEthereum)

Vue.component('orbit-spinner', OrbitSpinner)

export default new Vue({
  el: '#app',
  eth: new VueEthereum({ registerComponents: false }),
  render: function (createElement) {
    return createElement(main)
  }
})
