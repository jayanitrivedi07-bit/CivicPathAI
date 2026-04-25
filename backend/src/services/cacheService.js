const cache = new Map();

const get = (key) => {
  const item = cache.get(key);
  if (!item) return null;
  
  if (Date.now() > item.expiry) {
    cache.delete(key);
    return null;
  }
  return item.value;
};

const set = (key, value, ttlSeconds = 300) => {
  cache.set(key, {
    value,
    expiry: Date.now() + (ttlSeconds * 1000)
  });
};

module.exports = {
  get,
  set
};
