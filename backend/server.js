import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import "dotenv/config";
import productRouter from "./routes/productRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import adminRoutes from "./routes/adminRoute.js";

// app config

const app = express();
const PORT = process.env.PORT || 5001;

// middleware

app.use(express.json());
app.use(cors());

// Database connection
connectDB();

// api endpoints
app.use("/api/product", productRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("API Working");
});

// for run express server
app.listen(PORT, () => {
  console.log(`Server Stated on http://localhost:${PORT}`);
});

// mongodb+srv://pnp_db_user:24785693@cluster0.ekczd0k.mongodb.net/?
// optional mongodb+srv://pnp_db_user:24785693@cluster0.ekczd0k.mongodb.net/?appName=Cluster0
