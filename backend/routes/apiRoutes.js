import express from "express"
const app = express()
import productRoutes from "./productRoutes"
import categoryRoutes from "./categoryRoutes"
import userRoutes from "./userRoutes"
import orderRoutes from "./orderRoutes"

app.use("/products", productRoutes)
app.use("/categories", categoryRoutes)
app.use("/users", userRoutes)
app.use("/orders", orderRoutes)

export default app