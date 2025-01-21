const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert/strict')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const User = require('../models/user')

const api = supertest(app)

const helper = {
    mockUser: {
        username: 'Tomasz',
        email: 'tomasz@gmail.com',
        password: 'StrongEnough1#'
    },
    credentials: {
        username: 'Tomasz',
        password: 'StrongEnough1#'
    },
    wrongPasswordCredentials: {
        username: 'Tomasz',
        password: 'Wrong'
    },
    wrongUsernameCredentials: {
        username: 'Wrong',
        password: 'StrongEnough1#'
    }
}


beforeEach(async () => {
    await User.deleteMany({})
    await api.post('/api/users').send(helper.mockUser)
})

describe('Logging', () => {

    test('Succeeds with valid data', async () => {
        await api
            .post('/api/login')
            .send(helper.credentials)
            .expect(200)
    })

    test('Returns token on success', async () => {
        const response =
            await api
                .post('/api/login')
                .send(helper.credentials)

        const body = response.body

        assert(Object.hasOwn(body, 'token'))
        assert.strictEqual(body.username, 'Tomasz')
    })

    test('Login fails with status 401, when password is incorrect', async () => {
        await api
            .post('/api/login')
            .send(helper.wrongPasswordCredentials)
            .expect(401)
    })

    test('Login fails with status 401, when username is incorrect', async () => {
        await api
            .post('/api/login')
            .send(helper.wrongUsernameCredentials)
            .expect(401)
    })
})
 
describe('Signing up', () => {

    test('Succeeds with valid data', { todo: true }, () => {

    })
})

after(async () => {
    await mongoose.connection.close()
})
