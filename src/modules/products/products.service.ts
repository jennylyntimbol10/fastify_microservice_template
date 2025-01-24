import { AddNewProduct, 
    ProductStatus, 
    productStatusResponseSchema, 
    productAllActiveCountSchema, 
    ActiveProducts,
    GetProductByIdParams,
    GetProductsSchemaParams,
    PostProductRequest,
    PostUserRequest
} from "./products.schemas";
import { productsRepository } from "./product.repository"
import { FastifyRequest } from "fastify";
import {status_codes} from "../../constants/constants.json";
import { ErrorModel } from "src/models/error.model";
import { errorHandler } from "../../utils"
import { string } from "zod";

class ProductsService {

    public async getProductStatus(name: string): Promise<ProductStatus>  {

        try {
            const result = await productsRepository.getProductStatus(name);
            return {
                ...productStatusResponseSchema.parse({
                    statusCode: status_codes.success.code,
                    message: status_codes.success.message,
                    id: result.id,
                    name: result.name,
                    isActive: result.isActive
                })
            }
        } catch (error) {
            throw error;
        }
    }

    public async getAllActiveProductsCount(): Promise<ActiveProducts> {

        try {
            const result = await productsRepository.getAllActiveProductsCount();
            return {
                ...productAllActiveCountSchema.parse({
                    statusCode: status_codes.success.code,
                    message: status_codes.success.message,
                    activeProductCount: result
                })
            }
        } catch(error) {
            throw error;
        }
    }

    public async getAllActiveItems() {

        try {
            const result = await productsRepository.getAllActiveItems();
            return {
                 //TODO: Add proper schema response from zod
                statusCode: status_codes.success.code,
                message: status_codes.success.message,
                result
            }
        } catch(error) {
            throw error;
        }
    }

    public async getProductInformation(name: string) {

        try {
            const result = await productsRepository.getProductInformation(name);
            return {
                 //TODO: Add proper schema response from zod
                statusCode: status_codes.success.code,
                message: status_codes.success.message,
                result
            }
        } catch(error) {
            throw error;
        }
    }

    public async createProduct(data: PostProductRequest) {

        try {
            const result = await productsRepository.createProduct(data);
            return {
                //TODO: Add proper schema response from zod
                statusCode: status_codes.success.code,
                message: status_codes.success.message,
                name: result.name,
                productInformation: {
                    stock: result.stock,
                    unitPrice: result.unitPrice,
                    isActive: result.isActive
                }
            };
        } catch(error) {
            throw error;
        }
    }

    public async getProductId(name: string) {

        try {
            const result = await productsRepository.getProductId(name);
            return {
                 //TODO: Add proper schema response from zod
                statusCode: status_codes.success.code,
                message: status_codes.success.message,
                result
            }
        } catch(error) {
            throw error;
        }
    }

    public async getProductById(id: number) {

        try {
            const result = await productsRepository.getProductById(id);
            return {
                 //TODO: Add proper schema response from zod
                statusCode: status_codes.success.code,
                message: status_codes.success.message,
                result
            }
        } catch(error) {
            throw error;
        }
    }

    public async getProducts(request: FastifyRequest<{
        Querystring: GetProductsSchemaParams
    }>) {

        try {
            const result = await productsRepository.getProducts(request);
            return {
                 //TODO: Add proper schema response from zod
                statusCode: status_codes.success.code,
                message: status_codes.success.message,
                result
            }
        } catch(error) {
            throw error;
        }
    }

    public async getCountPerCategoryHandler() {

        try {
            const result = await productsRepository.getCountPerCategoryHandler();
            return {
                 //TODO: Add proper schema response from zod
                statusCode: status_codes.success.code,
                message: status_codes.success.message,
                result
            }
        } catch(error) {
            throw error;
        }
    }

    public async deleteProduct(name: string) {

        try {
            const result = await productsRepository.deleteProduct(name);
            return {
                 //TODO: Add proper schema response from zod
                statusCode: status_codes.success.code,
                message: status_codes.success.message,
                result
            }
        } catch(error) {
            throw error;
        }
    }
    public async createUserWithCategory(data: PostUserRequest) {
        try {
            const newItem = await productsRepository.createUserWithCategory(data);
            return {
                //TODO: Add proper schema response from zod
                statusCode: status_codes.success.code,
                message: status_codes.success.message,
                productInformation: {
                    name: newItem.name,
                    stock: newItem.stock,
                    unitPrice: newItem.unitPrice,
                    isActive: newItem.isActive,
                    brandId: data.brandId, 
                   
                },
                categoryInformation:{
                    categoryName: data.category, 
                    categoryId: newItem.categoryId 
                }
            };
        } catch(error) {
            throw error;
        }
    }
    

    public async deleteCategory(name: string) {
        try {
            const { deletedItems, deletedCategoryResult} = await productsRepository.deleteCategory(name);
            
            return {
                //TODO: Add proper schema response from zod
                statusCode: status_codes.success.code,
                message: status_codes.success.message,
                deletedItems,
                deletedCategoryResult
            };
        } catch(error) {
            throw error;
        }
    }
    
}

export const productsService = new ProductsService();

