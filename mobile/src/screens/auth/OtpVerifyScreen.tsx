import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { authApi } from "../../api/auth.api";

export default function OtpVerifyScreen({ route }: any) {
  const { phone } = route.params;
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleVerify() {
    setLoading(true);
    setError(null);
    const { error } = await authApi.verifyOtp(phone, token);
    setLoading(false);
    if (error) setError(error.message);
    // On success, AuthContext's onAuthStateChange picks up the new session automatically.
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter the code sent to {phone}</Text>
      <TextInput
        style={styles.input}
        placeholder="123456"
        keyboardType="number-pad"
        value={token}
        onChangeText={setToken}
      />
      {error && <Text style={styles.error}>{error}</Text>}
      <Button title={loading ? "Verifying..." : "Verify"} onPress={handleVerify} disabled={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 24 },
  title: { fontSize: 18, fontWeight: "600", marginBottom: 24 },
  input: { borderWidth: 1, borderColor: "#ddd", borderRadius: 8, padding: 12, marginBottom: 12 },
  error: { color: "red", marginBottom: 12 }
});
