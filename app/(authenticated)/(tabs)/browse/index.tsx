import Fab from "@/components/Fab";
import { Colors } from "@/constants/Colors";
import { projects } from "@/db/schema";
import { useAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { eq } from "drizzle-orm";
import { drizzle, useLiveQuery } from "drizzle-orm/expo-sqlite";
import { useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, { LinearTransition } from "react-native-reanimated";
import * as ContextMenu from "zeego/context-menu";

const Browse = () => {
  const { signOut } = useAuth();

  const router = useRouter();
  const db = useSQLiteContext();
  const drizzleDB = drizzle(db);
  const { data } = useLiveQuery(drizzleDB.select().from(projects), []);
  console.log(`data`, data);

  const isPro = false;

  const onDeleteProject = async (id: number) => {
    await drizzleDB.delete(projects).where(eq(projects.id, id));
  };

  const onNewProject = async () => {
    if (data?.length >= 5 && !isPro) {
      // go pro dialog
    } else {
      router.push("/browse/new-project");
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>My Projects</Text>
          <TouchableOpacity onPress={onNewProject}>
            <Ionicons name="add" size={24} color={Colors.dark} />
          </TouchableOpacity>
        </View>

        <Animated.FlatList
          data={data}
          itemLayoutAnimation={LinearTransition}
          renderItem={({ item }) => (
            <ContextMenu.Root key={item.id}>
              <ContextMenu.Trigger>
                <TouchableOpacity style={styles.projectButton}>
                  <Text style={{ color: item.color }}>#</Text>
                  <Text style={styles.projectButtonText}>{item.name}</Text>
                </TouchableOpacity>
              </ContextMenu.Trigger>
              <ContextMenu.Content>
                <ContextMenu.Item
                  key="delete"
                  onSelect={() => onDeleteProject(item.id)}
                >
                  <ContextMenu.ItemTitle>Delete</ContextMenu.ItemTitle>
                  <ContextMenu.ItemIcon
                    ios={{
                      name: "trash",
                      pointSize: 18,
                    }}
                  />
                </ContextMenu.Item>
              </ContextMenu.Content>
            </ContextMenu.Root>
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListFooterComponent={
            <TouchableOpacity
              style={styles.clearButton}
              onPress={() => signOut()}
            >
              <Text style={styles.clearButtonText}>Log Out</Text>
            </TouchableOpacity>
          }
        />

        <Button title="Sign out" onPress={() => signOut()} />
      </View>
      <Fab />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
  },
  clearButton: {
    padding: 14,
    backgroundColor: "#fff",
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  clearButtonText: {
    color: Colors.primary,
    fontSize: 18,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.lightBorder,
  },
  projectButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 5,
  },
  projectButtonText: {
    fontSize: 16,
  },
});

export default Browse;
