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
          <v-btn @click="getOwnerAddress" v-show="!ownerAddress">Login</v-btn>
          <p v-show="ownerAddress">Welcome <br> <strong>{{ownerAddress}}</strong></p>
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

      <v-col
        class="mb-5"
        cols="12"
      >
        <h2 class="headline font-weight-bold mb-6">
          The Rules:
        </h2>

        <v-row justify="left" class="text-left">
          <ol>
            <li>Players have the complete and full responsibility to audit the-game code before playing.  All client side and smart contract code is open-source and publicly available for all participants equally. Developers of the game are not responsible for the outcome of the game. <strong>Play at your own risk.</strong></li>
            <li>Only valid, unique, legally owned NFTs may play the-game.</li> 
            <li>Smart Contract and open-source Client Side logic are the Officials of the-game and CANNOT be changed or influenced during or after the-game.</li> 
            <li>Players must have valid ownership signing rights for the NFT they play.</li>
            <li>Player 1 is the game Initiator, Player 2 is the Challenger.</li>
            <li>Game Points = NFT Age (in Days since Mint) + Magic Points - Drabs </li>
            <li>1 Vote Point = 1 Game Point</li>
            <li>Each Player casts a Game Vote to determine Game Type and Outcome</li>
            <li>Game Voting:</li>
            <ul>
            <li>Players distribute their Game Votes into 3 Game Type votes plus one Outcome vote.</li>
            <li>The Game Type with the most cummulative votes will be played.</li>
            <li>Outcome is based on Same / Different Logic and uses 1 Game Point to play.</li>
              <ul>
                <li>Each Player votes Up or Down</li>
                <li>If Same -> Intiator Wins</li>
                <li>If Different -> Challenger Wins</li>
                <li>Up is the Default vote</li>
              </ul>
            </ul>
            <li>Game Types:</li>
            <ul>
              <li>Love -> The Winner receives a game-baby NFT. (A valid NFT to play in future games.)</li>
              <li>Magic -> The Winner receives 2/3rds of the total vote points value as Magic Points. The Loser receives 1/3rd of the total vote points value as Drabs.</li>
              <li>Strength -> The Winner receives ownership authority of both NFTs in the-game.</li>
            </ul>
            <li>In the event of a tie vote, Magic is the default game.</li>
            <li>NFTs with negative points values due to Drabs CANNOT play until they have reached an age to overcome their Drabs.</li>
            <li>Players are responsible for all game fees and refunds are NOT possible.</li>
            <li>NFTs receive 1 Magic Point for every completed and valid game.</li>
            <li>NFTs must have at least +1 Game Point to play.</li>
            <li>Magic Points and Drabs only exist and are functional and valuable within the-game smart contract logic and are NOT transferable, modifiable, burnable, or exchangeable.</li>
            <li>Rules are only valid for the current version of the-game as found at the-game.fun</li>
            <li>Rules are subject to change at the discretion of the-game Developers from one game version to the next.</li>
            <li><strong>Submissions are Final and CANNOT be reversed.</strong></li>
          </ol>
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
      ],
    }),
    mounted () {
      console.log(solanaWeb3);
    },
    methods: {
      async getOwnerAddress(){
        try {
          const resp = await window.solana.connect();
          this.ownerAddress = resp.publicKey.toString()
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
