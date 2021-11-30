<template>
  <div class="rules">
    <v-container>
    <v-col
        class="mb-5"
        cols="12"
      >
        <h2 class="headline font-weight-bold mb-6">
          Your Playable NFTs: Feature Under Construction !!!
        </h2>

        <v-row class="text-left">
         <v-card v-for="nft in nfts" :key="nft.data.index" class="mx-auto my-12" max-width="374" dark>
            <v-card-title>{{nft.data.name}}</v-card-title>
            <v-card-text>
            <v-img src="../assets/game-baby.png"></v-img>
                {{nft.data.name}}
                {{nft.mint}}
                {{nft.updateAuthority}}
                </v-card-text>
         </v-card>
        </v-row>
        <v-btn @click="getAllNftData" dark>Get NFT Data</v-btn>
      </v-col>
  </v-container>
  </div>
</template>

<script>

  import { clusterApiUrl, solanaWeb3 } from "@solana/web3.js";
//   import { Connection, clusterApiUrl, LAMPORTS_PER_SOL } from "@solana/web3.js";
  import { getParsedNftAccountsByOwner,isValidSolanaAddress, createConnectionConfig,} from "@nfteyez/sol-rayz";
  import axios from "axios";

  export default {
    data: () => ({
      ownerAddress: '',
      nfts: {},
      nftmetadata: [],
      arUrl: '',
    }),
    mounted () {
        console.log(solanaWeb3);
        console.log(this.$store.state.ownerAddress);
        this.getOwnerAddress();
      
    },
    async created (){
        // const createConnection = () => {
        //     return new Connection(clusterApiUrl("devnet"));
        // };
    },
    methods: {
        async getAllNftData () {
            try {
                const connect =    createConnectionConfig(clusterApiUrl("mainnet-beta"));
                let ownerToken = this.$store.state.ownerAddress;
                const result = isValidSolanaAddress(ownerToken);
                console.log("result", result);
                const nfts = await getParsedNftAccountsByOwner({
                publicAddress: ownerToken,
                connection: connect,
                serialization: true,
                });
                console.log('nfts',nfts)
                this.nfts = nfts;
                this.getArweaveMeta();
            } catch (error) {
            console.log(error);
            }
        },
        async getArweaveMeta () {
        try {
            this.nfts.forEach(nft => axios.get(nft.data.uri).then(res => { this.nftmetadata.push({nft,res}); } ));
            console.log("metacapture",this.nftmetadata)
        } catch (err) {
            this.nfts = err
        }
        },
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
        async getProvider () {
            if ("solana" in window) {
            const provider = window.solana;
            if (provider.isPhantom) {
                return provider;
                }
            }
        },
    }
  }
</script>
