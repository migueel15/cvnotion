import React from "react";
import { Linking, Text, TextInput, View } from "react-native";

type Props = {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
};

const PokemonSearch = ({ input, setInput }: Props) => {
  return (
    <View className="flex justify-center">
      <TextInput
        onChangeText={setInput}
        value={input}
        placeholder="Inserte un id"
      />
    </View>
  );
};

export default PokemonSearch;
