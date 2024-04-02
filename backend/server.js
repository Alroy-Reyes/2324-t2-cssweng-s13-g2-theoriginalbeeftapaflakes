import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";

// Database
import connectDB from "./config/db.js"

// Routes
import userRoutes from "./routes/userRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import cartRoutes from "./routes/cartRoutes.js"
import uploadRoutes from "./routes/uploadRoutes.js"
import orderRoutes from "./routes/orderRoutes.js";

if (process.env.NODE_ENV !== 'production') {
    dotenv.config()
}
connectDB(); // Connect MongoDB
mongoose.connect()

const app = express()

app.get("/", (req,res)=>{
    res.send("Server is ready")
})

const port = process.env.PORT || 5000

app.use(cors({
    origin: "http://localhost:3000"
}));
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/orders", orderRoutes);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.listen(port,()=>{
    console.log(`Server at http://localhost:${port}`)
})