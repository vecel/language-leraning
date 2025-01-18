const { test, after, beforeEach } = require('node:test')
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

beforeEach(async () => {
    await User.deleteMany({})
    for (user of mockUsers) {
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

test('New user can be added', async () => {
    const newUser = {
        username: 'Andrzej',
        email: 'andrzej@gmail.com',
        password: 'strong_password'
    }
    
    await api
        .post('/api/users')
        .send(newUser)
        .expect(201)

    const response = await api.get('/api/users')
    assert.strictEqual(response.body.length, mockUsers.length + 1)
})

test('Cannot add user with non-unique username', async () => {
    const newUser = {
        username: 'Mateusz',
        email: 'mail@gmail.com',
        password: 'strong_password'
    }

    await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
})

test('Cannot add user with non-unique email', async () => {
    const newUser = {
        username: 'Andrzej',
        email: 'mateusz@gmail.com',
        password: 'strong_password'
    }

    await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
})

after(async () => {
    await mongoose.connection.close()
})