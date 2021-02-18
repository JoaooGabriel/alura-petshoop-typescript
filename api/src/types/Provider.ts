export interface IProvider {
    name: string;
    email: string;
}

export enum ProviderCategory {
    RACAO = 'ração',
    BRINQUEDO = 'brinquedos',
}