<template>
  <v-row v-if="cafes" justify="center" align="center">
    <v-col cols="12">
      <v-card color="#31373a">
        <v-container fluid>
          <v-row fill-height dense>
            <v-col cols="12" md="6">
              <h1>{{ info.system.name }}</h1>
            </v-col>
            <v-col cols="12" md="6">
              <v-flex class="primary--text text-lg-right">
                <h2>{{ capitalizeText(info.system.type) }}</h2>
              </v-flex>
            </v-col>
          </v-row>

          <v-row fill-height dense class="justify-space-between flex-wrap">
            <v-col cols="12" md="6">
              <v-img contain class="mr-3" :src="info.elements.photo.value[0].url" />
            </v-col>
            <v-col cols="12" md="6" class="body-1">
              <div>
                <span>{{ info.elements.phone.name }}:</span> <span class="primary--text">{{ info.elements.phone.value }}</span> <br>
                <span>{{ info.elements.email.name }}:</span> <span class="primary--text">{{ info.elements.email.value }}</span> <br>
                <span>{{ info.elements.city.name }}:</span> <span class="primary--text">{{ info.elements.city.value }}</span> <br>
                <span>{{ info.elements.country.name }}:</span> <span class="primary--text">{{ info.elements.country.value }}</span> <br>
                <span>{{ info.elements.state.name }}:</span> <span class="primary--text">{{ info.elements.state.value }}</span> <br>
                <span>{{ info.elements.street.name }}:</span> <span class="primary--text">{{ info.elements.street.value }}</span> <br>
                <span>{{ info.elements.zip_code.name }}:</span> <span class="primary--text">{{ info.elements.zip_code.value }}</span> <br>

                <span>Last update:</span> <span class="primary--text">{{ formattedDate(new Date(info.system.last_modified)) }}</span>
              </div>
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
  name: 'CafeInfo',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState({
      cafes: state => state.store.cafes
    }),
    ...mapGetters({
      getInfo: 'store/getCafeDataElements',
      capitalizeText: 'store/capitalizeText',
      formattedDate: 'store/formattedDate'
    }),
    info () {
      return this.getInfo(this.id)
    }
  },
  mounted () {
    if (!this.cafes) {
      self.$router.push({ path: '/' })
    }
  }
}
</script>
