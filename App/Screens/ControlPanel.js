import React, { useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Accelerometer } from "expo-sensors";
import {
  Button,
  Layout,
  Section,
  SectionContent,
  TopNav,
  themeColor,
  useTheme,
} from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";

export default function ControlPanel() {
  const [userEmail, setUserEmail] = useState("");
  const { isDarkmode, setTheme } = useTheme();
  const [loading, setLoading] = useState(false);
  const styles = StyleSheet.create({
    listItem: {
      marginHorizontal: 20,
      marginTop: 20,
      padding: 20,
      backgroundColor: isDarkmode ? "#262834" : "white",
      borderRadius: 10,
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      alignItems: "center",
    },
    colItems: {
      marginHorizontal: 20,
      marginTop: 20,
      padding: 20,
      backgroundColor: isDarkmode ? "#262834" : "white",
      borderRadius: 10,
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "flex-end",
    },
    detailsText: {
      marginBottom: 10,
      fontSize: 30,
    },
  });
  const [{ x, y, z }, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [subscription, setSubscription] = useState(null);

  const _slow = () => Accelerometer.setUpdateInterval(1000);
  const _fast = () => Accelerometer.setUpdateInterval(16);

  const _subscribe = () => {
    setSubscription(Accelerometer.addListener(setData));
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

  return (
    <Layout>
      <TopNav
        middleContent="Control Panel"
        rightContent={
          <Ionicons
            name={isDarkmode ? "sunny" : "moon"}
            size={20}
            color={isDarkmode ? themeColor.white100 : themeColor.dark}
          />
        }
        rightAction={() => {
          if (isDarkmode) {
            setTheme("light");
          } else {
            setTheme("dark");
          }
        }}
      />
      <KeyboardAvoidingView behavior="height" enabled style={{ flex: 1 }}>
        <Layout>
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
            }}
          >
            <View style={styles.listItem}>
              <View style={{ flexDirection: "column", alignItems: "stretch" }}>
                <Text style={styless.text}>
                  Accelerometer: (in x: number y: number z: number)
                </Text>
                <Text style={styless.text}>x: {x.toFixed(2)}</Text>
                <Text style={styless.text}>y: {y.toFixed(2)}</Text>
                <Text style={styless.text}>z: {z.toFixed(2)}</Text>
                <View style={styless.buttonContainer}>
                  <TouchableOpacity
                    onPress={subscription ? _unsubscribe : _subscribe}
                    style={styless.button}
                  >
                    <Text>{subscription ? "On" : "Off"}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={_slow}
                    style={[styless.button, styless.middleButton]}
                  >
                    <Text>Slow</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={_fast} style={styless.button}>
                    <Text>Fast</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </Layout>
      </KeyboardAvoidingView>
    </Layout>
  );
}

const styless = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  text: {
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "stretch",
    marginTop: 15,
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee",
    padding: 10,
  },
  middleButton: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "#ccc",
  },
});
