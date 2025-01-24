import { getPropValue } from "./configuration";
import { readFileSync } from "fs";
import {returnUrlEncoded} from "../utils/helper";


class MySQLDBConfig {
    private DATABASE_CONFIG = {
        HOST: getPropValue('database.mysql.connection.host'),
        PORT: getPropValue('database.mysql.connection.port'),
        DATABASE: getPropValue('database.mysql.connection.database'),
        USERNAME: getPropValue('database.mysql.connection.user'),
        PASSWORD: returnUrlEncoded(getPropValue('database.mysql.connection.password')),
        CONNECTION_TIMEOUT: getPropValue('database.mysql.connection.timeout_msecs'),
        SSL: {
            REQUEST_CERT: getPropValue('database.mysql.ssl.request_cert'),
            MODE: 'require',
            CERT_PATH: getPropValue('database.mysql.ssl.capath')
        },
        POOL: {
            MIN: getPropValue('database.mysql.pool.minimum')
        },
        TYPE: getPropValue('database.type')
    }

    private generateConnectionUrl(): string {
        const {
            HOST, PORT, DATABASE, USERNAME, PASSWORD, CONNECTION_TIMEOUT, SSL
        } = this.DATABASE_CONFIG

        let url = `mysql://${USERNAME}:${PASSWORD}@${HOST}:${PORT}/${DATABASE}?connect_timeout=${CONNECTION_TIMEOUT}`;

        if (SSL.REQUEST_CERT) {
            url += `&sslmode=${SSL.MODE}&sslcert=${SSL.CERT_PATH}`
        }

        return url
    }

    public getConnectionDetails(): string {
        return this.generateConnectionUrl();
    }

    public returnDatabaseType(): string {
        const dbType: string = this.DATABASE_CONFIG.TYPE
        return dbType
    }
}

export const mySqlDbConfig = new MySQLDBConfig();