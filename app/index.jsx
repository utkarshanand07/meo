import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";

const HomeScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Funky Header Image */}
      {/* <Image
        source={{ uri: "https://cdn-icons-png.flaticon.com/512/4712/4712038.png" }}
        style={styles.image}
      /> */}

      {/* App Title */}
      <Text style={styles.title}>Welcome to MEWSSENGER 🔥</Text>

      {/* App Subtitle */}
      <Text style={styles.subtitle}>
        The dopest way to chat. Fast, fun, and made for YOU! 🚀💬
      </Text>

      {/* "Let's Chat" Button */}
      <TouchableOpacity style={styles.primaryButton} onPress={() => router.push("/auth/signup")}>
        <Text style={styles.primaryButtonText}>Let's Chat 🎉</Text>
      </TouchableOpacity>

      {/* "Log In" Button */}
      <TouchableOpacity style={styles.secondaryButton} onPress={() => router.push("/auth/signin")}>
        <Text style={styles.secondaryButtonText}>Already a user? Log in 🚀</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#141E30", // Dark blue background
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#ddd",
    textAlign: "center",
    marginBottom: 30,
  },
  primaryButton: {
    backgroundColor: "#FF007A", // Neon pink
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 50,
    marginBottom: 15,
    width: "80%",
    alignItems: "center",
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  secondaryButton: {
    borderColor: "#FF007A",
    borderWidth: 2,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 50,
    width: "80%",
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#FF007A",
    fontSize: 16,
    fontWeight: "bold",
  },
});
