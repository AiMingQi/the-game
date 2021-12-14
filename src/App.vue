<template>
  <v-app>
    <v-app-bar
    app
    color="#c00000"
    dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="the-game logo"
          class="shrink mr-2"
          contain
          :src="require('./assets/logo.svg')"
          transition="scale-transition"
          width="40"
        />
      </div>
      <v-btn class="mx-3" to="/">Home</v-btn>
      <v-btn class="mx-3" to="/rules">Rules</v-btn> 
      <v-spacer></v-spacer>
      <div v-show="$store.state.ownerAddress !== 'no current user'">
      <v-btn class="mx-3" to="/nft-list">My NFTs</v-btn>
      <v-btn class="mx-3" to="/battle-ground">Battle Ground</v-btn>
      </div>
      <v-spacer></v-spacer>
      Current: {{this.$store.state.network}}
      <v-spacer></v-spacer>
      <v-btn
        href="https://www.coinbase.com/join/crumb_8"
        target="_blank"
        text
      >
        <span class="mr-2">Get Solana</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <router-view/>
    </v-main>
    <v-footer dark>
      <p>© 2021 the-game.fun </p>
      <v-spacer></v-spacer>
      <v-btn color="#c00000" dark @click="getOwnerAddress" v-show="$store.state.ownerAddress == 'no current user'">Connect Wallet</v-btn>
      <p v-show="$store.state.ownerAddress !== 'no current user'">{{$store.state.ownerAddress}}</p>
      <v-spacer></v-spacer>
      <v-select
          :items="this.$store.state.networkChoices"
          label="Change network"
          @change="setNetwork"
          v-model="network"
        ></v-select>
      <v-spacer></v-spacer>
      <p>version: <strong>the-pre-game</strong></p>
    </v-footer>
  </v-app>
</template>

<script>

  import * as solanaWeb3 from '@solana/web3.js';
  export default {
    data: () => ({
      ownerAddress: '',
      network: ''
    }),
    mounted () {
      console.log(solanaWeb3);
      console.log(this.$store.state.ownerAddress);
    },
    methods: {
      async getOwnerAddress(){
        try {
          const resp = await window.solana.connect();
          this.$store.state.ownerAddress = resp.publicKey.toString()
          console.log(resp.publicKey.toString())
          // 26qv4GCcx98RihuK3c4T6ozB3J7L6VwCuFVc7Ta2A3Uo 
        } catch (err) {
          // { code: 4001, message: 'User rejected the request.' }
        }
        // true
      },
      setNetwork () {
        this.$store.commit('updateNetwork', this.network)
      }
    }
  }
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000000;
}
.v-application a {
  color: #ffffff !important;
}

#nav {
  padding: 30px;

    a {
    font-weight: bold;
    color: #ffffff;

    &.router-link-exact-active {
      color: #ffffff;
    }
  }
}
</style>
