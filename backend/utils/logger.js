const logger = {
    info: (...params) => {
        if (process.env.NODE_ENV !== 'test')
            console.log(...params)
    },
    debug: (...params) => {
        if (process.env.NODE_ENV !== 'test')
            console.debug(...params)
    },
    warn: (...params) => {
        if (process.env.NODE_ENV !== 'test')
            console.warn(...params)
    },
    error: (...params) => {
        if (process.env.NODE_ENV !== 'test')
            console.error(...params)
    }
};

module.exports = logger;