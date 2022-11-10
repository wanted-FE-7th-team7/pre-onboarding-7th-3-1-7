const myCache = new Map();

export const setMyCacheData = <T>(key: string, data: T) => {
  const value = { data, expired: new Date().getTime() + 5000 };
  myCache.set(key, value);
};

export const getMyCacheData = (key: string) => {
  if (myCache.has(key)) {
    if (myCache.get(key).expired > new Date().getTime()) {
      return myCache.get(key).data;
    } else {
      myCache.delete(key);
    }
  }

  return null;
};
