const CORS_URL = `https://desolate-savannah-44799.herokuapp.com/`
const API_URL = `https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/`

export async function getMatches(accountId) {
    const API_MATCH_URL =
        API_URL + accountId + "?endIndex=10&beginIndex=0";
    return fetch(CORS_URL + API_MATCH_URL, {
        method: "GET",
        mode: "cors",
        headers: {
            "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36",
            "Accept-Language": "en-US,en;q=0.9",
            "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
            Origin: "*",
            "Access-Control-Allow-Origin": "*",
            "X-Riot-Token": "RGAPI-71af3afe-86f3-4d08-9b3c-441e6ac91ebf"
        }
    });
}

export async function getMatchParticipants(gameId) {
    const API_MATCH_URL =
        "https://na1.api.riotgames.com/lol/match/v4/matches/";

    return fetch(CORS_URL + API_MATCH_URL + gameId, {
        method: "GET",
        mode: "cors",
        headers: {
            "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36",
            "Accept-Language": "en-US,en;q=0.9",
            "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
            Origin: "https://developer.riotgames.com",
            "X-Riot-Token": "RGAPI-71af3afe-86f3-4d08-9b3c-441e6ac91ebf"
        }
    });
}
