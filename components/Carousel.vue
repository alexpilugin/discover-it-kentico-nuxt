<template>
  <v-carousel v-model="model" hide-delimiters hide-delimiter-background>
    <v-carousel-item
      v-for="(cafe, index) in cafes"
      :key="'cafe-'+index"
      :src="getCafeImage(index).url"
      @click="navigate(getCafeId(index))"
    />
  </v-carousel>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  name: 'Carousel', // for vue-dev-tools
  data () {
    return {
      model: 0
    }
  },
  computed: {
    ...mapState({
      cafes: state => state.store.cafes
    }),
    ...mapGetters({
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
