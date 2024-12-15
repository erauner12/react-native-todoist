import { Colors } from "@/constants/Colors";
import { router, Stack } from "expo-router";
import { Button, useWindowDimensions } from "react-native";
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
      <Stack.Screen
        name="task/date-select"
        options={{
          title: "Schedule",
          sheetAllowedDetents: height > 700 ? [0.6, 0.9] : "fitToContents",
          presentation: "formSheet",
          sheetGrabberVisible: true,
          sheetExpandsWhenScrolledToEdge: false,
          sheetCornerRadius: 10,
          headerLeft: () => (
            <Button
              title="Cancel"
              onPress={() => router.back()}
              color={Colors.primary}
            />
          ),
        }}
      />
    </Stack>
  );
};
export default AuthenticatedRootLayout;
