import { redis } from "../lib/redis.js";

export const addRecentlyViewed = async (userId, itemId) => {
  const key = `recently_viewed:user:${userId}`;
  // removed all item if already in list.
  await redis.lrem(key, 0, itemId);
  //added item on top of the list,
  await redis.lpush(key, itemId);
  // trim list to 10 items,
  await redis.ltrim(key, 0, 9);
};
export const getRecentlyViewed = async (userId) => {
  const key = `recently_viewed:user:${userId}`;

  try {
    const items = await redis.lrange(key, 0, -1); // gives ["prodID-1","prodID-2",...] of recently viewed
    return items;
  } catch (error) {
    console.error("Error fetching from Redis:", error);
    return [];
  }
};
