<script setup>

import ConversationList from '@/components/ConversationList.vue';
import {useHttp} from '@/hooks/useHttp.js';
import {convertUserDataList} from '@/helper/index.js';
import {onMounted, ref} from 'vue';
import ChatWindow from '@/components/ChatWindow.vue';

const http = useHttp();

const conversations = ref([]);
const selected = ref(null);

const fetchData = () => {
  const {loading, onSuccess} = http({url: 'https://randomuser.me/api/?results=11'});
  onSuccess((response) => {
    conversations.value = convertUserDataList(response);
  });

  return {loading};
};

let {loading} = fetchData();

const onSelectConversation = (item) => {
  selected.value = item;
};


</script>

<template>
  <div class="border grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 overflow-y-hidden">
    <div class="left-panel border-r">
      <ConversationList :data="conversations" :loading="loading" @onSelect="onSelectConversation"/>
    </div>
    <div class="main-panel height-fit-screen col-span1 md:col-span-2 lg:col-span-4">
      <ChatWindow class="h-full" :user="selected"></ChatWindow>
    </div>
  </div>
</template>

<style scoped>

</style>
