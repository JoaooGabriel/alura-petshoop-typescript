import { Provider } from '@models/Provider';

class ProductRepository {
    async existsProvider(id: string) {
        const provider = await Provider.findOne({
            where: { id: id }
        });

        return provider;
    }
}

export default new ProductRepository;