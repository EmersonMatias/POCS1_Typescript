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
import { deleteProductfromDB, deleteProduct_Category, deleteProduct_Type, findCategoryById, findProductById, findProductByName, findTypeById, getAllProducts, insertProduct, insertProductCategory, insertProductType, upadteProductDB } from "../repositories/productReposity.js";
import { errorConflictHandling, errorDontExistHandling } from "../error/errors.js";
export function registerProductService(product) {
    return __awaiter(this, void 0, void 0, function () {
        var productExist, categoryExist, typeExist, productId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, findProductByName(product.name)];
                case 1:
                    productExist = (_a.sent()).rows[0];
                    if (productExist)
                        throw errorConflictHandling("product");
                    return [4 /*yield*/, findCategoryById(product.categoryId)];
                case 2:
                    categoryExist = (_a.sent()).rows[0];
                    if (!categoryExist)
                        throw errorDontExistHandling("category");
                    return [4 /*yield*/, findTypeById(product.typeId)];
                case 3:
                    typeExist = (_a.sent()).rows[0];
                    if (!typeExist)
                        throw errorDontExistHandling("type");
                    return [4 /*yield*/, insertProduct(product.name, product.price, product.description, product.available, product.ingredients)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, findProductByName(product.name)];
                case 5:
                    productId = (_a.sent()).rows[0].id;
                    return [4 /*yield*/, insertProductCategory(product.categoryId, productId)];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, insertProductType(product.typeId, productId)];
                case 7:
                    _a.sent();
                    return [2 /*return*/, true];
            }
        });
    });
}
export function getProductsService() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getAllProducts()];
                case 1: return [2 /*return*/, (_a.sent()).rows];
            }
        });
    });
}
export function upadteProductService(id, newFields) {
    return __awaiter(this, void 0, void 0, function () {
        var product, name, price, description, available, ingredients;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, findProductById(id)];
                case 1:
                    product = (_a.sent()).rows[0];
                    if (!product)
                        throw errorDontExistHandling("product");
                    name = newFields.name ? newFields.name : product.product_name;
                    price = newFields.price ? newFields.price : product.price;
                    description = newFields.description ? newFields.description : product.description;
                    available = newFields.available ? newFields.available : product.available;
                    ingredients = newFields.ingredients ? newFields.ingredients : product.ingredients;
                    console.log(name, price, description, available, ingredients, id);
                    return [4 /*yield*/, upadteProductDB(name, price, description, available, ingredients, id)];
                case 2:
                    _a.sent();
                    return [2 /*return*/, true];
            }
        });
    });
}
export function deleteProductService(id) {
    return __awaiter(this, void 0, void 0, function () {
        var productExist;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, findProductById(id)];
                case 1:
                    productExist = (_a.sent()).rows[0];
                    if (!productExist)
                        throw errorDontExistHandling("product");
                    return [4 /*yield*/, deleteProduct_Category(id)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, deleteProduct_Type(id)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, deleteProductfromDB(id)];
                case 4:
                    _a.sent();
                    return [2 /*return*/, true];
            }
        });
    });
}
//if (age < 18) throw { type: "underage_error", message: "users must be 18 or older!" }; 
