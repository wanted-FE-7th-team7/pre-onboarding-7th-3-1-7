import axios from 'axios';

export const instance = axios.create({
  baseURL: 'http://localhost:4000/sick',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const search = async (searchText: string) => {
  console.info('calling api');
  return instance.get(`?q=${searchText}`);
};
