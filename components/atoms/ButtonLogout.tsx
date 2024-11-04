import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useDispatch } from "react-redux";
import { clearTodos } from "@/slice/TodoSlice";

const ButtonLogout: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("user");
      dispatch(clearTodos());
      router.push("/");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <Pressable
      onPress={handleLogout}
      style={styles.logoutButton}
    >
      <Text style={styles.logoutButtonText}>Logout</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  logoutButton: {
    margin: 20,
    padding: 15,
    backgroundColor: "#FF5722",
    borderRadius: 5,
    alignItems: "center",
    width: 100,
    alignSelf: "flex-end",
  },
  logoutButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});

export default ButtonLogout;
