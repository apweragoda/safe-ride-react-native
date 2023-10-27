import React, { useContext, useEffect, useState } from "react";
import {
  Image,
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
import { UserLocationContext } from "../Context/UserLocationContext";
import GlobalApi from "../Services/GlobalApi";

export default function ControlPanel() {
  const [userEmail, setUserEmail] = useState("");
  const { isDarkmode, setTheme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [placeList, setPlaceList] = useState([]);
  const { location, setLocation } = useContext(UserLocationContext);
  const [city, setCity] = useState({});
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

  const GetNearBySearchPlace = (value) => {
    GlobalApi.nearByPlace(
      location.coords.latitude,
      location.coords.longitude,
      value
    ).then((resp) => {
      setPlaceList(resp.data.results);
      setCity(placeList[0]);
      console.log(placeList[0]);
    });
  };
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
    // if (location) {
    //   GetNearBySearchPlace("car_repair");
    // }

    _unsubscribe();
    return () => _subscribe();
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
            <View style={{ flexDirection: "column", alignItems: "stretch" }}>
              <Button
                text={"Get Nearby Hospital"}
                onPress={() => {
                  GetNearBySearchPlace("hospital");
                }}
                style={{
                  marginTop: 20,
                }}
                disabled={loading}
              />
              <Button
                text={"Get Nearby Police"}
                onPress={() => {
                  GetNearBySearchPlace("car_repair");
                }}
                style={{
                  marginTop: 20,
                }}
                disabled={loading}
              />
            </View>
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <Image
                resizeMode="contain"
                style={{
                  height: 20,
                  width: 20,
                }}
                source={{ uri: city ? city.icon : null }}
              />
              <Text>
                Business Status - {city ? city.business_status : "No Data Yet"}
              </Text>
              <Text>Place Name - {city ? city.name : "No Data Yet"}</Text>
              <Text>
                Place Address - {city ? city.vicinity : "No Data Yet"}
              </Text>
              <Text>Place ID - {city ? city.place_id : "No Data Yet"}</Text>
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
