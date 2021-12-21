import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ownerAddress: 'no current user',
    network: 'devnet',
    networkChoices: [
      'devnet',
      'testnet',
      'mainnet-beta',
    ],
    initiatorNFT: {
      name: '',
      mint: 'Please Choose Initiator NFT',
      image: 'https://gateway.pinata.cloud/ipfs/QmW5JjSHfXvrdHxAYoeKK3hCvaGSYWBDJ2Pz5XJPovfUtc',
      description: ''
    },
    challengerNFT: {
      name: '',
      mint: 'Please Elect Challenger',
      image: 'https://gateway.pinata.cloud/ipfs/QmW5JjSHfXvrdHxAYoeKK3hCvaGSYWBDJ2Pz5XJPovfUtc',
      description: ''
    },
    initiatorNFTaddress: 'Please Choose Initiator NFT',
    challengerNFTaddress: 'Please Elect Challenger'
  },
  mutations: {
    updateNetwork (state, network) {
      state.network = network
    }
  },
  actions: {
  },
  modules: {
  }
})
