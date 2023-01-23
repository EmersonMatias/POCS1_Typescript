var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import connection from "../database/db.js";
export function findProductByName(name) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, connection.query("SELECT * FROM products WHERE product_name=$1", [name])];
        });
    });
}
export function findProductById(id) {
    return connection.query("SELECT * FROM products WHERE id=$1", [id]);
}
export function findCategoryById(id) {
    return connection.query("SELECT * FROM category WHERE id=$1", [id]);
}
export function findTypeById(id) {
    return connection.query("SELECT * FROM type WHERE id=$1", [id]);
}
export function insertProduct(name, price, description, available, ingredients) {
    return connection.query("INSERT INTO products (product_name, price, description, available, ingredients) VALUES ($1,$2,$3,$4,$5)", [name, price, description, available, ingredients]);
}
export function insertProductCategory(categoryId, productId) {
    return connection.query("INSERT INTO product_category (product_id, category_id) VALUES ($1, $2)", [productId, categoryId]);
}
export function insertProductType(typeId, productId) {
    return connection.query("INSERT INTO product_type (product_id, type_id) VALUES ($1, $2)", [productId, typeId]);
}
export function getAllProducts() {
    return connection.query("\n        SELECT products.*, category.category_name as category, type.type_name as type\n        FROM products JOIN product_category ON products.id=product_category.product_id\n        JOIN category ON product_category.category_id=category.id\n        JOIN product_type ON product_type.product_id = products.id\n        JOIN type ON product_type.type_id=type.id\n    ");
}
export function deleteProductfromDB(id) {
    return connection.query("DELETE FROM products WHERE id=$1", [id]);
}
export function deleteProduct_Category(id) {
    return connection.query("DELETE FROM product_category WHERE product_id=$1", [id]);
}
export function deleteProduct_Type(id) {
    return connection.query("DELETE FROM product_type WHERE product_id=$1", [id]);
}
export function upadteProductDB(name, price, description, available, ingredients, id) {
    return connection.query("UPDATE products SET product_name=$1, price=$2, description=$3, available=$4, ingredients=$5 WHERE id=$6", [name, price, description, available, ingredients, id]);
}
