const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const balanceRoutes = require("./routes/balanceRoutes");
const pointRoutes = require("./routes/pointRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "MyPertamina App Service Mock is running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/balance", balanceRoutes);
app.use("/api/points", pointRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`App service running on port ${PORT}`);
});