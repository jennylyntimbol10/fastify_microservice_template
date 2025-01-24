import * as tap from 'tap';
import appFramework from '../../app';

tap.test('Testing /ping endpoint', async t => {
    // initialize the application framework
    const app = await appFramework()
    // this is required to make sure that all connections to external services are closed.
    t.teardown(() => app.close())

    try {
        const response = await app.inject({
            method: 'GET',
            url: '/ping'
        })
        t.equal(response.statusCode, 200, 'returns a status code of 200')
        t.equal(response.json().message, "Success", 'returns the success status message')
        t.has(response.json(), {ping: "it works!"}, 'returns json object key=value ping: it works!')

        t.not(response.statusCode == 400, 'does not return a status code of 400')
        
    } catch (error) {
        t.error(error)
    }
})

tap.test('Testing /pingfail endpoint', async t => {
    // initialize the application framework
    const app = await appFramework()
    // this is required to make sure that all connections to external services are closed.
    t.teardown(() => app.close())

    const response = await app.inject({
        method: 'GET',
        url: '/pingfail'
    })
    t.equal(response.statusCode, 400, 'returns a status code of 400')
    t.has(response.json(), {message: "Error during service execution"})
})

tap.test('Testing /countActive endpoint', async t => {
    // initialize the application framework
    const app = await appFramework()
    t.teardown(() => app.close())

    try {
        const response = await app.inject({
            method: 'GET',
            url: '/countActive'
        })

        const activeItemCountRes = await app.inject({
            method: 'GET',
            url: '/countActive'
        })

        t.equal(response.statusCode, 200, 'returns a status code of 200')
        t.not(response.json().activeItemsCount == 0, 'activeItemsCount is equal to 0')
        t.ok(response.json().activeItemsCount > 0, 'activeItemsCount is greater than 0')
    } catch (error) {
        t.error(error)
    }
})