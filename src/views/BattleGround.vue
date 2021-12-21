<template>
  <div class="rules">
    <v-container>
    <v-col
        class="mb-5"
        cols="12"
      >
        <h2 class="headline font-weight-bold mb-6">
          Battle Ground: Feature Under Construction !!!
        </h2>

        <v-row class="text-left">
         <v-card class="mx-auto my-6" max-width="35%" light>
            <v-card-title>Intiator: {{this.$store.state.initiatorNFT.name}}</v-card-title>
            <v-card-subtitle>{{this.$store.state.initiatorNFT.mint}} </v-card-subtitle>
            <v-card-text>
            <v-img :src="this.$store.state.initiatorNFT.image"></v-img>
            <v-card class="ma-1 mt-3" dark>
                <v-card-text>
                    <h3>Name: {{this.$store.state.initiatorNFT.name}}</h3>
                    <p>Age: {{this.$store.state.initiatorNFT.age}}</p>
                    <p>Game Points: 0</p>
                    <p>Magic Points: 0</p>
                    <p>Drabs: 0</p>
                    <p>Description: {{this.$store.state.initiatorNFT.description}}</p>
                </v-card-text>
            </v-card>    
                </v-card-text>
         </v-card>
         <!-- Battle Matchup -->
         <v-card class="mx-1 my-16 text-center pb-3" max-width="20%" max-height="400px" light>
            <v-card-title><h1 class="mx-auto my-12">VS.</h1></v-card-title>
            <v-card-text>
                <h3>Battle Matchup</h3>
                <br>
                <h4>Age Differential</h4>
                <h4>Game Points Differential</h4>
                <h4>Magic Points Differential</h4>
                <h4>Drab Differential</h4>
            </v-card-text>

         </v-card>
         <v-card class="mx-auto my-6" max-width="35%" dark>
            <v-card-title>Challenger: {{this.$store.state.challengerNFT.name}}</v-card-title>
            <v-card-subtitle>{{this.$store.state.challengerNFT.mint}} </v-card-subtitle>
            <v-card-text>
            <v-img :src="this.$store.state.challengerNFT.image"></v-img>
            <v-card class="ma-1 mt-3" light>
                <v-card-text>
                    <h3>Name: {{this.$store.state.challengerNFT.name}}</h3>
                    <p>Age: {{this.$store.state.challengerNFT.age}}</p>
                    <p>Game Points: 0</p>
                    <p>Magic Points: 0</p>
                    <p>Drabs: 0</p>
                    <p>Description: {{this.$store.state.challengerNFT.description}}</p>
                </v-card-text>
            </v-card>    
            </v-card-text>
         </v-card>
        </v-row>
        
      </v-col>
  </v-container>
  </div>
</template>