
export const NETWORKS = {
  1: {
    name: 'Eth - Main Net',
    unit: 'ETH',
    isTest: false,
    hasExplorer: true,
    defaultGasPrice: 1,
    explorer: {
      root: 'https://etherscan.io/',
      address: 'address/',
      tx: 'tx/'
    }
  },
  2: {
    name: 'Eth - Deprecated Morden test network',
    unit: 'ETH',
    isTest: true,
    hasExplorer: false
  },
  3: {
    name: 'Eth - Ropsten test network',
    unit: 'ETH',
    isTest: true,
    hasExplorer: true,
    defaultGasPrice: 1,
    explorer: {
      root: 'https://ropsten.etherscan.io/',
      address: 'address/',
      tx: 'tx/'
    }
  },
  4: {
    name: 'Eth - Rinkeby test network',
    unit: 'ETH',
    isTest: true,
    hasExplorer: false
  },
  42: {
    name: 'Eth - Kovan test network',
    unit: 'ETH',
    isTest: true,
    hasExplorer: false
  },
  66: {
    name: 'Aldwych network',
    unit: 'ETH',
    isTest: true,
    hasExplorer: true,
    defaultGasPrice: 1,
    explorer: {
      root: 'https://explorer.aldwych.blaquetec.org/',
      address: 'account/',
      tx: 'tx/'
    }
  },
  77: {
    name: 'POA - Sokol test network',
    unit: 'SPOA',
    isTest: true,
    hasExplorer: true,
    defaultGasPrice: 1,
    explorer: {
      root: 'https://sokol-explorer.poa.network/',
      address: 'account/',
      tx: 'tx/'
    }
  },
  99: {
    name: 'POA - Main Net',
    unit: 'POA',
    isTest: false,
    hasExplorer: true,
    defaultGasPrice: 1,
    explorer: {
      root: 'https://sokol-explorer.poa.network/',
      address: 'account/',
      tx: 'tx/'
    }
  },
  4447: {
    name: 'Eth - Truffle Develop Network',
    unit: 'ETH',
    isTest: true,
    hasExplorer: false
  },
  5777: {
    name: 'Eth - Ganache Blockchain',
    unit: 'ETH',
    isTest: true,
    hasExplorer: false
  }
}
