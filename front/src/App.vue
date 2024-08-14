<template>
  <nav>
    <router-link :to="{ name: 'home' }">Home</router-link> |
    <router-link :to="{ name: 'signin' }">Signin</router-link> |
    <router-link :to="{ name: 'login' }">Login</router-link>
  </nav>
  <router-view/>
</template>

<style lang="scss">
@import "../src/scss/variables.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: $green_vue;
    }
  }
}
</style>
