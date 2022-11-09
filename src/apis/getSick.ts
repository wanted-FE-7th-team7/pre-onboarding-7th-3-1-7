import axios from 'axios';

export interface Sick {
  sickCd: string;
  sickNm: string;
}
export const getData = (query: string) =>
  axios.get<Sick[]>('http://localhost:4000/sick', {
    params: { q: query },
  });
