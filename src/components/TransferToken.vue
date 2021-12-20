<template>
    <v-container>
        <v-row>
            <v-col>
                <v-card width="100%">
                    <v-card-text>
                        <h2 v-show="!validTransferAddress">Input Valid Solana Destination Address</h2>
                    </v-card-text>
                    <v-card-text>
                        <h2 class="green--text" v-show="validTransferAddress"><v-icon>mdi-check</v-icon> Valid Address</h2>
                        <v-col cols="12">
                        <v-text-field 
                            v-model="transferDestinationAccount" 
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
                            color="purple"
                            v-show="validTransferAddress"
                            @click="submitTransaction"
                            >
                            Submit
                        </v-btn>
                    
                        <v-btn
                            class="white--text"
                            color="red"
                            @click="checkTransferAddress"
                            v-show="!validTransferAddress"
                            >
                            Check Addr
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
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
        submitTransaction () {
            this.validTransferAddress = false
          console.log('submitTransaction')
        },
        async checkTransferAddress () {
            try {
                const result = isValidSolanaAddress(this.transferDestinationAccount);
                console.log("result", result);
                if (result === true) {
                    this.validTransferAddress = true
                } else {
                    this.validTransferAddress = false
                }
            } catch (error) {
                this.validTransferAddress = false
                console.log(error);
            }
          console.log('checkTransferAddress')
        }
    }
  }
</script>
