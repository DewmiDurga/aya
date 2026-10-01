import React from "react";
import { View, Text, StyleSheet, ScrollView, Button } from "react-native";
import { useCyclePrediction } from "../../hooks/useCyclePrediction";

export default function CalendarScreen({ navigation }: any) {
  const { prediction, loading, error } = useCyclePrediction();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Your Cycle</Text>

      {loading && <Text>Loading prediction...</Text>}
      {error && <Text style={styles.error}>{error}</Text>}

      {prediction && !prediction.available && (
        <Text style={styles.info}>{prediction.message}</Text>
      )}

      {prediction?.available && (
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Predicted next period</Text>
          <Text style={styles.cardDate}>{prediction.predictedStart}</Text>
          <Text style={styles.cardRange}>
            Likely between {prediction.rangeLow} and {prediction.rangeHigh}
          </Text>
          <Text style={styles.confidence}>
            Confidence: {prediction.confidence} ({prediction.cycleType} cycle)
          </Text>
        </View>
      )}

      <View style={{ marginTop: 24 }}>
        <Button title="Log Today" onPress={() => navigation.navigate("DailyLog")} />
      </View>
      <View style={{ marginTop: 12 }}>
        <Button title="Insights" onPress={() => navigation.navigate("Insights")} />
      </View>
      <View style={{ marginTop: 12 }}>
        <Button title="Ask Eya" onPress={() => navigation.navigate("Chat")} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  heading: { fontSize: 24, fontWeight: "700", marginBottom: 16 },
  card: { backgroundColor: "#FDF2F8", borderRadius: 12, padding: 16, marginTop: 8 },
  cardLabel: { fontSize: 13, color: "#888" },
  cardDate: { fontSize: 22, fontWeight: "700", marginTop: 4 },
  cardRange: { fontSize: 14, color: "#555", marginTop: 4 },
  confidence: { fontSize: 12, color: "#999", marginTop: 8 },
  info: { fontSize: 14, color: "#555", marginTop: 12 },
  error: { color: "red" }
});
