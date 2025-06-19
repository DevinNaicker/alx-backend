// 4-redis_advanced_op.js
import { createClient, print } from 'redis';

const client = createClient();

client.on('error', (err) => {
  console.log(`Redis client not connected to the server: ${err.message}`);
});

client.on('connect', () => {
  console.log('Redis client connected to the server');
});

// Hash key
const hashKey = 'ALX';

// Store hash values
client.hset(hashKey, 'Portland', 50, print);
client.hset(hashKey, 'Seattle', 80, print);
client.hset(hashKey, 'New York', 20, print);
client.hset(hashKey, 'Bogota', 20, print);
client.hset(hashKey, 'Cali', 40, print);
client.hset(hashKey, 'Paris', 2, print);

// Retrieve and display the hash
client.hgetall(hashKey, (err, obj) => {
  if (err) {
    console.log(`Error fetching hash: ${err.message}`);
  } else {
    console.log(obj);
  }
});
