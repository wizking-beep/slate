import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "@/hooks/theme";

export default function Index() {
  const { colors, theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
   //<StatusBar style={isDark ? "light" : "dark"} />

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
     
      <Text>This is the home screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
