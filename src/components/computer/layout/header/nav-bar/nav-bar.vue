<script setup lang="ts">
import Avatar from '~/components/avatar/avatar.vue'
import DeviceDetection from '~/components/device-detection/device-detection.vue'
import NetworkQuality from '~/components/network-quality/network-quality.vue'

const props = withDefaults(defineProps<{
  avatarText?: string
}>(), {
  avatarText: 'Elone Hoo',
})
</script>

<template>
  <device-detection />

  <div class="nav-bar">
    <div class="container">
      <div class="flex justify-start items-center grow-1">
        <nav>
          <avatar :text="props.avatarText.substring(0,1)" color="primary" />
        </nav>
        <nav>{{ props.avatarText }}</nav>
      </div>
      <div class="flex justify-end items-center grow-1">
        <nav>
          <network-quality />
        </nav>
      </div>
    </div>
  </div>
</template>

<style scoped>
.nav-bar {
  position: relative;
  border-bottom: 1px solid var(--video-c-divider-light);
  padding: 0 8px 0 24px;
  height: var(--video-nav-height-mobile);
  transition: border-color .5s,background-color .5s
}

@media (min-width: 768px) {
  .nav-bar {
    padding:0 32px
  }
}

@media (min-width: 960px) {
  .nav-bar {
    height:var(--video-nav-height-desktop);
    border-bottom: 0
  }

  .nav-bar {
    margin-right: -32px;
    padding-right: 32px;
    -webkit-backdrop-filter: saturate(50%) blur(8px);
    backdrop-filter: saturate(50%) blur(8px);
    background: rgba(255,255,255,.7)
  }

  @supports not (backdrop-filter: saturate(50%) blur(8px)) {
    .nav-bar {
      background:rgba(255,255,255,.95)
    }

  }

}

.container {
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
}
</style>
