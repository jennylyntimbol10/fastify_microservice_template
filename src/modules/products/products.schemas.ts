import {z} from 'zod';
import {buildJsonSchemas} from 'fastify-zod';
import { coreErrorSchema, coreResponseSchema } from '../core';

const productCore = {
    id: z.number({
        description: "The item product ID."
    }).default(1),
    name: z.string({
        description: "The name of the item product.",
        required_error: "Product name is required.",
        invalid_type_error: "Product name should be a string."
    })  
}

const productStatus = {
    ...productCore,
    isActive: z.boolean({
        description: "Set this to true if product needs to be active."
    }).default(false)
}

const productCount = {
    activeProductCount: z.number({
        description: "The number of active products in the inventory."
    }).default(0)
}

const productInformation = {
    ...productCore,
    isActive: z.boolean({
        description: "Set this to true if product needs to be active."
    }).default(false),
    stock: z.number({
        description: "The amount of the product to be added.",
        invalid_type_error: "Stock should be a number.",
        required_error: "The stock parameter is required."
    }),
    unitPrice: z.number(
        {
            description: "The price to be tagged to the product."
        }
    ).default(0.0),
    brandId: z.number({
        description: "The Brand of a product",
        invalid_type_error: "brandId should be a number."
    }),
    categoryId: z.number({
        description: "The Category of a product",
        invalid_type_error: "brandId should be a number."
    })
}

const productResponseCore = coreResponseSchema.merge(
    z.object({
        ...productCore
    })
)

export const productErrorResponse = coreErrorSchema.merge(
    z.object({
        error: z.any({
            description: "Any error structure object is normally used to log file capture.",
        })
    })
)

export const productStatusResponseSchema = productResponseCore.merge(
    z.object({
        ...productStatus
    })
)

export const productAllActiveCountSchema = coreResponseSchema.merge(
    z.object({
        ...productCount
    })
)

export const addNewProductSchema = productResponseCore.merge(
    z.object({
        ...productInformation
    })
)


export const postProductSchemaRequest = z.object({
    name: z.string({
        description: "The name of the product to be deleted.",
        invalid_type_error: "Name should be a string.",
        required_error: "The name field is required."
    }),
    isActive: z.boolean({
        description: "Set this to true if product needs to be active."
    }).default(false),
    stock: z.number({
        description: "The amount of the product to be added.",
        invalid_type_error: "Stock should be a number.",
        required_error: "The stock field is required."
    }),
    unitPrice: z.number({
        description: "The price to be tagged to the product."
    }).default(0.0),
    brandId: z.number({
        description: "The Brand of a product",
        invalid_type_error: "brandId should be a number."
    }),
    categoryId: z.number({
        description: "The Category of a product",
        invalid_type_error: "categoryId should be a number."
    }).optional() 
});


export const postUserSchemaRequest = z.object({
    category: z.string({
        description: "The name of the Category.",
        invalid_type_error: "Category name should be a string.",
        required_error: "The category name field is required."
    }),
    name: z.string({
        description: "The name of the product.",
        invalid_type_error: "Name should be a string.",
        required_error: "The name field is required."
    }),
    isActive: z.boolean({
        description: "Set this to true if the product needs to be active."
    }).default(false),
    stock: z.number({
        description: "The amount of the product to be added.",
        invalid_type_error: "Stock should be a number.",
        required_error: "The stock field is required."
    }),
    unitPrice: z.number({
        description: "The price to be tagged to the product."
    }).default(0.0),
    brandId: z.number({
        description: "The Brand of a product",
        invalid_type_error: "brandId should be a number."
    }),
    categoryId: z.string().default("")
});


export const productInformationResponseSchema = productResponseCore.merge(
    z.object({
        productDetails: z.object({
            ...productInformation
        })
    })
)

export const getProductSchema = productResponseCore.merge(
    z.object({
        ...productInformation
    })
)

export const deleteProductSchemaParams = z.object({
    params: z.object({
        name: z.string({
            description: "The name of the product to be deleted."
        })
    })
})

export const deleteCategorySchemaParams = z.object({
    params: z.object({
        name: z.string({
            description: "The name of the product to be deleted."
        })
    })
})
export const getProductByIdSchemaParams = z.object({
    params: z.object({
        id: z.string({
            description: "The id of the product to be retrieved."
        })
    })
})

export const getProductsSchemaParams = z.object({
    params: z.object({
        id: z.string({
            description: "The id of the product to be retrieved."
        }),
        name: z.string({
            description: "The name of the product to be retrieved."
        }),
        isActive: z.boolean({
            description: "Set this to true if product needs to be active."
        }).default(false),
        brandId: z.number({
            description: "The Brand of a product",
        }),
        categoryId: z.number({
            description: "The Category of a product",
        })
    })
})
export const getProductByBrandIdSchemaParams = z.object({
    params: z.object({
        id: z.string({
            description: "The id of the product to be retrieved."
        }),
        name: z.string({
            description: "The name of the product to be retrieved."
        }),
        isActive: z.boolean({
            description: "Set this to true if product needs to be active."
        }).default(false),
        brandId: z.number({
            description: "The Brand of a product",
        }),
        categoryId: z.number({
            description: "The Category of a product",
        })
    })
})

export type AddNewProduct = z.infer<typeof addNewProductSchema>;
export type DeleteProductParams = z.infer<typeof deleteProductSchemaParams>['params'];
export type ProductStatus = z.infer<typeof productStatusResponseSchema>;
export type ActiveProducts = z.infer<typeof productAllActiveCountSchema>;
export type GetProduct = z.infer<typeof getProductSchema>;
export type GetProductByIdParams = z.infer<typeof getProductByIdSchemaParams>['params'];
export type GetProductsSchemaParams = z.infer<typeof getProductsSchemaParams>['params'];
export type GetProductsByBrandId = z.infer<typeof getProductByBrandIdSchemaParams>['params'];

export type PostProductRequest = z.infer<typeof postProductSchemaRequest>;
export type PostUserRequest = z.infer<typeof postUserSchemaRequest>;
export type DeleteCategoryParams = z.infer<typeof deleteCategorySchemaParams>['params'];
export const {
    schemas: productSchemas, $ref
} = buildJsonSchemas({
    addNewProductSchema
})

