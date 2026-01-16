import { NextResponse } from "next/server";
import { MongoClient, ServerApiVersion } from "mongodb";

export const POST = async (request: Request) => {
  const uri = process.env.MONGO_URI as string;

  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  try {
    await client.connect();
    const body = await request.json();

    // Extract the email variable from req.body
    const { email, habits } = body;
    const result = await client
      .db("habits-tracker")
      .collection("habits")
      .updateOne({ email: email }, { $set: { habits: habits } });
    // Parse the JSON body from the request

    return NextResponse.json({ success: true });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ success: false });
  } finally {
    await client.close();
  }
};
