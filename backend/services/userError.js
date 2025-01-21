class UserCreationError extends Error {
    constructor (errors) {
        super('User Creation Error')
        this.name = 'UserCreationError'
        this.errors = errors
    }
}

module.exports = UserCreationError