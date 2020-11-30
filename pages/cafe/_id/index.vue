<template>
  <CafeInfo :id="$route.params.id" />
</template>

<script>
import CafeInfo from '@/components/CafeInfo'

export default {
  name: 'Cafe',
  components: {
    CafeInfo
  }
}
