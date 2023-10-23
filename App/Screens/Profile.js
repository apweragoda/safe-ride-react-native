import { View, Text } from "react-native";
import React from "react";
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
export default function Profile() {
  const { isDarkmode, setTheme } = useTheme();
  return (
    <Layout style={{ marginTop: 0 }}>
      <TopNav
        middleContent="Profile"
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
    </Layout>
  );
}
