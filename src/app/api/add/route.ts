
import { withApiHandler } from "@/utils/withApiHandler";
import { error, success } from "@/utils/apiResponse";
import { NextRequest } from "next/server";
import clientPromise from "@/lib/mongodb";
import { DB_NAME } from "@/config/consts";
import { v4 as uuidv4 } from 'uuid';

export const runtime = 'edge';

export const POST = withApiHandler(async (request: NextRequest) => {
  const body = await request.json();
  const { type, amount, date, content } = body;
  if (!type || (type === 'insight' && !content) || (type !== 'insight' && (!amount || !date))) {
    return Response.json(
        error("params data error, please check"),
        { status: 400 }
    )
  }

  const client = await clientPromise;
  const db = client.db(DB_NAME);
  const collection = db.collection("nail_collection");
  const result = await collection.insertOne({
    type,
    amount,
    date,
    content,
    id: uuidv4(),
  });
  return Response.json(success({ id: result.insertedId }), {
    status: 200,
  });
});