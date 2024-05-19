module.exports = {
  HOST: "localhost",
  USER: "apple",
  PASSWORD: "thisispassword",
  DB: "blogsbackend",
  dialect: "postgres",
  port: 5432,
  pool: {
    max: 100,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

