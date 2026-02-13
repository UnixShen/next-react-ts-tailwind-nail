
import { NextRequest } from "next/server";
import { error } from "@/utils/apiResponse";
import { BUSINESS_STATUS_CODE } from "@/config/consts";

export const withApiHandler = (
    handler: (request: NextRequest) => Promise<Response>,
    defaultStatus = BUSINESS_STATUS_CODE.ERROR) => {
    return async (request: NextRequest) => {
        try {
            return await handler(request);
        } catch (err: unknown) {
            const errorMessage =
                typeof err === "object" && err !== null && "message" in err
                    ? (err as { message: string }).message
                    : "Internal Server Error c";
            return Response.json(
                error(errorMessage, defaultStatus),
                { status: defaultStatus }
            );
        }
    };
};