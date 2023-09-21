import axios from 'axios';

const env = process.env.NODE_ENV || 'development';

let baseURL;
if (env === 'production') {
  baseURL = 'https://be-website.onrender.com';
} else {
  baseURL = 'http://localhost:9090';
}

const api = axios.create({ baseURL });

export async function fetchLanguages() {
  const { data } = await api.get('/api/languages');
  return data;
}

export async function fetchProjects(params) {
  if (params.language === 'all') delete params.language;
  const { data } = await api.get('/api/projects', { params });
  return data;
}

export async function fetchProject(projectSlug) {
  const { data } = await api.get(`/api/projects/${projectSlug}`);
  return data;
}
