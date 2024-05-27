<script setup>
import {ref} from 'vue';
import {useRouter} from 'vue-router';

const username = ref('');
const password = ref('');
const router = useRouter();

const login = () => {
  router.push('/');
};
</script>

<template>
  <div class="login">
    <div class="card">
      <h1>Login</h1>
      <form @submit.prevent="login">
        <label for="username">UserName</label>
        <input type="text" id="username" v-model="username"/>

        <label for="password">Password</label>
        <input type="password" id="password" v-model="password"/>

        <button type="submit">Login</button>
      </form>
    </div>

  </div>
</template>

<style scoped>

.login {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  padding-top: 5rem;
}

h1 {
  padding: 0;
  margin: 0;
  font-size: 2rem;
  text-align: center;
}

.card {
  width: fit-content;
  height: fit-content;
  flex-direction: column;
  padding-top: .7rem;
}

form {
  display: flex;
  flex-direction: column;
  min-width: 40rem;
}

input {
  margin-bottom: 1rem;
  border-radius: 0.25rem;
  padding: 0.3rem;
  border: 1px solid #d1d5db;
  line-height: 1.5;
  font-size: 1rem;
}

button {
  padding: 0.5rem 1rem;
  background-color: #42b883;
  color: #ffffff;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  font-weight: bold;
}

</style>
