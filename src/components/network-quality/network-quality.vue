<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import TRTC from 'trtc-js-sdk'
import onlyRandom from '@elonehoo/only-random'
import { getUserSig } from '~/api/sign'
import { getQuality, getUrlParam } from '~/utils/utils'

const random = onlyRandom(1, 4294967294)

const userId = getUrlParam('userId')
const userSig = ref()

getUserSig(userId).then((res) => {
  userSig.value = res
})

let uplinkClient: any = null // 用于检测上行网络质量
let downlinkClient: any = null // 用于检测下行网络质量
let localStream: any = null // 用于测试的流
const qualityResult = ref({
  // 记录上行网络质量数据
  uplinkNetworkQualities: [],
  // 记录下行网络质量数据
  downlinkNetworkQualities: [],
  average: {
    uplinkNetworkQuality: 0,
    downlinkNetworkQuality: 0,
  },
})

watch(() => userSig.value, () => {
// 1. 检测上行网络质量
  async function testUplinkNetworkQuality() {
    uplinkClient = TRTC.createClient({
      sdkAppId: 1400719126, // 填写 sdkAppId
      userId,
      userSig: userSig.value, // uplink_test 的 userSig
      mode: 'rtc',
    })

    localStream = TRTC.createStream({ audio: true, video: true })
    // 根据实际业务场景设置 video profile
    localStream.setVideoProfile('480p')
    await localStream.initialize()

    uplinkClient.on('network-quality', (event: any) => {
      const { uplinkNetworkQuality } = event
      qualityResult.value.uplinkNetworkQualities.push(uplinkNetworkQuality)
    })

    // 加入用于测试的房间，房间号需要随机，避免冲突
    await uplinkClient.join({ roomId: random() })
    await uplinkClient.publish(localStream)
  }

  // 2. 检测下行网络质量
  async function testDownlinkNetworkQuality() {
    downlinkClient = TRTC.createClient({
      sdkAppId: 1400719126, // 填写 sdkAppId
      userId: 'elone',
      userSig: 'eJwtzEELgjAYxvHvsnPI9rYpEzpoFh0KiTztZm7Wy0o3k4ii756px*f3wP9Div0peJqOxAQCShbjRm2aHmsc2dzaxszHQ9vSOdQkZpzSiEkG4fSYl8PODC6EAErppD3e-xaGDEBEHOYKXobuIWlz-Y6sPpa*8ruKF8uUKX9ufZLK7bVRa0ikzVWWbVbk*wMuyDEe', // userSig
      mode: 'rtc',
    })

    downlinkClient.on('stream-added', async (event: any) => {
      await downlinkClient.subscribe(event.stream, { audio: true, video: true })
      // 订阅成功后开始监听网络质量事件
      downlinkClient.on('network-quality', (event: any) => {
        const { downlinkNetworkQuality } = event
        qualityResult.value.downlinkNetworkQualities.push(downlinkNetworkQuality)
      })
    })
    // 加入用于测试的房间，房间号需要随机，避免冲突
    await downlinkClient.join({ roomId: 8080 })
  }

  // 3. 开始检测
  testUplinkNetworkQuality()
  testDownlinkNetworkQuality()

  // 4. 15s 后停止检测，计算平均网络质量
  setTimeout(() => {
    // 计算上行平均网络质量
    if (qualityResult.value.uplinkNetworkQualities.length > 0) {
      qualityResult.value.average.uplinkNetworkQuality = Math.ceil(
        qualityResult.value.uplinkNetworkQualities.reduce((value, current) => value + current, 0) / qualityResult.value.uplinkNetworkQualities.length,
      )
    }

    if (qualityResult.value.downlinkNetworkQualities.length > 0) {
      // 计算下行平均网络质量
      qualityResult.value.average.downlinkNetworkQuality = Math.ceil(
        qualityResult.value.downlinkNetworkQualities.reduce((value, current) => value + current, 0) / qualityResult.value.downlinkNetworkQualities.length,
      )
    }

    // 检测结束，清理相关状态。
    uplinkClient.leave()
    downlinkClient.leave()
    localStream.close()
  }, 15 * 1000)
})

</script>

<template>
  <div>{{ getQuality(qualityResult.average.uplinkNetworkQuality) }}</div>
</template>

<style scoped>

</style>
