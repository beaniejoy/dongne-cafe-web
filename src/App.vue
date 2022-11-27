<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script>
export default {
  created() {
    console.log('App created');
  }
};
</script>

<style lang="scss">
@import '@/sass/style.scss';
</style>
