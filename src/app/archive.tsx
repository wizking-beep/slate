import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "@/hooks/theme";

const Archive = () => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.text, { color: colors.text }]}>
        This is the Archive Screen
      </Text>
      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
        Your archived notes will appear here.
      </Text>
    </View>
  );
};

export default Archive;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
  },
});