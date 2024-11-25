import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useSignUp } from '@clerk/clerk-expo'
import { Colors } from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const VerifyEmail = () => {
  const {signUp, isLoaded}  = useSignUp();
  const {top: paddingTop} = useSafeAreaInsets();

  return (
    <View style={[styles.container, {paddingTop: paddingTop}]}>
      <Text style={[defaultStyles.displaynameText, {color: Colors.backgroundColor, fontWeight: '800'}]}>Verify Email</Text>
      <Text style={[defaultStyles.displaynameText, {color: Colors.backgroundColor, fontSize: 18}]}>Please verify your email in order to post</Text>
    </View>
  )
}

export default VerifyEmail

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: '5%',
    backgroundColor: '#eee',
    gap: 30,
    alignItems: 'center'
  }
})