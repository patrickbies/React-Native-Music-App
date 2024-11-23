import * as React from "react";
import {
  TextInput,
  Button,
  View,
  StyleSheet,
  ScrollView,
  Text,
  Image,
} from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { defaultStyles } from "@/constants/Styles";

const EmailVerify = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const { email: emailAddress } = useLocalSearchParams<{ email: string }>();
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setPendingVerification(true);
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.replace("/");
      } else {
        console.error(JSON.stringify(completeSignUp, null, 2));
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.mainContainer}>
          <View style={{ gap: 10 }}>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              enterKeyHint="done"
              placeholderTextColor={"#ccc"}
              style={[defaultStyles.displaynameText]}
              placeholder="Enter your name..."
            />
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              enterKeyHint="done"
              placeholderTextColor={"#ccc"}
              style={[defaultStyles.usernameText]}
              placeholder="@username..."
            />
          </View>
          <View style={{ gap: 10 }}>
            <Text style={defaultStyles.pTextLS}>Password</Text>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              enterKeyHint="done"
              secureTextEntry
              style={[
                styles.buttonContainer,
                styles.buttonStylesOutline,
                defaultStyles.pTextLS,
              ]}
              placeholder="Enter your password"
            />
          </View>
          <View style={{ gap: 10 }}>
            <Text style={defaultStyles.pTextLS}>Confirm Password</Text>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              enterKeyHint="done"
              secureTextEntry
              style={[
                styles.buttonContainer,
                styles.buttonStylesOutline,
                defaultStyles.pTextLS,
              ]}
              placeholder="Confirm your password"
            />
          </View>
          <View style={styles.line} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EmailVerify;

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
    backgroundColor: "white",
  },
  line: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.borderColor,
  },
});
