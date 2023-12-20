"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forEachOpenApiProcedure = exports.getInputOutputParsers = void 0;
const zod_1 = require("zod");
const mergeInputs = (inputParsers) => {
    return inputParsers.reduce((acc, inputParser) => {
        return acc.merge(inputParser);
    }, zod_1.z.object({}));
};
// `inputParser` & `outputParser` are private so this is a hack to access it
const getInputOutputParsers = (procedure) => {
    const { inputs, output } = procedure._def;
    return {
        inputParser: inputs.length >= 2 ? mergeInputs(inputs) : inputs[0],
        outputParser: output,
    };
};
exports.getInputOutputParsers = getInputOutputParsers;
const getProcedureType = (procedure) => {
    if (procedure._def.query)
        return 'query';
    if (procedure._def.mutation)
        return 'mutation';
    if (procedure._def.subscription)
        return 'subscription';
    throw new Error('Unknown procedure type');
};
const forEachOpenApiProcedure = (procedureRecord, callback) => {
    var _a;
    for (const [path, procedure] of Object.entries(procedureRecord)) {
        const { openapi } = (_a = procedure._def.meta) !== null && _a !== void 0 ? _a : {};
        if (openapi && openapi.enabled !== false) {
            const type = getProcedureType(procedure);
            callback({ path, type, procedure, openapi });
        }
    }
};
exports.forEachOpenApiProcedure = forEachOpenApiProcedure;
//# sourceMappingURL=procedure.js.map