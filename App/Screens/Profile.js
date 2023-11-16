import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  Button,
  Layout,
  Section,
  SectionContent,
  TopNav,
  themeColor,
  useTheme,
} from "react-native-rapi-ui";
import Voice from "@react-native-voice/voice";
import Colors from "../../assets/Colors/Colors";
import { auth } from "../../Firebase";
import { signOut } from "firebase/auth";
import Home from "./Home";

export default function Profile({ navigation }) {
  const { isDarkmode, setTheme } = useTheme();
  const [recognized, setRecognized] = useState("");
  const [started, setStarted] = useState("");
  const [results, setResults] = useState([]);
  const styless = StyleSheet.create({
    logo: {
      width: 50,
      height: 50,
    },
    searchBar: {
      borderWidth: 3.5,
      borderColor: Colors.BLACK,
      padding: 4,
      borderRadius: 50,
      paddingLeft: 10,
      width: Dimensions.get("screen").width * 0.53,
    },
    userImage: {
      width: 50,
      height: 50,
      borderRadius: 100,
    },
    container: {
      backgroundColor: isDarkmode ? "#262834" : "white",
    },
  });
  useEffect(() => {
    const getPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: "Microphone Permission",
            message: "App needs access to your microphone",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("Microphone permission granted");
        } else {
          console.log("Microphone permission denied");
        }
      } catch (err) {
        console.warn(err);
      }
    };
    getPermission();

    Voice.onSpeechStart = onSpeechStartHandler;
    Voice.onSpeechRecognized = onSpeechRecognizedHandler;
    Voice.onSpeechResults = onSpeechResultsHandler;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechStartHandler = (e) => {
    setStarted("√");
  };

  const onSpeechRecognizedHandler = (e) => {
    setRecognized("√");
  };

  const onSpeechResultsHandler = (e) => {
    setResults(e.value);
    if (e.value.includes("hello")) {
      alert("No Accident Detected");
    }
  };

  const startListeningHandler = async () => {
    setStarted("");
    setRecognized("");
    setResults([]);

    try {
      await Voice.start("en-US");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Layout style={{ marginTop: 0 }}>
      <TopNav
        middleContent="Profile"
        leftContent={
          <Ionicons
            name={isDarkmode ? "sunny" : "moon"}
            size={20}
            color={isDarkmode ? themeColor.white100 : themeColor.dark}
          />
        }
        rightContent={
          <Image
            source={require("./../../assets/user.png")}
            style={styless.userImage}
          />
        }
        leftAction={() => {
          if (isDarkmode) {
            setTheme("light");
          } else {
            setTheme("dark");
          }
        }}
        rightAction={() => {
          signOut(auth);
          console.log("User Logged out");
          alert("User Logged out");
          navigation.navigate("Login");
        }}
      />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity onPress={startListeningHandler}>
          <Text style={{ fontSize: 25 }}>Press to Speak</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 20, marginVertical: 10 }}>
          {recognized}
          {started}
        </Text>
        <Text style={{ fontSize: 20 }}>
          {results.map((result, index) => (
            <Text key={`result-${index}`}>{result}</Text>
          ))}
        </Text>
      </View>
    </Layout>
  );
}
