<script setup lang="ts">
import type { StyleValue } from 'vue'
import { computed } from 'vue'
import { getColor, isColor } from '~/utils/color'
const props = withDefaults(defineProps<{
  badge?: boolean | string | number
  badgeColor?: string
  size?: string
  src?: string
  textColor?: string
  icon?: string
  iconPack?: string
  text?: string
  color?: string
}>(), {
  badge: false,
  badgeColor: 'danger',
  size: '',
  src: '',
  textColor: 'rgb(255, 255, 255)',
  icon: 'person',
  iconPack: 'material-icons',
  text: '',
  color: 'rgb(195, 195, 195)',
})
const avatarClass = computed(() => {
  const classes: any = {}
  if (props.size !== '')
    classes[props.size] = true
  if (isColor(props.color))
    classes[`con-video-avatar-${props.color}`] = true
  return classes
})
const avatarStyle = computed(() => {
  const style: any = {
    width: /[px]/.test(props.size) ? props.size : null,
    height: /[px]/.test(props.size) ? props.size : null,
  }
  if (!isColor(props.color))
    style.background = getColor(props.color)
  return style
})
const badgeClass = computed(() => {
  const classes: any = {
    badgeNumber: (typeof props.badge != 'boolean'),
  }
  if (isColor(props.badgeColor))
    classes[`dot-count-${props.badgeColor}`] = true
  return classes
})
const badgeStyle = computed(() => {
  const style: any = {}
  if (!isColor(props.badgeColor))
    style.background = getColor(props.badgeColor)
  return style
})
const textClass = computed(() => {
  const classes: any = {
    'material-icons': !props.text,
  }
  if (isColor(props.textColor))
    classes[`video-avatar-text-${props.textColor}`] = true
  return classes
})
const textStyle = computed(() => {
  const style: StyleValue = {
    transform: '',
    color: '',
  }
  style.transform = `translate(-50%,-50%) scale(${returnScale.value})`
  if (!isColor(props.textColor))
    style.color = getColor(props.textColor)
  return style
})
const returnText: any = computed(() => {
  if (props.text.length <= 5)
    return props.text
  const exp = /\s/g
  let letras = ''
  if (exp.test(props.text)) {
    props.text.split(exp).forEach((word: string) => {
      letras += word[0].toUpperCase()
    })
  }
  else {
    letras = props.text[0].toUpperCase()
  }
  return letras.length > 5 ? letras[0] : letras
})
const returnScale = computed(() => {
  if (!props.text)
    return 1
  const lengthx = returnText.value.length
  if (lengthx <= 5 && lengthx > 1)
    return lengthx / (lengthx * 1.50)
  else
    return 1
})
</script>

<template>
  <div
    v-bind="$attrs"
    :style="avatarStyle"
    :class="avatarClass"
    class="con-video-avatar"
  >
    <div
      v-if="props.badge && props.badge> 0"
      :style="badgeStyle"
      :class="badgeClass"
      class="dot-count video-avatar--count"
    >
      {{ typeof props.badge != 'boolean' ? props.badge : null }}
    </div>
    <div v-if="props.src" class="con-img video-avatar--con-img">
      <img :src="props.src" :alt="props.text">
    </div>
    <span
      v-else
      :title="props.text"
      :style="textStyle"
      :class="[props.text ? '' : props.iconPack, props.text ? '' : props.icon, textClass]"
      translate="no"
      class="video-avatar--text notranslate"
    >
      {{ props.text ? returnText : props.iconPack == 'material-icons' ? props.icon : '' }}
    </span>
  </div>
</template>

<style scoped>
.con-video-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  position: relative;
  cursor: pointer;
  display: inline-block;
  margin: 5px;
}
.con-video-avatar.large {
  width: 50px;
  height: 50px;
}
.con-video-avatar.small {
  width: 24px;
  height: 24px;
}
.con-video-avatar.small .video-avatar-text {
  font-size: 0.9375em;
}
.video-avatar--count {
  position: absolute;
  top: 1px;
  right: 1px;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  z-index: 100;
}
.video-avatar--count.badgeNumber {
  width: auto;
  height: auto;
  top: -3px;
  right: 0px;
  border-radius: 4px;
  padding-left: 3px;
  padding-right: 3px;
  font-size: 0.625em;
  color: #fff;
}
.video-avatar--text {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.video-avatar--con-img {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 50%;
}
.video-avatar--con-img img {
  width: 100%;
}
.con-video-avatar-primary{
  background: rgba(var(--video-primary),1);
}
.dot-count-primary{
  background: rgba(var(--video-primary),1);
}
.video-avatar-text-primary{
  background: rgba(var(--video-primary),1);
}
.con-video-avatar-secondary{
  background: rgba(var(--video-secondary),1);
}
.dot-count-secondary{
  background: rgba(var(--video-secondary),1);
}
.video-avatar-text-secondary{
  background: rgba(var(--video-secondary),1);
}
.con-video-avatar-danger{
  background: rgba(var(--video-danger),1);
}
.dot-count-danger{
  background: rgba(var(--video-danger),1);
}
.video-avatar-text-danger{
  background: rgba(var(--video-danger),1);
}
.con-video-avatar-success{
  background: rgba(var(--video-success),1);
}
.dot-count-success{
  background: rgba(var(--video-success),1);
}
.video-avatar-text-success{
  background: rgba(var(--video-success),1);
}
.con-video-avatar-warning{
  background: rgba(var(--video-warning),1);
}
.dot-count-warning{
  background: rgba(var(--video-warning),1);
}
.video-avatar-text-warning{
  background: rgba(var(--video-warning),1);
}
.con-video-avatar-dark{
  background: rgba(var(--video-dark),1);
}
.dot-count-dark{
  background: rgba(var(--video-dark),1);
}
.video-avatar-text-dark{
  background: rgba(var(--video-dark),1);
}
.con-video-avatar-light{
  background: rgba(var(--video-light),1);
}
.dot-count-light{
  background: rgba(var(--video-light),1);
}
.video-avatar-text-light{
  background: rgba(var(--video-light),1);
}
</style>
