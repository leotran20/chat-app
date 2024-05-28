<script setup>
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import {useUserStore} from '@/stores/UserStore.js';
import {computed, watch} from 'vue';
import {useRouter} from 'vue-router';

const userStore = useUserStore();
const router = useRouter();

const currentUser = computed(() => userStore.user);
watch(() => currentUser, () => console.log(currentUser));

const logout = () => {
  router.push('/login');
  userStore.logout();
}
</script>

<template>
  <nav class="navbar bg-gray-800 flex justify-between items-center text-white">
    <div class="flex items-center">
      <img src="@/assets/vue.svg" alt="logo" class="w-10 h-10"/>
      <h1 class="ml-2">Vue 3</h1>
    </div>
    <div class="font-bold gap-6 flex">
      <router-link to="/messages">Messages</router-link>
      <router-link to="/about">About</router-link>
    </div>
    <div class="user-info flex flex-row items-center gap-2">
      <img v-if="currentUser?.avatar" class="h-9 w-9 rounded" alt="{{currentUser.name}}" :src="currentUser.avatar"/>
      <font-awesome-icon v-else icon="user"/>
      <p>{{currentUser?.name}}</p>

      <a @click="logout" class="cursor-pointer text-pink-400 hover:underline">Logout</a>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  padding: 0 2rem;
  width: 100%;
  min-height: 50px;
  backdrop-filter: opacity(.5);
}
</style>
