import { NextFunction, Request, Response } from "express";
import { productSchema, productUpdateSchema } from "../models/productSchema.js";


export type Product = {
    name: string,
    price: number
    categoryId: number
    typeId: number
    description: string
    available: boolean
    ingredients: string
}

export type updateProduct = Partial<Product>

export function validateProduct(req: Request,res: Response, next:NextFunction){
    const product = req.body as Product

    const {error} = productSchema.validate(product, {abortEarly: false})
    if(error){
        return res.status(400).send(error.message)
    }

    next()
}

export function validateUpadteProduct(req:Request, res:Response, next:NextFunction){
    const product = req.body as updateProduct

    const isEmpty = Object.keys(product).length

    if(!isEmpty) return res.status(400).send("Invalid data")

    const {error} = productUpdateSchema.validate(product, {abortEarly: false})

    if(error){
        return res.status(400).send(error.message)
    }

    next()
}
