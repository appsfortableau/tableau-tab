<template>
  <div class="dialog" v-if="value === true">
    <div class="dialog-header">
      <div class="dialog-title" v-text="title"></div>

      <button @click.prevent="$emit('input', !value)" class="dialog-exit">
        <svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          stroke="currentColor"
          stroke-width="2"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>

    <div class="dialog-content">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "Dialog",
  props: {
    value: { type: Boolean, default: false },
    title: { type: String }
    // center: { type: Boolean, default: false }
  },
  data: () => ({
    dialogVisible: false
  })
};
</script>
<style lang="scss">
.dialog {
  position: absolute;
  min-width: 320px;
  z-index: 100;
}
</style>
