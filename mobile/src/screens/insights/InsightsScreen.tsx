import React from "react";
import { View, Text, StyleSheet } from "react-native";

// Placeholder — plug in a chart library (e.g. victory-native) once you have
// enough daily_logs data to compute mood-by-cycle-day patterns.
export default function InsightsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Your Patterns</Text>
      <Text style={styles.body}>
        Once you've logged a few months of daily mood and symptom data, this screen will
        show how your mood tends to shift across your cycle.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  heading: { fontSize: 24, fontWeight: "700", marginBottom: 12 },
  body: { fontSize: 14, color: "#666", lineHeight: 20 }
});
