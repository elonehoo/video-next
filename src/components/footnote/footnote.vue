<script setup lang="ts">

</script>

<template>
  <div class="container">
    <div class="hardware">
      <slot name="hardware" />
    </div>
    <div class="operate">
      <slot name="operate" />
    </div>
    <div class="quit">
      <slot name="quit" />
    </div>
  </div>
</template>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 150px 500px 150px;
  grid-template-rows: 1fr;
  gap: 0px 560px;
  grid-auto-flow: row;
  text-align: center;
  grid-template-areas:
    "hardware operate quit";
}

.hardware { grid-area: hardware; }

.operate {
  grid-area: operate;
}

.quit { grid-area: quit; }

</style>
