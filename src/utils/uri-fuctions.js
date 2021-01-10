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