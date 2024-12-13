import { Colors } from "@/constants/Colors";
import { useOAuth } from "@clerk/clerk-expo";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as WebBrowser from "expo-web-browser";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_apple" });
  const { startOAuthFlow: startOAuthFlowForGoogle } = useOAuth({
    strategy: "oauth_google",
  });

  const handleAppleOAuth = async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow();

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleOAuth = async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlowForGoogle();

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const openLink = async () => {
    await WebBrowser.openBrowserAsync("https://syketb.vercel.app");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.logoImage}
        source={require("@/assets/images/todoist-logo.png")}
      />
      <Image
        style={styles.bannerImage}
        source={require("@/assets/images/login.png")}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleAppleOAuth}>
          <Ionicons name="logo-apple" size={24} color="black" />
          <Text style={styles.buttonText}>Continue with Apple</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleGoogleOAuth}>
          <Ionicons name="logo-google" size={24} color="black" />
          <Text style={styles.buttonText}>Continue with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleGoogleOAuth}>
          <Ionicons name="mail" size={24} color="black" />
          <Text style={styles.buttonText}>Continue with Email</Text>
        </TouchableOpacity>
        <Text style={styles.description}>
          By continuing you agree to Todoist's{" "}
          <Text onPress={openLink} style={styles.link}>
            Terms of Service{" "}
          </Text>
          and{" "}
          <Text onPress={openLink} style={styles.link}>
            Privacy Policy
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 40,
    marginTop: 20,
  },
  logoImage: {
    height: 40,
    resizeMode: "contain",
    alignSelf: "center",
  },
  bannerImage: {
    height: 200,
    resizeMode: "contain",
    alignSelf: "center",
  },
  buttonContainer: {
    gap: 20,
    marginHorizontal: 40,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    padding: 10,
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.lightBorder,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
  },
  description: {
    fontSize: 12,
    textAlign: "center",
    color: Colors.lightText,
  },
  link: {
    color: Colors.lightText,
    fontSize: 12,
    textAlign: "center",
    textDecorationLine: "underline",
  },
});
