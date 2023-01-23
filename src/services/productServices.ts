import { Product, updateProduct } from "../middlewares/productMiddleware.js"
import { deleteProductfromDB, deleteProduct_Category, deleteProduct_Type, findCategoryById, findProductById, findProductByName, findTypeById, getAllProducts, insertProduct, insertProductCategory, insertProductType, upadteProductDB } from "../repositories/productReposity.js"
import {errorConflictHandling, errorDontExistHandling} from "../error/errors.js"
import { productDB } from "../controllers/productController.js";

export async function registerProductService(product: Product){
   
    const productExist: productDB =  (await findProductByName(product.name)).rows[0]

    if (productExist) throw errorConflictHandling("product");
   
    const categoryExist = (await findCategoryById(product.categoryId)).rows[0]

    if(!categoryExist) throw errorDontExistHandling("category");

    const typeExist = (await findTypeById(product.typeId)).rows[0]

    if(!typeExist) throw errorDontExistHandling("type");
   
    await insertProduct(product.name, product.price, product.description, product.available, product.ingredients)
    
    const productId:number = (await findProductByName(product.name)).rows[0].id

    await insertProductCategory(product.categoryId, productId)
    await insertProductType(product.typeId, productId)

    return true
} 

export async function getProductsService(): Promise<productDB[]>{
    return  (await getAllProducts()).rows
}

export async function upadteProductService(id: number, newFields: updateProduct){
    const product: productDB = (await findProductById(id)).rows[0]

    if(!product) throw errorDontExistHandling("product")

    const name:string = newFields.name ? newFields.name : product.product_name
    const price:number = newFields.price ? newFields.price : product.price
    const description:string = newFields.description ? newFields.description : product.description
    const available: boolean = newFields.available ? newFields.available : product.available
    const ingredients: string = newFields.ingredients ? newFields.ingredients : product.ingredients
    console.log(name, price, description, available, ingredients, id)

    await upadteProductDB(name, price, description, available, ingredients, id)

    return true
}

export async function deleteProductService(id: number){
    const productExist:productDB = (await findProductById(id)).rows[0]
    
    if(!productExist) throw errorDontExistHandling("product")

    await deleteProduct_Category(id)
    await deleteProduct_Type(id)
    await deleteProductfromDB(id)

    return true
}

//if (age < 18) throw { type: "underage_error", message: "users must be 18 or older!" }; 