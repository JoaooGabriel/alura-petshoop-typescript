import { ProviderRegisterDTO } from "@dto/provider/ProviderDTO";
import { ConflictError, NotFoundError } from "@helpers/response/Error";
import { Provider } from "@models/Provider";

class ProviderService {
  async findAll() {
    const providers = await Provider.findAll({ limit: 5 });

    return providers;
  }

  async getProviderById(id: string) {
    const provider = await Provider.findOne({
      where: { id: id },
    });

    if (!provider) {
      throw new NotFoundError("Fornecedor não existe");
    }

    return provider;
  }

  async registerProviders(data: ProviderRegisterDTO) {
    const { email } = data;

    const exists = await Provider.findOne({
      where: { email: email },
    });

    if (exists) {
      throw new ConflictError("Email já existe");
    }

    const provider = await Provider.create(data);

    return provider;
  }

  async updateProviders(data: ProviderRegisterDTO, id: string) {
    const exists = await Provider.findOne({
      where: { id: id },
    });

    if (!exists) {
      throw new NotFoundError("Fornecedor não existe");
    }

    await Provider.update(data, {
      where: { id: id },
    });

    return exists.name;
  }

  async deleteProviders(id: string) {
    const exists = await Provider.findOne({
      where: { id: id },
    });

    if (!exists) {
      throw new NotFoundError("Fornecedor não existe");
    }

    await Provider.destroy({
      where: { id: id },
    });
  }
}

export default new ProviderService();
