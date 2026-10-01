import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from "react-native";
import { logsApi } from "../../api/logs.api";

const MOODS = ["Happy", "Calm", "Irritated", "Anxious", "Sad", "Energetic", "Low"];
const SYMPTOMS = ["Cramps", "Headache", "Bloating", "Back pain", "Acne", "Fatigue"];

export default function DailyMoodSymptomScreen() {
  const [mood, setMood] = useState<string | null>(null);
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);

  function toggleSymptom(symptom: string) {
    setSymptoms((prev) =>
      prev.includes(symptom) ? prev.filter((s) => s !== symptom) : [...prev, symptom]
    );
  }

  async function handleSave() {
    setSaving(true);
    try {
      await logsApi.upsert({
        log_date: new Date().toISOString().split("T")[0],
        mood: mood ?? undefined,
        symptoms,
        notes: notes || undefined
      });
    } finally {
      setSaving(false);
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>How are you feeling today?</Text>
      <View style={styles.chipRow}>
        {MOODS.map((m) => (
          <Text
            key={m}
            onPress={() => setMood(m)}
            style={[styles.chip, mood === m && styles.chipSelected]}
          >
            {m}
          </Text>
        ))}
      </View>

      <Text style={styles.label}>Any symptoms?</Text>
      <View style={styles.chipRow}>
        {SYMPTOMS.map((s) => (
          <Text
            key={s}
            onPress={() => toggleSymptom(s)}
            style={[styles.chip, symptoms.includes(s) && styles.chipSelected]}
          >
            {s}
          </Text>
        ))}
      </View>

      <Text style={styles.label}>Notes (optional)</Text>
      <TextInput
        style={styles.notesInput}
        multiline
        value={notes}
        onChangeText={setNotes}
        placeholder="Anything else you want to remember..."
      />

      <Button title={saving ? "Saving..." : "Save today's log"} onPress={handleSave} disabled={saving} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  label: { fontSize: 16, fontWeight: "600", marginTop: 16, marginBottom: 8 },
  chipRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  chip: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 14,
    marginRight: 8,
    marginBottom: 8,
    fontSize: 14
  },
  chipSelected: { backgroundColor: "#F9A8D4", borderColor: "#F9A8D4", color: "#fff" },
  notesInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    minHeight: 80,
    marginBottom: 24,
    textAlignVertical: "top"
  }
});
