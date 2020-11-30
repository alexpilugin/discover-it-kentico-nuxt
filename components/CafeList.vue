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
          @click="navigate(getCafeId(index))"
        />
        <v-container>
          <v-row fill-height dense justify="center" align="center">
            <v-col cols="12" md="6">
              <div class="headline">
                {{ getCafeName(index) }}
              </div>
            </v-col>
            <v-col cols="12" md="6">
              <v-flex class="primary--text text-lg-right">
                {{ getCafeType(index) }}
              </v-flex>
            </v-col>
          </v-row>
        </v-container>
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
      getCafeImage: 'store/getCafeImage',
      getCafeType: 'store/getCafeType',
      getCafeId: 'store/getCafeId',
      getLastUpdate: 'store/getCafeLastUpdate'
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
