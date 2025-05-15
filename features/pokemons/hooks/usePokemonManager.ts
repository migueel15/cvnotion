import { useEffect, useState } from "react";
import { getPokemons, getPokemonsById } from "../services/main";
import { Pokemon } from "../types/pokemon";

const usePokemonManager = () => {
  const [input, setInput] = useState("");
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [pokemon, setPokemon] = useState<Pokemon>({ id: 0, name: "" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    getPokemons().then((data) => {
      setPokemons(data.results);
      setCount(data.count);
    });
  }, []);

  useEffect(() => {
    if (input.trim()) {
      getPokemonsById(input).then((data: Pokemon) => {
        setPokemon(data);
      });
    }
  }, [input]);

  return { pokemons, count, input, setInput, pokemon };
};

export default usePokemonManager;
