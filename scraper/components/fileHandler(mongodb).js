const { MongoClient } = require('mongodb');

// MongoDB connection details vanuit .env
const uri = process.env.MONGO_URI;
const dbName = process.env.MONGO_DB_NAME;
const collectionName = process.env.MONGO_COLLECTION_NAME;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function saveToDatabase(data) {
    try {
        // Connectie met DB
        await client.connect();
        console.log('Connected to MongoDB Atlas');

        // Specificeer database en collectie
        const database = client.db(dbName);
        const collection = database.collection(collectionName);

        // Schrijf document naar collectie
        const result = await collection.insertOne(data);
        console.log(`Data successfully saved with _id: ${result.insertedId}`);
    } catch (error) {
        console.error('Error saving to MongoDB:', error.message);
    } finally {
        // Sluit connectie
        await client.close();
        console.log('MongoDB connection closed');
    }
}

module.exports = { saveToDatabase };