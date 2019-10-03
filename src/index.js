
// import vWeb3Component from './components/eth-tx.vue'

import { getNetwork, explorer } from './constants.js'

import Web3Watcher from './watcher.js'

const isDebug = () => process.env.NODE_ENV !== 'production'

const web3Watcher = Web3Watcher() // ADD potential option

export default class VueEthereum {
  constructor (options = {}) {
    const defaults = {
      accessorName: '$eth',
      // Vuex Options
      useVuex: false
      // vuexModuleName: 'eth',
      // Components
      // registerComponent: true,
      // Directives
      // registerDirective: true,
    }
    this.options = {
      ...defaults,
      ...options
    }
    this.initialized = false
  }

  init (Vue, store) {
    if (isDebug() && !install.installed) {
      console.warn(
        // `[vue-ethereum] not installed. Make sure to call Vue.use(VueEthereum) before init root instance.`
      )
    }

    if (this.initialized) {
      return
    }

    if (this.options.registerComponent) {
      // Vue.component(this.options.componentName, vWeb3Component)
    }

    if (this.options.useVuex) {
      // const { vuexModuleName } = this.options
      // if (!store) {
      throw new Error('[vue-ethereum] Vuex mode not yet available.')
      // }
    } else {
      this.stateHandler = new Vue({
        data () {
          return {
            web3State: null,
            accounts: [],
            networkId: null,
            walletType: null,
            balanceOf: {}
          }
        },
        computed: {
          error () {
            return this.web3State && this.web3State.error
          },
          isConnected () {
            return this.web3State && this.web3State.isConnected
          },
          networkName () {
            return getNetwork(this.networkId).name
          },
          isTestNetwork () {
            return getNetwork(this.networkId).isTest
          },
          balance () {
            return account => this.balanceOf[account]
          }
        },
        watch: {
          web3State: function (val, oldVal) {
            this.accounts = web3Watcher.accounts
            this.networkId = web3Watcher.networkId
            this.walletType = web3Watcher.walletType
          }
        },
        methods: {
          saveWeb3State (s) {
            this.web3State = s
          },
          async getBalance (account) {
            Vue.set(this.balanceOf, account, await web3Watcher.getBalance(account))
          }
        }
      })
    }

    this.initialized = true
  }

  async connect () {
    web3Watcher.setStateHook(this.stateHandler.saveWeb3State)
    web3Watcher.init()
  }

  disconnect () {
    this.stateHandler.saveWeb3State(null)
    this.stateHandler.accounts = []
    this.stateHandler.networkId = null
    this.stateHandler.walletType = null
  }

  /* helpers */

  get walletDetected () {
    return !!this.stateHandler.walletType
  }

  get walletType () {
    return this.stateHandler.walletType
  }

  get isConnected () {
    return this.stateHandler.isConnected
  }

  get error () {
    return this.stateHandler.error
  }

  get networkId () {
    return this.stateHandler.networkId
  }

  get networkName () {
    return this.stateHandler.networkName
  }

  get isTestNetwork () {
    return this.stateHandler.isTestNetwork
  }

  get accounts () {
    return this.stateHandler.accounts
  }

  get selectedAddress () {
    return this.stateHandler.accounts[0]
  }

  get web3 () {
    return web3Watcher.instance
  }

  on (event, fn) {
    web3Watcher.on(event, fn)
  }

  explorer (type, id) {
    return explorer(this.stateHandler.networkId)(type, id)
  }

  balance (account) {
    this.stateHandler.getBalance(account)
    return this.stateHandler.balance(account)
  }
}

export function install (Vue) {
  if (install.installed && Vue) {
    if (isDebug()) {
      console.warn('[vue-ethereum] already installed. Vue.use(VueEthereum) should be called only once.')
    }
    return
  }

  Vue.mixin({
    /**
     * VueEthereum init hook, injected into each instances init hooks list.
     */
    beforeCreate () {
      const { eth, store, parent } = this.$options

      let instance = null
      if (eth) {
        instance = typeof eth === 'function' ? new eth() : eth // eslint-disable-line new-cap
        // Inject store
        instance.init(Vue, store)
      } else if (parent && parent.__$ethInstance) {
        instance = parent.__$ethInstance
        instance.init(Vue, parent.$store)
      }

      if (instance) {
        // Store helper for internal use
        this.__$ethInstance = instance
        this[instance.options.accessorName] = instance
      }
    }
  })

  install.installed = true
}

VueEthereum.install = install
