import Joi from "joi";
export var productSchema = Joi.object({
    name: Joi.string().max(150).required(),
    price: Joi.number().integer().required().greater(0),
    categoryId: Joi.number().integer().required(),
    typeId: Joi.number().integer().required(),
    description: Joi.string().max(250),
    available: Joi.boolean().required(),
    ingredients: Joi.string().max(250)
});
export var productUpdateSchema = Joi.object({
    name: Joi.string().max(150),
    price: Joi.number().integer().greater(0),
    categoryId: Joi.number().integer(),
    typeId: Joi.number().integer(),
    description: Joi.string().max(250),
    available: Joi.boolean(),
    ingredients: Joi.string().max(250)
});
