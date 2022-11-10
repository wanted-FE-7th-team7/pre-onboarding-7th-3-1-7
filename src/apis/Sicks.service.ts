import { AxiosResponse } from 'axios';
import { http, URLS } from './api';
import { Sick } from '../types';

export const getSicksQuery = async (query: string) => {
  console.info('calling api');
  const { data }: AxiosResponse<Sick[]> = await http.get(URLS.SICK, {
    params: { sickNm_like: query },
  });
  return data;
};
