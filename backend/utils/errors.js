class UserCreationError extends Error {
    constructor (errors) {
        super('User Creation Error')
        this.name = 'UserCreationError'
        this.errors = errors
    }
}

class AuthorizationError extends Error {
    constructor (message) {
        super(message)
    }
}

module.exports = { UserCreationError, AuthorizationError }