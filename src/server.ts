import appFramework from './app';
import {APPCONFIG} from './config/utility.config';
import  logger from './utils/logger';

async function init() {
    // Initialize the application framework
    const app = await appFramework();

    try {
        
        await app.ready();
        await app.listen({
            port: APPCONFIG.PORT,
            host: APPCONFIG.HOST
        });
    } catch (error)
    {
        logger.error(`Service startup failed: ${error}`);
        process.exit(1)
    }

    // Implement graceful shutdown of the application for signal interrupt and signal termination.
    ["SIGINT", "SIGTERM"].forEach((signal) => {
        process.on(signal, async () => {
            await app.close();

            process.exit(0);
        });
    });
}

init();