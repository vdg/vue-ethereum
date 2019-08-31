<template>
  <div id="app">
    <h1 v-if="$veth.isConnected">Connected to {{ $veth.networkId }} <span class="animated">❤️</span></h1>
    <h1 v-else="$veth.isConnected">You are not connected to Ethereum</h1>
    <button v-if="$veth.isConnected" @click='off()'>switch off vue-ethereum</button>
    <button v-else @click='on()'>switch on vue-ethereum</button>
    <div v-if="$veth.isConnected">
      <p>Wallet type: {{ $veth.walletType }}</p>
      <h2 v-if="$veth.accounts.length">Your account<span v-if="$veth.accounts.length > 1">s</span></h2>
      <ul>
        <li v-for='account in $veth.accounts' :key='account'>
          {{ account }}<br>(balance = {{ $veth.balance(account) }})
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'vue-app',
  data() {
    return {
    }
  },
  methods: {
    on() { this.$veth.on() },
    off() { this.$veth.off() }
  }
}
</script>

<style>
  body {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 15px;
  }

  #app {
    margin: 50px auto;
    width: 500px;
    text-align: center;
  }

  button {
    border: 0;
    background-color: #fff;
    border: 2px solid #9f0fa0;
    border-radius: 4px;
    margin: 5px;
    color: #9f0fa0;
    font-size: 16px;
    padding: 8px;
  }

  button[disabled] {
    opacity: 0.4;
  }

  .animated {
    text-align: center;
    opacity: 0.5;
    animation: pulse 1s infinite;
    animation-delay: 1s;
    display: inline-block;
  }

  @-webkit-keyframes pulse {
    0%,
    100% {
      opacity: 1;
      transform: scale(1.3);
    }
    50% {
      opacity: 0.1;
      transform: scale(1);
    }
  }

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
      transform: scale(1.3);
    }
    50% {
      opacity: 0.1;
      transform: scale(1);
    }
  }
</style>
