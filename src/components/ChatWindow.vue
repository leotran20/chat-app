<script setup>
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import {nextTick, onMounted, ref, watch} from 'vue';
import {useUserStore} from '@/stores/UserStore.js';
import moment from 'moment';

const props = defineProps({
  user: Object,
});

const userStore = useUserStore();
const msg = ref(null);
const messageList = ref(null);

const sendMessage = () => {
  if (!msg.value) return;
  if (!props.user.conversation) {
    props.user.conversation = [];
  }
  props.user?.conversation.push({
    sender: userStore.user.id,
    message: msg.value,
    time: new Date(),
  });
  msg.value = null;
  scrollToBottom();
};

const scrollToBottom = () => {
  if (!messageList.value) return;
  nextTick(() => {
    messageList.value.scrollTop = messageList.value.scrollHeight;
  });
};

watch(() => props.user, () => {

  scrollToBottom();

});


</script>

<template>
  <div class="w-full h-full p-5">
    <div class="border rounded overflow-hidden h-full flex flex-col items-stretch">
      <template v-if="props?.user">
        <div class="chat-header border-b h-12 min-h-12 bg-gray-600 flex items-center px-4 gap-2">
          <img class="h-10 w-10 rounded-3xl" :alt="props.user?.name" :src="props.user?.avatar"/>
          <h1 class="text-white text-xl">{{ props.user?.name }}</h1>
        </div>
        <div ref="messageList" class="chat-body flex flex-grow overflow-y-auto scroll-smooth">
          <ul class="w-full p-3">
            <li v-for="message of props.user?.conversation" :key="message" class="flex items-end flex-col my-1">
              <span class="text-sm text-gray-400 mx-2">{{ moment(message.time).format('HH:mm D/M') }}</span>
              <div class="bg-pink-500 text-white p-2 rounded-lg mx-2 mb-2">
                {{ message.message }}
              </div>
            </li>
          </ul>
        </div>
        <div class="chat-input flex bg-gray-600 h-14 min-h-14 border-t p-1">
          <input v-model="msg" type="text" class="w-full h-full px-4 rounded-l outline-none" @keyup.enter="sendMessage"
                 placeholder="Type a message..."/>
          <button class="bg-pink-500 text-white px-4 rounded-r outline-none" @click="sendMessage">
            <font-awesome-icon :icon="['fas', 'paper-plane']"/>
          </button>
        </div>
      </template>
      <div v-else class="text-3xl text-white flex items-center justify-center h-full">
        No item selected
      </div>
    </div>

  </div>
</template>

<style scoped>

</style>
