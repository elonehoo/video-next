<script setup lang="ts">

</script>

<template>
  <header class="relative top-0 left-0 z-[var(--video-z-index-nav)] w-1/1">
    <slot name="header" />
  </header>
  <main class="flex flex-wrap justify-center flex-grow flex-shrink-0 margin-0-auto w-1/1">
    <slot name="main" />
  </main>
  <footer class="relative z-[var(--video-z-index-footer)] bg-[var(--video-c-bg)] p-32px-24px b-t-divider">
    <slot name="footer" />
  </footer>
</template>

<style scoped>
.p-32px-24px{
  padding: 32px 24px;
}
.b-t-divider{
  border-top: 1px solid var(--video-c-divider-light);
}
.margin-0-auto{
  margin: 0 auto;
}
</style>
