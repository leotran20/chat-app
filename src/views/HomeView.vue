<script setup>
import {useRouter} from 'vue-router';
import NavBar from '@/components/NavBar.vue';
import Wrapper from '@/components/Wrapper.vue';

</script>

<template>
  <Wrapper>
    <NavBar/>
    <div class="main-content height-fit-screen">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <KeepAlive>
            <component :is="Component"/>
          </KeepAlive>
        </transition>
      </router-view>
    </div>
  </Wrapper>
</template>

<style scoped>
</style>
