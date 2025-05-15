import { Pokemon, PokemonListResponse } from '../types/pokemon';

export const getPokemons = async (): Promise<PokemonListResponse> => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon`);
  return response.json();
};

export const getPokemonsById = async (id: string): Promise<Pokemon> => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  return response.json();
};
