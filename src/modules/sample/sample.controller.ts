import {sampleService} from "./sample.service";
import {status_codes} from "../../constants/constants.json";
import { FastifyReply, FastifyRequest } from "fastify";


class SampleController {
    
    public async getSampleResponse(request: FastifyRequest, reply: FastifyReply) {
        try {
            const sampleResponse = await sampleService.returnSampleResponse();
            return reply.code(reply.statusCode).send(sampleResponse);
        } catch (error) {
            return reply.code(status_codes.client_error.bad_request.code);
        }
    }

    /**
     * @function getErrorSampleResponse
     * @description Sample handler that runs a dummy service that always returns an error message
     * @param request 
     * @param reply 
     * @returns 
     */
    public async getErrorSampleResponse(request: FastifyRequest, reply: FastifyReply) {
        try {
            const sampleResponseError = await sampleService.returnSampleErrorResponse();
            return reply.code(reply.statusCode).send(sampleResponseError)
        }  catch (error) {
            return reply.code(status_codes.client_error.bad_request.code).send(error)
        }
    }
}

export const sampleController = new SampleController();