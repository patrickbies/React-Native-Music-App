import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Id } from '@/convex/_generated/dataModel';

type posts = {
  _id: Id<"posts">;
  _creationTime: number;
  createdAt: number;
  userId: Id<"users">;
  gifBackground: boolean;
  name: string;
  mediaUrl: string;
  shares: number;
  saves: number;
  likes: number;
  mediaId: string;
}[];

type PostPage = {
  posts: posts;
  index: number;
}

const PostPage = ({posts, index} : PostPage) => {
  return (
    <View>
      <Text>PostPage</Text>
    </View>
  )
}

export default PostPage

const styles = StyleSheet.create({})