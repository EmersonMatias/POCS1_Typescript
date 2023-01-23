import { Router } from "express";
import { deleteProduct, getProducts, registerProduct, upadteProduct } from "../controllers/productController.js";
import { validateProduct, validateUpadteProduct } from "../middlewares/productMiddleware.js";

const route = Router()

route.post("/products", validateProduct, registerProduct)
route.get("/products" , getProducts)
route.put("/products/:id", validateUpadteProduct, upadteProduct)
route.delete("/products/:id", deleteProduct)

export default route