
module.exports = {
    MONGO_CONNECT: process.env.MONGO_CONNECT,

    PORT: process.env.PORT,
    HOST: process.env.HOST,

    URL: process.env.URL,

    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    GITHUB_STRATEGY_NAME: process.env.GITHUB_STRATEGY_NAME,

    PERSISTANCE: process.env.MANAGER_PERSISTANCE,

    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,

    mail: {
        GMAIL_ADDRESS: process.env.GMAIL_ADDRESS,
        GMAIL_PWD: process.env.GMAIL_PWD
    },

    CONSOLE_LOG_LEVEL: 'debug',
    FILE_LOG_LEVEL: 'info',
    ERROR_LOG_LEVEL: 'error'
}