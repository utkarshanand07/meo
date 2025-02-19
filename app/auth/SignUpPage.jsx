import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { useAuthStore } from "../../services/useAuthStore";// Importing the signup function
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const SignupScreen = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({ fullName: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async () => {
    if (!formData.fullName || !formData.email || !formData.password) {
      Alert.alert("Error", "Please fill all fields.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      Alert.alert("Error", "Invalid email format.");
      return;
    }
    if (formData.password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      const userData = await useAuthStore.signup(formData);
      if (userData.token) {
        await AsyncStorage.setItem("authToken", userData.token);
      }
      Alert.alert("Success", "Account created successfully!");
      navigation.replace("Home");
    } catch (error) {
      Alert.alert("Signup Failed", error.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#fff" }}>
      <View style={{ alignItems: "center", marginBottom: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", marginTop: 10 }}>Create Account</Text>
        <Text style={{ color: "gray" }}>Join us today!</Text>
      </View>

      <View style={{ marginBottom: 15 }}>
        <Text style={{ fontWeight: "500" }}>Full Name</Text>
        <View style={{ flexDirection: "row", alignItems: "center", borderBottomWidth: 1, borderColor: "#ccc", paddingVertical: 8 }}>
          <Ionicons name="person-outline" size={20} color="gray" style={{ marginRight: 10 }} />
          <TextInput
            placeholder="John Doe"
            value={formData.fullName}
            onChangeText={(text) => setFormData({ ...formData, fullName: text })}
            style={{ flex: 1, fontSize: 16 }}
          />
        </View>
      </View>

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

      <TouchableOpacity onPress={handleSignup} style={{ backgroundColor: "#007bff", padding: 12, borderRadius: 8, alignItems: "center" }}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>Sign Up</Text>}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/auth/LoginPage")} style={{ marginTop: 15, alignItems: "center" }}>
        <Text style={{ color: "#007bff" }}>Already have an account? Sign in</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignupScreen;
