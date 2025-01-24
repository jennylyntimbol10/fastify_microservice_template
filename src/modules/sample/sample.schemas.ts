import {z} from 'zod';
import {buildJsonSchemas} from 'fastify-zod';
import { coreErrorSchema, coreResponseSchema } from '../core';


export const sampleResponse = coreResponseSchema.merge(
    z.object({
        ping: z.string({
            description: 'A sample message to be returned.',
        }),
    })
);

export const sampleErrorResponse = coreErrorSchema

export type SampleResponse = z.infer<typeof sampleResponse>;

export const {
    schemas: itemSchemas, $ref
} = buildJsonSchemas({
    sampleResponse
})

