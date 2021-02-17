import { Product } from "@models/Product";
import { NotFoundError } from "@helpers/response/Error";
import { ProductsRegisterDTO } from "@dto/products/ProductDTO";
import ProductRepository from "@repositories/ProductRepository";

class ProductService {
  async findAll() {
    const products = await Product.findAll({ limit: 5 });

    if(!products) {
      throw new NotFoundError("No momento não temos produtos para mostrar, estamos atualizando o estoque");
    }

    return products;
  }

  async getProductsById(id: string) {
    const product = await Product.findOne({
      where: { id: id },
    });

    if (!product) {
      throw new NotFoundError("Produto não encontrado");
    }

    return product;
  }

  async getProductsByProvidersId(id: string) {
    const existsProvider = await ProductRepository.existsProvider(id);

    if (!existsProvider) {
      throw new NotFoundError("Fornecedor não existe");
    }

    const products = await Product.findAll({
      where: { providerId: id },
      limit: 5,
    });

    return products;
  }

  async getProductIdByProvidersId(idProc: string, idProv: string) {
    const provider = await ProductRepository.existsProvider(idProv);

    if (!provider) {
      throw new NotFoundError("Fornecedor não existe");
    }

    const product = await Product.findOne({
      where: { id: idProc, providerId: idProv },
    });

    if (!product) {
      throw new NotFoundError("Produto não existe");
    }

    if (product.inventory <= 0) {
      throw new NotFoundError("Produto não disponível");
    }

    return product;
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

  async sellProduct(data: number, id: string) {
    const product = await Product.findOne({
      where: { id: id },
    });

    if (!product) {
      throw new NotFoundError("Produto não existe");
    }

    if (product.inventory < data) {
      throw new NotFoundError("Produto não tem em estoque");
    }

    console.log(product.inventory, data);

    const inventory = product.inventory - data;

    const sell = await product.update(
      { inventory: inventory },
      { where: { id: id } }
    );

    return sell;
  }

  async updateProducts(data: ProductsRegisterDTO, id: string) {
    const product = await Product.findOne({
      where: { id: id },
    });

    if (!product) {
      throw new NotFoundError("Produto não existe");
    }

    await Product.update(data, {
      where: { id: id },
    });

    return product;
  }

  async deleteProducts(id: string) {
    const product = await Product.findOne({
      where: { id: id },
    });

    if (!product) {
      throw new NotFoundError("Produto não existe");
    }
    await Product.destroy({
      where: { id: id },
    });
  }
}

export default new ProductService();
