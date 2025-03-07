<template>
  <el-notification
    :title="title"
    :message="message"
    :type="type"
    :duration="3000"
    position="bottom-right"
    v-if="visible"
    @close="visible = false"
  />
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  type: {
    type: String,
    default: 'info',
  },
  message: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    default: '',
  },
});

const visible = ref(true);

// Watch for changes in message to reset visibility
watch(
  () => props.message,
  () => {
    visible.value = true;
  },
);
</script>
