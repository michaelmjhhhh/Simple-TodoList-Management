import React, { createContext, useState, ReactNode } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

type TodoContextType = {
  todos: Todo[];
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  modalVisible: boolean;
  openAddModal: () => void;
  closeAddModal: () => void;
  user?: string | null;
  setUser?: (user: string | null) => void;
  syncTodos?: () => Promise<void>;
};

export const TodoContext = createContext<TodoContextType>({} as TodoContextType);

export function TodoProvider({ children }: { children: ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [user, setUser] = useState<string | null>(null);

  // 检查本地token自动登录
  React.useEffect(() => {
    AsyncStorage.getItem('token').then(token => {
      if (token) {
        setUser(token);
      } else {
        setUser(null);
      }
    });
  }, []);

  // 根据当前user加载/保存todos
  React.useEffect(() => {
    if (user) {
      AsyncStorage.getItem(`todos_${user}`).then(data => {
        if (data) setTodos(JSON.parse(data));
        else setTodos([]);
      });
    } else {
      setTodos([]);
    }
  }, [user]);

  const saveTodos = (newTodos: Todo[]) => {
    if (user) {
      AsyncStorage.setItem(`todos_${user}`, JSON.stringify(newTodos));
    }
  };

  const addTodo = (text: string) => {
    const newTodos = [
      { id: Date.now().toString(), text, completed: false },
      ...todos,
    ];
    setTodos(newTodos);
    saveTodos(newTodos);
  };

  const toggleTodo = (id: string) => {
    const newTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(newTodos);
    saveTodos(newTodos);
  };

  const deleteTodo = (id: string) => {
    const newTodos = todos.filter(todo => todo.id !== id);
    setTodos(newTodos);
    saveTodos(newTodos);
  };

  const openAddModal = () => setModalVisible(true);
  const closeAddModal = () => setModalVisible(false);

  // 预留同步到云端的接口
  const syncTodos = async () => {
    try {
      // 这里模拟本地服务端请求
      // 例如 fetch('http://localhost:3000/sync', ...)
      throw new Error('无法连接本地服务端'); // 模拟连接失败
    } catch (e) {
      Alert.alert('同步失败', '无法连接本地服务端');
    }
  };

  return (
    <TodoContext.Provider
      value={{ todos, addTodo, toggleTodo, deleteTodo, modalVisible, openAddModal, closeAddModal, user, setUser, syncTodos }}
    >
      {children}
    </TodoContext.Provider>
  );
}
