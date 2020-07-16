<template>
  <v-container class="grey lighten-5">
    <v-row>
      <v-col>
        {{summonerName}}
        <v-btn @click.native="update">Update</v-btn>
      </v-col>
    </v-row>
    <v-row v-for="match in matchHistory" :key="match.gameId">
      <v-col>
        <v-img max-height="46px" max-width="46px" :src="match.champion.championImage"></v-img>
        <div>
          {{match.queueType}}
        </div>
      </v-col>
      

      <v-col cols="10">
        <v-card>
          <v-row>
            <v-col v-for="team in match.teams" :key="team.teamId">
              <div class="ml-4 mr-2 red lighten-4" v-if="team.teamId == 100">Red Team
                <v-list class="red lighten-4">
                <v-list-item
                  class="list-item"
                  v-for="player in team.players"
                  :key="player.accountId"
                >
                  <v-img max-height="46" max-width="46" :src="player.champion.championImage"></v-img>
                  <div class="ml-2 text-center">
                    {{ player.identity.player.summonerName }}
                  </div>
                </v-list-item>
              </v-list>
              </div>
              <div class="ml-4 mr-2 blue lighten-4" v-if="team.teamId == 200">Blue Team
                <v-list class="blue lighten-4">
                <v-list-item
                  class="list-item"
                  v-for="player in team.players"
                  :key="player.accountId"
                >
                  <v-img max-height="46" max-width="46" :src="player.champion.championImage"></v-img>
                  <div class="ml-2 text-center">
                    {{ player.identity.player.summonerName }}
                  </div>
                </v-list-item>
              </v-list>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
/*
<v-card-text v-for="players in match.participants" :key="players.player.accountId">
            {{ players.player.summonerName }}
          </v-card-text>
*/
import store from "../store/index";
import * as MatchServices from "../services/match-services";
import * as ChampionServices from "../services/champion-services";
import * as QueueServices from "../services/queue-services";
import * as HelperFunctions from "../services/helper-functions/helper-functions";

export default {
  name: "Profile",
  data: () => {
    return {
      matchHistory: [],
      accountId: "",
      summonerName: ""
    };
  },
  async created() {
    this.accountId = this.$route.params.id;
    this.summonerName = this.$route.params.summoner;

    var championResponse, championData;

    try {
      championResponse = await ChampionServices.getChampions();
    } catch (err) {
      console.log(`There was an error getting Champion Response: ${err}`);
    }

    try {
      championData = await championResponse.json();
    } catch (err) {
      console.log(`There was an error getting Champion Data: ${err}`);
    }

    store.state.championList = [];
    for (var i in championData) {
      store.state.championList.push({
        championName: championData[i].name,
        championKey: championData[i].key,
        championImage: `http://ddragon.leagueoflegends.com/cdn/10.14.1/img/champion/${championData[i].image.full}`
      });
    }

    try {
      await this.update();
    } catch (err) {
      console.log(`Couldn't finalize the info: ${err}`);
    }
  },
  methods: {
    update: async function() {
      let matchResponse, matchData;
      this.matchHistory = [];

      try {
        matchResponse = await MatchServices.getMatches(this.$route.params.id);
      } catch (err) {
        console.log(`There was an error getting Match Response: ${err}`);
      }
      try {
        matchData = await matchResponse.json();
      } catch (err) {
        console.log(`There was an error getting Match Data: ${err}`);
      }

      let matchParticipantsData = matchData.matches.map(async match => {

        let matchParticipants = await MatchServices.getMatchParticipants(match.gameId);
        return matchParticipants.json();

      });

      let participantsData = await Promise.all(matchParticipantsData);
      console.log(matchData);

      for (let i = 0; i < matchData.matches.length; i++) {
        let queueTypeResponse = await QueueServices.getQueueType(matchData.matches[i].queue);
        let queueTypeData = await queueTypeResponse.json();
        console.log(queueTypeResponse);
        console.log(queueTypeData);
        console.log(queueTypeData[0].description);
        

        var teams = [];
        var redTeam = {
          teamId: 100,
          players: []
        };

        var blueTeam = {
          teamId: 200,
          players: []
        };

        let currentChampion = HelperFunctions.findChampion(
          matchData.matches[i].champion
        );
  
        var redTeamIndex = 0;
        var blueTeamIndex = 0;

        for (let z = 0; z < participantsData[i].participants.length; z++) {
          if (participantsData[i].participants[z].teamId == redTeam.teamId) {
            redTeam.players.push(participantsData[i].participants[z]);
            redTeam.players[redTeamIndex].identity = participantsData[i].participantIdentities[z];
            redTeam.players[redTeamIndex].champion = HelperFunctions.findChampion(redTeam.players[redTeamIndex].championId);
            redTeamIndex++;
          } else if (participantsData[i].participants[z].teamId == blueTeam.teamId){
            blueTeam.players.push(participantsData[i].participants[z]);
            blueTeam.players[blueTeamIndex].identity = participantsData[i].participantIdentities[z];
            blueTeam.players[blueTeamIndex].champion = HelperFunctions.findChampion(blueTeam.players[blueTeamIndex].championId);
            blueTeamIndex++;
          }
        }
  
        teams.push(redTeam);
        teams.push(blueTeam);

        this.matchHistory.push({
          gameId: matchData.matches[i].gameId,
          queueType: queueTypeData[0].description,
          champion: currentChampion,
          teams: teams
        });
      }
    }
  }
};
</script>

<style>

</style>