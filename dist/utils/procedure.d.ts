import { ProcedureType } from '@trpc/server';
import { AnyZodObject } from 'zod';
import { OpenApiMeta, OpenApiProcedure, OpenApiProcedureRecord } from '../types';
export declare const getInputOutputParsers: (procedure: OpenApiProcedure) => {
    inputParser: AnyZodObject | import("@trpc/server/dist/core/parser").Parser | undefined;
    outputParser: import("@trpc/server/dist/core/parser").Parser | undefined;
};
export declare const forEachOpenApiProcedure: (procedureRecord: OpenApiProcedureRecord, callback: (values: {
    path: string;
    type: ProcedureType;
    procedure: OpenApiProcedure;
    openapi: NonNullable<OpenApiMeta['openapi']>;
}) => void) => void;
//# sourceMappingURL=procedure.d.ts.map