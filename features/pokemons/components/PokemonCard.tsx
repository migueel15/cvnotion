import { Linking, Text, View } from "react-native";

const PokemonCard = ({ pokemon }: { pokemon: any }) => {
  return (
    <View style={{ backgroundColor: "red", marginBottom:10, display: "flex", borderRadius: 10 }}>
      <Text style={{ color: "white", textAlign: "center" }}>{pokemon.name}</Text>
      <Text style={{ color: "white", textAlign: "center" }} onPress={()=>{
        // open url in browser
        Linking.openURL(pokemon.url);
      }}>{pokemon.url}</Text>
    </View>
  );
};

export default PokemonCard;