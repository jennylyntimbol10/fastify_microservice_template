import Fastify from 'fastify';
import sampleRoutes from './modules/sample/sample.routes';
import {v4 as uuidv4 } from 'uuid';
import prismaWrapperPlugin from './plugins/prisma.wrapper';
import fastifyHealthcheck = require('fastify-healthcheck');
import {HEALTHCHECKCONFIG} from "./config/utility.config";
import productRoutes from './modules/products/products.routes';
import { ErrorModel } from "./models/error.model";
import logger, { envToLogger } from './utils/logger';

export default async function appFramework() {

    const fastify = Fastify.default(
        {
            // logger: envToLogger[process.env.ENVIRONMENT] ?? "development",
            logger: true,
            genReqId(request) {
                return uuidv4();
            },
            disableRequestLogging: true
        }
    );

    // Handler that returns a configured payload object as JSON response from the plugin handlers.
    fastify.setErrorHandler(async (error, request, reply) => {
        // Error Template Model
        const payload: ErrorModel = {
            statusCode: Number(error.statusCode),
            message: error.message
        }
        reply.code(Number(payload.statusCode)).send(payload);
    })

    fastify.addHook('onRequest', async (request, reply) => {
        logger.info({
            url: request.raw.url,
            id: request.id
        }, "recieved request")
    })

    fastify.addHook('onResponse', async (request, reply) => {
        if (reply.raw.statusCode == 200 || reply.raw.statusCode == 201) {
            logger.info({
                url: request.raw.url,
                statusCode: reply.raw.statusCode,
                durationMS: reply.getResponseTime().toFixed(2)
            }, "request successful")
        }
    })

    fastify.addHook('onError', async (request, reply, error) => {
        logger.error({
            statusCode: error.statusCode,
            message: `${error.message}`,
            error
        }, "request failed")
    })

    fastify.register(prismaWrapperPlugin)
    fastify.register(fastifyHealthcheck, {
        exposeUptime: HEALTHCHECKCONFIG.EXPOSE_UP_TIME,
        healthcheckUrl: HEALTHCHECKCONFIG.URL
    })
    fastify.register(sampleRoutes)
    fastify.register(productRoutes,
        {
            prefix: '/products'
        })

    return fastify
}
