const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@krushnampriya-yog.31aeypu.mongodb.net/?retryWrites=true&w=majority&appName=krushnampriya-yog`;
const client = new MongoClient(uri);

async function clearCollections() {
  try {
    await client.connect();
    console.log("🧹 Connected to MongoDB. Starting to clear data...");

    const db = client.db("krushnampriya-yog");

    const collectionsToClear = [
      "users",
      "classes",
      "cart",
      "enrolled",
      "payments"
    ];

    for (const name of collectionsToClear) {
      const result = await db.collection(name).deleteMany({});
      console.log(`🗑️ Cleared ${result.deletedCount} document(s) from "${name}" collection.`);
    }

    console.log("✅ All specified collections have been cleared.");
  } catch (err) {
    console.error("❌ Error clearing collections:", err);
  } finally {
    await client.close();
    console.log("🔌 MongoDB connection closed.");
  }
}

clearCollections();
