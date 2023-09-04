import axios from 'axios';

let baseURL;
if (location.hostname === 'localhost') {
  baseURL = 'http://localhost:9090';
} else {
  baseURL = ''; // TODO add hosted backend api
}

const api = axios.create({ baseURL });

export async function fetchProjects(params) {
  if (params.language === 'all') delete params.language;
  console.log(params);
  const { data } = await api.get('/api/projects', { params });
  return data;
}

export async function fetchLanguages() {
  const { data } = await api.get('/api/languages');
  return data;
}
