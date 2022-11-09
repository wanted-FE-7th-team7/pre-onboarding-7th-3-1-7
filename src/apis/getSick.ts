import axios from 'axios';

const SICK_API_URL = 'http://localhost:4000/sick';

export interface Sick {
  sickCd: string;
  sickNm: string;
}

export interface Cache {
  expired: number;
  value: Sick[];
}

const cacheMap = new Map<string, Cache>();

export const getSick = async (query: string) => {
  if (cacheMap.has(query)) {
    const cache = cacheMap.get(query);
    if (cache) {
      if (cache.expired > new Date().getTime())
        return Promise.resolve(cache.value);
      else cacheMap.delete(query);
    }
  }

  const { data } = await axios.get<Sick[]>(SICK_API_URL, {
    params: { q: query },
  });

  cacheMap.set(query, {
    expired: new Date().getTime() + 5000,
    value: data,
  });

  return data;
};
