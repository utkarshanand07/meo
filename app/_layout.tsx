import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="auth/LoginPage" />
      <Stack.Screen name="auth/SignUpPage" />
      <Stack.Screen name="screens/Home" />
    </Stack>
  );
}
