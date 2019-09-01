
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
  veth: new VueEthereum(),
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
All features can be obtained from $veth property in Vue components.

#### `.on()`

Connect to current window provider

**work in progress for beta version, please see example in `examples/vue-example`**.


## Examples

Use `npm run dev-vue` to run the example locally.


## Licensed under MIT