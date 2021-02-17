import { Request, Response, NextFunction } from 'express';

import ProductService from '@services/ProductService';
import { StatusCode } from '@helpers/response/StatusCode';
import { ValidationError, ServiceError } from '@helpers/response/Error';

class ProductController {
    public async index (request: Request, response: Response, next: NextFunction): Promise<Response> {
        const products = await ProductService.findAll();

        return response.status(StatusCode.SUCCESS).json({ products });
    }

    public async show (request: Request, response: Response, next: NextFunction): Promise<Response> {
        try {
            const product = await ProductService.getProductsById(request.params.id);

            return response.status(StatusCode.SUCCESS).json({ product });
        } catch(err) {
            console.log(err);
            if (err instanceof ValidationError) {
                return response.status(err.statusCode).json({ errors: err.errors });
            }

            if (err instanceof ServiceError) {
                return response.status(err.statusCode).json({ error: err.message });
            }
        }

        return response.status(StatusCode.INTERNAL_ERROR).json({ error: 'Erro no servidor' });
    }

    public async showByProvidersId (request: Request, response: Response, next: NextFunction): Promise<Response> {
        try {
            const products = await ProductService.getProductsByProvidersId(request.params.id)
            return response.status(StatusCode.SUCCESS).json({ products });
        } catch(err) {
            console.log(err);
            if (err instanceof ValidationError) {
                return response.status(err.statusCode).json({ errors: err.errors });
            }

            if (err instanceof ServiceError) {
                return response.status(err.statusCode).json({ error: err.message });
            }
        }

        return response.status(StatusCode.INTERNAL_ERROR).json({ error: 'Erro no servidor' });
    }

    public async showProductByProvidersId (request: Request, response: Response, next: NextFunction): Promise<Response> {
        try {
            const product = await ProductService.getProductIdByProvidersId(request.params.idProc, request.params.idProv);
            return response.status(StatusCode.SUCCESS).json({ product });
        } catch(err) {
            console.log(err);
            if (err instanceof ValidationError) {
                return response.status(err.statusCode).json({ errors: err.errors });
            }

            if (err instanceof ServiceError) {
                return response.status(err.statusCode).json({ error: err.message });
            }
        }

        return response.status(StatusCode.INTERNAL_ERROR).json({ error: 'Erro no servidor' });
    }

    public async store (request: Request, response: Response, next: NextFunction): Promise<Response> {
        try {
            const product = await ProductService.registerProducts(request.body);

            return response.status(StatusCode.CREATED).json({ product });
        } catch(err) {
            console.log(err);
            if (err instanceof ValidationError) {
                return response.status(err.statusCode).json({ errors: err.errors });
            }

            if (err instanceof ServiceError) {
                return response.status(err.statusCode).json({ error: err.message });
            }
        }

        return response.status(StatusCode.INTERNAL_ERROR).json({ error: 'Erro no servidor' });
    }

    public async sell (request: Request, response: Response, next: NextFunction): Promise<Response> {
        try {
            const product = await ProductService.sellProduct(request.body.quantidade, request.params.id);

            return response.status(StatusCode.SUCCESS).json({ product });
        } catch (err) {
            console.log(err);
            if (err instanceof ValidationError) {
                return response.status(err.statusCode).json({ errors: err.errors });
            }

            if (err instanceof ServiceError) {
                return response.status(err.statusCode).json({ error: err.message });
            }
        }

        return response.status(StatusCode.INTERNAL_ERROR).json({ error: 'Erro no servidor' });
    }

    public async update (request: Request, response: Response, next: NextFunction): Promise<Response> {
        try {
            const product = await ProductService.updateProducts(request.body, request.params.id)
            return response.status(StatusCode.SUCCESS).json({ product });
        } catch(err) {
            console.log(err);
            if (err instanceof ValidationError) {
                return response.status(err.statusCode).json({ errors: err.errors });
            }

            if (err instanceof ServiceError) {
                return response.status(err.statusCode).json({ error: err.message });
            }
        }

        return response.status(StatusCode.INTERNAL_ERROR).json({ error: 'Erro no servidor' });
    }

    public async delete (request: Request, response: Response, next: NextFunction): Promise<Response> {
        try {
            await ProductService.deleteProducts(request.params.id);
            return response.status(StatusCode.SUCCESS).json({ message: `Produto ${request.params.id} deletado` });
        } catch(err) {
            console.log(err);
            if (err instanceof ValidationError) {
                return response.status(err.statusCode).json({ errors: err.errors });
            }

            if (err instanceof ServiceError) {
                return response.status(err.statusCode).json({ error: err.message });
            }
        }

        return response.status(StatusCode.INTERNAL_ERROR).json({ error: 'Erro no servidor' });
    }
}

export default new ProductController