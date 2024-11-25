import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { Colors } from '@/constants/Colors'
import { useNavigation } from 'expo-router'
import SearchBar from '@/components/search/SearchBar'

const Search = () => {
  const nav = useNavigation();

  useEffect(() => {
    nav.setOptions({
      
      header: () => <SearchBar />
    })
  }, [nav]);

  return (
    <View style={styles.container}>
      <Text>Search</Text>
    </View>
  )
}

export default Search

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor
  }
})