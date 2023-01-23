import { QueryResult} from "pg"
import { productDB } from "../controllers/productController.js"
import connection from "../database/db.js"


export async function findProductByName(name: string){
    return connection.query(`SELECT * FROM products WHERE product_name=$1`, [name])
}

export function findProductById(id: number){
    return connection.query(`SELECT * FROM products WHERE id=$1`,[id])
}

export function findCategoryById(id: number) {
    return connection.query(`SELECT * FROM category WHERE id=$1`, [id])
}

export function findTypeById(id: number) {
    return connection.query(`SELECT * FROM type WHERE id=$1`, [id])
}

export function insertProduct(name: string, price: number, description: string, available: boolean, ingredients: string) {
    return connection.query(`INSERT INTO products (product_name, price, description, available, ingredients) VALUES ($1,$2,$3,$4,$5)`, [name, price, description, available, ingredients])
}

export function insertProductCategory(categoryId: number, productId: number) {
    return connection.query(`INSERT INTO product_category (product_id, category_id) VALUES ($1, $2)`, [productId, categoryId])
}

export function insertProductType(typeId: number, productId: number) {
    return connection.query(`INSERT INTO product_type (product_id, type_id) VALUES ($1, $2)`, [productId, typeId])
}


export function getAllProducts(){
    return connection.query(`
        SELECT products.*, category.category_name as category, type.type_name as type
        FROM products JOIN product_category ON products.id=product_category.product_id
        JOIN category ON product_category.category_id=category.id
        JOIN product_type ON product_type.product_id = products.id
        JOIN type ON product_type.type_id=type.id
    `)
}

export function deleteProductfromDB(id:number){
    return connection.query(`DELETE FROM products WHERE id=$1`,[id])
}

export function deleteProduct_Category(id:number){
    return connection.query(`DELETE FROM product_category WHERE product_id=$1`,[id])
}

export function deleteProduct_Type(id:number){
    return connection.query(`DELETE FROM product_type WHERE product_id=$1`,[id])
}

export function upadteProductDB(name:string, price: number, description: string, available: boolean, ingredients: string, id:number){
    return connection.query(`UPDATE products SET product_name=$1, price=$2, description=$3, available=$4, ingredients=$5 WHERE id=$6`,[name, price, description, available, ingredients, id])
}
