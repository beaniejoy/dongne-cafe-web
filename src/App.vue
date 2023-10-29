<template>
  <v-app class="bg-slate-200">
    <v-layout>
      <router-view />
    </v-layout>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  async created() {
    console.log('#### App Init ####')
  }
}
</script>
<style lang="scss">
</style>
