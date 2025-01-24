import { FastifyPluginAsync } from "fastify";
import {routes} from "../../constants/constants.json";
import { productsController } from "./products.controller";
import { deleteCategorySchemaParams, deleteProductSchemaParams, productErrorResponse } from "./products.schemas";
import { errorHandler } from "../../utils"

const productRoutes: FastifyPluginAsync = async (fastify, options) => {

    fastify.get(
        routes.products.countActive, {
            errorHandler: async (error, request, reply) => {
                let err = await errorHandler.onError(error, request, reply);
                // custom error handler should be in this block just append the err var or via custom func
                err = productErrorResponse.parse(err);
                fastify.errorHandler(err, request, reply)
            }
        },
        productsController.countActiveProductsHandler
    )
    fastify.post(
        routes.products.create, {
            errorHandler: async (error, request, reply) => {
                let err = await errorHandler.onError(error, request, reply);
                // custom error handler should be in this block just append the err var or via custom func
                err = productErrorResponse.parse(err);
                fastify.errorHandler(err, request, reply)
            }
        },
        productsController.addNewProductHandler
    )
    fastify.delete(
        routes.products.remove, {
            schema: deleteProductSchemaParams,
            errorHandler: async (error, request, reply) => {
                let err = await errorHandler.onError(error, request, reply);
                // custom error handler should be in this block just append the err var or via custom func
                err = productErrorResponse.parse(err);
                fastify.errorHandler(err, request, reply)
            }
        },
        productsController.deleteProductHandler
    )
    fastify.get(
        routes.products.getProductById, {
            errorHandler: async (error, request, reply) => {
                let err = await errorHandler.onError(error, request, reply);
                // custom error handler should be in this block just append the err var or via custom func
                err = productErrorResponse.parse(err);
                fastify.errorHandler(err, request, reply)
            }
        },
        productsController.getProductByIdHandler
    )
    fastify.get(
        routes.products.getAllProducts,  {
            errorHandler: async (error, request, reply) => {
                let err = await errorHandler.onError(error, request, reply);
                // custom error handler should be in this block just append the err var or via custom func
                err = productErrorResponse.parse(err);
                fastify.errorHandler(err, request, reply)
            }
        },
        productsController.getProductsHandler
    )
    fastify.get(
        routes.products.getCountByCategory,  {
            errorHandler: async (error, request, reply) => {
                let err = await errorHandler.onError(error, request, reply);
                // custom error handler should be in this block just append the err var or via custom func
                err = productErrorResponse.parse(err);
                fastify.errorHandler(err, request, reply)
            }
        },
        productsController.getCountPerCategoryHandler
    )
    fastify.post(
        routes.products.createUserWithCategory, {
            errorHandler: async (error, request, reply) => {
                let err = await errorHandler.onError(error, request, reply);
                // custom error handler should be in this block just append the err var or via custom func
                err = productErrorResponse.parse(err);
                fastify.errorHandler(err, request, reply)
            }
        },
        productsController.createUserWithCategoryHandler
        
    )
    fastify.delete(
        routes.products.deleteCategory, {
            schema: deleteCategorySchemaParams,
            errorHandler: async (error, request, reply) => {
                let err = await errorHandler.onError(error, request, reply);
                // custom error handler should be in this block just append the err var or via custom func
                err = productErrorResponse.parse(err);
                fastify.errorHandler(err, request, reply)
            }
        },
        productsController.deleteCategoryHandler
    )
}

export default productRoutes;