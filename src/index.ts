import express, {Request, Response} from "express"
import "express-async-errors"
import productRoutes from "./routes/productRoutes.js"
import cors from "cors"

const app = express()
app.use(cors())
app.use(express.json())

app.use(productRoutes)
app.get("/healthy", (req: Request,res:Response) => {
    res.send("OK")
})



app.listen(3000, () => {console.log("Rodando")} )


