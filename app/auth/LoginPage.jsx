import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, ActivityIndicator, StyleSheet } from "react-native";
import { useAuthStore } from "../../assets/services/useAuthStore";
import { useThemeStore } from "../../assets/services/useThemeStore.js";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, isLoggingIn } = useAuthStore();
  const { theme } = useThemeStore();

  const themeToLogoMap = {
    light: require("../../public/logo_icon_black.png"),
    dark: require("../../public/logo_icon_white.png"),
    cupcake: require("../../public/logo_icon_black.png"),
    synthwave: require("../../public/logo_icon_white.png"),
    halloween: require("../../public/logo_icon_white.png"),
    forest: require("../../public/logo_icon_white.png"),
    aqua: require("../../public/logo_icon_white.png"),
    black: require("../../public/logo_icon_white.png"),
    luxury: require("../../public/logo_icon_white.png"),
    dracula: require("../../public/logo_icon_white.png"),
    night: require("../../public/logo_icon_white.png"),
    coffee: require("../../public/logo_icon_white.png"),
    sunset: require("../../public/logo_icon_white.png"),
  };

  const logoSrc = themeToLogoMap[theme] || require("../../public/logo_icon_white.png");

  const handleSubmit = () => {
    login(formData);
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image source={logoSrc} style={styles.logo} />
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in to your account</Text>
      </View>

      {/* Form */}
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#888"
          value={formData.email}
          onChangeText={(text) => setFormData({ ...formData, email: text })}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#888"
          secureTextEntry={!showPassword}
          value={formData.password}
          onChangeText={(text) => setFormData({ ...formData, password: text })}
        />

        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Text style={styles.toggleText}>{showPassword ? "Hide Password" : "Show Password"}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={isLoggingIn}>
          {isLoggingIn ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Sign In</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Signup Link */}
      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Text style={styles.signupText}>
          Don't have an account? <Text style={styles.signupLink}>Create Account</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
  },
  subtitle: {
    color: "#888",
  },
  form: {
    width: "100%",
  },
  input: {
    width: "100%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  toggleText: {
    textAlign: "right",
    color: "#007bff",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  signupText: {
    marginTop: 20,
    color: "#888",
  },
  signupLink: {
    color: "#007bff",
    fontWeight: "bold",
  },
});
