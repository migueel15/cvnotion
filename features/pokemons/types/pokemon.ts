export interface Pokemon {
  id: number;
  name: string;
  url?: string;
  types?: Array<{
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }>;
  sprites?: {
    front_default: string;
    other?: {
      'official-artwork'?: {
        front_default: string;
      };
    };
  };
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
}
