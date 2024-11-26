import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, {  useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";
import * as ImagePicker from "expo-image-picker";
import { defaultStyles } from "@/constants/Styles";
import { Image } from "expo-image";
import Animated, { useAnimatedKeyboard, useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { useLoading } from "@/context/LoadingContext";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUID } from "@/context/UIDContext";
import { router, useNavigation } from "expo-router";

const UploadSong = () => {
  const [img, setImg] = useState<ImagePicker.ImagePickerAsset>();
  const [title, setTitle] = useState<string>("")
  const textBottom = useSharedValue(0);
  const { hideLoading, showLoading } = useLoading();
  const {height: screenHeight} = Dimensions.get('screen')
  const conv = useConvex();
  const userId = useUID().userData?._id;
  const nav = useNavigation();

  const animatedPadding = useAnimatedKeyboard()
  const animatedStyles = useAnimatedStyle(() => ({
    top: Math.min(0, screenHeight - animatedPadding.height.value - textBottom.value - 100)
  }));


  const uploadPost = async () => {
    if (!title.length || !img) return;
    
    showLoading();
    try {
    const postUrl = await conv.mutation(api.upload_post.generateUploadUrl);
    const response = await fetch(img.uri); // Use the `uri` from the selected image
    const blob = await response.blob();

    const res = await fetch(postUrl, {
      method: 'POST',
      headers: {'Content-Type': blob.type},
      body: blob
    });
    const { storageId } = await res.json();

    const uri = await conv.query(api.upload_post.getDownloadUrl, {storageId: storageId})

    await conv.mutation(api.upload_post.post, {
      gifBackground: false,
      mediaUrl: uri!,
      mediaId: storageId,
      name: title,
      userId: userId!
    });

    hideLoading();
    router.replace('/(home)/(feed)')
  } catch (e : any) {
      hideLoading();
      alert(e);
    }
  }

  const chooseImage = async () => {
    const _img = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      allowsMultipleSelection: false,
      mediaTypes: "images",
    });

    if (_img.canceled) return;
    setImg(_img.assets[0]);
  };

  useEffect(() => {
    nav.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => uploadPost()}>
          <Text style={{color: Colors.blue}}>Post</Text>
        </TouchableOpacity>
      ),
    })
  }, [title, img, nav])


  return (
    <Animated.View style={[styles.container, animatedStyles]}>
      <View style={styles.imageContainer}>
        {img == undefined ? (
          <View style={styles.image} />
        ) : (
          <Image style={styles.image} source={{ uri: img.uri }} />
        )}
      </View>
      <TouchableOpacity
        onPress={() => chooseImage()}
        style={[
          { backgroundColor: Colors.selected, marginVertical: "5%" },
          styles.buttonContainer,
        ]}
      >
        <Text style={defaultStyles.pTextD}>
          Choose Album Cover from Camera Roll
        </Text>
      </TouchableOpacity>
      <View style={styles.line} />
      <View style={{ gap: 10 }} onLayout={e => textBottom.value = e.nativeEvent.layout.height + e.nativeEvent.layout.y}>
        <Text style={defaultStyles.pTextL}>Song Title</Text>
        <TextInput
          onChangeText={e => setTitle(e)}
          value={title}
          style={[
            {
              borderColor: Colors.borderColor,
              borderWidth: StyleSheet.hairlineWidth,
            },
            styles.buttonContainer,
            defaultStyles.pTextL
          ]}
          placeholder="Enter song title"
          placeholderTextColor={Colors.borderColor}
        />
      </View>
    </Animated.View>
  );
};

export default UploadSong;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    padding: "5%",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    backgroundColor: "#333",
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    padding: "4%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  line: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.borderColor,
    marginVertical: '5%'
  },
});
