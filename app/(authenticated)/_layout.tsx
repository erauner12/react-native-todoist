import { Stack } from "expo-router";
const AuthenticatedRootLayout = () => {
  return (
    <Stack screenOptions={{ contentStyle: { backgroundColor: "#fff" } }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="task/new" options={{ presentation: "modal" }} />
    </Stack>
  );
};
export default AuthenticatedRootLayout;
