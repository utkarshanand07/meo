import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function SignUpScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Your Account 🔥</Text>
      <Text style={styles.subtitle}>Join the messenger revolution 🚀</Text>

      <TextInput style={styles.input} placeholder="Username" placeholderTextColor="#bbb" />
      <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#bbb" />
      <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#bbb" secureTextEntry />

      <TouchableOpacity style={styles.button}>
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
});
