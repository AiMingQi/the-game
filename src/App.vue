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
      <div justify="center">
      <router-link to="/">Home</router-link> |
      <router-link to="/rules">Rules</router-link>
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
      <router-view/>
    </v-main>
  </v-app>
</template>

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
