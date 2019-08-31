
// import vWeb3Component from './components/eth-tx.vue'

import Web3Watcher from './watcher.js'

const isDebug = () => process.env.NODE_ENV !== 'production'

const web3Watcher = Web3Watcher() // ADD potential option

export default class VueEthereum {
  constructor (options = {}) {
    const defaults = {
      accessorName: '$veth',
      // Vuex Options
      useVuex: false
      // vuexModuleName: 'veth',
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
          isConnected () {
            return this.web3State && this.web3State.isConnected
          },
          balance () {
            return account => this.balanceOf[account]
          }
        },
        watch: {
          web3State: function (val, oldVal) {
            console.log('web3 state has changed: %s, old: %s', val, oldVal)
            this.accounts = web3Watcher.accounts
            this.networkId = web3Watcher.networkId
            this.walletType = web3Watcher.walletType
          }
        },
        methods: {
          saveWeb3State (s) {
            this.web3State = s
          },
          setStateHook () {
            web3Watcher.setStateHook(this.saveWeb3State)
          },
          async getBalance (account) {
            Vue.set(this.balanceOf, account, await web3Watcher.getBalance(account))
          }
        }
      })
    }

    this.initialized = true
  }

  async on () {
    web3Watcher.setStateHook(this.stateHandler.saveWeb3State)
    web3Watcher.init()
    // this.stateHandler.accounts = await web3Watcher.getAccounts()
    // this.stateHandler.networkId = await web3Watcher.getId()
    // this.stateHandler.walletType = await web3Watcher.getWalletType()
  }

  off () {
    this.stateHandler.saveWeb3State(null)
    this.stateHandler.accounts = []
    this.stateHandler.networkId = null
    this.stateHandler.walletType = null
  }

  /* helpers */

  get isConnected () {
    return this.stateHandler.isConnected
  }

  get networkId () {
    return this.stateHandler.networkId
  }

  get walletType () {
    return this.stateHandler.walletType
  }

  get accounts () {
    return this.stateHandler.accounts
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
      const { veth, store, parent } = this.$options

      let instance = null
      if (veth) {
        instance = typeof veth === 'function' ? new veth() : veth // eslint-disable-line new-cap
        // Inject store
        instance.init(Vue, store)
      } else if (parent && parent.__$vethInstance) {
        instance = parent.__$vethInstance
        instance.init(Vue, parent.$store)
      }

      if (instance) {
        // Store helper for internal use
        this.__$vethInstance = instance
        this[instance.options.accessorName] = instance
      }
    }
  })

  install.installed = true
}

VueEthereum.install = install
