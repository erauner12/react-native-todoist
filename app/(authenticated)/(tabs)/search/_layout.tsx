import { Colors } from "@/constants/Colors";
import { Stack } from "expo-router";

const TodayLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        contentStyle: { backgroundColor: Colors.background },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Search",
          headerLargeTitle: true,
          headerSearchBarOptions: {
            placeholder: "Tasks, Projects, and More",
            tintColor: Colors.primary,
          },
        }}
      />
    </Stack>
  );
};
export default TodayLayout;
