const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert/strict')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const User = require('../models/user')

const api = supertest(app)

const mockUser = {
    username: 'Tomasz',
    email: 'tomasz@gmail.com',
    password: 'StrongEnough1#'
}

describe('Logging', () => {

    beforeEach(async () => {
        await User.deleteMany({})
        await api.post('/api/users').send(mockUser)
    })

    test('Succeeds with valid data', async () => {
        const credentials = {
            username: 'Tomasz',
            password: 'StrongEnough1#'
        }
        await api
            .post('/api/login')
            .send(credentials)
            .expect(200)
    })

    test('Returns token on success', async () => {
        const credentials = {
            username: 'Tomasz',
            password: 'StrongEnough1#'
        }
        const response =
            await api
                .post('/api/login')
                .send(credentials)

        const body = response.body

        assert(Object.hasOwn(body, 'token'))
        assert.strictEqual(body.username, 'Tomasz')
    })

    test('Login fails with status 401, when password is incorrect', async () => {
        const credentials = {
            username: 'Tomasz',
            password: 'WrongPassword'
        }

        await api
            .post('/api/login')
            .send(credentials)
            .expect(401)

    })

    after(async () => {
        await mongoose.connection.close()
    })

})