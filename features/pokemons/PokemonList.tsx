import { Text, View } from "react-native";
import PokemonCard from "./components/PokemonCard";
import usePokemonManager from "./hooks/usePokemonManager";
import PokemonSearch from "./components/PokemonSearch";

const PokemonList = () => {
  const manager = usePokemonManager();
  const { pokemons, count, input, setInput, pokemon } = manager;
  return (
    <View>
      <PokemonSearch input={input} setInput={setInput} />
      <Text>Pokemon buscado: {pokemon.name}</Text>
      <Text>Total de pokemons: {count}</Text>
      {pokemons.map((pokemon: any) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </View>
  );
};

export default PokemonList;
