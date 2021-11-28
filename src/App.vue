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
      <WelcomePage/>
    </v-main>
  </v-app>
</template>

<script>
import WelcomePage from './components/WelcomePage';

export default {
  name: 'App',

  components: {
    WelcomePage,
  },

  data: () => ({
    //
  }),
};
</script>
