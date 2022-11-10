import { AxiosResponse } from 'axios';
import { http, URLS } from './api';
import { Cache, Sick } from '../types';

const cache: Cache = {};

export const getSicksQuery = async (query: string) => {
  if (cache[query]) {
    console.info('use Cache');
    return cache[query];
  }

  console.info('calling api');
  const { data }: AxiosResponse<Sick[]> = await http.get(URLS.SICK, {
    params: { sickNm_like: query },
  });

  cache[query] = data;

  return data;
};
