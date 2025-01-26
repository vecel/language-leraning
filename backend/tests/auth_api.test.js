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
    },
    signupCredentials: {
        username: 'Mateusz',
        email: 'mateusz@gmail.com',
        password: 'V3rySt0ngPa##word'
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

    test('Succeeds with valid data', async () => {
        await api
            .post('/api/signup')
            .send(helper.signupCredentials)
            .expect(200)
    })

    test('Returns token on success', async () => {
        const response = await api
            .post('/api/signup')
            .send(helper.signupCredentials)

        const body = response.body

        assert(Object.hasOwn(body, 'token'))
        assert.strictEqual(body.username, 'Mateusz')
    })

    test('Fails with status 400, when username is not unique', async () => {
        const response = await api
            .post('/api/signup')
            .send({
                username: 'Tomasz',
                email: 'newuser@example.com',
                password: 'ValidPassword1!'
            })
            .expect(400)

        const body = response.body
        assert(Object.hasOwn(body, 'error'))
        assert.strictEqual(body.error, 'There already exists user with given username')
    })

    test('Fails with status 400, when email is not unique', async () => {
        const response = await api
            .post('/api/signup')
            .send({
                username: 'New User',
                email: 'tomasz@gmail.com',
                password: 'ValidPassword1!'
            })
            .expect(400)

        const body = response.body
        assert(Object.hasOwn(body, 'error'))
        assert.strictEqual(body.error, 'There already exists user with given email')
    })

    test('Fails with status 400, when username is invalid', async () => {
        const response = await api
            .post('/api/signup')
            .send({
                username: '',
                email: 'example@gmail.com',
                password: 'ValidPassword1!'
            })
            .expect(400)

        const body = response.body
        assert(Object.hasOwn(body, 'usernameError'))
    })

    test('Fails with status 400, when email is invalid', async () => {
        const response = await api
            .post('/api/signup')
            .send({
                username: 'example',
                email: 'toma##sz@gma$il.com',
                password: 'ValidPassword1!'
            })
            .expect(400)

        const body = response.body
        assert(Object.hasOwn(body, 'emailError'))
    })

    test('Fails with status 400, when password is invalid', async () => {
        const response = await api
            .post('/api/signup')
            .send({
                username: 'example',
                email: 'example@gmail.com',
                password: 'InvalidPassword!'
            })
            .expect(400)

        const body = response.body
        assert(Object.hasOwn(body, 'passwordError'))
    })
    // token returned
    // 401 invalid username, email, password
})

after(async () => {
    await mongoose.connection.close()
})
