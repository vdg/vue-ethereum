<template>
  <div id="app">
    <h1 v-if="$eth.walletDetected">Wallet detected : {{ $eth.walletType }}</h1>
    <h1 v-if="$eth.isConnected">Connected to {{ $eth.networkName }} <span class="animated">❤️</span></h1>
    <h1 v-else-if="$eth.walletDetected">
      Your wallet is not connected to an Ethereum network
      <br>
      <span>error:{{ $eth.error }}</span>
    </h1>
    <h1 v-else>
      You are not connected to an Ethereum network
    </h1>
    <button v-if="!$eth.isConnected" @click='connect()'>connect to Ethereum</button>
    <div v-if="$eth.isConnected">
      <button @click='disconnect()'>disconnect to Ethereum</button>
      <button @click='log()'>get last logs</button>
      <p>Wallet type: {{ $eth.walletType }}</p>
      <p>This is {{ $eth.isTestNetwork ? '' : 'not' }} a test network</p>
      <h2 v-if="$eth.accounts.length">Your account<span v-if="$eth.accounts.length > 1">s</span></h2>
      <ul>
        <li v-for='account in $eth.accounts' :key='account'>
          <a :href="$eth.explorer('address', account)" target="_blank">
            {{ account }}
          </a>
          <br>(balance = {{ $eth.balance(account) }})
        </li>
      </ul>
      <h2 v-if="logs.length">Logs</h2>
      <ul v-if="logs.length">
        <li v-for='log in logs' :key='log.id'><pre>{{ log }}</pre></li>
      </ul>

    </div>
  </div>
</template>

<script>
export default {
  name: 'vue-app',
  data() {
    return {
      logs: []
    }
  },
  methods: {
    connect() {
      this.$eth.connect()
      this.$eth.on('connected', ($) => {
        console.log('connect to web3!', $)
      })
      this.$eth.on('accountsChanged', ($) => {
        console.log('account has changed!', $)
      })
      this.$eth.on('networkChanged', ($) => {
        console.log('network has changed!', $)
      })
    },
    disconnect() { this.$eth.disconnect() },
    async log() {
      this.logs = await this.$eth.web3.eth.getPastLogs({
        fromBlock: 'latest'
      })
    }
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
