<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/the-game-banner.png')"
          class="my-3"
          contain
          height="200"
        />
      </v-col>

      <v-col class="mb-2">
        <h1 class="display-2 font-weight-bold mb-3">
          Welcome to </h1>
          <h1 class="display-2 font-weight-bold mb-3">the-pre-game
        </h1>

        <p class="mt-4 subheading font-weight-regular">
          A new type of game play that allows you to bring your own player.
        </p>
        <p class="mt-4 subheading font-weight-regular">
          Will you choose Love, Strength or Magic?
        </p>
        <v-row justify="center">
          <h1 class="mb-3" >♥ + - ?</h1>
        </v-row>
        <v-row justify="center">
          <v-btn @click="getOwnerAddress" v-show="$store.state.ownerAddress == 'nothing'">Login</v-btn>
          <p v-show="$store.state.ownerAddress !== 'nothing'">Welcome <br> <strong>{{$store.state.ownerAddress}}</strong> <br> You have signing authority for a valid Solana wallet.</p>
        </v-row>
      </v-col>

      <v-col
        class="mb-5"
        cols="12"
      >
        <h2 class="headline font-weight-bold mb-6">
          How to prepare:
        </h2>

        <v-row justify="center">
          <v-btn
            v-for="(next, i) in whatsNext"
            :key="i"
            :href="next.href"
            class="subheading mx-3 mb-4 font-weight-white"
            color="#c00000"
            target="_blank"
            dark
          >
            {{ next.text }}
          </v-btn>
          
        </v-row>
        
      </v-col>

      

    </v-row>
  </v-container>
</template>

<script>

  import * as solanaWeb3 from '@solana/web3.js';
  export default {
    name: 'WelcomePage',

    data: () => ({
      ownerAddress: '',
      whatsNext: [
        {
          text: 'Visit Solana',
          href: 'https://solana.com',
        },
        {
          text: 'Setup a Wallet',
          href: 'https://phantom.app/',
        },
        {
          text: 'Get an NFT to play',
          href: 'https://solsea.io/collection/616eee186c530ec596bb1027',
        },
      ]
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
      }
    }
  }
</script>
