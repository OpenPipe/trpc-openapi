import { TRPCError } from '@trpc/server';
import { ExtendedTRPCError } from '../../types';
export declare const TRPC_ERROR_CODE_HTTP_STATUS: Record<TRPCError['code'], number>;
export declare function getErrorFromUnknown(cause: unknown): ExtendedTRPCError;
//# sourceMappingURL=errors.d.ts.map