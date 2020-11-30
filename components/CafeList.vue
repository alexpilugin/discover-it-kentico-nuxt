<template>
  <v-row v-if="!!cafes" justify="center" align="center">
    <v-col
      v-for="(cafe, index) in cafes"
      :key="'cafe-' + index"
      cols="12"
      sm="8"
      md="6"
      lg="4"
    >
      <v-card color="#31373a">
        <v-img
          height="250"
          :src="getCafeImage(index).url"
          :alt="getCafeImage(index).description"
        />
        <v-card-title class="headline">
          {{ getCafeName(index) }}
        </v-card-title>
      </v-card>
    </v-col>
  </v-row>
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
      getCafeImage: 'store/getCafeImage'
    })
  }
}
</script>
