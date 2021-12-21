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
        <h3>
          {{this.$store.state.initiatorNFT.name}}
        </h3>
        <v-btn color="blue" dark @click="reveal = true" v-show="!reveal">See More</v-btn>  
        <v-btn color="blue" dark @click="reveal = false" v-show="reveal">See Less</v-btn>  
        <v-row class="text-left">
         <v-card v-for="nft in nftmetadata" :key="nft.index" class="mx-auto my-12" max-width="420" dark>
            <v-card-title>{{nft.nft.data.name}}</v-card-title>
            <v-card-text>
            <v-img :src="nft.res.data.image"></v-img>
                </v-card-text>
            <v-card-actions>
              <v-btn color="purple" dark @click="overlay = !overlay">Transfer NFT</v-btn>  
              <v-spacer></v-spacer>  
              <v-btn color="#c00000" dark @click="addInitiatorNFT(nft.nft.mint,nft.nft.data.name,nft.res.data.image,nft.res.data.description)">Initiate Battle</v-btn>    
            
            </v-card-actions>
            <v-expand-transition>
            <v-card
              v-if="reveal"
              class="transition-fast-in-fast-out v-card--reveal"
            >
              <v-card-text class="pb-0">
                Token Address: {{nft.nft.mint}} <br>
                Contract Address: {{nft.nft.updateAuthority}} <br>
                <br>
                Description: {{nft.res.data.description}} <br>
              </v-card-text>
              <v-card-actions class="pt-0">
              </v-card-actions>
            </v-card>
          </v-expand-transition>    
         </v-card>
         <v-overlay
          :z-index="zIndex"
          :value="overlay"
            >
            <v-card width="100%">
              <v-card-title>Transfer Token</v-card-title>
              <v-card-text>
                  <transfer-token></transfer-token>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  class="white--text"
                  color="teal"
                  @click="overlay = false"
                >
                  Cancel
                </v-btn>
              </v-card-actions>
            </v-card>
          
        </v-overlay>
        </v-row>
      </v-col>
  </v-container>
  </div>
</template>

<script>

  import { clusterApiUrl, solanaWeb3 } from "@solana/web3.js";
//   import { Connection, clusterApiUrl, LAMPORTS_PER_SOL } from "@solana/web3.js";
  import { getParsedNftAccountsByOwner,isValidSolanaAddress, createConnectionConfig,} from "@nfteyez/sol-rayz";
  import axios from "axios";
  import TransferToken from '../components/TransferToken.vue';

  export default {
    components: {
    TransferToken
    },
    data: () => ({
      validTransferAddress: false,
      overlay: false,
      zIndex: 0,
      reveal: false,
      transferDestinationAccount: '',
      ownerAddress: '',
      nfts: {},
      nftmetadata: [],
      arUrl: '',
      rules: {
          required: value => !!value || 'Required.',
          counter: value => value.length == 44 || 'Must be a Valid Solana Address',
        },
    }),
    mounted () {
        console.log(solanaWeb3);
        console.log(this.$store.state.ownerAddress);
    },
    created (){
       this.getAllNftData();
    },
    methods: {
        async getAllNftData () {
            try {
                const connect =    createConnectionConfig(clusterApiUrl(this.$store.state.network));
                let ownerToken = this.$store.state.ownerAddress;
                const result = isValidSolanaAddress(ownerToken);
                console.log("result", result);
                const nfts = await getParsedNftAccountsByOwner({
                publicAddress: ownerToken,
                connection: connect,
                serialization: true,
                });
                // console.log('nfts',nfts)
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
        addInitiatorNFT (mint,name,image,description) {
          this.$store.state.initiatorNFT = {
            name: name,
            mint: mint,
            image: image,
            description: description
          };

          console.log('add Initiator', this.$store.state.initiatorNFT)
        },
        async checkTransferAddress () {
          console.log('checkTransferAddress')
        }
    }
  }
</script>
