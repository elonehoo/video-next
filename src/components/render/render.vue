<script setup lang="ts">
import { ref } from 'vue'
import { getInfo } from '~/api/conference'
import { getUrlParam } from '~/utils/utils'

const roomId = getUrlParam('roomId')

const count = ref<number>(0)

const streamIds = ref()

getInfo(roomId).then((res) => {
  streamIds.value = res
  count.value = streamIds.value.length
})

</script>

<template>
  <div v-for="i in count" :id="`video_${streamIds[i-1]}`" class="bg-dark w-500px h-400px m-1 flex-row " />
</template>

<style scoped>

</style>
