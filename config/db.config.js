module.exports = {
  HOST: "blogsbackend2.cifesgggcljk.eu-north-1.rds.amazonaws.com",
  USER: "admin",
  PASSWORD: "password",
  DB: "backendtest",
  dialect: "mysql",
  port: 3306,
  pool: {
    max: 100,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

