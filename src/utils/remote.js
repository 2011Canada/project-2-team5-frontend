import axios from 'axios';

const DEV_ENVIR = true;

const baseURL = DEV_ENVIR
  ? 'http://localhost:8090/api'
  : 'http://ec2-18-223-151-37.us-east-2.compute.amazonaws.com:8090/p2/api/';
//this is where we config every single request for a certain api
export const baseClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});
