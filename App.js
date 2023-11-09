import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import { StyleSheet, View } from "react-native";
import Colors from "./App/Shared/Colors";

import * as Location from "expo-location";
import { initializeApp } from "firebase/app";
import { UserLocationContext } from "./App/Context/UserLocationContext";
import TabNavigation from "./App/Navigation/TabNavigation";
import { ThemeProvider } from "react-native-rapi-ui";
import HomeNavigation from "./App/Navigation/HomeNavigation";

const firebaseConfig = {
  apiKey: "AIzaSyAKiDDG3AWrDynp7poWJj_rteA85vQl4Ik",
  authDomain: "safe-ride-90fca.firebaseapp.com",
  projectId: "safe-ride-90fca",
  storageBucket: "safe-ride-90fca.appspot.com",
  messagingSenderId: "16571767948",
  appId: "1:16571767948:web:c8a2971769b3cd9670afa9",
  measurementId: "G-NT7JGGZ7VF",
};
// initialize firebase
const app = initializeApp(firebaseConfig);

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [fontsLoaded] = useFonts({
    "raleway-bold": require("./assets/Fonts/Raleway-SemiBold.ttf"),
    "raleway-regular": require("./assets/Fonts/Raleway-Regular.ttf"),
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);
  return (
    <ThemeProvider theme="light">
      <View style={styles.container}>
        <UserLocationContext.Provider value={{ location, setLocation }}>
          <NavigationContainer>
            {/* <HomeNavigation /> */}
            <TabNavigation />
          </NavigationContainer>
        </UserLocationContext.Provider>
      </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    paddingTop: 20,
  },
});
