import axios from 'axios';

const DEV_ENVIR = true;

const baseURL = DEV_ENVIR
  ? 'http://localhost:8080/api'
  : 'https://pokeapi.co/api/v2';
//this is where we config every single request for a certain api
export const baseClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});
