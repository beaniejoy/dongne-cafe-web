<template>
  <v-main class="mx-auto">
    <v-container>
      <v-card max-width="344">
        <v-img 
          alt="Vue logo" 
          max-width="250" 
          src="@/assets/logo.png" 
        />
        <HelloWorld />
      </v-card>
    </v-container>
  </v-main>
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
