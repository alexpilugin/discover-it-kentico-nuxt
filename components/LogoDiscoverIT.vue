<template>
  <v-tooltip bottom>
    <template #activator="{ on }">
      <img
        class="logo-discover-it"
        alt="Discover IT Logo"
        src="/discover-it-logo.svg"
        v-on="on"
      >
    </template>
    <span>{{ title }}</span>
  </v-tooltip>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Logo', // for debugging in Vue-DevTools
  computed: {
    ...mapState({
      title: state => state.store.appTitle
    })
  }
}
</script>

<style>
.logo-discover-it {
  height: 36px;
  width: auto;
}
</style>
