const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const db = require("./models");

// Routes
const postsRouter = require("./routes/Posts");
app.use("/posts", postsRouter);
const commentsRouter = require("./routes/Comments");
app.use("/comments", commentsRouter);

db.sequelize.sync().then(() => {
  app.listen(1234, () => {
    console.log("server running on port 1234");
  });
});
