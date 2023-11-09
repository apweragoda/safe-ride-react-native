import { View, Text } from "react-native";
import React from "react";
import {
  TransitionPresets,
  createStackNavigator,
} from "@react-navigation/stack";
import Home from "../Screens/Home";
import PlaceDetail from "../Components/PlaceDetail/PlaceDetail";
import Login from "../Screens/Login";
import Register from "../Screens/Register";
import ForgetPassword from "../Screens/ForgetPassword";

export default function HomeNavigation() {
  const isAndroid = true;
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,

        ...(isAndroid && TransitionPresets.ModalPresentationIOS),
      }}
    >
      {/* <Stack.Screen
        name="login-screen"
        options={{ headerShown: false }}
        component={Login}
      />
      <Stack.Screen
        name="register-screen"
        options={{ headerShown: false }}
        component={Register}
      />
      <Stack.Screen
        name="forgot-screen"
        options={{ headerShown: false }}
        component={ForgetPassword}
      /> */}
      <Stack.Screen
        name="home-screen"
        options={{ headerShown: false }}
        component={Home}
      />
      <Stack.Screen
        name="place-detail"
        options={{ title: "" }}
        component={PlaceDetail}
        screenOptions={{
          presentation: "modal",
        }}
      />
    </Stack.Navigator>
  );
}
