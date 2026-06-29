import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "@/hooks/theme";

const Account = () => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.text, { color: colors.text }]}>
        This is the Account Screen
      </Text>
      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
        Manage your profile, sync settings, and preferences here.
      </Text>
    </View>
  );
};

export default Account;

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