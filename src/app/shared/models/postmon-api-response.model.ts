export interface IPostmonApiResponse {
  bairro: string;
  cep: string;
  cidade: string;
  cidade_info: {
    area_km2: string;
    codigo_ibge: string;
  };
  estado: string;
  estado_info: {
    area_km2: string;
    codigo_ibge: string;
    nome: string;
  };
  logradouro: string;
}
