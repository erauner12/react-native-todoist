import { Colors } from "@/constants/Colors";
import { router, Stack } from "expo-router";
import { Button } from "react-native";
const NewProjectLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerTintColor: Colors.primary,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "New Project",
          headerTransparent: true,
          headerTitleStyle: { color: "#000" },
          headerLeft: () => (
            <Button
              color={Colors.primary}
              title="Cancel"
              onPress={() => router.dismiss()}
            />
          ),
        }}
      />
      <Stack.Screen
        name="color-select"
        options={{
          title: "Color",
          headerTransparent: true,
          headerTitleStyle: { color: "#000" },
        }}
      />
    </Stack>
  );
};
export default NewProjectLayout;
