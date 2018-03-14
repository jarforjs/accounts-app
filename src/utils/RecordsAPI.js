import axios from 'axios';

// export const api = process.env.REACT_APP_RECORDS_API_URL || "http://localhost:5000";
const api = process.env.REACT_APP_RECORDS_API_URL || "https://5aa906004cf36300144e95db.mockapi.io";

export const getAll=()=>
    // axios.get(`${REcordsAPI.api}/api/v1/records`);
    axios.get(`${api}/api/v1/records`);

export const create=(body)=>
    axios.post(`${api}/api/v1/records`,body);

export const update=(id,body)=>
    axios.put(`${api}/api/v1/records/${id}`,body);

export const remove=(id)=>
    axios.delete(`${api}/api/v1/records/${id}`);

