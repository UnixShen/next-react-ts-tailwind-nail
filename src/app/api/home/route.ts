import clientPromise from "@/lib/mongodb";
import { DB_NAME } from "@/config/consts";
import { formatHomeData } from "./format";
import { success } from "@/utils/apiResponse";

export const runtime = 'edge';

export const GET = async () => {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const collection = db.collection('nail_collection');

    const date = new Date().toISOString().slice(0, 10);
    const month = new Date().toISOString().slice(0, 7);
    const resToday = await collection.find({date}).toArray();
    const resMonth = await collection.find({
        date: {
            $gte: `${month}-01`,
            $lt: `${month}-32`,
        }
    }).toArray();

    const res = formatHomeData(JSON.parse(JSON.stringify(resToday)), JSON.parse(JSON.stringify(resMonth)));
    return Response.json(success(res), {status: 200});
}