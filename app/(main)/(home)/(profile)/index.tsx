import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import ScrollText from '@/components/text/ScrollText'
import { defaultStyles } from '@/constants/Styles'

const Profile = () => {
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={defaultStyles.displaynameText} >Display Name</Text>
      </View>
      <View style={styles.bottom}>

      </View>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor
  },
  top: {
    height: '40%',
    justifyContent: 'flex-end',
    paddingHorizontal: '5%',
    paddingBottom: '2%'
  },
  bottom: {

  }
})