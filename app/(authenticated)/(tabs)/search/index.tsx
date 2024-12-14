import Fab from "@/components/Fab";
import { Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
const Search = () => {
  return (
    <>
      <ScrollView
        contentContainerStyle={{ flex: 1, marginBottom: 285 }}
        contentInsetAdjustmentBehavior="automatic"
      >
        <Text>Search</Text>
        <Fab />
      </ScrollView>
    </>
  );
};
export default Search;
