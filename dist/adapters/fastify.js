"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fastifyTRPCOpenApiPlugin = void 0;
const core_1 = require("./node-http/core");
function fastifyTRPCOpenApiPlugin(fastify, opts, done) {
    var _a;
    let prefix = (_a = opts.basePath) !== null && _a !== void 0 ? _a : '';
    // if prefix ends with a slash, remove it
    if (prefix.endsWith('/')) {
        prefix = prefix.slice(0, -1);
    }
    const openApiHttpHandler = (0, core_1.createOpenApiNodeHttpHandler)(opts);
    fastify.all(`${prefix}/*`, async (request, reply) => {
        const prefixRemovedFromUrl = request.url.replace(fastify.prefix, '').replace(prefix, '');
        request.raw.url = prefixRemovedFromUrl;
        return await openApiHttpHandler(request, Object.assign(reply, {
            setHeader: (key, value) => {
                if (Array.isArray(value)) {
                    value.forEach((v) => reply.header(key, v));
                    return reply;
                }
                return reply.header(key, value);
            },
            end: (body) => reply.send(body), // eslint-disable-line @typescript-eslint/no-explicit-any
        }));
    });
    done();
}
exports.fastifyTRPCOpenApiPlugin = fastifyTRPCOpenApiPlugin;
//# sourceMappingURL=fastify.js.map