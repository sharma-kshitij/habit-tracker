import { NextResponse } from "next/server";

import { MongoClient, ServerApiVersion } from "mongodb";

export const GET = async () => {
  const uri = process.env.MONGO_URI as string;

  // Create a MongoClient with a MongoClientOptions object to set the Stable API version
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  try {
    // Connect the client to the server
    await client.connect();

    const db = client.db("habits-tracker");
    const coll = db.collection("habits");

    // Find all records and convert to array
    const records = await coll.find({}).toArray();

    return NextResponse.json({
      success: true,
      records: records,
      count: records.length,
    });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch records",
      },
      { status: 500 }
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
};
