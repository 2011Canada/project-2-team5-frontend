import { baseClient } from './remote.js';

export const GetNextLocation = async (nextId) => {
  try {
    let requestURI = '/locations/' + nextId;
    let res = await baseClient.get(requestURI);
    return res.data;
  } catch (e) {
    if (e.response) {
      console.log(e);
    } else {
      console.log('failed to send request.');
    }
  }
};

export const GetAllUsersInCity = async (locationId) => {
  try {
    let requestURI = `/locations/${locationId}/users`;
    let res = await baseClient.get(requestURI);
    console.log(res);
    return res.data;
  } catch (e) {
    if (e.response) {
      console.log(e);
    } else {
      console.log('failed to send request.');
    }
  }
};

const getMyContracts = async (userId) => {
  try {
    let res = await baseClient.get(`/contracts/user/${userId}`);
    return res.data.filter((c) => c.statusId !== 3 && c.statusId !== 4);
  } catch (e) {
    return [];
  }
};
const getCurrentLocationAlias = async (locationId) => {
  const users = await GetAllUsersInCity(locationId);

  const aliases = [];
  users.forEach((user) => {
    user.title.forEach((t) => {
      if (t.active && t.stateID !== 3) {
        t.stateID = 2;
        aliases.push(t);
      }
    });
  });

  return aliases;
};

const calculateHackResult = (myContracts, aliases) => {
  const aliasResult = [];
  const contractResult = [];

  myContracts.forEach((c) => {
    const targets = aliases.filter((a) => a.userID === c.targetId);

    if (targets.length > 0) {
      //catch
      targets.forEach((hacked) => {
        hacked.stateID = 3;
        aliasResult.push(hacked);
      });

      c.statusId = 4;
      contractResult.push(c);
    }
  });

  return {
    aliasResult,
    contractResult,
  };
};

export const HandleHackRequest = async (user) => {
  const aliases = await getCurrentLocationAlias(user.currentLocationId);

  const myAlias = aliases.filter((a) => a.userID === user.userId)[0];

  const myContracts = await getMyContracts(user.userId);

  const { aliasResult, contractResult } = calculateHackResult(
    myContracts,
    aliases
  );

  if (aliasResult.length > 0) {
    //success,
    //target alias to abandoned
    //contract finish
    //alias level + 1
    myAlias.stateID = 1;
    myAlias.aliasLevel = myAlias.aliasLevel + aliasResult.length;

    aliasResult.push(myAlias);
  } else {
    //failed
    //my alias to expose
    //alias level -1
    if (myAlias.aliasLevel !== 0) {
      myAlias.aliasLevel = myAlias.aliasLevel - 1;
    }
    aliasResult.push(myAlias);
  }

  // console.log(aliasResult);
  // console.log(contractResult);
  const aliasRes = aliasResult.map(async (alias) => await updateAlias(alias));
  const contractRes = contractResult.map(
    async (contract) => await updateContract(contract.contractId, contract)
  );
  return Promise.all([...aliasRes, ...contractRes]).then(() => {
    return {
      aliasResult,
      contractResult,
    };
  });
  // let hackData = {
  //     requestType: 'hack',
  //     userId,
  //     locationId
  // }

  //TODO: I need to also send back a result of their hack (success or failure relating to their contract)

  // try {
  //     let requestURI = `/locations/${locationId}`;
  //     let res = await baseClient.post(requestURI, hackData)
  //     console.log(res)
  //     return res.data;

  // } catch(e) {
  //     if (e.response) {
  //         console.log(e)
  //     } else {
  //         console.log("failed to send request.")
  //     }
  // }
};

const updateAlias = async (alias) => {
  return await baseClient.put('/players/alias', alias);
};
const updateContract = async (id, contract) => {
  return await baseClient.put(`/contracts/${id}`, contract);
};

export const MakeAnAlias = async (userId, aliasName) => {
  let alias = aliasName;

  try {
    let requestURI = `/players/${userId}/alias`;
    let res = await baseClient.post(requestURI, alias);
    console.log(res.data);
    return res.data;
  } catch (e) {
    if (e.response) {
      console.log(e);
    } else {
      console.log('Failed to send request.');
    }
  }
};

export const GetCurrentAlias = async (userId) => {
  try {
    let requestURI = `/players/${userId}/alias/current`;
    let res = await baseClient.get(requestURI);
    console.log(res.data);
    let alias = res.data;
    return alias.name;
  } catch (e) {
    if (e.response) {
      console.log(e);
    } else {
      console.log('Failed to send request.');
    }
  }
};

export const GetAllUserAliases = async (userId) => {
  try {
    let requestURI = `/players/${userId}/alias/all`;
    let res = await baseClient.get(requestURI);
    console.log(res.data);
    return res.data;
  } catch (e) {
    if (e.response) {
      console.log(e);
    } else {
      console.log('Failed to send request.');
    }
  }
};

export const GetLocationName = async (locationId) => {
  try {
    let requestURI = `/locations/${locationId}`;
    let res = await baseClient.get(requestURI);
    console.log(res.data);
    let location = res.data;
    return location.locationName;
  } catch (e) {
    if (e.response) {
      console.log(e);
    } else {
      console.log('Failed to send request.');
    }
  }
};

//this should be called create alias
export const UpdateAlias = async (userId, alias) => {
  try {
    let requestURI = `/players/${userId}/alias/set`;
    let res = await baseClient.post(requestURI, alias);
    console.log(res.data);
    return res.data;
  } catch (e) {
    if (e.response) {
      console.log(e);
    } else {
      console.log('Failed to send request.');
    }
  }
};
