import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="LoginPage"
        options={{
          headerShown: false, // Hide the header for the sign-in page
        }}
      />
      <Stack.Screen
        name="SignPage"
        options={{
          headerShown: false, // Hide the header for the sign-up page
        }}
      />
    </Stack>
  );
}