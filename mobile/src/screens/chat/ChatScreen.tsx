import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, FlatList, KeyboardAvoidingView, Platform } from "react-native";
import { chatApi } from "../../api/chat.api";

interface Message {
  id: string;
  role: "user" | "assistant";
  text: string;
}

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);

  async function handleSend() {
    if (!input.trim()) return;
    const userMessage: Message = { id: Date.now().toString(), role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setSending(true);

    try {
      const { reply } = await chatApi.send(userMessage.text);
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString() + "-r", role: "assistant", text: reply }
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString() + "-e",
          role: "assistant",
          text: "Sorry, something went wrong. Please try again."
        }
      ]);
    } finally {
      setSending(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Text style={styles.disclaimer}>
        Eya's chatbot gives general information — it's not a substitute for medical advice.
      </Text>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.bubble, item.role === "user" ? styles.userBubble : styles.botBubble]}>
            <Text style={item.role === "user" ? styles.userText : styles.botText}>{item.text}</Text>
          </View>
        )}
        contentContainerStyle={{ paddingVertical: 12 }}
      />
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Ask about your cycle, symptoms..."
        />
        <Button title={sending ? "..." : "Send"} onPress={handleSend} disabled={sending} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  disclaimer: { fontSize: 11, color: "#999", marginBottom: 8, textAlign: "center" },
  bubble: { padding: 12, borderRadius: 12, marginVertical: 4, maxWidth: "80%" },
  userBubble: { backgroundColor: "#F9A8D4", alignSelf: "flex-end" },
  botBubble: { backgroundColor: "#F3F4F6", alignSelf: "flex-start" },
  userText: { color: "#fff" },
  botText: { color: "#111" },
  inputRow: { flexDirection: "row", gap: 8, alignItems: "center" },
  input: { flex: 1, borderWidth: 1, borderColor: "#ddd", borderRadius: 20, padding: 10 }
});
