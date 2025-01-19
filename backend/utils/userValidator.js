const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
const passwordRegexes = [
    /[a-z]/,
    /[A-Z]/,
    /\d/,
    /[@.#$!%^&*.?]/
]
const passwordErrors = [
    'Password should contain lowercase letter',
    'Password should contain uppercase letter',
    'Password should contain a digit',
    'Password should contain special character @.#$!%^&*.?',
]

const validateEmail = (email) => {
    if (typeof email !== 'string')
        return 'Email should be a string'
    return emailRegex.test(email.toLowerCase())
        ? ''
        : 'Invalid email address'
}

const validateUsername = (username) => {
    if (typeof username !== 'string')
        return 'Username should be a string'
    return username.length >= 4 
        ? ''
        : 'Username should be at least 4 characters long'
}

const validatePassword = (password) => {
    if (typeof password !== 'string')
        return 'Password should be a string'
    
    for (const [idx, regex] of passwordRegexes.entries()) {
        if (!regex.test(password))
            return passwordErrors[idx]
    }
    return ''
}

const validate = (username, email, password) => {
    let errors = {}
    const usernameError = validateUsername(username)
    const emailError = validateEmail(email)
    const passwordError = validatePassword(password)
    if (usernameError)
        errors = {...errors, usernameError}
    if (emailError)
        errors = {...errors, emailError}
    if (passwordError)
        errors = {...errors, passwordError}
    return errors
}

module.exports = validate