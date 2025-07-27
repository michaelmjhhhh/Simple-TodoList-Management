import React, { useContext } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import TodoItem from './TodoItem';
import AddTodoModal from './AddTodoModal';
import { TodoContext } from '../context/TodoContext';

export default function TodoList() {
  const { todos } = useContext(TodoContext);
  return (
    <View style={styles.listContainer}>
      <FlatList
        data={todos}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <TodoItem todo={item} />}
        ListEmptyComponent={<Text style={styles.empty}>暂无待办事项</Text>}
        contentContainerStyle={{ paddingBottom: 120 }}
      />
      <AddTodoModal />
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  empty: {
    textAlign: 'center',
    color: '#aaa',
    marginTop: 40,
    fontSize: 18,
  },
});
