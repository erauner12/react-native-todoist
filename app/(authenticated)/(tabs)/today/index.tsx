import Fab from "@/components/Fab";
import { StyleSheet, Text, View } from "react-native";
const Today = () => {
  return (
    <View style={styles.container}>
      <Text>Today</Text>
      <Fab />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 82,
  },
});

export default Today;
