"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOpenApiExpressMiddleware = void 0;
const core_1 = require("./node-http/core");
const createOpenApiExpressMiddleware = (opts) => {
    const openApiHttpHandler = (0, core_1.createOpenApiNodeHttpHandler)(opts);
    return async (req, res) => {
        await openApiHttpHandler(req, res);
    };
};
exports.createOpenApiExpressMiddleware = createOpenApiExpressMiddleware;
//# sourceMappingURL=express.js.map