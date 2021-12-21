<template>
    <v-container>
        <v-row>
            <v-col cols="12" sm="6">
                <v-card v-show="!validSolanaAddress">
                    <v-card-text>
                        <h2 >Input Valid Solana Address</h2>
                    </v-card-text>
                    <v-card-text>
                        <v-col cols="12">
                        <v-text-field 
                            v-model="solanaLookupAccount" 
                            :rules="[rules.required, rules.counter]"
                            width="100%"
                            auto-grow
                            rows="2"
                            row-height="20"
                            ></v-text-field>
                        </v-col>
                    </v-card-text>
                    <v-card-actions>
                        <!-- <v-btn
                            class="white--text"
                            color="teal"
                            @click="overlay = false"
                            >
                            Cancel
                        </v-btn> -->
                        <v-spacer></v-spacer>
                    
                        <v-btn
                            class="white--text"
                            color="red"
                            @click="checkSolanaAddress"
                            v-show="!validSolanaAddress"
                            >
                            Check Addr
                        </v-btn>
                    </v-card-actions>
                </v-card>
                <v-card v-show="validSolanaAddress">
                    <v-card-text>
                        <h2 v-show="!validSolanaAddress">Account Information:</h2>
                    </v-card-text>
                    <v-card-text>
                        <h2 class="green--text float-left" ><v-icon>mdi-check</v-icon> Valid Solana Address</h2>
                        {{solanaLookupAccount}}  <v-btn class="white--text ml-2" color="purple" v-show="validSolanaAddress" @click="reset"  >Reset</v-btn>
                    </v-card-text>
                   
                </v-card>
            </v-col>
        </v-row>
        <v-row dense>
                <v-card v-for="nft in nftmetadata" :key="nft.index" class="mx-auto my-12" width="420px" dark>
                    <v-card-title>{{nft.nft.data.name}}</v-card-title>
                    <v-card-text>
                    <v-img :src="nft.res.data.image"></v-img>
                        </v-card-text>
                    <v-card-actions>
                    <v-btn color="blue" dark @click="reveal = !reveal"><v-icon>{{ reveal ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon></v-btn>    
                    <v-spacer></v-spacer>  

                    <v-btn color="#c00000" @click="addChallengerNFT(nft.nft.mint,nft.nft.data.name,nft.res.data.image,nft.res.data.description)">Challenge</v-btn>
                    
                    </v-card-actions>
                    <v-expand-transition>
                        <v-card
                        v-show="reveal"
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
        </v-row>
    </v-container>      
        
     
</template>   


<script>

  import { clusterApiUrl, solanaWeb3 } from "@solana/web3.js";
//   import { Connection, clusterApiUrl, LAMPORTS_PER_SOL } from "@solana/web3.js";
  import { getParsedNftAccountsByOwner,isValidSolanaAddress, createConnectionConfig,} from "@nfteyez/sol-rayz";
  import axios from "axios";

  export default {
    data: () => ({
      validSolanaAddress: false,
      overlay: false,
      zIndex: 0,
      reveal: false,
      solanaLookupAccount: '',
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
        reset () {
            this.solanaLookupAccount = '';
            this.nfts = {};
            this.nftmetadata = [];
            this.validSolanaAddress = false;
        },
        async checkSolanaAddress () {
            try {
                const result = isValidSolanaAddress(this.solanaLookupAccount);
                console.log("result", result);
                if (result === true) {
                    this.getAllNftData();
                    this.validSolanaAddress = true;
                } else {
                    this.validSolanaAddress = false;
                }
            } catch (error) {
                this.validSolanaAddress = false
                console.log(error);
            }
          console.log('checkTransferAddress')
        },
        async getAllNftData () {
            try {
                const connect =    createConnectionConfig(clusterApiUrl(this.$store.state.network));
                let ownerToken = this.solanaLookupAccount;
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
        addChallengerNFT (mint,name,image,description) {
          this.$store.state.challengerNFT = {
            name: name,
            mint: mint,
            image: image,
            description: description
          };

          console.log('add Challenger', this.$store.state.challengerNFT)
        },
    }
  }
</script>
