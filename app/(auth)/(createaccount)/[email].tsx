import React, { useState } from "react";
import {
  TextInput,
  Button,
  View,
  StyleSheet,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { defaultStyles } from "@/constants/Styles";
import { Eye, EyeSlash } from "phosphor-react-native";

const ConfirmPassword = () => {
  const { isLoaded, signUp, setActive } = useSignUp();

  const { email: emailAddress } = useLocalSearchParams<{ email: string }>();
  const [password, setPassword] = useState("");
  const [shown, setShown] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.mainContainer}>
          <View style={{ gap: 10 }}>
            <Text style={defaultStyles.pTextLS}>Password *</Text>
            <View style={[styles.buttonContainer, styles.buttonStylesOutline, {overflow: 'hidden'}]}>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                enterKeyHint="done"
                secureTextEntry={!shown}
                style={[{ flex: 1, padding: "4%" }, defaultStyles.pTextLS]}
                placeholder="Enter your password"
                value={password}
                onChangeText={(e) => setPassword(e)}
              />
              <TouchableOpacity
                onPress={() => setShown(!shown)}
                style={{
                  backgroundColor: Colors.selected,
                  borderColor: Colors.borderColor,
                  borderLeftWidth: StyleSheet.hairlineWidth,
                  height: "100%",
                  width: "15%",
                }}
              >
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {shown ? (
                    <Eye color={Colors.backgroundColor} weight="fill" />
                  ) : (
                    <EyeSlash color={Colors.backgroundColor} weight="fill" />
                  )}
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.line} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ConfirmPassword;

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
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
  },
  buttonStylesOutline: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.borderColor,
  },
  buttonStylesFilled: {
    backgroundColor: "white",
  },
  line: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.borderColor,
  },
});
