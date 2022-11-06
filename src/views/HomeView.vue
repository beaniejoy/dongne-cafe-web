<template>
  <v-container>
    <v-card
      class="mx-auto"
      max-width="344"
    >
      <v-img 
        alt="Vue logo" 
        max-width="250" 
        src="@/assets/logo.png" 
      />
      <HelloWorld msg="Welcome to Your Vue.js App" />
    </v-card>
  </v-container>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }
};
</script>
