import React from "react";
import { View, Button, StyleSheet } from "react-native";
import { authApi } from "../../api/auth.api";

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Button title="Sign out" onPress={() => authApi.signOut()} color="#EF4444" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "flex-end" }
});
