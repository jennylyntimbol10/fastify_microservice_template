import {FastifyPluginAsync} from 'fastify';
import {Prisma, PrismaClient} from '@prisma/client';
import {mySqlDbConfig} from '../config/database.config';
import logger from '../utils/logger';
import { prisma_logging } from "../constants/constants.json"

declare module 'fastify' {
    interface FastifyInstance {
        prisma: PrismaClient
    }
}

const prismaWrapperPlugin: FastifyPluginAsync = async (server, options) => {
    let prisma = null;
    const type = mySqlDbConfig.returnDatabaseType()
    logger.debug(`Using connection type: ${type}`);
    if (type == "sqlite") {
        prisma = new PrismaClient();
    } else {
        const env: string = process.env.ENVIRONMENT ?? "development";
        prisma = new PrismaClient({
            log: prisma_logging[env],
            // If datasourceURL is provided here, then it will overwrite what is provided in the schema.prisma file.
            datasourceUrl: mySqlDbConfig.getConnectionDetails(),
        });

    }

    await prisma.$connect()
    server.decorate('prisma', prisma)

    server.addHook('onClose', async (server) => {
        logger.info('Disconnecting Prisma from the Database')
        await prisma.$disconnect()
    })

    server.addHook('onTimeout', async (server) => {
        logger.error(`Timeout error while Prisma is running`)
    })

    server.addHook('onError', async (server, error) => {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            logger.error(`Error during execution of Prisma: ${error.message} \n${error.code}`)
        }
    })
}

export default prismaWrapperPlugin;