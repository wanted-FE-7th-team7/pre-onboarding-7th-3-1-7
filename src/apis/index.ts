import axios from 'axios';
import { Sick } from '../interfaces';

const API_ENDPOINT = 'http://localhost:4000';

export const getSearchResult = async (query: string) => {
  try {
    console.log('api 호출');
    const res = await axios.get<Sick[]>(`${API_ENDPOINT}/sick`, {
      params: { q: query },
    });
    return res.data;
  } catch (e) {
    console.error(e);
    return [];
  }
};
