import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Href, router } from "expo-router";
import { useSignUp } from "@clerk/clerk-expo";

const Index = () => {
  const [emailAddress, setEmailAddress] = useState<string>('');
  const {signUp} = useSignUp()

  const continueWithEmail = () => {
    router.navigate(`/(createaccount)/${emailAddress}` as Href);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.mainContainer}>
          <Text style={defaultStyles.h1TextL}>Welcome to Sonundra</Text>

          {/* alt signup providers buttons */}
          <View style={{ gap: 20 }}>
            <TouchableOpacity>
              <View
                style={[styles.buttonContainer, styles.buttonStylesOutline]}
              >
                <Image source={require('@/assets/images/google_logo.png')} style={{width: 24, height: 24}}  />
                <Text style={defaultStyles.pTextL}>Continue with Google</Text>
                <AntDesign name="google" size={24} color="transparent" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View
                style={[styles.buttonContainer, styles.buttonStylesOutline]}
              >
                <AntDesign name="apple1" size={24} color="white" />
                <Text style={defaultStyles.pTextL}>Continue with Apple</Text>
                <AntDesign name="apple1" size={24} color="transparent" />
              </View>
            </TouchableOpacity>
          </View>

          {/* email signup provider */}
          <View style={styles.orContainer}>
            <View style={styles.orLine} />
            <Text style={[defaultStyles.pTextL, { color: Colors.borderColor, fontSize: 12 }]}>
              {" "}
              OR{" "}
            </Text>
            <View style={styles.orLine} />
          </View>
          <View style={{ gap: 10 }}>
            <Text style={defaultStyles.pTextLS}>Email</Text>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              enterKeyHint="done"
              style={[
                styles.buttonContainer,
                styles.buttonStylesOutline,
                defaultStyles.pTextLS,
              ]}
              value={emailAddress}
              onChangeText={e => setEmailAddress(e)}
              placeholder="name@example.com"
            />
          </View>
          <TouchableOpacity
            onPress={() => continueWithEmail()}
          >
            <View style={[styles.buttonContainer, styles.buttonStylesFilled]}>
              <View />
              <Text style={defaultStyles.pTextD}>Continue with Email</Text>
              <View />
            </View>
          </TouchableOpacity>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Text style={defaultStyles.pTextLS}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.navigate('/login')}>
              <Text style={[defaultStyles.pTextLS, {color: Colors.highlight}]}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: "5%",
    paddingTop: "20%",
    gap: 30,
  },
  buttonContainer: {
    flexDirection: "row",
    padding: "4%",
    justifyContent: "space-between",
    alignItems: "center",    
    borderRadius: 10,
  },
  buttonStylesOutline: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.borderColor,  
  },
  buttonStylesFilled: {
    backgroundColor: 'white'
  },
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  orLine: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.borderColor,
  },
});
