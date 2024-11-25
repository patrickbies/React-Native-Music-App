import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'

const EditSong = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>

      </View>
    </View>
  )
}

export default EditSong

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor
  },
  header: {
    height: '40%',
  }
})