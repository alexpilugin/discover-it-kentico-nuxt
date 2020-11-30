<template>
  <v-container fluid class="flex-wrap">
    <v-img
      v-for="(cafe, index) in cafes"
      :key="'cafe-' + index"
      contain
      width="100px"
      class="preview-img"
      :src="getCafeImage(index).url"
      :alt="getCafeImage(index).description"
      @click="navigate(getCafeId(index))"
    />
  </v-container>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'CafeList',
  computed: {
    ...mapState({
      cafes: state => state.store.cafes
    }),
    ...mapGetters({
      getCafeName: 'store/getCafeName',
      getCafeImage: 'store/getCafeImage',
      getCafeId: 'store/getCafeId'
    })
  },
  methods: {
    navigate (cafeId) {
      const self = this
      const route = `/cafe/${cafeId}`
      setTimeout(function () {
        // give time for animation
        self.$router.push({ path: route })
      }, 300)
    }
  }
}
</script>

<style scoped>
.preview-img {
  position: relative;
  float: left;
  margin: 3px;
  opacity: 0.7;
}
.preview-img:hover {
  cursor: pointer;
  opacity: 1.0;
  /* border: solid 5px #31373a; */
}
</style>
