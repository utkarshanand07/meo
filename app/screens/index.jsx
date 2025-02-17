import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="Home"
        options={{
          headerShown: false, // Hide the header for the sign-in page
        }}
      />
    </Stack>
  );
}