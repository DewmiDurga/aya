import React, { useState } from "react";
import { View, Text, Button, StyleSheet, ScrollView } from "react-native";
import { periodsApi } from "../../api/periods.api";

// Collects the user's last few period start dates during onboarding,
// which the backend uses immediately to generate a first prediction.
export default function CycleHistoryScreen({ navigation }: any) {
  const [dates, setDates] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  // NOTE: wire up a real date picker (e.g. @react-native-community/datetimepicker)
  // here — this is a structural placeholder.

  async function handleContinue() {
    setSaving(true);
    try {
      await Promise.all(dates.map((d) => periodsApi.create({ start_date: d })));
      navigation.navigate("HealthFlags");
    } finally {
      setSaving(false);
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Your recent periods</Text>
      <Text style={styles.body}>
        Add the start dates of your last 5 periods if you know them — this helps us predict
        your next one more accurately, especially if your cycle isn't regular.
      </Text>
      {/* Date picker inputs go here */}
      <Button title={saving ? "Saving..." : "Continue"} onPress={handleContinue} disabled={saving} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  heading: { fontSize: 22, fontWeight: "700", marginBottom: 8 },
  body: { fontSize: 14, color: "#666", marginBottom: 20, lineHeight: 20 }
});
