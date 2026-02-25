// ...existing code...
import { withApiHandler } from "@/utils/withApiHandler";
import { success, error } from "@/utils/apiResponse";
import clientPromise from "@/lib/mongodb";
import { DB_NAME, COLLECTION_NAME } from "@/config/consts";

export const DELETE = withApiHandler(async (req: Request) => {
  try {
    // 保护性读取 URL（避免 undefined 或非字符串导致 new URL 抛错）
    const rawUrl = typeof (req as any)?.url === "string" ? (req as any).url : "";
    if (!rawUrl) {
      return Response.json(error("url is required"), {
        status: 400,
      });
    }

    // 解析 id，优先使用 URL，解析失败则用正则兜底
    let id = "";
    try {
      const u = new URL(rawUrl,'/');
      id = u.searchParams?.get("id") ?? "";
    } catch (e) {
      const m = rawUrl.match(/[?&]id=([^&]+)/);
      id = m ? decodeURIComponent(m[1]) : "";
    }

    if (!id) {
      return Response.json(error("id is required"), {
        status: 400,
      });
    }

    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);
    const res = await collection.deleteOne({ id });
    if (res.deletedCount === 0) {
      return Response.json(error("Delete Failed"), {
        status: 400,
      });
    }
    return Response.json(
      success(null, "Delete Success"),
      { status: 200 }
    );
  } catch (err) {
    console.error('API /api/delete handler error:', err);
    return Response.json(error('internal error'), { status: 500 });
  }
})
// ...existing code...