import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { BookmarkSimple, CardsThree, Heart } from 'phosphor-react-native'
import { Colors } from '@/constants/Colors'
import { api } from '@/convex/_generated/api'

type ProfileTabs = {
  posts: typeof api.tasks.queryUser._returnType | undefined
}

const ProfileTabs = ({posts} : ProfileTabs) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
        <CardsThree color={Colors.unselected} size={25}/>
        </TouchableOpacity>
        <TouchableOpacity>
        <Heart color={Colors.unselected} size={25}/>
        </TouchableOpacity>
        <TouchableOpacity>
        <BookmarkSimple color={Colors.unselected} size={25}/>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ProfileTabs

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: '5%',
    paddingBottom: '2%',
    paddingHorizontal: '10%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.borderColor
  }
})