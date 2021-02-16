import { Request, Response, NextFunction } from 'express';

import ProviderService from '@services/ProviderService';
import { ServiceError, ValidationError } from '@helpers/response/Error';
import { StatusCode } from '@helpers/response/StatusCode';


class ProviderController {
    public async index (request: Request, response: Response, next: NextFunction): Promise<Response> {
        const providers = await ProviderService.findAll();

        return response.status(StatusCode.SUCCESS).json({ providers });
    }

    public async show (request: Request, response: Response, next: NextFunction): Promise<Response> {
        try {
            const provider = await ProviderService.getProviderById(request.params.id);

            return response.status(StatusCode.SUCCESS).json({ provider });
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
            const provider = await ProviderService.registerProviders(request.body);

            return response.status(StatusCode.CREATED).json({ provider });
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

    public async update (request: Request, response: Response, next: NextFunction): Promise<Response> {
        try {
            const name = await ProviderService.updateProviders(request.body, request.params.id);

            return response.status(StatusCode.SUCCESS).json({ message: `Dados do fornecedor ${name} atualizados` });

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
            await ProviderService.deleteProviders(request.params.id);

            return response.status(StatusCode.SUCCESS).json({ message: 'Fornecedor deletado' });

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

export default new ProviderController;