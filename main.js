const express = require("express");
const cors = require("cors");
const app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger.js");

//cors
var corsOptions = {
  origin: "http://localhost:5173",
};

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(cors(corsOptions));

app.use(express.json());

const db = require("./models");

// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });
db.sequelize
  .sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync database: " + err.message);
  });

app.get("/", (req, res) => {
  res.json({ message: "Welcome to blog site application." });
});

require("./routes/user_auth.routes")(app);
require("./routes/blog.routes")(app);

// set port, listen for requests
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
