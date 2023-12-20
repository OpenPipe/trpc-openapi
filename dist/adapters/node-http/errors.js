"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getErrorFromUnknown = exports.TRPC_ERROR_CODE_HTTP_STATUS = void 0;
const server_1 = require("@trpc/server");
exports.TRPC_ERROR_CODE_HTTP_STATUS = {
    PARSE_ERROR: 400,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    TIMEOUT: 408,
    CONFLICT: 409,
    CLIENT_CLOSED_REQUEST: 499,
    PRECONDITION_FAILED: 412,
    PAYLOAD_TOO_LARGE: 413,
    METHOD_NOT_SUPPORTED: 405,
    TOO_MANY_REQUESTS: 429,
    UNPROCESSABLE_CONTENT: 422,
};
function getErrorFromUnknown(cause) {
    if (cause instanceof Error && cause.name === 'TRPCError') {
        return cause;
    }
    let errorCause = undefined;
    let stack = undefined;
    if (cause instanceof Error) {
        errorCause = cause;
        stack = cause.stack;
    }
    const error = new server_1.TRPCError({
        message: 'Internal server error',
        code: 'INTERNAL_SERVER_ERROR',
        cause: errorCause,
    });
    if (stack) {
        error.stack = stack;
    }
    return error;
}
exports.getErrorFromUnknown = getErrorFromUnknown;
//# sourceMappingURL=errors.js.map