require("dotenv").config();
const express = require("express");
const cors = require("cors");
const planetsRouter = require("./routes/planets");

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use("/api/planets", planetsRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
