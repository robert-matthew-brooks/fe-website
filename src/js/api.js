import axios from 'axios';

let baseURL;
if (location.hostname === 'localhost') {
  baseURL = 'http://localhost:9090';
} else {
  baseURL = 'https://be-website.onrender.com/';
}

const api = axios.create({ baseURL });

export async function fetchProjects(params) {
  if (params.language === 'all') delete params.language;
  const { data } = await api.get('/api/projects', { params });
  return data;
}

export async function fetchLanguages() {
  const { data } = await api.get('/api/languages');
  return data;
}

export async function fetchProject(project_id) {
  const { data } = await api.get(`/api/projects/${project_id}`);
  return data;
}
