import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Colors } from "@/constants/Colors";
import { MagnifyingGlass, PaperPlaneTilt } from "phosphor-react-native";

type SearchBar = {
  search: (query: string) => void
};

const { width: sw } = Dimensions.get("screen");

const SearchBar = ({search}: SearchBar) => {
  const [q, setQ] = useState("");

  return (
    <View style={styles.container}>
      <MagnifyingGlass weight="bold" color={Colors.borderColor} size={20} />
      <TextInput
        enterKeyHint="search"
        style={{
          padding: sw * 0.9 * 0.03,
          fontWeight: "600",
          fontSize: 14,
          width: '82.5%',
          color: Colors.unselected,
        }}
        value={q}
        onSubmitEditing={() => search(q)}
        onChangeText={e => setQ(e)}
        placeholderTextColor={Colors.borderColor}
        placeholder="Search"
      />
      <TouchableOpacity
        style={{
          width: '10%',
          aspectRatio: 1,
          backgroundColor: "#333",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 20,
        }}
        onPress={() => search(q)}
      >
        <PaperPlaneTilt color={Colors.blue} weight="fill" size={20}/>
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 20,
    paddingLeft: sw * 0.9 * 0.04,
    backgroundColor: Colors.lightBg,
    flexDirection: "row",
    alignItems: "center",
  },
});
