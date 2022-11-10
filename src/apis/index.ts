import axios from 'axios';
import { getMyCacheData, setMyCacheData } from '../cache';
import { Sick } from '../interfaces';

const API_ENDPOINT = 'http://localhost:4000';
const MAX_AGE = 6000;

export const getSickList = async (query: string) => {
  // cache와 일치하는지 찾음
  if (getMyCacheData(query)) {
    return getMyCacheData(query);
  }
  try {
    console.log('api 호출');
    const res = await axios.get<Sick[]>(`${API_ENDPOINT}/sick`, {
      headers: {
        'Cache-Control': `max-age=${MAX_AGE}`,
      },
      params: { q: query },
    });
    setMyCacheData(query, res.data);
    return res.data;
  } catch (e) {
    console.error(e);
    return [];
  }
};
