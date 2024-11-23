import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'

const UploadSong = () => {
  return (
    <View style={styles.container}>
      <Text>UploadSong</Text>
    </View>
  )
}

export default UploadSong

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor
  }
})