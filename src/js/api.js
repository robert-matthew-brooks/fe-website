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

export async function fetchProject(projectId) {
  const { data } = await api.get(`/api/projects/${projectId}`);
  return data;
}

export async function fetchVotes(projectId, userIp) {
  const { data } = await api.get(`/api/votes/${projectId}`, {
    params: { user_ip: userIp },
  });
  return data;
}

export async function putVote(projectId, userIp, value) {
  const { data } = await api.put(`/api/votes/${projectId}`, {
    user_ip: userIp,
    value,
  });
  return data;
}
