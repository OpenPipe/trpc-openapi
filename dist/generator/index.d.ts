import { OpenAPIV3 } from 'openapi-types';
import { OpenApiRouter } from '../types';
export declare const openApiVersion = "3.0.3";
export type GenerateOpenApiDocumentOptions = {
    title: string;
    description?: string;
    version: string;
    baseUrl: string;
    docsUrl?: string;
    tags?: string[];
    securitySchemes?: OpenAPIV3.ComponentsObject['securitySchemes'];
};
export declare const generateOpenApiDocument: (appRouter: OpenApiRouter, opts: GenerateOpenApiDocumentOptions) => OpenAPIV3.Document;
//# sourceMappingURL=index.d.ts.map