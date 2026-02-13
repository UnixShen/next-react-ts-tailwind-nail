import { withApiHandler } from "@/utils/withApiHandler";
import { NextRequest } from "next/server";
import { success, error } from "@/utils/apiResponse";
import clientPromise from "@/lib/mongodb";
import { DB_NAME } from "@/config/consts";

export const DELETE = withApiHandler(async (req: NextRequest) => {
    const id = new URL(req.url).searchParams.get("id") as string;
    if (!id) {
        return Response.json(error("id is required"), {
            status: 400,
        })
    }
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const collection = db.collection("nail_collection");
    const res = await collection.deleteOne({ id });
    if (res.deletedCount === 0) {
        return Response.json(error("Delete Failed"), {
            status: 400,
        })
    }
    return Response.json(
        success(null, "Delete Success"),
        { status: 200 }
    );
})