<template>
    <v-container>
        <v-row>
            <v-col>
                <transfer-token></transfer-token>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import TransferToken from '../components/TransferToken.vue';


export default {
    components: {
    TransferToken
    },
    data: () => ({
      
    }),
    mounted () {
        console.log(this.$store.state.ownerAddress);
    },
    created (){
    },
    methods: {
    }
  }

</script>

import TransferToken from '../components/TransferToken.vue';