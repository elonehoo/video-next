<script setup lang="ts">
import { ref, watch } from 'vue'
import TRTC from 'trtc-js-sdk'
import { NMessageProvider } from 'naive-ui'
import Layout from '~/components/computer/layout/layout.vue'
import Grid from '~/components/computer/layout/grid/grid.vue'
import NavBar from '~/components/computer/layout/header/nav-bar/nav-bar.vue'
import Footnote from '~/components/footnote/footnote.vue'
import Hardware from '~/components/footnote/components/hardware/hardware.vue'
import Render from '~/components/render/render.vue'
import Operate from '~/components/footnote/components/operate/operate.vue'
import { getUserSig } from '~/api/sign'
import { getUrlParam } from '~/utils/utils'
import {useFullscreen} from '@vueuse/core'

// 用户的名字
const userId = getUrlParam('userId')
// 房间号
const roomId = getUrlParam('roomId')
// 顺序位
const render = getUrlParam('render')

const userSig = ref()
// 获取用户的sig数据
getUserSig(userId).then((res) => {
  userSig.value = res
})

// 设置日志的输出
TRTC.Logger.setLogLevel(TRTC.Logger.LogLevel.WARN)

// 硬件信息
const isAudio = ref<boolean>()
const isVideo = ref<boolean>()

const client = ref()
const localStream = ref()
const remoteStream = ref()
// 监听用户的变化进行流的监测
watch(() => userSig.value, async () => {
  client.value = TRTC.createClient({
    mode: 'live',
    sdkAppId: 1400719126,
    userId,
    userSig: userSig.value,
    useStringRoomId: true,
    autoSubscribe: true,
  })

  localStream.value = TRTC.createStream({ userId, audio: true, video: true })

  client.value.on('stream-added', (event: any) => {
    const remoteStream = event.stream
    // 订阅远端流
    client.value.subscribe(remoteStream)
  })

  client.value.on('stream-subscribed', (event: any) => {
    remoteStream.value = event.stream
    // 使用 remoteStream 监听 error 的方式捕捉并处理 0x4043 错误
    remoteStream.value.on('error', (error: any) => {
      const errorCode = error.getCode()
      if (errorCode === 0x4043) {
        // PLAY_NOT_ALLOWED, 引导用户手势操作并调用 stream.resume 恢复音视频播放
        remoteStream.value.resume()
      }
    })
    // 开始播放远端流
    remoteStream.value.play(`video_${remoteStream.value.getUserId()}`)
  })

  await client.value.join({ roomId, role: 'anchor' })
  await localStream.value.initialize()
  localStream.value.play(`video_${userId}`)
  await client.value.publish(localStream.value)

  isAudio.value = localStream.value.hasAudio()
  isVideo.value = localStream.value.hasVideo()
})

// 控制硬件的麦克风
function hasMicrophone() {
  if (isAudio.value) {
    localStream.value.muteAudio()
    isAudio.value = false
  }
  else {
    localStream.value.unmuteAudio()
    isAudio.value = true
  }
}

function hasCamera() {
  if (isVideo.value) {
    localStream.value.muteVideo()
    isVideo.value = false
  }
  else {
    localStream.value.unmuteVideo()
    isVideo.value = true
  }
}

// operate
//初步规划的网页全屏方法, 基于vueuse的useFullscreen方法完成页面的全屏
const { toggle,isFullscreen } = useFullscreen()

async function shareScreen() {
  const shareStream = TRTC.createStream({audio: true, screen: true, userId})
  try {
    await shareStream.initialize();
  } catch (error:any) {
    // 当屏幕分享流初始化失败时, 提醒用户并停止后续进房发布流程
    switch (error.name) {
      case 'NotReadableError':
        // 提醒用户确保系统允许当前浏览器获取屏幕内容
        return;
      case 'NotAllowedError':
        if (error.message.includes('Permission denied by system')) {
          // 提醒用户确保系统允许当前浏览器获取屏幕内容
        } else {
          // 用户拒绝/取消屏幕分享
        }
        return;
      default:
        // 初始化屏幕分享流时遇到了未知错误，提醒用户重试
        return;
    }
  }
  const shareClient = TRTC.createClient({
    mode: 'live',
    sdkAppId: 1400719126,
    userId:userId, // 例如：‘share_teacher’
    userSig:userSig.value,
    useStringRoomId: true,
  });
// // 客户端对象进入房间
//   try {
//     await shareClient.join({ roomId });
//     // ShareClient join room success
//   } catch (error) {
//     // ShareClient join room failed
//   }

}
</script>

<template>
  <n-message-provider>
    <layout>
      <grid>
        <template #header>
          <nav-bar :avatar-text="userId" />
        </template>
        <template #main>
          <render />
        </template>
        <template #footer>
          <footnote>
            <template #hardware>
              <hardware :is-audio="isAudio" :is-video="isVideo" @microphone="hasMicrophone" @camera="hasCamera" />
            </template>
            <template #operate>
              <operate :is-fullscreen="isFullscreen" @full-screen="toggle()" @share-screen="shareScreen()"/>
            </template>
          </footnote>
        </template>
      </grid>
    </layout>
  </n-message-provider>
</template>

<style scoped>

</style>
