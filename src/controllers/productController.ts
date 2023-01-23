import  { Request, Response } from "express"
import { Product, updateProduct } from "../middlewares/productMiddleware.js"
import { upadteProductDB } from "../repositories/productReposity.js"
import { deleteProductService, getProductsService, registerProductService, upadteProductService } from "../services/productServices.js"

export async function registerProduct(req: Request, res: Response) {
    const product = req.body as Product

    try {
        const sucess = await registerProductService(product)

        if(sucess){
            return res.status(201).send("Created")
        }
       
    } catch (error) {
        return res.status(error.status).send(error)
    }
}

export type productDB = {
    id: number
    product_name: string
    price: number
    description?: string
    available: boolean
    ingredients?: string
    category: string
    type: string
}

export async function getProducts(req: Request, res: Response){

    try{
        const products = await getProductsService()

        return res.status(200).send(products)
    } catch(error){
        return res.status(500).send(error)
    }
}

export async function upadteProduct(req:Request, res:Response){
    const productId = req.params.id
    const newFields = req.body as updateProduct 

    const numberProductId: number = Number(productId)

    try{
        const sucess = await upadteProductService(numberProductId, newFields)

        if(sucess){
            return res.status(200).send("Upadted")
        }
    }catch(error){
        return res.send(error)
    }
   
}

export async function deleteProduct(req:Request, res:Response){
    const productId = req.params.id

    const numberProductId:number = Number(productId)

    try{
       const deletedProduct =  await deleteProductService(numberProductId)

       if(deletedProduct) return res.status(200).send("Deleted")
  
    }catch(error){
        return res.status(error.status).send(error)
    }

    res.send(productId)
}
