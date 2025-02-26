import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="HomeScreen"
        options={{
          headerShown: false, // Hide the header for the Home page
        }}
      />
      <Stack.Screen
        name="ProfileScreen"
        options={{
          headerShown: false, // Hide the header for the Profile page
        }}
      />
      <Stack.Screen
        name="ChatScreen"
        options={{
          headerShown: false, // Hide the header for the Chat page
        }}
      />
    </Stack>
  );
}