const express = require("express");
const cors = require("cors");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const articleRouter = require("./routes/article");
const app = express();

app.use(express.json());
app.use(cors());

// getConnection();

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/article", articleRouter);

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server is running on port : ${port}`));
