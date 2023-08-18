module.exports = {
  HOST: "127.0.0.1",
  USER: "root",
  PASSWORD: "password",
  DB: "Blogsbackend",
  dialect: "mysql",
  port: 3306,
  pool: {
    max: 100,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
