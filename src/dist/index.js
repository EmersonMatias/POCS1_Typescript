import express from "express";
import "express-async-errors";
import productRoutes from "./routes/productRoutes.js";
import cors from "cors";
var app = express();
app.use(cors());
app.use(express.json());
app.use(productRoutes);
app.get("/healthy", function (req, res) {
    res.send("OK");
});
var port = process.env.PORT;
app.listen(port, function () { console.log("Running in port ".concat(port)); });
