<script setup lang="ts">
import { ref } from 'vue'
const emits = defineEmits(['microphone', 'camera'])

const props = withDefaults(defineProps<{
  isAudio?: boolean
  isVideo?: boolean
}>(), {
  isAudio: true,
  isVideo: true,
})

function microphone() {
  emits('microphone')
}

function camera() {
  emits('camera')
}
</script>

<template>
  <div class="container">
    <div class="microphone">
      <div v-if="props.isAudio" class="i-carbon-microphone ma hover:i-carbon-microphone-off" @click="microphone" />
      <div v-else class="i-carbon-microphone-off ma hover:i-carbon-microphone" @click="microphone" />
      麦克风
    </div>
    <div class="camera">
      <div v-if="props.isVideo" class="i-carbon-video ma hover:i-carbon-video-off" @click="camera" />
      <div v-else class="i-carbon-video-off ma hover:i-carbon-video" @click="camera" />
      摄像头
    </div>
  </div>
</template>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 1fr;
  grid-auto-columns: 1fr;
  gap: 0px 0px;
  text-align: center;
  grid-auto-flow: row;
  grid-template-areas:
    "microphone camera";
}

.microphone { grid-area: microphone; }

.camera { grid-area: camera; }

</style>
