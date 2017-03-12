var config = {};

config.mongoUri = process.env.DB_CONN ? process.env.DB_CONN : 'mongodb://localhost:27017/users';

module.exports = config;