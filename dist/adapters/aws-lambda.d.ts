import { APIGatewayEvent, AWSLambdaOptions } from '@trpc/server/adapters/aws-lambda';
import type { Context as APIGWContext } from 'aws-lambda';
import type { OpenApiRouter } from '../types';
export type CreateOpenApiAwsLambdaHandlerOptions<TRouter extends OpenApiRouter, TEvent extends APIGatewayEvent> = Pick<AWSLambdaOptions<TRouter, TEvent>, 'router' | 'createContext' | 'responseMeta' | 'onError'>;
export declare const createOpenApiAwsLambdaHandler: <TRouter extends OpenApiRouter, TEvent extends APIGatewayEvent>(opts: CreateOpenApiAwsLambdaHandlerOptions<TRouter, TEvent>) => (event: TEvent, context: APIGWContext) => Promise<{
    statusCode: number;
    headers: {
        [header: string]: string | number | boolean;
    } | {
        [header: string]: string | number | boolean;
    } | undefined;
    body: any;
} | {
    statusCode: number;
    headers: {
        'content-type': string;
    };
    body: string;
}>;
//# sourceMappingURL=aws-lambda.d.ts.map