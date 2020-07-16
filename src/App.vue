<template>
  <v-app>
    <v-app-bar app dark flat hide-on-scroll> 

      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>
        <v-btn class="ma-2" :to="{ name: 'Home' }" text>
          League Stats
        </v-btn>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main class="blue darken-4">
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer padless>
      <v-card width="100%" dark tile center class="text-center">
        <v-card-text>
          <v-btn class="mx-4" text rounded>First</v-btn>
          <v-btn class="mx-4" text rounded>Second</v-btn>
          <v-btn class="mx-4" text rounded>Third</v-btn>
          <v-btn class="mx-4" text rounded>Fourth</v-btn>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text>@ Charlie Le</v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>

export default {
  name: "App",

  components: {
  },

  data: () => ({
    //
  })
};
</script>

<style>


</style>