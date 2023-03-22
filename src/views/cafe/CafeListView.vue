<template>
  <v-main class="grid content-center">
    Hello
  </v-main>
</template>

<script>
export default {
  created() {
    console.log('query', this.$route.query.q)
  }
}
</script>

<style lang="scss" scoped>

</style>