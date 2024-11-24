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
  Dimensions,
} from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { Eye, EyeSlash } from "phosphor-react-native";
import { api } from "@/convex/_generated/api";
import { useConvex } from "convex/react";

const ConfirmPassword = () => {
  const buttonPadding = Dimensions.get('screen').width * 0.04;

  const conv = useConvex();
  const { isLoaded, signUp, setActive } = useSignUp();
  const { email: emailAddress } = useLocalSearchParams<{ email: string }>();

  const [displayname, setDisplayname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [usernameValid, setUsernameValid] = useState(0);
  const [shown, setShown] = useState(false);

  const handleUsernameEnter = async () => {
    if (username.length == 0) {
      setUsernameValid(0);
      return;
    }

    const q = await conv.query(api.tasks.isUsernameUnique, {
      username: username,
    });
    setUsernameValid(q ? 1 : -1);
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.mainContainer}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              gap: 10,
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <View style={{ gap: 10, width: '60%' }}>
              <Text style={defaultStyles.pTextLS}>Display Name</Text>
              <TextInput
                maxLength={16}
                autoCapitalize="none"
                autoCorrect={false}
                enterKeyHint="done"
                style={[
                  styles.buttonContainer,
                  styles.buttonStylesOutline,
                  defaultStyles.pTextLS,
                  { padding: buttonPadding },
                ]}
                placeholder="Enter your Name"
                value={displayname}
                onChangeText={(e) => setDisplayname(e)}
              />
            </View>
            <View
              style={{
                backgroundColor: Colors.borderColor,
                width: "30%",
                borderRadius: 100,
                aspectRatio: 1,
              }}
            />
          </View>
          <View style={{ gap: 10 }}>
            <View style={{ flexDirection: "row" }}>
              <Text style={defaultStyles.pTextLS}>Username</Text>
              {usernameValid == 0 ? null : usernameValid == -1 ? (
                <Text style={[defaultStyles.pTextLS, { color: Colors.red }]}>
                  {"  "}-{"  "}not available
                </Text>
              ) : (
                <Text style={[defaultStyles.pTextLS, { color: Colors.green }]}>
                  {"  "}-{"  "}available!
                </Text>
              )}
            </View>
            <TextInput
              maxLength={16}
              autoCapitalize="none"
              autoCorrect={false}
              enterKeyHint="done"
              style={[
                styles.buttonContainer,
                styles.buttonStylesOutline,
                defaultStyles.pTextLS,
                { padding: buttonPadding },
              ]}
              placeholder="Enter your Username"
              onSubmitEditing={(e) => handleUsernameEnter()}
              value={username}
              onChangeText={(e) => setUsername(e)}
            />
          </View>
          <View style={{ gap: 10 }}>
            <Text style={defaultStyles.pTextLS}>Password</Text>
            <View
              style={[
                styles.buttonContainer,
                styles.buttonStylesOutline,
                { overflow: "hidden" },
              ]}
            >
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                enterKeyHint="done"
                secureTextEntry={!shown}
                style={[{ flex: 1, padding: buttonPadding }, defaultStyles.pTextLS]}
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
          <TouchableOpacity onPress={() => {}}>
            <View
              style={[
                styles.buttonContainer,
                styles.buttonStylesFilled,
                { padding: buttonPadding },
              ]}
            >
              <View />
              <Text style={defaultStyles.pTextD}>Create Account</Text>
              <View />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
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
    paddingTop: "10%",
    paddingHorizontal: "5%",
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
