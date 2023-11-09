import React from "react";
import {
  TransitionPresets,
  createStackNavigator,
} from "@react-navigation/stack";
import Home from "../Screens/Home";
import PlaceDetail from "../Components/PlaceDetail/PlaceDetail";

export default function HomeNavigation() {
  const isAndroid = true;
  const MainStack = createStackNavigator();
  return (
    <MainStack.Navigator
      screenOptions={{
        gestureEnabled: true,

        ...(isAndroid && TransitionPresets.ModalPresentationIOS),
      }}
    >
      <MainStack.Screen
        name="home-screen"
        options={{ headerShown: false }}
        component={Home}
      />
      <MainStack.Screen
        name="place-detail"
        options={{ title: "" }}
        component={PlaceDetail}
        screenOptions={{
          presentation: "modal",
        }}
      />
    </MainStack.Navigator>
  );
}
