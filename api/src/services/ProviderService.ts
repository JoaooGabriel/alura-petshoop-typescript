import { ProviderRegisterDTO } from '@dto/provider/ProviderDTO';
import { Provider } from '@models/Provider';

class ProviderService {
    async findAll() {
        const providers = await Provider.findAll();

        return providers;
    }

    async getProviderById(id: string) {
        const provider = await Provider.findOne({ 
            where: { id: id }
        });

        if (!provider) {
            throw new Error('Fornecedor não existe');
        }

        return provider;
    }

    async registerProviders(data: ProviderRegisterDTO) {
        const { email } = data;

        const exists = await Provider.findOne({
            where: { email: email },
        });

        if (exists) {
            throw new Error('Email já existe');
        }

        const provider = await Provider.create(data);

        return provider;
    }

    async deleteProviders(id: string) {

        const exists = await Provider.findOne({ 
            where: { id: id }
        });

        if (!exists) {
            throw new Error('Fornecedor não existe');
        }

        await Provider.destroy({
            where: { id: id }
        });
    }

}

export default new ProviderService;