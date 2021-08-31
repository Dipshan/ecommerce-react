import express from "express";
import mongoose from "mongoose";
import productRouter from "./routers/productRouter.js";
import userRouter from "./routers/userRouter.js";
import dotenv from "dotenv";
import orderRouter from "./routers/orderRouter.js";

const app = express();

dotenv.config();

app.use(express.json());

mongoose.connect(
  process.env.DB_CONNECT,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  () => console.log("Connected to DB")
);

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter)

app.get('/api/config/paypal', (req, res)=>{
  res.send(process.env.PAYPAL_CLIENT_ID)
})

app.get("/", (req, res) => {
  res.send("Server is now ready");
});

const PORT = process.env.port || 5000;

app.listen(PORT, () => {
  console.log(`Server at http://localhost:${PORT} is listening`);
});
