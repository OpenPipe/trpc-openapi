"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOpenApiAwsLambdaHandler = void 0;
const server_1 = require("@trpc/server");
const aws_lambda_1 = require("@trpc/server/adapters/aws-lambda");
const events_1 = require("events");
const node_mocks_http_1 = require("node-mocks-http");
const core_1 = require("./node-http/core");
const errors_1 = require("./node-http/errors");
const createMockNodeHTTPPath = (event) => {
    let path = (0, aws_lambda_1.getPath)(event);
    if (!path.startsWith('/')) {
        path = `/${path}`;
    }
    return path;
};
const createMockNodeHTTPRequest = (path, event) => {
    var _a;
    const url = event.requestContext.domainName
        ? `https://${event.requestContext.domainName}${path}`
        : path;
    const method = (0, aws_lambda_1.getHTTPMethod)(event).toUpperCase();
    let body = undefined;
    const contentType = event.headers[(_a = Object.keys(event.headers).find((key) => key.toLowerCase() === 'content-type')) !== null && _a !== void 0 ? _a : ''];
    if (contentType === 'application/json') {
        try {
            if (event.body) {
                body = JSON.parse(event.body);
            }
        }
        catch (cause) {
            throw new server_1.TRPCError({
                message: 'Failed to parse request body',
                code: 'PARSE_ERROR',
                cause,
            });
        }
    }
    if (contentType === 'application/x-www-form-urlencoded') {
        try {
            if (event.body) {
                const searchParamsString = event.isBase64Encoded
                    ? Buffer.from(event.body, 'base64').toString('utf-8')
                    : event.body;
                const searchParams = new URLSearchParams(searchParamsString);
                body = {};
                for (const [key, value] of searchParams.entries()) {
                    body[key] = value;
                }
            }
        }
        catch (cause) {
            throw new server_1.TRPCError({
                message: 'Failed to parse request body',
                code: 'PARSE_ERROR',
                cause,
            });
        }
    }
    return (0, node_mocks_http_1.createRequest)({
        url,
        method,
        query: event.queryStringParameters || undefined,
        headers: event.headers,
        body,
    });
};
const createMockNodeHTTPResponse = () => {
    return (0, node_mocks_http_1.createResponse)({ eventEmitter: events_1.EventEmitter });
};
const createOpenApiAwsLambdaHandler = (opts) => {
    return async (event, context) => {
        var _a, _b, _c, _d, _e, _f, _g;
        let path;
        try {
            if (!(0, aws_lambda_1.isPayloadV1)(event) && !(0, aws_lambda_1.isPayloadV2)(event)) {
                throw new server_1.TRPCError({
                    message: aws_lambda_1.UNKNOWN_PAYLOAD_FORMAT_VERSION_ERROR_MESSAGE,
                    code: 'INTERNAL_SERVER_ERROR',
                });
            }
            const createContext = async () => { var _a; return (_a = opts.createContext) === null || _a === void 0 ? void 0 : _a.call(opts, { event, context }); };
            const openApiHttpHandler = (0, core_1.createOpenApiNodeHttpHandler)(Object.assign(Object.assign({}, opts), { createContext }));
            path = createMockNodeHTTPPath(event);
            const req = createMockNodeHTTPRequest(path, event);
            const res = createMockNodeHTTPResponse();
            await openApiHttpHandler(req, res);
            return {
                statusCode: res.statusCode,
                headers: (0, aws_lambda_1.transformHeaders)(res._getHeaders() || {}),
                body: res._getData(),
            };
        }
        catch (cause) {
            const error = (0, errors_1.getErrorFromUnknown)(cause);
            (_a = opts.onError) === null || _a === void 0 ? void 0 : _a.call(opts, {
                error,
                type: 'unknown',
                path,
                input: undefined,
                ctx: undefined,
                req: event,
            });
            const meta = (_b = opts.responseMeta) === null || _b === void 0 ? void 0 : _b.call(opts, {
                type: 'unknown',
                paths: [path],
                ctx: undefined,
                data: [undefined],
                errors: [error],
            });
            const errorShape = opts.router.getErrorShape({
                error,
                type: 'unknown',
                path,
                input: undefined,
                ctx: undefined,
            });
            const statusCode = (_d = (_c = meta === null || meta === void 0 ? void 0 : meta.status) !== null && _c !== void 0 ? _c : errors_1.TRPC_ERROR_CODE_HTTP_STATUS[error.code]) !== null && _d !== void 0 ? _d : 500;
            const headers = Object.assign({ 'content-type': 'application/json' }, ((_e = meta === null || meta === void 0 ? void 0 : meta.headers) !== null && _e !== void 0 ? _e : {}));
            const body = {
                message: (_g = (_f = errorShape === null || errorShape === void 0 ? void 0 : errorShape.message) !== null && _f !== void 0 ? _f : error.message) !== null && _g !== void 0 ? _g : 'An error occurred',
                code: error.code,
            };
            return {
                statusCode,
                headers,
                body: JSON.stringify(body),
            };
        }
    };
};
exports.createOpenApiAwsLambdaHandler = createOpenApiAwsLambdaHandler;
//# sourceMappingURL=aws-lambda.js.map