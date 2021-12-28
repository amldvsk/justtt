import axios from 'axios';
const API = 'http://localhost:4040';
export const getRows = (page: number) => {
  return rest('/', 'GET', { page });
};

const rest = (path: string, method: string, params: any, data: any = null) => {
  return axios({
    method,
    url: `${API}${path}`,
    ...(data && { data }),
    ...(params && { params }),
  });
};
