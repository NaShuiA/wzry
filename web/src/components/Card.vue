<template>
  <div class="card bg-white mt-3 p-3  ">
        <div class="card-header d-flex pb-3 ">
          <i class="iconfont" :class="`icon-${icon}`"> </i>
          <div class="flex-1 px-2 fs-xl">{{ title }}</div>
          <i class="iconfont icon-menu"></i>
        </div>
        <div class="card-body pt-3">
          <slot></slot>  
        </div>
    </div>
</template>

<script>
export default {
  props: {
    title: { type: String, required: true},
    icon: { type: String, required: true},
  }
}
</script>

<style lang="scss">
@import '../assets/style/_variables';
.card {
    border-bottom: 1px solid $border-color;
  .card-header {
    border-bottom: 1px solid $border-color;
  }
}
</style>

