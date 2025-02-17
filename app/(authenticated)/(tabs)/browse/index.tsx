import { Colors } from "@/constants/Colors";
import { useAuth } from "@clerk/clerk-expo";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Clipboard from "expo-clipboard";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { toast } from "sonner-native";

const TODOIST_REST_URL = "https://api.todoist.com/rest/v2";

export default function Browse() {
  const { signOut } = useAuth();
  const [inboxTasks, setInboxTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // If you only want the “Inbox” project tasks, you can either:
  // 1) fetch all projects, find the one named “Inbox”, then fetch tasks by project_id
  // 2) or fetch tasks with a filter param – for now we’ll do #1.

  useEffect(() => {
    fetchInboxTasks();
  }, []);

  async function fetchInboxTasks() {
    try {
      setLoading(true);
      const token = process.env.TODOIST_API_TOKEN;
      if (!token) {
        console.warn("TODOIST_API_TOKEN is missing in .env");
        setLoading(false);
        return;
      }

      // 1) fetch all projects
      const projectsRes = await fetch(`${TODOIST_REST_URL}/projects`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const projectsData = await projectsRes.json();

      // find the one named 'Inbox'
      const inboxProject = projectsData.find(
        (p: any) => p.name.toLowerCase() === "inbox"
      );
      if (!inboxProject) {
        console.warn("Could not find an Inbox project in your Todoist data.");
        setLoading(false);
        return;
      }

      // 2) fetch tasks for that project
      const tasksRes = await fetch(
        `${TODOIST_REST_URL}/tasks?project_id=${inboxProject.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const tasksData = await tasksRes.json();
      setInboxTasks(tasksData);
    } catch (error) {
      console.error("Failed to fetch Inbox tasks", error);
    } finally {
      setLoading(false);
    }
  }

  async function copyDeepLink() {
    try {
      const path = "syketbtodo://(authenticated)/(tabs)/browse";
      await Clipboard.setStringAsync(path);
      toast.success("Copied link to clipboard");
    } catch (err) {
      console.warn("Failed to copy link", err);
    }
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color={Colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Inbox Tasks (from real Todoist)</Text>
        <TouchableOpacity onPress={copyDeepLink}>
          <Ionicons name="link-outline" size={24} color={Colors.dark} />
        </TouchableOpacity>
      </View>

      {inboxTasks.length === 0 ? (
        <Text style={{ fontSize: 16, marginTop: 20 }}>
          No tasks in your Todoist Inbox. (Try adding one!)
        </Text>
      ) : (
        <FlatList
          data={inboxTasks}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Ionicons
                name="ellipse-outline"
                size={20}
                color={Colors.primary}
              />
              <Text style={styles.itemText}>{item.content}</Text>
            </View>
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      )}

      <TouchableOpacity style={styles.clearButton} onPress={() => signOut()}>
        <Text style={styles.clearButtonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f8f8",
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
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.lightBorder,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 14,
    backgroundColor: "#fff",
    borderRadius: 5,
  },
  itemText: {
    fontSize: 16,
    flex: 1,
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
});
