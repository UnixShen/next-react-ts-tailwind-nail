
// import { NextRequest } from "next/server";
// import { error } from "@/utils/apiResponse";
// import { BUSINESS_STATUS_CODE } from "@/config/consts";

// ...existing code...
export function withApiHandler(handler: (req: Request) => Promise<Response>) {
  return async (req: Request) => {
    try {
      // 保护性读取 headers，避免对 undefined 调用 .startsWith
      const getHeader = (name: string) => {
        try {
          const h = (req as any)?.headers?.get?.(name);
          return typeof h === 'string' ? h : '';
        } catch (e) {
          return '';
        }
      };

      // 示例：如果需要基于 content-type 做分支，先做类型校验
      const contentType = getHeader('content-type');
      // if (contentType && contentType.startsWith('application/json')) { ... }

      const resp = await handler(req as any);
      return resp;
    } catch (err) {
      console.error('withApiHandler caught error:', err);
      return new Response(JSON.stringify({ error: 'internal error' }), {
        status: 500,
        headers: { 'content-type': 'application/json' },
      });
    }
  };
}
// ...existing code...