import {FastifyPluginAsync, FastifyReply, FastifyRequest} from "fastify";
import {routes} from "../../constants/constants.json";
import {sampleController} from "./sample.controller";

const sampleRoutes: FastifyPluginAsync = async (fastify, options) => {
    fastify.get(
        routes.sample.ping,
        sampleController.getSampleResponse
    )
    fastify.get(
        routes.sample.fail,
        sampleController.getErrorSampleResponse
    )
}

export default sampleRoutes;
