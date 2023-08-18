const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user.model.js")(sequelize, Sequelize);
db.blogs = require("./blogs.models.js")(sequelize, Sequelize);


// Define associations

  // db.blogs.belongsTo(db.users, {
  //   foreignKey: "id", 
  //   onUpdate:'RESTRICT'
  // });

  db.users.hasMany(db.blogs, {foreignKey: "user_id"});
db.blogs.belongsTo(db.users, {foreignKey: "user_id"});


module.exports = {db,sequelize};
// module.exports = sequelize;

