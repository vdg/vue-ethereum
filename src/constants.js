
const NETWORKS = {
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
  5: {
    name: 'Eth - Görli test network',
    unit: 'ETH',
    isTest: true,
    hasExplorer: true,
    defaultGasPrice: 1,
    explorer: {
      root: 'https://goerli.etherscan.io/',
      address: 'address/',
      tx: 'tx/'
    }
  },
  42: {
    name: 'Eth - Kovan test network',
    unit: 'ETH',
    isTest: true,
    hasExplorer: false
  },
  56: {
    name: 'Bsc - Mainnet',
    unit: 'BNB',
    isTest: false,
    hasExplorer: true,
    defaultGasPrice: 1,
    explorer: {
      root: 'https://bscscan.com/',
      address: 'address/',
      tx: 'tx/'
    }    
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
  97: {
    name: 'Bsc - Testnet',
    unit: 'BNB',
    isTest: true,
    hasExplorer: true,
    defaultGasPrice: 1,
    explorer: {
      root: 'https://testnet.bscscan.com/',
      address: 'address/',
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
  100: {
    name: 'xDAI',
    unit: 'xDAI',
    isTest: false,
    hasExplorer: true,
    defaultGasPrice: 1,
    explorer: {
      root: 'https://blockscout.com/poa/xdai/',
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

export const getNetwork = networkId => NETWORKS[networkId] ? NETWORKS[networkId] : {}

export const explorer = networkId => (type, id) => {
  const explorer = getNetwork(networkId).explorer
  if (!explorer || !explorer[type]) return null
  return `${explorer.root}${explorer[type]}${id}`
}
