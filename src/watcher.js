/* global web3:true */

import Web3 from 'web3'

const Web3Watcher = () => {
  const $ = {
    provider: null,
    instance: null,
    accounts: [],
    networkId: null,
    walletType: null,
    state: { init: 0, update: 0, provider: null, isConnected: false, events: false }
  }

  let stateHook = state => { throw new Error('Web3Watcher stateHook not set') }

  $.setStateHook = fn => { stateHook = fn }

  const updateState = data => {
    $.state = { ...$.state, ...data, update: $.state.update + 1 }
    stateHook($.state)
  }

  const onAccountsChanged = accounts => {
    $.accounts = accounts
    updateState({})
  }

  const onNetworkChanged = networkId => {
    $.networkId = networkId
    updateState({})
  }

  $.init = async options => {
    if (window.ethereum) {
      try {
        $.provider = window.ethereum
        if ($.provider.isMetaMask) {
          $.state = { ...$.state, events: true }
          window.ethereum.autoRefreshOnNetworkChange = false
          window.ethereum.on('accountsChanged', onAccountsChanged)
          window.ethereum.on('networkChanged', onNetworkChanged)
        }
        $.accounts = await window.ethereum.enable()
        $.networkId = window.ethereum.networkVersion
        $.instance = new Web3(window.ethereum)
        $.state = {
          ...$.state,
          isConnected: await $.instance.eth.net.isListening()
        }
      } catch (error) {
        // console.log(error)
        $.state = { ...$.state, isConnected: false }
      }
      console.log('initializing web3 connection...', $)
      updateState({ init: $.state.init + 1 })
      $.walletType = await $.getWalletType()
      updateState({})
      return Promise.resolve($.state)
    }
    try {
      // commit('setInjected', true)
      if (window.web3.currentProvider) {
        $.instance = new Web3(web3.currentProvider)
      }
    } catch (error) {
      console.log(error)
    }
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
    // TODO find new heuristic
    if (provider.isMetaMask) {
      /* Nifty identify as Metamask */
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
