import { Stack } from "expo-router";
import React from "react";
import { TodoProvider } from "../context/TodoContext";

export default function Layout() {
  // 只包裹一次 TodoProvider，保证 context 全局唯一
  return (
    <TodoProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </TodoProvider>
  );
}
