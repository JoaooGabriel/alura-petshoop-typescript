import { Request, Response, NextFunction } from 'express';

import ProviderService from '@services/ProviderService';


class ProviderController {
    public async index (request: Request, response: Response, next: NextFunction): Promise<Response> {
        const providers = await ProviderService.findAll();

        return response.status(200).json({ providers });
    }

    public async show (request: Request, response: Response, next: NextFunction): Promise<Response> {
        try {
            const provider = await ProviderService.getProviderById(request.params.id);

            return response.status(200).json({ provider });
        } catch(err) {
            return response.status(400).json({ error: err.message });
        }
    } 

    public async store (request: Request, response: Response, next: NextFunction): Promise<Response> {
        try {
            const provider = await ProviderService.registerProviders(request.body);

            return response.status(201).json({ provider });
        } catch(err) {
            console.log(err)
            return response.status(400).json({ error: err.message });
        }
    }

    public async delete (request: Request, response: Response, next: NextFunction): Promise<Response> {
        try {
            await ProviderService.deleteProviders(request.params.id);

            return response.status(200).json({ message: 'Empresa deletada' });

        } catch(err) {
            console.log(err)
            return response.status(400).json({ error: err.message });
        }
    }
}

export default new ProviderController;