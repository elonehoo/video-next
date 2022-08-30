<script setup lang="ts">
const emits = defineEmits(['full-screen','share-screen'])
const props = withDefaults(defineProps<{
  isFullscreen?:boolean
}>(), {
  isFullscreen: false
})

function fullScreen(){
  emits('full-screen')
}

function shareScreen(){
  emits('share-screen')
}
</script>

<template>
  <div class="container">
    <div class="share-screen">
      <div @click="shareScreen" class="i-carbon-screen ma"/>
      共享屏幕
    </div>
    <div class="record">
      <div  class="i-carbon-recording ma"/>
      录制
    </div>
    <div class="full-screen">
      <div v-if="isFullscreen" class="i-carbon-minimize ma" @click="fullScreen" />
      <div v-else class="i-carbon-maximize ma" @click="fullScreen" />
      {{isFullscreen ? '还原' : '全屏'  }}
    </div>
    <div class="member-management">
      <div class="i-carbon-user-multiple ma" />
      成员管理
    </div>
    <div class="chat">
      <div class="i-carbon-chat ma" />
      聊天
    </div>
  </div>
</template>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 20% 20% 20% 20% 20%;
  grid-template-rows: 1fr;
  text-align: center;
  grid-auto-columns: 1fr;
  gap: 0px 0px;
  grid-auto-flow: row;
  grid-template-areas:
    "share-screen record full-screen member-management chat";
}

.share-screen {
  grid-area: share-screen;
}

.record {
  grid-area: record;
}

.full-screen {
  grid-area: full-screen;
}

.member-management {
  grid-area: member-management;
}

.chat {
  grid-area: chat;
}

</style>