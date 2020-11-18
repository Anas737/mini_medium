export interface DTO {
  '@context': string;
  '@id': string;
  '@type': string;
  'hydra:description': string;
}

export interface ListDTO {
  '@context': string;
  '@id': string;
  '@type': string;
  'hydra:totalItems': number;
}
