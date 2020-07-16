export async function getQueues() {
    return fetch("https://league-of-legends-ap.herokuapp.com/api/queues", {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        }
    });
}

export async function getQueueType(queueId) {
    return fetch(`https://league-of-legends-ap.herokuapp.com/api/queues/${queueId}`, {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        }
    });
}