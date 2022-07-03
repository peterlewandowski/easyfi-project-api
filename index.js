const express = require("express");
const cors = require("cors");
const { getStrategies, createStrategy, updateStrategy, getOneStrategy } = require("./src/strategies");
const PORT = process.env.PORT || 3000;

const app = express();

app.use(
  cors({
    origin: ["https://easyfi.me", "http://localhost:3000"],
  })
  );
  
app.use(express.json());

// Routes
app.post("/strategies", createStrategy);
app.get("/strategies/:userId", getStrategies);
app.get("/strategy/:docId", getOneStrategy);
app.put("/strategies/:docId", updateStrategy);

app.listen(PORT, () => {
  console.log("Listening on Port: ", PORT);
});
