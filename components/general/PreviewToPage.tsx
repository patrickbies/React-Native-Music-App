import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

type PreviewToPage = {
  previewComponent: React.ReactNode;
  mainComponent: React.ReactNode;
}

const PreviewToPage = ({previewComponent, mainComponent} : PreviewToPage) => {
  return (
    <View>
      <Text>PreviewToPage</Text>
    </View>
  )
}

export default PreviewToPage

const styles = StyleSheet.create({})