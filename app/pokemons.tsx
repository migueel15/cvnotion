import PokemonList from "@/features/pokemons/PokemonList";
import { ScrollView } from "react-native";

const Pokemons = () => {

  return (
    <ScrollView onScrollBeginDrag={()=>{
      console.log("onScrollBeginDrag")
    }}>
      <PokemonList />
    </ScrollView>
  )
};

export default Pokemons;
  