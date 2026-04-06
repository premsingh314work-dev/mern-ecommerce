
import { createClient } from 'redis';

// Use a local redis URL for dev, or a cloud URL (like Upstash) for production
const redisClient = createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379'
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.on('connect', () => console.log('Redis connected successfully'));

await redisClient.connect();

export default redisClient;