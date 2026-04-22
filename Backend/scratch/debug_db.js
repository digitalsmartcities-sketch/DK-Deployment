const { MongoClient } = require('mongodb');
require('dotenv').config();

const url = process.env.DB_URL || 'mongodb://localhost:27017';
const dbName = 'digital-kohat'; // Fallback if not in URI

async function main() {
  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db();

    const collection = db.collection('serviceProviderRequests');
    const requests = await collection.find({}).toArray();

    console.log(`\nFound ${requests.length} total requests in 'serviceProviderRequests' collection:\n`);
    
    if (requests.length === 0) {
      console.log("Collection is EMPTY.");
    }

    requests.forEach((req, index) => {
      console.log(`[${index + 1}] ID: ${req._id}`);
      console.log(`    Email: ${req.email}`);
      console.log(`    Category: "${req.catagory}" (internal field: catagory)`);
      console.log(`    Type: ${req.type}`);
      console.log(`    Location: ${req.location || 'MISSING'}`);
      console.log(`    Address: ${req.address || 'MISSING'}`);
      console.log(`    Status: ${req.status}`);
      console.log(`    -`.repeat(30));
    });

  } catch (err) {
    console.error('Error during diagnostic:', err);
  } finally {
    await client.close();
  }
}

main();
