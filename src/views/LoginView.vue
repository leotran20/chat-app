<script setup>
import {computed, ref} from 'vue';
import {useRouter} from 'vue-router';
import useVuelidate from '@vuelidate/core';
import {email, required} from '@vuelidate/validators';
import FormFieldControl from '@/components/FormFieldControl.vue';
import {useUserStore} from '@/stores/UserStore.js';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';

const username = ref('');
const password = ref('');
const router = useRouter();
const userStore = useUserStore();

const v$ = useVuelidate({
  username: {required, email},
  password: {required},
}, {username, password});

const loading = computed(() => userStore.loading);

const submit = async () => {
  const valid = await v$.value.$validate();
  if (valid) {
    userStore.login({username: username.value, password: password.value},
        async () => {
          await router.push('/');
        });
  }
};
</script>

<template>
  <div class="login p-4">
    <div class="card flex-col w-full md:w-8/12 lg:w-5/12">
      <h1 class="font-bold">Login</h1>
      <form @submit.prevent="submit" class="flex flex-col w-full">
        <FormFieldControl :formField="v$.username" class="flex flex-col mb-4">
          <label for="username">Username</label>
          <input type="text" id="username" v-model="username" class="form-control"/>
        </FormFieldControl>

        <FormFieldControl :formField="v$.password" class="flex flex-col mb-4">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" class="form-control"/>
        </FormFieldControl>

        <button type="submit" :disabled="loading">
          <font-awesome-icon v-if="loading" :icon="['fas', 'spinner']" spin-pulse/>
          <span v-else>Login</span>
        </button>

        <div class="flex justify-center">
          <a href="#" class="text-pink-400 hover:underline">Forgot password</a>
        </div>
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
  background: var(--background-color);
}

h1 {
  padding: 0;
  margin: 0;
  font-size: 2rem;
  text-align: center;
  color: var(--text-color);
}

label {
  color: var(--text-color);
}

.card {
  height: fit-content;
}

input {
  border-radius: 0.25rem;
  padding: 0.3rem;
  border: 1px solid #d1d5db;
  line-height: 1.5;
  font-size: 1rem;
  color: var(--text-color);
}

button {
  padding: 0.5rem 1rem;
  background-color: var(--primary-color);
  color: #ffffff;
  border: none;
  border-radius: 0.25rem;
  font-weight: bold;
}

button:disabled {
  background-color: #d1d5db;
  color: #6b7280;
}

</style>
