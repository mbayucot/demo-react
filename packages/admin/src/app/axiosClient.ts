import axios from 'axios';

const axiosClient = axios.create({
  baseURL: `${process.env.REACT_APP_HOST_URL}`,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: false,
});

export function postRequest(URL: string, payload: object) {
  return axiosClient.post(`/${URL}`, payload).then((response) => response);
}

export function deleteRequest(URL: string) {
  return axiosClient.delete(`/${URL}`).then((response) => response);
}
