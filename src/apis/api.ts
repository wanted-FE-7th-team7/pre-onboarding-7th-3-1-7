import axios from 'axios';

export const http = axios.create({
  baseURL: 'http://localhost:4000/sick',
  headers: {
    'Content-Type': 'application/json',
    charset: 'utf-8',
  },
  timeout: 1000,
});

export const getSearch = (searchValue: string, setSearchData: any) => {
  const URL = `?q=${searchValue}`;

  http
    .get(URL)
    .then(res => {
      console.info('calling api');
      setSearchData(res.data);
    })
    .catch(error => {});
};
