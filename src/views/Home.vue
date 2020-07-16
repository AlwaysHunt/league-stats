<template>
  <v-container>
    <v-row>
      <v-img
        src="https://www.riotgames.com/darkroom/800/da85e92aaf87f26181ded41afe03b1dc:aaeeccb4b282b616ef907ec68c40f2b7/lol-logo-rendered-hi-res.png"
        contain
        height="200"
      ></v-img>
    </v-row>
    <v-row justify="center">
      <v-form @submit.prevent="submit">
        <v-text-field
          append-icon="mdi-magnify"
          solo
          placeholder="Summoner Name"
          v-model="summonerName"
          @click:append="submit"
        ></v-text-field>
      </v-form>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import store from '../store/index'
import * as PlayerService from '../services/player-services'

export default {
  name: 'Home',
  data: () => {
    return {
      summonerName: '',
      leaguePlayer: {}
    }
  },
  methods: {
    submit: async function() {
      let response, playerData;

      try { response = await PlayerService.getPlayer(this.summonerName); } 
      catch(err) { console.log(`Error with getting Player Response: ${err}`); }
      
      try { playerData = await response.json(); } 
      catch(err) { console.log(`Error with getting Player Data: ${err}`); }

      this.leaguePlayer = playerData;
      store.state.player = this.leaguePlayer;
      this.$router.push({ path: `/profile/${this.summonerName}/${this.leaguePlayer.accountId}` });
    }
  }
}
</script>
