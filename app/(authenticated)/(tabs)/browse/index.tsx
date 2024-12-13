import { useAuth } from "@clerk/clerk-expo";
import { Button, Text, View } from "react-native";
const Browse = () => {
  const { signOut } = useAuth();

  return (
    <View>
      <Text>Browse</Text>

      <Button title="Sign out" onPress={() => signOut()} />
    </View>
  );
};
export default Browse;
