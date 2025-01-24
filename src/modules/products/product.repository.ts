import { PrismaClient } from "@prisma/client";
import { 
    PostProductRequest, 
    GetProductByIdParams,
    PostUserRequest
} from "./products.schemas";
import { FastifyRequest } from "fastify";
import { prisma_logging} from "../../constants/constants.json";
import { BRAND } from "zod";

class ProductsRepository {

    private client: PrismaClient = new PrismaClient({
        log: prisma_logging[process.env.ENVIRONMENT ?? "development"],
    });

    public async getProductStatus(name: string)  {

        try {
            const result = await this.client.items.findFirst({
                where: {
                    name: `${name}`
                },
                select: {
                    id: true,
                    name: true,
                    isActive: true
                }
            });
            return result;
        } catch(error) {
            throw error
        }
        finally {
            this.client.$disconnect();
        }
    }

    public async getAllActiveProductsCount() {

        try {
            const result = await this.client.items.count({
                where: {
                    isActive: true
                }
            })
            return result;
        } catch(error) {
            throw error
        }
        finally {
            this.client.$disconnect();
        }
    }

    public async getAllActiveItems() {

        try {
            const result = await this.client.items.findMany({
                where: {
                    isActive: true
                }
            });
            return {
                activeItems: result
            }
        } catch (error) {
            throw error
        }
        finally {
            this.client.$disconnect();
        }
    }

    public async getProductInformation(name: string) {
        try {
          const result = await this.client.items.findFirst({
            where: {
                name: name
            }
          });
          return result;
        } catch (error) {
            throw error;
        }
    }

    public async createProduct(data: PostProductRequest) {

        try {
            const newProduct = await this.client.items.create({
                data: {
                    name: data.name,
                    stock: data.stock,
                    unitPrice: data.unitPrice,
                    isActive: data.isActive,
                    brandId: data.brandId,
                    categoryId: data.categoryId
                }
            })
            return newProduct;
        } catch (error) {
            throw error;
       }
        finally {
            this.client.$disconnect();
        }
    }

    public async getProductId(name: string) {
        try {
            const productId = await this.client.items.findFirstOrThrow({
                select: {
                    id: true
                },
                where: {
                    name: name
                }
            });
            return {
                id: productId.id
            };
        } catch (error) {
            throw error;
        }
        finally {
            this.client.$disconnect();
        }
    }

    public async getProductById(id: number) {

        try {
            const product = await this.client.items.findFirstOrThrow({
                include: {
                    category: true
                },
                where: {
                    id: id
                }
            });
            return product;
        } catch (error) {
            throw error;
        }
        finally {
            this.client.$disconnect();
        }
    }

    public async getProducts(request: FastifyRequest<{
        Querystring: GetProductByIdParams
    }>) {
        try {
            const product = await this.client.items.findMany({
                include: {
                    category: true,
                    Brand: true
                },
            });
            return product;
        } catch (error) {
            throw error;
        }
        finally {
            this.client.$disconnect();
        }
    }

    public async getCountPerCategoryHandler() {

        try {
            const product = await this.client.items.groupBy({
                by: ['categoryId'],
                _count: {
                   _all: true
                }
            });
            return product;
        } catch (error) {
            throw error;
        }
        finally {
            this.client.$disconnect();
        }

    }

    public async deleteProduct(name: string) {

        try {
            const productId = await this.getProductId(name);
            const results = await this.client.items.delete({
                select: {
                    name: true
                },
                where: {
                    id: productId.id
                }
            });
            return results;
        } catch (error) {
            throw error;
        }
        finally {
            this.client.$disconnect();
        }
    }

    //Many to Many - create new category with the new items
    public async createUserWithCategory(data: PostUserRequest) {
        try {
            // Create a new category
            const newCategory = await this.client.category.create({
                data: {
                    name: data.category 
                }
            });
    
            // Create a new item with the associated category ID
            const newItem = await this.client.items.create({
                data: {
                    name: data.name,
                    stock: data.stock,
                    unitPrice: data.unitPrice,
                    isActive: data.isActive,
                    brandId: data.brandId,
                    categoryId: newCategory.id //auto-generated
                }
            });
    
            return newItem;
        } catch (error) {
            throw error;
        } finally {
            await this.client.$disconnect();
        }
    }
    
    
    
    
    // Many to Many - delete category with the associated categoryId on items
    public async deleteCategory(name: string) {
    try {
        // Find the items to be deleted
        const deletedItems = await this.client.items.findMany({
            where: {
                category: {
                    name: name,
                },
            },
        });

        // Delete items with the specified category name
        await this.client.items.deleteMany({
            where: {
                category: {
                    name: name,
                },
            },
        });

        // Delete the category itself
        const deletedCategoryResult = await this.client.category.deleteMany({
            where: {
                name: name,
            },
        });

        return { deletedItems, deletedCategoryResult };
    } catch (error) {
        throw error;
    } finally {
        this.client.$disconnect();
    }
}

    
    
    
}

export const productsRepository = new ProductsRepository();

