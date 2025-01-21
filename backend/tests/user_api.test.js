const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert/strict')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const User = require('../models/user')

const api = supertest(app)

const mockUsers = [
    {
        username: 'Mateusz',
        email: 'mateusz@gmail.com',
        passwordHash: '1234'
    },
    {
        username: 'Tomasz',
        email: 'tomasz@gmail.com',
        passwordHash: '5678'
    }
]

describe('There are some users saved in database initially', () => {

    beforeEach(async () => {
        await User.deleteMany({})
        for (let user of mockUsers) {
            const userObject = new User(user)
            await userObject.save()
        }
    })

    test('Users are returned as json', async () => {
        await api
            .get('/api/users')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('There are exactly two users', async () => {
        const response = await api.get('/api/users')
        assert.strictEqual(response.body.length, 2)
    })

    test('User has username and email', async () => {
        const response = await api.get('/api/users')
        const user = response.body[0]
        assert(Object.hasOwn(user, 'username') && Object.hasOwn(user, 'email'))
    })

    describe('Adding new user', () => {

        test('Succeeds with valid data', async () => {
            const newUser = {
                username: 'Andrzej',
                email: 'andrzej@gmail.com',
                password: 'V3rySt0ngPa##word'
            }

            await api
                .post('/api/users')
                .send(newUser)
                .expect(201)

            const response = await api.get('/api/users')
            assert.strictEqual(response.body.length, mockUsers.length + 1)
        })

        test('Fails with status 400, when username is not unique', async () => {
            const newUser = {
                username: 'Mateusz',
                email: 'mail@gmail.com',
                password: 'V3rySt0ngPa##word'
            }

            await api
                .post('/api/users')
                .send(newUser)
                .expect(400)
        })

        test('Fails with status 400, when email is not unique', async () => {
            const newUser = {
                username: 'Andrzej',
                email: 'mateusz@gmail.com',
                password: 'V3rySt0ngPa##word'
            }

            await api
                .post('/api/users')
                .send(newUser)
                .expect(400)
        })

        test('Fails with status 400, when email is invalid', async () => {
            const newUser = {
                username: 'Andrzej',
                email: 'mateusz@gma$#il.com',
                password: 'V3rySt0ngPa##word'
            }

            await api
                .post('/api/users')
                .send(newUser)
                .expect(400)
        })

        test('Fails with status 400, when username is too short', async () => {
            const newUser = {
                username: 'x',
                email: 'newuser@email.pl',
                password: 'V3rySt0ngPa##word'
            }

            await api
                .post('/api/users')
                .send(newUser)
                .expect(400)
        })

        test('Fails with status 400, when password is too weak', async () => {
            const newUser = {
                username: 'New user',
                email: 'newuser@email.pl',
                password: 'strong_password'
            }

            await api
                .post('/api/users')
                .send(newUser)
                .expect(400)
        })

        test('Response contain usernameError, when username is invalid', async () => {
            const newUser = {
                username: 'x',
                email: 'new-user@email.pl',
                password: 'V3rySt0ngPa##word'
            }

            const response = await api
                .post('/api/users')
                .send(newUser)

            assert.strictEqual(response.body['usernameError'], 'Username should be at least 4 characters long')
        })

        test('Response contain emailError, when email is invalid', async () => {
            const newUser = {
                username: 'New user',
                email: 'new-user@email@pl',
                password: 'V3rySt0ngPa##word'
            }

            const response = await api
                .post('/api/users')
                .send(newUser)

            assert.strictEqual(response.body['emailError'], 'Invalid email address')
        })

        test('Response contain passwordError, when password is invalid', async () => {
            const newUser = {
                username: 'New user',
                email: 'new-user@email.pl',
                password: 'qwerty@A'
            }

            const response = await api
                .post('/api/users')
                .send(newUser)

            assert.strictEqual(response.body['passwordError'], 'Password should contain a digit')
        })
    })

    after(async () => {
        await mongoose.connection.close()
    })
})