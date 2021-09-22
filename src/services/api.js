const apiUrl = "http://localhost:8080/api";

export async function findAll(str) {
    const response = await fetch(apiUrl+"/"+str);

    if (response.status !== 200) {
        return Promise.reject(str+" fetch failed, Error "+response.status+": "+(await response.text()).toString().slice(2,-2));
    }

    return response.json();
}

export async function AgentFindById(agentId) {
    const response = await fetch(`${apiUrl}/agent/${agentId}`);

    if (response.status !== 200) {
        return Promise.reject("Fetch failed, Error "+response.status+": "+(await response.text()).toString().slice(2,-2));
    }

    return response.json();
}

export async function DeleteById(arr) {
    const response = await fetch(`${apiUrl}${arr.table}${arr.Id}`, { method: "DELETE" });

    
    if (response.status !== 204) {
        return Promise.reject("Delete failed, Error "+response.status+": "+(await response.text()).toString().slice(2,-2));
    }

    return Promise.resolve(true);

}

export async function Add(arr) {
    const init = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(arr.new),
    };

    const response = await fetch(apiUrl+arr.table, init);

    if (response.status !== 201) {
    return Promise.reject("Add failed, Error "+response.status+": "+(await response.text()).toString().slice(2,-2));
    }

    return Promise.resolve(true);
}


export async function Update(arr) {
    const init = {
        method: "PUT",
        headers: {
        "Content-Type": "application/json",
    },
        body: JSON.stringify(arr.new),
    };

    // PUT needs a todoId in the URL
    const response = await fetch(`${apiUrl}${arr.table}${arr.Id}`, init);

    if (response.status !== 204) {
        return Promise.reject("Updated failed, Error "+response.status+": "+(await response.text()).toString().slice(2,-2));
    }

    return Promise.resolve(true);
}

export async function AliasFindByAgentId(agentId) {
    const response = await fetch(`${apiUrl}/alias/agent/${agentId}`);

    if (response.status === 404){

        return Promise.reject("404 Alias not found");
    }
    if (response.status !== 200) {

        return Promise.reject("Alias fetch failed, Error "+response.status+": "+(await response.text()).toString().slice(2,-2))
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
