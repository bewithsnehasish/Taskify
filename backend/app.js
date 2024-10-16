const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const userAPI = require("./routes/user");
const taskAPI = require("./routes/task");
const connectDatabase = require("./database/database"); // Make sure this is correctly implemented

dotenv.config();

const app = express();
const port = process.env.PORT;

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(express.json());

// Connect to the database before starting the server
connectDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });

// Routes
app.use("/api/v1", userAPI);
app.use("/api/v2", taskAPI);

// app.use("/", (req, res) => {
//   res.send("hello from backend");
// });
