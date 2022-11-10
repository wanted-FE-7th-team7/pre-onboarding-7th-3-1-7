import axios from 'axios';

export const URLS = {
  SICK: 'http://localhost:4000/sick',
};

export const http = axios.create({
  headers: {
    'Content-Type': 'application/json',
    charset: 'utf-8',
  },
  timeout: 1000,
});

export const DEBOUNCING_TIME = 500;
