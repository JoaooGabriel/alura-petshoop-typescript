import { Product } from "@models/Product";
import { NotFoundError } from "@helpers/response/Error";
import { ProductsRegisterDTO } from "@dto/products/ProductDTO";
import ProductRepository from "@repositories/ProductRepository";

class ProductService {
  async findAll() {
    const providers = await Product.findAll({ limit: 5 });

    return providers;
  }

  async getProductsById(id: string) {
    const product = await Product.findOne({
      where: { id: id },
    });

    if (!product) {
      throw new NotFoundError("Fornecedor não existe");
    }

    return product;
  }

  async getProductsByProvidersId(id: string) {
    const exists = await ProductRepository.existsProvider(id);

    if (!exists) {
      throw new NotFoundError("Fornecedor não existe");
    }

    const products = await Product.findAll({
      where: { providerId: id },
      limit: 5,
    });

    return products;
  }

  async registerProducts(data: ProductsRegisterDTO) {
    const { providerId } = data;

    const existsProvider = await ProductRepository.existsProvider(providerId);

    if (!existsProvider) {
      throw new NotFoundError("Fornecedor não existe");
    }

    const product = await Product.create(data);

    return product;
  }
}

export default new ProductService();
