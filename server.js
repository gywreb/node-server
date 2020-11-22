const express = require("express");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const app = express();

app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server is running on port : ${port}`));
