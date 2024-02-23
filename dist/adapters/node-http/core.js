"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOpenApiNodeHttpHandler = void 0;
const server_1 = require("@trpc/server");
const lodash_clonedeep_1 = __importDefault(require("lodash.clonedeep"));
const generator_1 = require("../../generator");
const method_1 = require("../../utils/method");
const path_1 = require("../../utils/path");
const procedure_1 = require("../../utils/procedure");
const zod_1 = require("../../utils/zod");
const errors_1 = require("./errors");
const input_1 = require("./input");
const procedures_1 = require("./procedures");
const createOpenApiNodeHttpHandler = (opts) => {
    const router = (0, lodash_clonedeep_1.default)(opts.router);
    // Validate router
    if (process.env.NODE_ENV !== 'production') {
        (0, generator_1.generateOpenApiDocument)(router, { title: '', version: '', baseUrl: '' });
    }
    const { createContext, responseMeta, onError, maxBodySize } = opts;
    const getProcedure = (0, procedures_1.createProcedureCache)(router);
    return async (req, res, next) => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        const sendResponse = (statusCode, headers, body) => {
            res.statusCode = statusCode;
            // Support sending SSE streams
            if (body && typeof body.getReader === 'function') {
                const reader = body.getReader();
                res.setHeader('Connection', 'keep-alive');
                res.setHeader('Content-Type', 'text/event-stream');
                res.setHeader('Cache-Control', 'no-cache');
                res.flushHeaders();
                const processStream = async (reader, res) => {
                    try {
                        let done, value;
                        do {
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                            ({ done, value } = await reader.read());
                            if (!done) {
                                res.write(`data: ${Buffer.from(value.buffer).toString()}\n\n`);
                                // @ts-expect-error flush is not in the types
                                res.flush();
                            }
                        } while (!done);
                    }
                    catch (error) {
                        console.error('Error while reading from stream', error);
                    }
                    finally {
                        reader.releaseLock();
                        res.end();
                    }
                };
                void processStream(reader, res);
            }
            else {
                res.setHeader('Content-Type', 'application/json');
                for (const [key, value] of Object.entries(headers)) {
                    if (typeof value !== 'undefined') {
                        res.setHeader(key, value);
                    }
                }
                res.end(JSON.stringify(body));
            }
        };
        const method = req.method;
        const reqUrl = req.url;
        const url = new URL(reqUrl.startsWith('/') ? `http://127.0.0.1${reqUrl}` : reqUrl);
        const path = (0, path_1.normalizePath)(url.pathname);
        const { procedure, pathInput } = (_a = getProcedure(method, path)) !== null && _a !== void 0 ? _a : {};
        let input = undefined;
        let ctx = undefined;
        let data = undefined;
        try {
            if (!procedure) {
                if (next) {
                    return next();
                }
                // Can be used for warmup
                if (method === 'HEAD') {
                    sendResponse(204, {}, undefined);
                    return;
                }
                throw new server_1.TRPCError({
                    message: 'Not found',
                    code: 'NOT_FOUND',
                });
            }
            const useBody = (0, method_1.acceptsRequestBody)(method);
            const schema = (0, procedure_1.getInputOutputParsers)(procedure.procedure).inputParser;
            const unwrappedSchema = (0, zod_1.unwrapZodType)(schema, true);
            // input should stay undefined if z.void()
            if (!(0, zod_1.instanceofZodTypeLikeVoid)(unwrappedSchema)) {
                input = Object.assign(Object.assign({}, (useBody ? await (0, input_1.getBody)(req, maxBodySize) : (0, input_1.getQuery)(req, url))), pathInput);
            }
            // if supported, coerce all string values to correct types
            if (zod_1.zodSupportsCoerce) {
                if ((0, zod_1.instanceofZodTypeObject)(unwrappedSchema)) {
                    Object.values(unwrappedSchema.shape).forEach((shapeSchema) => {
                        const unwrappedShapeSchema = (0, zod_1.unwrapZodType)(shapeSchema, false);
                        if ((0, zod_1.instanceofZodTypeCoercible)(unwrappedShapeSchema)) {
                            unwrappedShapeSchema._def.coerce = true;
                        }
                    });
                }
            }
            ctx = await (createContext === null || createContext === void 0 ? void 0 : createContext({ req, res }));
            const caller = router.createCaller(ctx);
            const segments = procedure.path.split('.');
            const procedureFn = segments.reduce((acc, curr) => acc[curr], caller);
            data = await procedureFn(input);
            const meta = responseMeta === null || responseMeta === void 0 ? void 0 : responseMeta({
                type: procedure.type,
                paths: [procedure.path],
                ctx,
                data: [data],
                errors: [],
            });
            const statusCode = (_b = meta === null || meta === void 0 ? void 0 : meta.status) !== null && _b !== void 0 ? _b : 200;
            const headers = (_c = meta === null || meta === void 0 ? void 0 : meta.headers) !== null && _c !== void 0 ? _c : {};
            const body = data;
            sendResponse(statusCode, headers, body);
        }
        catch (cause) {
            const error = (0, errors_1.getErrorFromUnknown)(cause);
            onError === null || onError === void 0 ? void 0 : onError({
                error,
                type: (_d = procedure === null || procedure === void 0 ? void 0 : procedure.type) !== null && _d !== void 0 ? _d : 'unknown',
                path: procedure === null || procedure === void 0 ? void 0 : procedure.path,
                input,
                ctx,
                req,
            });
            const meta = responseMeta === null || responseMeta === void 0 ? void 0 : responseMeta({
                type: (_e = procedure === null || procedure === void 0 ? void 0 : procedure.type) !== null && _e !== void 0 ? _e : 'unknown',
                paths: (procedure === null || procedure === void 0 ? void 0 : procedure.path) ? [procedure === null || procedure === void 0 ? void 0 : procedure.path] : undefined,
                ctx,
                data: [data],
                errors: [error],
            });
            const errorShape = router.getErrorShape({
                error,
                type: (_f = procedure === null || procedure === void 0 ? void 0 : procedure.type) !== null && _f !== void 0 ? _f : 'unknown',
                path: procedure === null || procedure === void 0 ? void 0 : procedure.path,
                input,
                ctx,
            });
            const isInputValidationError = error.code === 'BAD_REQUEST' &&
                error.cause instanceof Error &&
                error.cause.name === 'ZodError';
            const statusCode = (_h = (_g = meta === null || meta === void 0 ? void 0 : meta.status) !== null && _g !== void 0 ? _g : errors_1.TRPC_ERROR_CODE_HTTP_STATUS[error.code]) !== null && _h !== void 0 ? _h : 500;
            const headers = (_j = meta === null || meta === void 0 ? void 0 : meta.headers) !== null && _j !== void 0 ? _j : {};
            const body = Object.assign({ message: isInputValidationError
                    ? 'Input validation failed'
                    : (_l = (_k = errorShape === null || errorShape === void 0 ? void 0 : errorShape.message) !== null && _k !== void 0 ? _k : error.message) !== null && _l !== void 0 ? _l : 'An error occurred', code: error.code, issues: isInputValidationError ? error.cause.errors : undefined }, error.extraFields);
            sendResponse(statusCode, headers, body);
        }
    };
};
exports.createOpenApiNodeHttpHandler = createOpenApiNodeHttpHandler;
//# sourceMappingURL=core.js.map