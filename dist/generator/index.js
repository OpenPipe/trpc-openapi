"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOpenApiDocument = exports.openApiVersion = void 0;
const paths_1 = require("./paths");
const schema_1 = require("./schema");
exports.openApiVersion = '3.0.3';
const generateOpenApiDocument = (appRouter, opts) => {
    var _a;
    const securitySchemes = opts.securitySchemes || {
        Authorization: {
            type: 'http',
            scheme: 'bearer',
        },
    };
    return {
        openapi: exports.openApiVersion,
        info: {
            title: opts.title,
            description: opts.description,
            version: opts.version,
        },
        servers: [
            {
                url: opts.baseUrl,
            },
        ],
        paths: (0, paths_1.getOpenApiPathsObject)(appRouter, Object.keys(securitySchemes)),
        components: {
            securitySchemes,
            responses: {
                error: schema_1.errorResponseObject,
            },
        },
        tags: (_a = opts.tags) === null || _a === void 0 ? void 0 : _a.map((tag) => ({ name: tag })),
        externalDocs: opts.docsUrl ? { url: opts.docsUrl } : undefined,
    };
};
exports.generateOpenApiDocument = generateOpenApiDocument;
//# sourceMappingURL=index.js.map