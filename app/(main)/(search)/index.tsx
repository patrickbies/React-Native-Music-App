import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Colors } from "@/constants/Colors";
import { Href, router } from "expo-router";
import SearchBar from "@/components/search/SearchBar";
import { X } from "phosphor-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { defaultStyles } from "@/constants/Styles";
import { useUser } from "@clerk/clerk-expo";
import UserPostList from "@/components/general/UserPostList";

const Search = () => {
  const screenWidth = Dimensions.get("screen").width;
  const paddingHorizontal = screenWidth * 0.05;
  const elementWidth = (screenWidth - 3 * paddingHorizontal) / 2;

  const { top: safeTop, bottom: safeBottom } = useSafeAreaInsets();
  const conv = useConvex();
  const [results, setResults] =
    useState<typeof api.tasks.searchBar._returnType>();

  const search = async (query: string) => {
    if (!query.length) return;

    const res = await conv.query(api.tasks.searchBar, { searchTerm: query });
    setResults(res);
  };

  const header = () => (
    <View
      style={styles.header}
    >
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => router.back()}>
          <X color={Colors.unselected} size={28} />
        </TouchableOpacity>
        <SearchBar search={search} />
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { paddingTop: safeTop }]}>
      {header()}
      {results && <UserPostList 
        listHeader={<></>}
        posts={results} 
      />}
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  header: {
    paddingHorizontal: "5%",
    backgroundColor: Colors.backgroundColor,
    zIndex: 1,
    width: "100%",
    height: "7%",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.borderColor,
    alignItems: 'center'
  },
  headerContainer: {
    position: "absolute",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
});
