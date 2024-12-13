import Fab from "@/components/Fab";
import { StyleSheet, Text, View } from "react-native";
const Upcoming = () => {
  return (
    <View style={styles.container}>
      <Text>Upcoming</Text>
      <Fab />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Upcoming;
