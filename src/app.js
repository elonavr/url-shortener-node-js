const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const apiRoutes = require("./api/apiRoutes.js");
const redirectRoutes = require("./api/redirectRoutes.js");

app.use(express.json());

const { sequelize, URL } = require("../init_sequelize.js");

app.use(express.static(path.join(__dirname, "..", "client")));

app.use("/", redirectRoutes);
app.use("/api", apiRoutes);

async function startServer() {
  try {
    await sequelize.sync({ force: false });
    console.log(`Database and tables synchronized successfully.`);

    const server = app.listen(port, () => {
      console.log(`Server listening to port: ${port}`);
    });

    process.on("SIGINT", async () => {
      console.log("\nClosing server and database connection...");
      server.close(async () => {
        await sequelize.close();
        console.log("Server and database connection closed.");
        process.exit(0);
      });
    });
  } catch (error) {
    console.error("Error connecting to database or syncing tables:", error);
  }
}

startServer();
