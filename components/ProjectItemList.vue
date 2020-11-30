<template>
  <v-row v-if="!!items">
    <v-card>
      <div class="tab-wrapper">
        <v-tabs
          v-model="tab"
          dark
          show-arrows
          :vertical="true"
          :centered="true"
        >
          <v-tabs-slider />
          <v-tab
            v-for="(tp, index) in getTypes"
            :key="'tp-' + index"
            :href="'#tab-' + index"
            class="mr-0"
          >
            {{ tp }}
          </v-tab>
          <v-tab-item
            v-for="(tp, index) in getTypes"
            :key="'tp-' + index"
            :value="'tab-' + index"
            width="600px"
            height="100%"
          >
            <v-card
              v-for="(filtered, i) in getFilteredByType"
              :key="i"
              flat
              tile
              color="#31373a"
              class="flex-wrap"
              width="600px"
              height="250px"
            >
              <v-container fluid>
                <v-row fill-height dense>
                  <v-col cols="12" md="6">
                    <h1>{{ filtered.system.name }}</h1>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-flex class="primary--text text-lg-right">
                      <h2>{{ filtered.system.type }}</h2>
                    </v-flex>
                  </v-col>
                </v-row>
              </v-container>
              <v-img
                height="250"
                :src="getImage(filtered).url"
              />
            </v-card>
          </v-tab-item>
        </v-tabs>
      </div>
    </v-card>
  </v-row>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'ProjectItemList',
  data () {
    return {
      tab: null,
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    }
  },
  computed: {
    ...mapState({
      items: state => state.store.projectItems
    }),
    ...mapGetters({
      getTypes: 'store/getProjectItemTypes',
      filteredByType: 'store/getItemsFilteredByType'
    }),
    getFilteredByType () {
      let result = null
      if (this.items) {
        const prTypes = this.getTypes
        if (this.tab) {
          const tabIndex = parseInt(this.tab.substring(4))
          const currType = prTypes[tabIndex]
          result = this.filteredByType(currType)
          console.log('currType: ' + currType)
          console.log(result)
        }
      }
      return result
    }
  },
  methods: {
    getImage (item) {
      console.log(item)
      const result = {
        url: null,
        description: null
      }
      try {
        if (item.elements) {
          if (item.elements.metadata__twitter_image) {
            if (item.elements.metadata__twitter_image.value) {
              result.url = item.elements.metadata__twitter_image.value[0].url
            }
          } else if (item.elements.photo) {
            if (item.elements.photo.value) {
              result.url = item.elements.photo.value[0].url
            }
          } else if (item.elements.image) {
            if (item.elements.image.value) {
              result.url = item.elements.image.value[0].url
            }
          }
        }
      } catch (err) {
        console.log(err)
      }
      result.description = ''
      return result
    },
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
.mr-0,
.a.v-tab.v-tab--active {
  margin: 0px !important;
  text-align: left;
}
.tab-wrapper {
  height: 100%; /* Set to desired height of entire tabbed section, or use flex, or ... */
  display: flex;
  flex-direction: column;
}

.tab-wrapper .v-window {
  flex: 1;
}

.tab-wrapper .v-window__container,
.tab-wrapper .v-window-item {
  height: 100% !important;
}

/* customise the dimensions of the card content here */
.tab-wrapper .v-card,
.tab-wrapper .v-card__text,
.v-window.v-item-group.theme--dark.v-tabs-items {
  height: 100% !important;
}
.theme--dark.v-tabs-items,
.v-window.v-item-group.theme--dark.v-tabs-items {
  background-color: #31373a !important;
}
</style>
