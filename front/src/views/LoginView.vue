<template>
  <div class="form-container">
    <div :class="{'loader': true, 'hidden': !showLoader}">
      <LoaderComponent />
    </div>
    <h1>Login</h1>
    <form>
      <label>Email</label>
      <input type="email" v-model="email"/>
      <span :class="{ 'hidden': errorEmail}">Invalid email</span>
      <label>Password</label>
      <input type="password" v-model="password"/>
      <span :class="{ 'hidden': errorPassword }">Invalid password</span>
      <input type="submit" value="Login" :disabled="!errorEmail || !errorPassword"
      @click.prevent="handleSubmit"/>
    </form>
  </div>
  </template>
  
  <script setup>
  import { computed, ref } from "vue";
  import check from "../services/checks/checkCredentialsSyntax";
  import LoginService from "@/services/auth/LoginService";
  import LoaderComponent from "@/components/LoaderComponent.vue";

  let email = ref("");
  let password = ref("");
  let errorEmail = computed(() => check.checkEmail(email.value));
  let errorPassword = computed(() => check.checkPassword(password.value));
  let showLoader = ref(false);

  const handleSubmit = async () => {
    const login = new LoginService(email.value, password.value);
    showLoader.value = true;
    await login.login();
    showLoader.value = false;
  }
  </script>
  
  <style scoped lang="scss">
  @import "../scss/formContainer.scss";
  @import "../scss/loaderContainer.scss";
  </style>