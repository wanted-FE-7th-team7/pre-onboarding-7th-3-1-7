import { http, URLS } from './api';
import { Sick } from '../types';
import { getMyCacheData, setMyCacheData } from '../cache';

export const getSicks = async (query: string) => {
  if (getMyCacheData(query)) {
    console.info('use Cached Data');
    return getMyCacheData(query);
  }

  try {
    console.info('api 호출');
    const res = await http.get<Sick[]>(URLS.SICK, {
      params: { sickNm_like: query },
    });
    setMyCacheData(query, res.data);
    return res.data;
  } catch (e) {
    console.error(e);
    return [];
  }
};
