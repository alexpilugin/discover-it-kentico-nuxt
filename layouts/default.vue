<template>
  <v-app dark>
    <Navbar
      :show-icons="false"
      @toggle-right-drawer="rightDrawer = !rightDrawer"
    />

    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>

    <v-navigation-drawer
      v-model="rightDrawer"
      temporary
      right
      app
      :hide-overlay="true"
      width="200px"
    >
      <v-list class="pt-0" dense>
        <v-list-item
          v-for="(item, index) in getNavMenu"
          :key="`item-${index}`"
          @click.stop="navigate(item.route)"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <BottomFooter :fixed="fixed" app />
  </v-app>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

import BottomFooter from '~/components/BottomFooter.vue'
import Navbar from '~/components/Navbar.vue'

export default {
  name: 'DefaultLayout',
  components: {
    BottomFooter,
    Navbar
  },
  data () {
    return {
      fixed: true,
      rightDrawer: false
    }
  },
  computed: {
    ...mapState({
      cafes: state => state.store.cafes
    }),
    ...mapGetters({
      getNavMenu: 'store/getRightDrawerMenus'
    })
  },
  created () {
    if (!this.cafes || !this.cafes.length || !this.cafes.length <= 0) {
      this.loadCafeItems()
    }
  },
  methods: {
    ...mapActions({
      loadCafeItems: 'store/loadCafeItems'
    }),
    navigate (route) {
      const self = this
      setTimeout(function () {
        // give time for animation
        self.$router.push({ path: route })
      }, 300)
    }
  }
}
</script>
