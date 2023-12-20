import { NextApiRequest, NextApiResponse } from 'next';
import { OpenApiRouter } from '../types';
import { CreateOpenApiNodeHttpHandlerOptions } from './node-http/core';
export type CreateOpenApiNextHandlerOptions<TRouter extends OpenApiRouter> = Omit<CreateOpenApiNodeHttpHandlerOptions<TRouter, NextApiRequest, NextApiResponse>, 'maxBodySize'>;
export declare const createOpenApiNextHandler: <TRouter extends OpenApiRouter>(opts: CreateOpenApiNextHandlerOptions<TRouter>) => (req: NextApiRequest, res: NextApiResponse) => Promise<void>;
//# sourceMappingURL=next.d.ts.map