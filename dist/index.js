"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOpenApiDocument = exports.openApiVersion = exports.fastifyTRPCOpenApiPlugin = exports.createOpenApiAwsLambdaHandler = exports.createOpenApiNuxtHandler = exports.createOpenApiNextHandler = exports.createOpenApiHttpHandler = exports.createOpenApiExpressMiddleware = void 0;
const adapters_1 = require("./adapters");
Object.defineProperty(exports, "createOpenApiAwsLambdaHandler", { enumerable: true, get: function () { return adapters_1.createOpenApiAwsLambdaHandler; } });
Object.defineProperty(exports, "createOpenApiExpressMiddleware", { enumerable: true, get: function () { return adapters_1.createOpenApiExpressMiddleware; } });
Object.defineProperty(exports, "createOpenApiHttpHandler", { enumerable: true, get: function () { return adapters_1.createOpenApiHttpHandler; } });
Object.defineProperty(exports, "createOpenApiNextHandler", { enumerable: true, get: function () { return adapters_1.createOpenApiNextHandler; } });
Object.defineProperty(exports, "createOpenApiNuxtHandler", { enumerable: true, get: function () { return adapters_1.createOpenApiNuxtHandler; } });
Object.defineProperty(exports, "fastifyTRPCOpenApiPlugin", { enumerable: true, get: function () { return adapters_1.fastifyTRPCOpenApiPlugin; } });
const generator_1 = require("./generator");
Object.defineProperty(exports, "generateOpenApiDocument", { enumerable: true, get: function () { return generator_1.generateOpenApiDocument; } });
Object.defineProperty(exports, "openApiVersion", { enumerable: true, get: function () { return generator_1.openApiVersion; } });
//# sourceMappingURL=index.js.map