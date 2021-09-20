const apiUrl = "http://localhost:8080/api";

export async function AgentfindAll() {
    const response = await fetch(apiUrl+"/agent");

    if (response.status !== 200) {
        return Promise.reject("Agent fetch failed, response is not 200 OK");
    }

    return response.json();
}

export async function AgentFindById(agentId) {
    const response = await fetch(`${apiUrl}/agent/${agentId}`);

    if (response.status !== 200) {
        return Promise.reject("response is not 200 OK");
    }

    return response.json();
}

export async function AgentdeleteById(agentId) {
    const response = await fetch(`${apiUrl}/agent/${agentId}`, { method: "DELETE" });

    
    if (response.status !== 204) {
        return Promise.reject("Deleted failed, response not 204 - NO CONTENT");
    }

    return Promise.resolve(true);

}

export async function AgentAdd(agent) {
    const init = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(agent),
    };

    const response = await fetch(apiUrl+"/agent/", init);

    if (response.status !== 201) {
    return Promise.reject("Add failed, response not 201 CREATED");
    }

    return Promise.resolve(true);
}


export async function AgentUpdate(agent) {
    const init = {
        method: "PUT",
        headers: {
        "Content-Type": "application/json",
    },
        body: JSON.stringify(agent),
    };

    // PUT needs a todoId in the URL
    const response = await fetch(`${apiUrl}/agent/${agent.agentId}`, init);

    if (response.status !== 204) {
        return Promise.reject("Updated failed, response not 204 NO CONTENT");
    }

    return Promise.resolve(true);
}

export async function AliasFindByAgentId(agentId) {
    const response = await fetch(`${apiUrl}/alias/agent/${agentId}`);

    if (response.status === 404){

        return Promise.reject("404 Alias not found");
    }
    if (response.status !== 200) {

        return Promise.reject("Alias fetch failed")
    }
    return response.json();

}




    
    // return the findAll promise.


    // fetch(`http://localhost:8080/api/agent/${agentId}`, )
    //     .then(response => {
    //         if (response.status === 204) {
    //             return 1;
    //         } else if (response.status === 404) {
    //             return Promise.reject("Agent not found");
    //         } else {
    //             return Promise.reject(`Delete failed with status: ${response.status}`);
    //         }
    //     })
    //     .catch(console.log);
