export async function getChampions() {
    return fetch("https://league-of-legends-ap.herokuapp.com/api/champions", {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        }
    });
}