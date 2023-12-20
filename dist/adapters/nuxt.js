"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOpenApiNuxtHandler = void 0;
const server_1 = require("@trpc/server");
const h3_1 = require("h3");
const path_1 = require("../utils/path");
const core_1 = require("./node-http/core");
const createOpenApiNuxtHandler = (opts) => {
    const openApiHttpHandler = (0, core_1.createOpenApiNodeHttpHandler)(opts);
    return (0, h3_1.defineEventHandler)(async (event) => {
        var _a;
        let pathname = null;
        const params = event.context.params;
        if (params && (params === null || params === void 0 ? void 0 : params.trpc)) {
            if (!params.trpc.includes('/')) {
                pathname = params.trpc;
            }
            else {
                pathname = params.trpc;
            }
        }
        if (pathname === null) {
            const error = new server_1.TRPCError({
                message: 'Query "trpc" not found - is the `trpc-openapi` file named `[...trpc].ts`?',
                code: 'INTERNAL_SERVER_ERROR',
            });
            (_a = opts.onError) === null || _a === void 0 ? void 0 : _a.call(opts, {
                error,
                type: 'unknown',
                path: undefined,
                input: undefined,
                ctx: undefined,
                req: event.node.req,
            });
            event.node.res.statusCode = 500;
            event.node.res.setHeader('Content-Type', 'application/json');
            const body = {
                message: error.message,
                code: error.code,
            };
            event.node.res.end(JSON.stringify(body));
            return;
        }
        event.node.req.query = (0, h3_1.getQuery)(event);
        event.node.req.url = (0, path_1.normalizePath)(pathname);
        await openApiHttpHandler(event.node.req, event.node.res);
    });
};
exports.createOpenApiNuxtHandler = createOpenApiNuxtHandler;
//# sourceMappingURL=nuxt.js.map