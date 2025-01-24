import * as tap from 'tap';
import appFramework from '../../app';
import {Client} from "undici";

tap.test('Testing /health endpoint', async t => {
    const app = await appFramework()
    await app.listen()

    const client = new Client(
        `http://localhost:${app.server.address().port}`, {
            keepAliveTimeout: 10,
            keepAliveMaxTimeout: 10
        }
    )

    t.teardown(() => {
        app.close()
        client.close()
    }) 

    try {
        const response = await client.request({
            method: 'GET',
            path: '/health'
        })

        t.equal(response.statusCode, 200, 'returns a status code of 200')
        t.same(response.body.json(), {status: 'ok'}, 'returns health check message of ok')
    } catch (error) {
        t.error(error)
    }
})