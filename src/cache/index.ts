// 로컬 캐싱 구현
const myCache = new Map();

export const setMyCacheData = <T>(key: string, data: T) => {
  myCache.set(key, data);
};

export const getMyCacheData = (key: string) => {
  return myCache.get(key);
};
