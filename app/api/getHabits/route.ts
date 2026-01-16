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
    const { email } = body;
    const habits = await client
      .db("habits-tracker")
      .collection("habits")
      .find({ email: email })
      .toArray();
    // Parse the JSON body from the request

    return NextResponse.json({ success: true, email, habits: habits });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ success: false });
  }
};
