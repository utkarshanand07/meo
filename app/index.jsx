import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useAuthStore } from "../services/useAuthStore";

const HomeScreen = () => {
  const router = useRouter();
  const authUser = useAuthStore((state) => state.authUser);

  // Redirect to Chat Screen if logged in
  React.useEffect(() => {
    if (authUser) {
      router.replace("/screens/Home"); // Navigate to chat screen
    }
  }, [authUser]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to MEWSSENGER 🔥</Text>
      <Text style={styles.subtitle}>
        The dopest way to chat. Fast, fun, and made for YOU! 🚀💬
      </Text>

      <TouchableOpacity style={styles.primaryButton} onPress={() => router.push("/auth/SignUpPage")}>
        <Text style={styles.primaryButtonText}>Let's Chat 🎉</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryButton} onPress={() => router.push("/auth/LoginPage")}>
        <Text style={styles.secondaryButtonText}>Already a user? Log in 🚀</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#141E30", padding: 20 },
  title: { fontSize: 28, fontWeight: "bold", color: "#fff", textAlign: "center" },
  subtitle: { fontSize: 16, color: "#ddd", textAlign: "center", marginBottom: 30 },
  primaryButton: { backgroundColor: "#FF007A", paddingVertical: 12, paddingHorizontal: 30, borderRadius: 50, marginBottom: 15, width: "80%", alignItems: "center" },
  primaryButtonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  secondaryButton: { borderColor: "#FF007A", borderWidth: 2, paddingVertical: 12, paddingHorizontal: 30, borderRadius: 50, width: "80%", alignItems: "center" },
  secondaryButtonText: { color: "#FF007A", fontSize: 16, fontWeight: "bold" },
});
