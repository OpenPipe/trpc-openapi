import { TRPCError } from '@trpc/server';
export declare const TRPC_ERROR_CODE_HTTP_STATUS: Record<TRPCError['code'], number>;
export declare function getErrorFromUnknown(cause: unknown): TRPCError;
//# sourceMappingURL=errors.d.ts.map