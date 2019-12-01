
import Web3 from 'web3'

const Web3Watcher = () => {
  const $ = {
    injected: null,
    instance: null,
    accounts: [],
    networkId: null,
    walletType: null,
    state: {
      init: 0,
      update: 0,
      error: null,
      isConnected: false,
      events: false
    }
  }

  const eventHandler = {}

  let stateHook = state => { throw new Error('Web3Watcher stateHook not set') }

  $.setStateHook = fn => { stateHook = fn }

  $.on = (event, fn) => { eventHandler[event] = fn }

  const updateState = data => {
    $.state = { ...$.state, ...data, update: $.state.update + 1 }
    stateHook($.state)
  }

  const onAccountsChanged = accounts => {
    $.accounts = accounts
    updateState({})
    typeof eventHandler.accountsChanged === 'function' && eventHandler.accountsChanged($)
  }

  const onNetworkChanged = networkId => {
    $.networkId = networkId
    updateState({})
    typeof eventHandler.networkChanged === 'function' && eventHandler.networkChanged($)
  }

  $.init = async options => {
    if (window.ethereum) {
      try {
        $.injected = window.ethereum
        if ($.injected.isMetaMask) {
          $.state = { ...$.state, events: true }
          window.ethereum.autoRefreshOnNetworkChange = false
          window.ethereum.on('accountsChanged', onAccountsChanged)
          window.ethereum.on('networkChanged', onNetworkChanged)
        }
        $.accounts = await window.ethereum.enable()
        $.instance = new Web3(window.ethereum)
        $.networkId = window.ethereum.networkVersion
        $.state = {
          ...$.state,
          isConnected: await $.instance.eth.net.isListening()
        }
        updateState({ init: $.state.init + 1 })
      } catch (error) {
        $.state = { ...$.state, error: error.message, isConnected: false }
        updateState({})
      }
    } else {
      try {
        if (window.web3.currentProvider) {
          $.injected = window.web3
          $.instance = new Web3(window.web3.currentProvider)
        }
        updateState({ init: $.state.init + 1 })
      } catch (error) {
        $.state = { ...$.state, error: error.message, isConnected: false }
        updateState({})
      }
    }
    typeof eventHandler.connected === 'function' && $.state.isConnected && eventHandler.connected($)
    $.walletType = await $.getWalletType()
    if (!$.networkId) $.networkId = await $.getId()
    updateState({})
    return Promise.resolve($.state)
  }

  $.reset = () => {
  }

  $.getId = () =>
    new Promise((resolve, reject) => {
      if (!$.instance) return reject(new Error('not connected'))
      $.instance.eth.net.getId((err, networkId) => {
        if (err) {
          reject(err)
        } else {
          resolve(networkId)
        }
      })
    })

  $.getWalletType = () => new Promise((resolve, reject) => {
    if (!$.instance || !$.instance.currentProvider) return reject(new Error('can determine provider'))
    const provider = $.instance.currentProvider
    // TODO find new heuristics
    if (provider.isNiftyWallet) {
      return resolve('Nifty')
    }
    if (provider.isMetaMask) {
      /* some fork of Metamask may identify as Metamask */
      return resolve('MetaMask (or compatible)')
    }
    if (provider.isTrust) {
      return resolve('Trust')
    }
    return resolve('unknown')
  })

  $.getAccounts = () => new Promise((resolve, reject) => {
    if (!$.instance) return reject(new Error('not connected'))
    $.instance.eth.getAccounts((err, accounts) => {
      if (err) {
        reject(err)
      } else {
        resolve(accounts)
      }
    })
  })

  $.getBalance = (account) => new Promise((resolve, reject) => {
    if (!$.instance) return reject(new Error('not connected'))
    $.instance.eth.getBalance(account, (err, result) => {
      if (err) {
        reject(err)
      } else {
        const balance = $.instance.utils.fromWei(result.toString(10), 'ether')
        resolve(balance)
      }
    })
  })

  return $
}

export default Web3Watcher
