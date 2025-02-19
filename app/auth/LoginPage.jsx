import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { useAuthStore } from "../../services/useAuthStore"; // Importing the login function
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const LoginScreen = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuthStore(); // ✅ Correct way to call Zustand store


  const handleLogin = async () => {
    if (!formData.email || !formData.password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }

    setLoading(true);
    try {
      const userData = await login(formData);

      // Save auth token (assuming it's returned from the backend)
      if (userData.token) {
        await AsyncStorage.setItem("authToken", userData.token);
      }

      Alert.alert("Success", "Logged in successfully!");
      router.replace("/screens/Home"); // ✅ Fixed Navigation Issue
    } catch (error) {
      Alert.alert("Login Failed", error.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#fff" }}>
      {/* Logo */}
      <View style={{ alignItems: "center", marginBottom: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", marginTop: 10 }}>Welcome Back</Text>
        <Text style={{ color: "gray" }}>Sign in to your account</Text>
      </View>

      {/* Email Input */}
      <View style={{ marginBottom: 15 }}>
        <Text style={{ fontWeight: "500" }}>Email</Text>
        <View style={{ flexDirection: "row", alignItems: "center", borderBottomWidth: 1, borderColor: "#ccc", paddingVertical: 8 }}>
          <Ionicons name="mail-outline" size={20} color="gray" style={{ marginRight: 10 }} />
          <TextInput
            placeholder="you@example.com"
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
            style={{ flex: 1, fontSize: 16 }}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
      </View>

      {/* Password Input */}
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontWeight: "500" }}>Password</Text>
        <View style={{ flexDirection: "row", alignItems: "center", borderBottomWidth: 1, borderColor: "#ccc", paddingVertical: 8 }}>
          <Ionicons name="lock-closed-outline" size={20} color="gray" style={{ marginRight: 10 }} />
          <TextInput
            placeholder="••••••••"
            secureTextEntry={!showPassword}
            value={formData.password}
            onChangeText={(text) => setFormData({ ...formData, password: text })}
            style={{ flex: 1, fontSize: 16 }}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color="gray" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Login Button */}
      <TouchableOpacity onPress={handleLogin} style={{ backgroundColor: "#007bff", padding: 12, borderRadius: 8, alignItems: "center" }}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>Sign In</Text>}
      </TouchableOpacity>

      {/* Signup Link */}
      <TouchableOpacity onPress={() => router.push("/auth/SignUpPage")} style={{ marginTop: 15, alignItems: "center" }}>
        <Text style={{ color: "#007bff" }}>Don't have an account? Create one</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
