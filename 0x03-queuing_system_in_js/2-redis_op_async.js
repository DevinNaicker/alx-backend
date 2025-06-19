// 2-redis_op_async.js
import { createClient, print } from 'redis';
import { promisify } from 'util';

const client = createClient();

client.on('error', (err) => {
  console.log(`Redis client not connected to the server: ${err.message}`);
});

client.on('connect', () => {
  console.log('Redis client connected to the server');
});

// Promisify the GET command
const getAsync = promisify(client.get).bind(client);

/**
 * Set a key-value pair in Redis using redis.print for confirmation.
 * @param {string} schoolName
 * @param {string} value
 */
function setNewSchool(schoolName, value) {
  client.set(schoolName, value, print);
}

/**
 * Display the value of a key in Redis using async/await.
 * @param {string} schoolName
 */
async function displaySchoolValue(schoolName) {
  try {
    const value = await getAsync(schoolName);
    console.log(value);
  } catch (err) {
    console.log(`Error fetching value for ${schoolName}: ${err.message}`);
  }
}

// Function calls
displaySchoolValue('ALX');
setNewSchool('ALXSanFrancisco', '100');
displaySchoolValue('ALXSanFrancisco');
