import MoreButton from "@/components/MoreButton";
import { Stack } from "expo-router";

const UpcomingLayout = () => {
  return (
    <Stack screenOptions={{ headerShadowVisible: false }}>
      <Stack.Screen
        name="index"
        options={{
          title: "Upcoming",
          headerRight: () => <MoreButton pageName="Upcoming" />,
        }}
      />
    </Stack>
  );
};
export default UpcomingLayout;
