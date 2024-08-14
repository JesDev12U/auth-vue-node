<template>
<div class="form-container">
  <div :class="{'loader': true, 'hidden': !showLoader}">
    <LoaderComponent />
  </div>
  <h1>Signin</h1>
  <form>
    <label>Email</label>
    <input type="email" v-model="email"/>
    <span :class="{ 'hidden': errorEmail}">Invalid email</span>
    <label>Password</label>
    <input type="password" v-model="password"/>
    <span :class="{ 'hidden': errorPassword }">Invalid password</span>
    <input type="submit" value="Signin" :disabled="!errorEmail || !errorPassword"
    @click.prevent="handleSubmit"/>
  </form>
</div>
</template>

<script setup>
import { computed, ref } from "vue";
import check from "../services/checks/checkCredentialsSyntax";
import SigninService from "@/services/auth/SigninService";
import LoaderComponent from "@/components/LoaderComponent.vue";

let email = ref("");
let password = ref("");
let errorEmail = computed(() => check.checkEmail(email.value));
let errorPassword = computed(() => check.checkPassword(password.value));
let showLoader = ref(false);

const handleSubmit = async () => {
  const signin = new SigninService(email.value, password.value);
  showLoader.value = true;
  await signin.signin();
  showLoader.value = false;
}

</script>

<style scoped lang="scss">
@import "../scss/formContainer.scss";
@import "../scss/loaderContainer.scss";
</style>