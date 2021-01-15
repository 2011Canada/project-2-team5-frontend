import {baseClient} from './remote.js';


export const GetNextLocation = async (nextId) => {
    try {
        let requestURI = '/locations/' + nextId;
        let res = await baseClient.get(requestURI)
        console.log(res)
        return res.data;

    } catch(e) {
        if (e.response) {
            console.log(e)
        } else {
            console.log("failed to send request.")
        }
    }
}


export const GetAllUsersInCity = async (locationId) => {
    try {
        let requestURI = `/locations/${locationId}/users`;
        let res = await baseClient.get(requestURI)
        console.log(res)
        return res.data;

    } catch(e) {
        if (e.response) {
            console.log(e)
        } else {
            console.log("failed to send request.")
        }
    }
}


export const HandleHackRequest = async (userId, locationId) => {
    let hackData = {
        requestType: 'hack',
        userId,
        locationId
    }

    //TODO: I need to also send back a result of their hack (success or failure relating to their contract)

    try {
        let requestURI = `/locations/${locationId}`;
        let res = await baseClient.post(requestURI, hackData)
        console.log(res)
        return res.data;

    } catch(e) {
        if (e.response) {
            console.log(e)
        } else {
            console.log("failed to send request.")
        }
    }
}

export const MakeAnAlias = async (userId, aliasName) => {
    let alias = aliasName;

    try {
        let requestURI = `/players/${userId}/alias`;
        let res = await baseClient.post(requestURI, alias)
        console.log(res.data);
        return res.data;
        

    } catch(e) {
        if (e.response) {
            console.log(e)
        } else {
            console.log("Failed to send request.")
        }
    }
}

export const GetCurrentAlias = async (userId) => {

    try {
        let requestURI = `/players/${userId}/alias/current`;
        let res = await baseClient.get(requestURI)
        console.log(res.data)
        let alias = res.data;
        return alias.name;


    } catch(e) {
        if (e.response) {
            console.log(e)
        } else {
           console.log("Failed to send request.")
        }
    }
}

export const GetAllUserAliases = async (userId) => {

    try {
        let requestURI = `/players/${userId}/alias/all`;
        let res = await baseClient.get(requestURI)
        console.log(res.data)
        return res.data;

    } catch(e) {
        if (e.response) {
            console.log(e)
        } else {
           console.log("Failed to send request.")
        }
    }
}

export const GetLocationName = async (locationId) => {

    try {
        let requestURI = `/locations/${locationId}`;
        let res = await baseClient.get(requestURI)
        console.log(res.data)
        let location = res.data;
        return location.locationName;

    } catch(e) {
        if (e.response) {
            console.log(e)
        } else {
           console.log("Failed to send request.")
        }
    }
}

export const UpdateAlias = async (userId, alias) => {

    try {
        let requestURI = `/players/${userId}/alias/set`;
        let res = await baseClient.post(requestURI, alias)
        console.log(res.data);
        return res.data;
        

    } catch(e) {
        if (e.response) {
            console.log(e)
        } else {
            console.log("Failed to send request.")
        }
    }
}