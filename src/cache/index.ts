const API_END_POINT = 'http://localhost:4000';

const getCachedData = async (url: string) => {
  const cacheStorage = await caches.open('');
  const cachedResponse = await cacheStorage.match(url);

  if (!cachedResponse || !cachedResponse.ok) {
    return false;
  }
  console.log('cache found!');
  return await cachedResponse.json();
};

const saveDataToCache = async (url: string, response: Response) => {
  const cacheStorage = await caches.open('cat');
  await cacheStorage.put(url, response);
};

export const request = async (url: string, options = {}) => {
  try {
    const cacheData = await getCachedData(url);
    if (cacheData) {
      console.log(cacheData);
      return cacheData;
    }
    const response = await fetch(`${API_END_POINT}/${url}`, {
      ...options,
    });
    await saveDataToCache(url, response.clone());
    if (response.ok) return await response.clone().json();
    throw new Error(response.statusText);
  } catch (e) {
    console.log(e);
  }
};
