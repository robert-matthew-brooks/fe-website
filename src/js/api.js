import axios from 'axios';

let baseURL;
if (location.hostname === 'localhost') {
  baseURL = 'http://localhost:9090';
} else {
  baseURL = ''; // TODO add hosted backend api
}

const api = axios.create({ baseURL });

export async function fetchTopics() {
  const { data } = await api.get('/api/projects');
  return data;
}
