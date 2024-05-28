<script setup>
defineProps({
  formField: Object,
});
</script>

<template>
  <div :class="{ 'error': formField?.$errors?.length }">
    <slot></slot>
    <div class="input-errors" v-for="error of formField?.$errors ?? []" :key="error.$uid">
      <div class="text-red-600 text-sm">{{ error.$message }}</div>
    </div>
  </div>
</template>

<style scoped>
.error :deep(.form-control) {
  border: 1px solid rgb(220 38 38);
}
</style>
