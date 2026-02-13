import { withApiHandler } from "@/utils/withApiHandler";
import { error, success } from "@/utils/apiResponse";
import { NextRequest } from "next/server";
import clientPromise from "@/lib/mongodb";
import {DB_NAME} from "@/config/consts";

export const GET = withApiHandler(async (request: NextRequest) => {
  const type =  request.nextUrl.searchParams?.get("type") as string;
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  const collection = db.collection('nail_collection');
  const result =  await collection.find({ type }).toArray();

  if (!result) {
    return Response.json(error("error"), {
      status: 404,
    })
  }
  const res = type ? { type, data: result } : {
    data: result,
  }
  return Response.json(success(res), {
    status: 200,
  });
});