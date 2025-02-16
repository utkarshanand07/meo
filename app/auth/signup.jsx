import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { signup } from "../../services/auth";

export default function SignUpScreen() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignUp = async () => {
    try {
      console.log("Attempting signup...");
      const response = await signup(username, email, password);
  
      console.log("Signup successful, navigating to home...");
      router.push("/home");
    } catch (error) {
      console.error("Signup failed:", error);
      setError(error.message || "Sign-up failed. Please try again.");
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Your Account 🔥</Text>
      <Text style={styles.subtitle}>Join the messenger revolution 🚀</Text>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#bbb"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#bbb"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#bbb"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/auth/signin")}>
        <Text style={styles.switchText}>Already have an account? <Text style={styles.switchTextBold}>Login</Text></Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121826",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#bbb",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#2B2F3A",
    borderRadius: 10,
    paddingHorizontal: 15,
    color: "#fff",
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#08D9D6",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#121826",
    fontSize: 16,
    fontWeight: "bold",
  },
  switchText: {
    color: "#aaa",
    marginTop: 15,
  },
  switchTextBold: {
    color: "#08D9D6",
    fontWeight: "bold",
  },
  errorText: {
    color: "#FF4B2B",
    marginBottom: 15,
  },
});