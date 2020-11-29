/* eslint-disable vue/html-self-closing */
<template>
  <div>
    <v-app-bar
      flat
      dark
      elevation-0
      absolute
      dense
      app
      color="#31373a"
    >
      <!-- Uncomment if you want to use a Theme Switcher:
        <v-btn icon @click.stop="switchTheme()">
          <v-icon>mdi-brightness-6</v-icon>
        </v-btn>
        -->

      <v-btn
        icon
        is-mobile-click-stop="toggleRightDrawer()"
        class="hidden-md-and-up"
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn>

      <v-spacer class="hidden-md-and-up" />
      <nuxt-link to="/" class="logo-link-decor pa-5 pt-7">
        <Logo />
        <!-- <v-toolbar-title class="title pa-5 white--text" v-text="title" /> -->
      </nuxt-link>

      <v-spacer />
      <div class="flex-grow-1 mt-5" />
      <v-spacer />

      <v-tabs
        v-show="$vuetify.breakpoint.mdAndUp"
        right
        active-class="active-link"
        :value="tabIndex"
      >
        <v-tab v-for="(item, i) in getNavMenu" :key="i" :to="item.route" nuxt>
          <v-tooltip bottom>
            <template #activator="{ on }">
              <v-flex style="widt: 100%; height: 100%" class="pt-3" v-on="on">
                <v-icon v-if="showIcons" class="pr-3">
                  {{ item.icon }}
                </v-icon>
                <span>{{ item.title }}</span>
              </v-flex>
            </template>
            <span>{{ item.title }}</span>
          </v-tooltip>
        </v-tab>
      </v-tabs>
    </v-app-bar>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Logo from '~/components/LogoDiscoverIT.vue'

export default {
  name: 'Navbar', // for debugging in Vue-DevTools
  components: {
    Logo
  },
  props: {
    showIcons: {
      type: Boolean,
      default: false,
      required: false
    },
    tabIndex: {
      type: Number,
      default: -1,
      required: false
    }
  },
  data () {
    return {
      rightDrawer: false
    }
  },
  computed: {
    ...mapState({
      title: state => state.store.appTitle
    }),
    ...mapGetters({
      getNavMenu: 'store/getRightDrawerMenus',
      isLoading: 'store/getLoadingStatus'
    })
  },
  methods: {
    navigate (route) {
      const self = this
      setTimeout(function () {
        // give time for animation
        self.$router.push({ path: route })
      }, 300)
    },
    toggleRightDrawer () {
      this.rightDrawer = !this.rightDrawer
      // send notification to the parent:
      this.$emit('toggle-right-drawer', this.rightDrawer)
    },
    switchTheme () {
      this.$vuetify.theme.isDark = !this.$vuetify.theme.isDark
    }
  }
}
</script>

<style lang="scss" scoped>
.active-route-link {
  border: solid 1px "FA641E";
}
.logo-link-decor {
  text-decoration: none;
}
</style>
