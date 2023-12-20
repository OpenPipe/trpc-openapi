import { z } from 'zod';
export declare const instanceofZodType: (type: any) => type is z.ZodTypeAny;
export declare const instanceofZodTypeKind: <Z extends z.ZodFirstPartyTypeKind>(type: z.ZodTypeAny, zodTypeKind: Z) => type is InstanceType<(typeof z)[Z]>;
export declare const instanceofZodTypeOptional: (type: z.ZodTypeAny) => type is z.ZodOptional<z.ZodTypeAny>;
export declare const instanceofZodTypeObject: (type: z.ZodTypeAny) => type is z.ZodObject<z.ZodRawShape, z.UnknownKeysParam, z.ZodTypeAny, {
    [x: string]: any;
}, {
    [x: string]: any;
}>;
export type ZodTypeLikeVoid = z.ZodVoid | z.ZodUndefined | z.ZodNever;
export declare const instanceofZodTypeLikeVoid: (type: z.ZodTypeAny) => type is ZodTypeLikeVoid;
export declare const unwrapZodType: (type: z.ZodTypeAny, unwrapPreprocess: boolean) => z.ZodTypeAny;
type NativeEnumType = {
    [k: string]: string | number;
    [nu: number]: string;
};
export type ZodTypeLikeString = z.ZodString | z.ZodOptional<ZodTypeLikeString> | z.ZodDefault<ZodTypeLikeString> | z.ZodEffects<ZodTypeLikeString, unknown, unknown> | z.ZodUnion<[ZodTypeLikeString, ...ZodTypeLikeString[]]> | z.ZodIntersection<ZodTypeLikeString, ZodTypeLikeString> | z.ZodLazy<ZodTypeLikeString> | z.ZodLiteral<string> | z.ZodEnum<[string, ...string[]]> | z.ZodNativeEnum<NativeEnumType>;
export declare const instanceofZodTypeLikeString: (_type: z.ZodTypeAny) => _type is ZodTypeLikeString;
export declare const zodSupportsCoerce: boolean;
export type ZodTypeCoercible = z.ZodNumber | z.ZodBoolean | z.ZodBigInt | z.ZodDate;
export declare const instanceofZodTypeCoercible: (_type: z.ZodTypeAny) => _type is ZodTypeCoercible;
export {};
//# sourceMappingURL=zod.d.ts.map