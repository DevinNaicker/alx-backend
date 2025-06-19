// 1-redis_op.js
import { createClient, print } from 'redis';

const client = createClient();

client.on('error', (err) => {
  console.log(`Redis client not connected to the server: ${err.message}`);
});

client.on('connect', () => {
  console.log('Redis client connected to the server');
});

/**
 * Set a key-value pair in Redis using redis.print for confirmation.
 * @param {string} schoolName
 * @param {string} value
 */
function setNewSchool(schoolName, value) {
  client.set(schoolName, value, print);
}

/**
 * Display the value of a key in Redis.
 * @param {string} schoolName
 */
function displaySchoolValue(schoolName) {
  client.get(schoolName, (err, result) => {
    if (err) {
      console.log(`Error fetching value for ${schoolName}:`, err);
    } else {
      console.log(result);
    }
  });
}

// Call the functions as specified
displaySchoolValue('ALX');
setNewSchool('ALXSanFrancisco', '100');
displaySchoolValue('ALXSanFrancisco');
