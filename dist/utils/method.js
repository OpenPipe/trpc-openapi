"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.acceptsRequestBody = void 0;
const acceptsRequestBody = (method) => {
    if (method === 'GET' || method === 'DELETE') {
        return false;
    }
    return true;
};
exports.acceptsRequestBody = acceptsRequestBody;
//# sourceMappingURL=method.js.map