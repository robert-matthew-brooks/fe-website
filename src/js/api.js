import axios from 'axios';
import { prodBackendUrl, devBackendUrl } from './backend-urls';

const env = process.env.NODE_ENV || 'development';

let baseURL;
if (env === 'production') {
  baseURL = prodBackendUrl;
} else {
  baseURL = devBackendUrl;
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
