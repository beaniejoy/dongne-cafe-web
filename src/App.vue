<template>
  <v-app class="bg-slate-200">
    <Loading />
    <v-layout>
      <router-view />
    </v-layout>
  </v-app>
</template>

<script>
import Loading from '@/components/common/Loading.vue'

export default {
  components: {
    Loading
  }
}
</script>