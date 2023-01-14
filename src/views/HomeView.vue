<template>
  <v-main class="mx-auto">
    <v-content>
      <v-container>
        <v-card max-width="344">
          <v-img 
            alt="Vue logo" 
            max-width="250" 
            src="@/assets/logo.png" 
          />
          <HelloWorld />
        </v-card>
        <router-link to="/login">login page 이동</router-link>
      </v-container>
    </v-content>
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
