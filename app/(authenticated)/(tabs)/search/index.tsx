import Fab from "@/components/Fab";
import { Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
const Search = () => {
  return (
    <>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Text>Search</Text>
      </ScrollView>
      <Fab />
    </>
  );
};
export default Search;
