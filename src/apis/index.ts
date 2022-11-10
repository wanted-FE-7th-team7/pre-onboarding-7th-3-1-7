import axios from 'axios';
import { Sick } from '../interfaces';

const CACHE_KEY = 'cache';
const API_ENDPOINT = 'http://localhost:4000';
const MAX_AGE = 6000;
export const getSearchResult = async (query: string) => {
  // cache와 일치하는지 찾음

  try {
    const cache = caches.open(CACHE_KEY);
    console.log('api 호출');
    const res = await axios.get<Sick[]>(`${API_ENDPOINT}/sick`, {
      headers: {
        'Cache-Control': `max-age=${MAX_AGE}`,
      },
      params: { q: query },
    });
    return res.data;
  } catch (e) {
    console.error(e);
    return [];
  }
};
