
# vue-ethereum

Vue and Nuxt plugins for easy access to Ethereum (using web3.js 1.x) (Vuex not needed)


### Installation

Install via [yarn](https://github.com/yarnpkg/yarn)

```bash
yarn add vue-ethereum
```

or npm

```bash
npm i vue-ethereum
```


### Vue plugin usage

```js
import VueEthereum from 'vue-ethereum'

Vue.use(VueEthereum)

new Vue({
  // your vue config
  eth: new VueEthereum(),
})
```

## Nuxt plugin usage

Add `vue-ethereum/nuxt` to modules section of `nuxt.config.js`

```js
{
  modules: [ 'vue-ethereum/nuxt' ]
}
```

## Global Helpers

**vue-ethereum** provides high level helpers to use in your templates.
All features can be obtained from $eth property in Vue components.

For example in a vue file:

```html
<p v-if="$eth.isConnected">
  Connected to {{ $eth.networkName }}
</p>

```
```js
export default {
  mounted () {
    this.$eth.connect();
  }
}
```

#### `.on('connected, <fn>)`
#### `.on('networkChanged, <fn>)`
#### `.on('accountsChanged', <fn>)`

Define callback functions that will be executed respectively after
a connection, a network change and an account change.

#### `.connect()`

Connect vue to the current window provider.

#### `.disconnect()`

Disconnect vue to the current window provider.

#### `.explorer(<type>,<argument>)`

Return an Url to the current network explorer depending on the <type> first argument:
* with type='address': the address page corresponding to the address <argument>
* with type='tx': the transaction page corresponding to the tx <argument>

Urls created using .explorer are automatically updated when the network is changed.

#### `.balance(<address>)`

Return the balance <address> in Ether (automatically updated when network or account is changed).

#### `.walletDetected`

Return true if a wallet has been detected.

#### `.walletType`

Return a description string of the current wallet detected (if possible). Example: 'MetaMask (or compatible)'

#### `.isConnected`

Return true if a wallet has been detected.

#### `.selectedAddress`

Return the current address selected in the connected wallet.

#### `.accounts`

Return an Array of all current accounts in the connected wallet (if possible). 'selectedAddress'
is always included in this array.

#### `.networkId`

Return the Id of the current network (automatically updated when network is changed).

#### `.networkName`

Return a description string of the network detected (automatically updated when network is changed). Example: 'Ropsten'.

#### `.isTestNetwork`

Return true if the current network is a test network (automatically updated when network is changed).

#### `.web3`

Get a web3.js Javascript instance with the current connected provider. Please check
[web3.js (1.x)](https://web3js.readthedocs.io/en/v1.2.1/) documentation to use this handler.

#### `.error`

Return the last error string from RPC connection.


**work in progress for beta version, please see example in `examples/vue-example`**.


## Examples

Use `npm run dev-vue` to run a simple example locally.

### Other repositories using vue-ethereum

* [RGE testnet faucet](https://github.com/TheRougeProject/rge-faucet)


## Licensed under MIT
