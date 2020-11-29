<template>
  <v-footer
    :absolute="!fixed"
    app
  >
    <span>&copy; Created by Alex Pilugin. November 2020.</span>
  </v-footer>
</template>

<script>
export default {
  name: 'BottomFooter', // for debugging in Vue-DevTools
  props: {
    fixed: {
      type: Boolean,
      default: false,
      required: false
    }
  }
}
</script>
