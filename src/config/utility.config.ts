import { getPropValue } from "./configuration";
import { readFileSync } from "fs";

export const APPCONFIG = {
    PORT: getPropValue('app.config.port'),
    HOST: getPropValue('app.config.host')
}

export const SECURITYCONFIG = {
    JWT_TOKEN_VALIDATION: getPropValue('app.config.jwt.enable_validation'),
    JWT_AUTH_PUBLIC_KEY: readFileSync(getPropValue('app.config.jwt.auth.publickey'))
}

export const HEALTHCHECKCONFIG = {
    URL: getPropValue('app.healthcheck.url'),
    EXPOSE_UP_TIME: getPropValue('app.healthcheck.expose_up_time')
}