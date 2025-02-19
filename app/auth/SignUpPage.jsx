import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuthStore } from "../services/useAuthStore";
import { useThemeStore } from "../services/useThemeStore";
import Toast from "react-native-toast-message";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react-native";

const SignUpPage = () => {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();
  const { theme } = useThemeStore();

  const themeToLogoMap = {
    light: require("../../public/logo_icon_black.png"),
    dark: require("../../public/logo_icon_white.png"),
  };

  const logoSrc = themeToLogoMap[theme] || require("../../public/logo_icon_white.png");

  const validateForm = () => {
    if (!formData.fullName.trim()) return Toast.show({ type: "error", text1: "Full name is required" });
    if (!formData.email.trim()) return Toast.show({ type: "error", text1: "Email is required" });
    if (!/\S+@\S+\.\S+/.test(formData.email)) return Toast.show({ type: "error", text1: "Invalid email format" });
    if (!formData.password) return Toast.show({ type: "error", text1: "Password is required" });
    if (formData.password.length < 6) return Toast.show({ type: "error", text1: "Password must be at least 6 characters" });

    return true;
  };

  const handleSubmit = () => {
    if (validateForm()) signup(formData);
  };

  return (
    <View style={styles.container}>
      {/* Left Side - Form */}
      <View style={styles.formContainer}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image source={logoSrc} style={styles.logo} />
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Get started with your free account</Text>
        </View>

        {/* Form */}
        <View style={styles.inputContainer}>
          {/* Full Name */}
          <View style={styles.inputWrapper}>
            <User size={20} color="#666" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={formData.fullName}
              onChangeText={(text) => setFormData({ ...formData, fullName: text })}
            />
          </View>

          {/* Email */}
          <View style={styles.inputWrapper}>
            <Mail size={20} color="#666" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="you@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
            />
          </View>

          {/* Password */}
          <View style={styles.inputWrapper}>
            <Lock size={20} color="#666" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              secureTextEntry={!showPassword}
              value={formData.password}
              onChangeText={(text) => setFormData({ ...formData, password: text })}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
              {showPassword ? <EyeOff size={20} color="#666" /> : <Eye size={20} color="#666" />}
            </TouchableOpacity>
          </View>
        </View>

        {/* Sign Up Button */}
        <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={isSigningUp}>
          {isSigningUp ? <ActivityIndicator size="small" color="#fff" /> : <Text style={styles.buttonText}>Create Account</Text>}
        </TouchableOpacity>

        {/* Already have an account */}
        <TouchableOpacity onPress={() => navigation.navigate("Login")} style={styles.linkContainer}>
          <Text style={styles.linkText}>Already have an account? <Text style={styles.link}>Sign in</Text></Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    padding: 20,
  },
  formContainer: {
    alignItems: "center",
    width: "100%",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 12,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: "#333",
  },
  eyeIcon: {
    position: "absolute",
    right: 15,
  },
  button: {
    width: "100%",
    backgroundColor: "#007bff",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  linkContainer: {
    marginTop: 10,
  },
  linkText: {
    fontSize: 14,
    color: "#666",
  },
  link: {
    color: "#007bff",
    fontWeight: "bold",
  },
});

export default SignUpPage;
