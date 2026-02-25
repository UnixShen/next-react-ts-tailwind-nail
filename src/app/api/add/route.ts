// ...existing code...
import { withApiHandler } from "@/utils/withApiHandler";
import { error, success } from "@/utils/apiResponse";
import clientPromise from "@/lib/mongodb";
import { DB_NAME, COLLECTION_NAME } from "@/config/consts";
import { v4 as uuidv4 } from 'uuid';

export const POST = withApiHandler(async (request: Request) => {
  try {
    if (!request) {
      return Response.json(
          error("params data error, please check"),
          { status: 400 }
      );
    }

    // 安全解析 body（防止 request.json 抛错）
    let body: any = {};
    try {
      if (typeof (request as any).json === 'function') {
        body = await (request as any).json() || {};
      }
    } catch (e: unknown) {
      body = {};
    }

    const { type, amount, date, content } = body as { type?: string, amount?: number, date?: string, content?: string };

    if (!type || (type === 'insight' && !content) || (type !== 'insight' && (!amount || !date))) {
      return Response.json(
          error("params data error, please check"),
          { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);
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
  } catch (err) {
    console.error('API /api/add handler error:', err);
    return Response.json(error('internal error'), { status: 500 });
  }
});