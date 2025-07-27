import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { TodoContext, Todo } from '../context/TodoContext';

export default function TodoItem({ todo }: { todo: Todo }) {
  const { toggleTodo, deleteTodo } = useContext(TodoContext);
  return (
    <View style={styles.item}>
      <TouchableOpacity onPress={() => toggleTodo(todo.id)}>
        <AntDesign
          name={todo.completed ? 'checkcircle' : 'checkcircleo'}
          size={24}
          color={todo.completed ? '#4f8cff' : '#bbb'}
        />
      </TouchableOpacity>
      <Text style={[styles.text, todo.completed && styles.completed]}>{todo.text}</Text>
      <TouchableOpacity onPress={() => deleteTodo(todo.id)}>
        <AntDesign name="delete" size={22} color="#ff5a5f" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  text: {
    flex: 1,
    fontSize: 18,
    marginLeft: 16,
    color: '#222',
  },
  completed: {
    textDecorationLine: 'line-through',
    color: '#aaa',
  },
});
