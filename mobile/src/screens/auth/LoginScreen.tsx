import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { authApi } from "../../api/auth.api";

export default function LoginScreen({ navigation }: any) {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSendOtp() {
    setLoading(true);
    setError(null);
    const { error } = await authApi.signUpWithPhone(phone);
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    navigation.navigate("OtpVerify", { phone });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Eya</Text>
      <Text style={styles.subtitle}>Enter your phone number to continue</Text>
      <TextInput
        style={styles.input}
        placeholder="+94 7XX XXX XXX"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />
      {error && <Text style={styles.error}>{error}</Text>}
      <Button title={loading ? "Sending..." : "Send OTP"} onPress={handleSendOtp} disabled={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 24 },
  title: { fontSize: 28, fontWeight: "700", marginBottom: 8 },
  subtitle: { fontSize: 14, color: "#666", marginBottom: 24 },
  input: { borderWidth: 1, borderColor: "#ddd", borderRadius: 8, padding: 12, marginBottom: 12 },
  error: { color: "red", marginBottom: 12 }
});
