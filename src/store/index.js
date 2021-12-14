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
    ]
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
