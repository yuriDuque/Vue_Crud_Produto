<template>
  <div id="app">
    <Index />
    <div class="d-flex justify-content-center">
      <a href="https://vuejs.org/">
        <img alt="Vue logo" src="./assets/logo.png" style="width: 60px" />
      </a>
      <a href="https://vuex.vuejs.org/">
        <img alt="Vuex logo" src="./assets/vuexlogo.png" class="ml-3" style="width: 65px" />
      </a>
      <a href="https://vuelidate.js.org/#getting-started">
        <img alt="Vuex logo" src="./assets/vue_validate.svg" class="ml-3" style="width: 65px" />
      </a>
      <a href="https://getbootstrap.com.br/docs/4.1/getting-started/introduction/">
        <img
          alt="Bootstrap logo"
          src="./assets/logobootstrap-4.svg"
          class="ml-3"
          style="width: 55px"
        />
      </a>
    </div>
  </div>
</template>

<script>
import Index from "./view/Index";

export default {
  name: "app",
  components: {
    Index
  }
};
</script>

<style>
#app {
  /* font-family: "Avenir", Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 10px;
  font-family: "Montserrat", Helvetica, Arial, sans-serif;
}
</style>
