// ...existing code...
import { withApiHandler } from "@/utils/withApiHandler";
import { error, success } from "@/utils/apiResponse";
import clientPromise from "@/lib/mongodb";
import {DB_NAME, COLLECTION_NAME} from "@/config/consts";

export const GET = withApiHandler(async (request: Request) => {
  try {
    // 保护性读取 rawUrl，避免 undefined 导致 new URL 抛错
    const rawUrl = typeof request?.url === "string" ? request.url : "";
    if (!rawUrl) {
      return Response.json(error("url is required"), { status: 400 });
    }

    // 安全解析 type 参数（使用 base 避免相对 URL 抛错）
    let type = "";
    try {
      const u = new URL(rawUrl, '/');
      type = u.searchParams.get("type") ?? "";
    } catch (err: unknown) {
      console.log("🚀 ~ err:", err)
      type = "";
    }

    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);

    // 如果 type 为空则查询全部
    const filter = typeof type === "string" && type ? { type } : {};
    const result = await collection.find(filter).toArray();

    if (!result) {
      return Response.json(error("error"), { status: 404 });
    }

    const res = type ? { type, data: result } : { data: result };
    return Response.json(success(res), { status: 200 });
  } catch (err: unknown) {
    console.error('API /api/detail handler error:', err);
    return Response.json(error('internal error'), { status: 500 });
  }
});
// ...existing code...