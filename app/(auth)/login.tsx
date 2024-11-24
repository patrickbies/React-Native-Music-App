import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import {
  Text,
  TextInput,
  Button,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useLoading } from "@/context/LoadingContext";

const LoginPage = () => {
  const { signIn, setActive, isLoaded } = useSignIn();
  const {showLoading, hideLoading} = useLoading();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onSignInPress = React.useCallback(async () => {
    if (!isLoaded) {
      return;
    }

    showLoading();

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
        // See https://clerk.com/docs/custom-flows/error-handling
        // for more info on error handling
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  }, [isLoaded, emailAddress, password]);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.mainContainer}>
          <Text style={defaultStyles.h1TextL}>Log in to Sonundra</Text>
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
              placeholder="name@example.com"
              value={emailAddress}
              onChangeText={e => setEmailAddress(e)}
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
              value={password}
              onChangeText={e => setPassword(e)}
            />
          </View>
          <TouchableOpacity>
            <Text style={[defaultStyles.pTextLS, { color: Colors.highlight }]}>
              Forgot Password?
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onSignInPress().finally(() => hideLoading())}
          >
            <View style={[styles.buttonContainer, styles.buttonStylesFilled]}>
              <View />
              <Text style={defaultStyles.pTextD}>Login</Text>
              <View />
            </View>
          </TouchableOpacity>
          <View style={styles.orContainer}>
            <View style={styles.orLine} />
            <Text
              style={[
                defaultStyles.pTextL,
                { color: Colors.borderColor, fontSize: 12 },
              ]}
            >
              {" "}
              OR{" "}
            </Text>
            <View style={[styles.orLine]} />
          </View>
          <View style={{ gap: 20 }}>
            <TouchableOpacity>
              <View
                style={[styles.buttonContainer, styles.buttonStylesOutline]}
              >
                <Image source={require('@/assets/images/google_logo.png')} style={{width: 24, height: 24}}  />
                <Text style={defaultStyles.pTextL}>Login with Google</Text>
                <AntDesign name="google" size={24} color="transparent" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View
                style={[styles.buttonContainer, styles.buttonStylesOutline]}
              >
                <AntDesign name="apple1" size={24} color="white" />
                <Text style={defaultStyles.pTextL}>Login with Apple</Text>
                <AntDesign name="apple1" size={24} color="transparent" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: "5%",
    paddingTop: "20%",
    gap: 20,
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
