import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

export const coreResponse = {
    statusCode: z.number({
        description: "The response status code."
    }),
    message: z.string({
        description: "The response status message."
    })
}

export const coreResponseSchema = z.object({
    ...coreResponse
})

export const coreErrorSchema = coreResponseSchema.merge(
    z.object({
        error: z.string({
            description: "The error message."
        })
    })
)

export type CoreResponse = z.infer<typeof coreResponseSchema>;
export type CoreErrorResponse = z.infer<typeof coreErrorSchema>;

export const {
    schemas: coreSchemas, $ref
} = buildJsonSchemas({
    coreResponseSchema,
    coreErrorSchema
})