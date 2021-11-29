<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <welcome-page msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import WelcomePage from '@/components/WelcomePage.vue'

export default {
  name: 'Home',
  components: {
    WelcomePage
  }
}
</script>
