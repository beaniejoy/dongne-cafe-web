<template>
  <v-app class="bg-slate-200">
    <Loading />
    <v-layout>
      <AppBar />
      <router-view />
    </v-layout>
  </v-app>
</template>

<script>
import Loading from '@/components/common/Loading.vue'
import AppBar from '@/components/common/AppBar.vue'

export default {
  components: {
    Loading,
    AppBar
  },
}
</script>