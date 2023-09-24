const express = require("express");
const app = express();

app.use(express.json());

const db = require("./models");

// Routes
const postsRouter = require("./routes/Posts");
app.use("/posts", postsRouter);

db.sequelize.sync().then(() => {
  app.listen(1234, () => {
    console.log("server running on port 1234");
  });
});
