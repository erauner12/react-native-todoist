import { Stack } from "expo-router";
import { useWindowDimensions } from "react-native";
const AuthenticatedRootLayout = () => {
  const { height } = useWindowDimensions();

  return (
    <Stack screenOptions={{ contentStyle: { backgroundColor: "#fff" } }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="task/new"
        options={{
          title: "",
          headerShown: false,
          sheetAllowedDetents: height > 700 ? [0.22] : "fitToContents",
          presentation: "formSheet",
          sheetGrabberVisible: false,
          sheetExpandsWhenScrolledToEdge: false,
          sheetCornerRadius: 10,
        }}
      />
      <Stack.Screen
        name="task/[id]"
        options={{
          title: "",
          headerShown: false,
          sheetAllowedDetents: height > 700 ? [0.22] : "fitToContents",
          presentation: "formSheet",
          sheetGrabberVisible: false,
          sheetExpandsWhenScrolledToEdge: false,
          sheetCornerRadius: 10,
        }}
      />
    </Stack>
  );
};
export default AuthenticatedRootLayout;
