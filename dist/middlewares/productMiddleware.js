import { productSchema, productUpdateSchema } from "../models/productSchema.js";
export function validateProduct(req, res, next) {
    var product = req.body;
    var error = productSchema.validate(product, { abortEarly: false }).error;
    if (error) {
        return res.status(400).send(error.message);
    }
    next();
}
export function validateUpadteProduct(req, res, next) {
    var product = req.body;
    var isEmpty = Object.keys(product).length;
    if (!isEmpty)
        return res.status(400).send("Invalid data");
    var error = productUpdateSchema.validate(product, { abortEarly: false }).error;
    if (error) {
        return res.status(400).send(error.message);
    }
    next();
}
