import React, { useContext, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import TodoList from "../components/TodoList";
import { TodoContext } from "../context/TodoContext";
import LoginScreen from "../components/LoginScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

function HeaderWithLogout() {
  const router = useRouter();
  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    router.replace("/login");
  };
  return (
    <View style={styles.header}>
      <Text style={styles.title}>📋 My ToDoList</Text>
      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={26} color="#888" />
      </TouchableOpacity>
    </View>
  );
}

export default function HomeScreen() {
  // 不再判断 user，直接渲染主界面内容
  return (
    <SafeAreaView style={styles.container}>
      <HeaderWithLogout />
      <TodoList />
      <AddButton />
    </SafeAreaView>
  );
}

function AddButton() {
  const { openAddModal } = useContext(TodoContext);
  return (
    <TouchableOpacity style={styles.addButton} onPress={openAddModal}>
      <AntDesign name="plus" size={28} color="#fff" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f8fa",
  },
  header: {
    paddingTop: 40,
    paddingBottom: 20,
    alignItems: "center",
    backgroundColor: "#fff",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#222",
  },
  logoutBtn: {
    position: "absolute",
    right: 18,
    top: 44,
    padding: 6,
    zIndex: 10,
  },
  addButton: {
    position: "absolute",
    right: 24,
    bottom: 40,
    backgroundColor: "#4f8cff",
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#4f8cff",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
});
