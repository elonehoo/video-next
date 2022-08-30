<script setup lang="ts">
import { useMessage } from 'naive-ui'
import TRTC from 'trtc-js-sdk'
const message = useMessage()

TRTC.checkSystemRequirements().then((checkResult) => {
  if (checkResult.result) {
    // 支持进房
    if (!checkResult.detail.isH264DecodeSupported) {
      // 不支持拉流
      message.error('不支持获取他人的视频')
    }
    if (!checkResult.detail.isH264EncodeSupported) {
      // 不支持推流
      message.error('不支持将视频播放给他人观看')
    }
  }
  else {
    // 不支持进房
    message.error('不支持进入房间')
  }
})

</script>

<template />

<style scoped>

</style>
