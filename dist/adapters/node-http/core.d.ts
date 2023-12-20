import { NodeHTTPHandlerOptions, NodeHTTPRequest, NodeHTTPResponse } from '@trpc/server/dist/adapters/node-http';
import { OpenApiRouter } from '../../types';
export type CreateOpenApiNodeHttpHandlerOptions<TRouter extends OpenApiRouter, TRequest extends NodeHTTPRequest, TResponse extends NodeHTTPResponse> = Pick<NodeHTTPHandlerOptions<TRouter, TRequest, TResponse>, 'router' | 'createContext' | 'responseMeta' | 'onError' | 'maxBodySize'>;
export type OpenApiNextFunction = () => void;
export declare const createOpenApiNodeHttpHandler: <TRouter extends OpenApiRouter, TRequest extends NodeHTTPRequest, TResponse extends NodeHTTPResponse>(opts: CreateOpenApiNodeHttpHandlerOptions<TRouter, TRequest, TResponse>) => (req: TRequest, res: TResponse, next?: OpenApiNextFunction) => Promise<void>;
//# sourceMappingURL=core.d.ts.map