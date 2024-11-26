import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import * as DocumentPicker from 'expo-document-picker';
import { defaultStyles } from '@/constants/Styles';

const EditSong = () => {
  const chooseFile = async () => {
    const doc = await DocumentPicker.getDocumentAsync(
      {
        multiple: false,
      }
    );
    if (doc.canceled) return;

    console.log(doc.assets);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => chooseFile()}>
          <Text style={defaultStyles.pTextL}>Select Audio from Files</Text>
        </TouchableOpacity>
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