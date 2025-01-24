import { sampleErrorResponse, sampleResponse, SampleResponse } from "./sample.schemas";
import {status_codes} from "../../constants/constants.json";

class SampleService {
    public async returnSampleResponse(): Promise<SampleResponse> {
        try {
            return {
                ...sampleResponse.parse({
                    statusCode: status_codes.success.code,
                    message: status_codes.success.message,
                    ping: "it works!"
                })
            }
        } catch (error) {
            return {
                ...sampleErrorResponse.parse({
                    statusCode: status_codes.client_error.bad_request.code,
                    message: status_codes.client_error.bad_request.message,
                    error: error
                })
            }
        }
    }

    public async returnSampleErrorResponse() {
        throw new Error(`Error during service execution`);
    } 
}

export const sampleService = new SampleService();