"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendedTRPCError = void 0;
const server_1 = require("@trpc/server");
class ExtendedTRPCError extends server_1.TRPCError {
    constructor(props) {
        var _a;
        super(props);
        this.name = 'TRPCError';
        this.extraFields = (_a = props.extraFields) !== null && _a !== void 0 ? _a : {};
    }
}
exports.ExtendedTRPCError = ExtendedTRPCError;
//# sourceMappingURL=types.js.map