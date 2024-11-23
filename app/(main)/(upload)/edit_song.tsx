import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'

const EditSong = () => {
  return (
    <View style={styles.container}>
      <Text>EditSong</Text>
    </View>
  )
}

export default EditSong

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor
  }
})