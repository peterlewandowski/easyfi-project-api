const express = require("express");
const cors = require("cors");
const { getStrategies, createStrategy } = require("./src/strategies");
const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.post("/strategies", createStrategy);
app.get("/strategies/:userId", getStrategies);

app.listen(PORT, () => {
  console.log("Listening on Port: ", PORT);
});
