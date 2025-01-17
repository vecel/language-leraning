const logger = {
    info: (...params) => {
        console.log(...params);
    },
    debug: (...params) => {
        console.debug(...params);
    },
    warn: (...params) => {
        console.warn(...params);
    },
    error: (...params) => {
        console.error(...params);
    }
};

module.exports = logger;