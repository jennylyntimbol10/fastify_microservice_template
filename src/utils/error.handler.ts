import { Prisma } from "@prisma/client";
import { ErrorModel } from "../models/error.model";
import {status_codes, prisma_error_code} from "../constants/constants.json";
import {z} from 'zod';

class ErrorHandler {

  public onError(error: any, request: any, reply: any) {
    if (error instanceof Prisma.PrismaClientInitializationError) {
      // DB Connection issue: P1017
      return new ErrorModel(
        status_codes.server_error.internal_server_error.code,
        error.message,
        error
      );
    } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Error includes unique constraint violation
      // default
      let code: number = status_codes.client_error.bad_request.code;
      if (prisma_error_code[error.code]) {
        // override code will get from constant file
        code = prisma_error_code[error.code];
      }
      throw new ErrorModel(
        code,
        error.message,
        error
      );
    } else if (error instanceof Prisma.PrismaClientUnknownRequestError) {
      return new ErrorModel(
        status_codes.server_error.internal_server_error.code,
        error.message,
        error
      );
    } else if (error instanceof Prisma.PrismaClientValidationError) {
      return new ErrorModel(
        status_codes.client_error.bad_request.code,
        error.message,
        error
      );
    } else if (error instanceof Prisma.PrismaClientRustPanicError) {
      // the underlying engine crashes and exits with a non-zero exit code.
      return new ErrorModel(
        status_codes.server_error.internal_server_error.code,
        error.message,
        error
      );
    } else if (error.errorCode === "P1017" || error.errorCode === "P2024") {
      // P1017 - Server has closed the connection.
      // P2024 - Timed out fetching a new connection from the connection pool.
      return new ErrorModel(
        status_codes.server_error.internal_server_error.code,
        error.message,
        error
      );
    } else if (error instanceof z.ZodError) {
      // ZOD Error Instance
      // Error code fixed 404 for validation error
      return new ErrorModel(
        status_codes.client_error.bad_request.code,
        error.message,
        error.issues
      );

    } else {
      // Other types of errors
      if (!error.code) {
        // default error code 500 is when code was not defined
        error.code = status_codes.server_error.internal_server_error.code;
      }  
      return error;
    }
  }


}

export const errorHandler = new ErrorHandler();