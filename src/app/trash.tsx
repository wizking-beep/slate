import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "@/hooks/theme";

const Trash = () => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.text, { color: colors.text }]}>
        This is the Trash Screen
      </Text>
      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
        Deleted notes will appear here and be permanently removed after 30 days.
      </Text>
    </View>
  );
};

export default Trash;

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