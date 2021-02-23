import { ProviderRegisterDTO } from "@dto/provider/ProviderDTO";
import { Provider } from '@models/Provider';
import { validate } from 'class-validator';
import { ValidationError } from '@helpers/response/Error';

class ProviderRepository {
  async register(data: ProviderRegisterDTO) {
      const { name, email, category } = data;

      const provider = new Provider();
      provider.name = name;
      provider.email = email;
      provider.category = category;

      const errors = await validate(provider);

      if (errors.length > 0) {
          console.log(errors);
          throw new ValidationError(errors);
      }
      
      await Provider.create(data);

      return provider;
  }
}

export default new ProviderRepository();
