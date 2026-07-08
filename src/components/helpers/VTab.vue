<template>
  <div v-show="isActive" class="tab-item">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'VTab',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isActive: false
    }
  },
  mounted() {
    this.$parent.registerTab(this)
    if (this.$parent.tabs.length === 1) {
      this.isActive = true
    }
  }
}
</script>
