import { ProviderCategory } from "@typing/Provider";

interface ProviderRegisterDTO {
    name: string,
    email: string,
    category: ProviderCategory,
}

export { ProviderRegisterDTO }