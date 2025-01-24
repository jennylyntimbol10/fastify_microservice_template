import {productsService} from "./products.service";
import {status_codes} from "../../constants/constants.json";
import { FastifyReply, FastifyRequest } from "fastify";
import {
    AddNewProduct, 
    DeleteProductParams, 
    GetProduct, 
    GetProductByIdParams, 
    GetProductsSchemaParams,
    addNewProductSchema, 
    PostProductRequest, postProductSchemaRequest, GetProductsByBrandId, PostUserRequest, DeleteCategoryParams
} from "./products.schemas" ;
import { any, string } from "zod";

class ProductsController {
    public async addNewProductHandler(request: FastifyRequest<{Body: PostProductRequest}>, reply: FastifyReply) {
        try {
            const body: PostProductRequest = request.body;
            // validate req body inputs
            postProductSchemaRequest.parse(body);    
            
            const addProduct = await productsService.createProduct(body);
            return reply.code(status_codes.success.code).send(addProduct);
        } catch (error) {
            throw error
        }
    }

    public async countActiveProductsHandler(request: FastifyRequest, reply: FastifyReply) {
        try {
            const activeProductsCount = await productsService.getAllActiveProductsCount();
            return reply.code(status_codes.success.code).send(activeProductsCount);
        } catch (error) {
            throw error
        }
    }

    public async getAllActiveProductsHandler(request: FastifyRequest, reply: FastifyReply) {
        try {
            const activeProductsList = await productsService.getAllActiveItems();
            return reply.code(status_codes.success.code).send(activeProductsList);
        } catch (error) {
            throw error
        }
    }

    public async deleteProductHandler(request: FastifyRequest<{
        Params: DeleteProductParams
    }>, reply: FastifyReply) {
        try {
            const { name } = request.params;
            const deleteProduct = await productsService.deleteProduct(name);
            return reply.code(status_codes.success.code).send(deleteProduct);
        } catch (error) {
            throw error
        }
    }
    
    public async getProductByIdHandler(request: FastifyRequest<{
        Querystring: GetProductByIdParams
    }>, reply: FastifyReply) {
        try {
            const { id } = request.query;
            const testProduct = await productsService.getProductById(Number(id));
            return reply.code(status_codes.success.code).send(testProduct);
        } catch (error) {
            throw error
        }
    }

    public async getProductsHandler(request: FastifyRequest<{
        Querystring: GetProductsSchemaParams
    }>, reply: FastifyReply) {
        try {
            const { id } = request.query;
            const testProduct = await productsService.getProducts(request);
            return reply.code(status_codes.success.code).send(testProduct);
        } catch (error) {
            throw error
        }
    }

    public async getCountPerCategoryHandler(request: FastifyRequest<{
        Querystring: GetProduct
    }>, reply: FastifyReply) {
        try {
            const testProduct = await productsService.getCountPerCategoryHandler();
            return reply.code(status_codes.success.code).send(testProduct);
        } catch (error) {
            throw error
        }
    }
    public async createUserWithCategoryHandler(request: FastifyRequest<{Body: PostUserRequest}>, reply: FastifyReply) {
        try {
            const body: PostUserRequest = request.body;
            // validate req body inputs
            postProductSchemaRequest.parse(body);    
            
            const addProduct = await productsService.createUserWithCategory(body);
            return reply.code(status_codes.success.code).send(addProduct);
        } catch (error) {
            throw error
        }
    }

    public async deleteCategoryHandler(request: FastifyRequest<{
        Params: DeleteCategoryParams
    }>, reply: FastifyReply) {
        try {
            const { name } = request.params;
            const deleteProduct = await productsService.deleteCategory(name);
            return reply.code(status_codes.success.code).send(deleteProduct);
        } catch (error) {
            throw error
        }
    }

}

export const productsController = new ProductsController();