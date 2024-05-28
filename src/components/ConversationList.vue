<script setup>
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import {ref} from 'vue';

const props = defineProps({
  data: Array,
  loading: Boolean,
});

const selected = ref(null);
const emit = defineEmits(['onSelect'])

const selectConversation = (user) => {
  selected.value = user;
  emit('onSelect', user);
};


</script>

<template>
  <div v-if="loading" class="flex bg-gradient-to-b h-full items-center justify-center">
    <font-awesome-icon class="text-white text-6xl" :icon="['fas', 'spinner']" spin-pulse/>
  </div>
  <ul v-else class="conversation-list height-fit-screen overflow-y-auto">
    <li v-for="user of props.data ?? []" :key="user.id" :class="{'bg-pink-500': selected === user}">
      <a class="flex flex-row border-b p-2 cursor-pointer hover:bg-pink-400" @click.prevent="selectConversation(user)">
        <div class="avatar flex p-2 min-w-16 w-fit items-center">
          <img class="w-12 h-12 rounded-3xl" :src="user.avatar" alt="avatar"/>
        </div>
        <div class="msg w-full px-4 flex flex-col justify-around">
          <div class="metadata inline-flex justify-between w-full items-center">
            <p class="text-white font-medium">{{ user.name }}</p>
            <p class="text-sm text-end text-gray-400 whitespace-nowrap">{{user.registered}}</p>
          </div>
          <p class="text-white pb-0">Lorem ipsum dolor sit amet, </p>
        </div>
      </a>
    </li>
  </ul>
</template>

<style scoped>
</style>
