<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/logo.svg')"
          class="my-3"
          contain
          height="200"
        />
      </v-col>

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          Welcome to the-game
        </h1>

        <p class="mt-4 subheading font-weight-regular">
          A new type of game play that allows you to bring your own player.
        </p>
        <p class="mt-4 subheading font-weight-regular">
          Will you choose Love, Strength or Magic?
        </p>
      </v-col>

      <v-col
        class="mb-5"
        cols="12"
      >
        <h2 class="headline font-weight-bold mb-6">
          How to prepare?
        </h2>

        <v-row justify="center">
          <a
            v-for="(next, i) in whatsNext"
            :key="i"
            :href="next.href"
            class="subheading mx-3"
            target="_blank"
          >
            {{ next.text }}
          </a>
        </v-row>
      </v-col>

    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'WelcomePage',

    data: () => ({
      whatsNext: [
        {
          text: 'Get Solana',
          href: 'https://solana.com',
        },
        {
          text: 'Setup a Proper Wallet (Phantom?)',
          href: 'https://phantom.app/',
        },
        {
          text: 'Get an NFT to play with on Solsea (PonderMonster?)',
          href: 'https://solsea.io/collection/616eee186c530ec596bb1027',
        },
      ],
    }),
  }
</script>
