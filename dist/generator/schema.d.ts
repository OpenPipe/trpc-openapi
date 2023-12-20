import { OpenAPIV3 } from 'openapi-types';
import { OpenApiContentType } from '../types';
export declare const getParameterObjects: (schema: unknown, pathParameters: string[], inType: 'all' | 'path' | 'query', example: Record<string, any> | undefined) => OpenAPIV3.ParameterObject[] | undefined;
export declare const getRequestBodyObject: (schema: unknown, pathParameters: string[], contentTypes: OpenApiContentType[], example: Record<string, any> | undefined) => OpenAPIV3.RequestBodyObject | undefined;
export declare const errorResponseObject: OpenAPIV3.ResponseObject;
export declare const getResponsesObject: (schema: unknown, example: Record<string, any> | undefined, headers: Record<string, OpenAPIV3.HeaderObject | OpenAPIV3.ReferenceObject> | undefined) => OpenAPIV3.ResponsesObject;
//# sourceMappingURL=schema.d.ts.map