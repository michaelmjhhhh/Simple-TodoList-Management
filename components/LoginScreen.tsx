import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ onLogin }: { onLogin: (username: string) => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('请输入账号和密码');
      return;
    }
    const userData = await AsyncStorage.getItem(`user_${username}`);
    if (!userData) {
      Alert.alert('账号不存在，请先注册');
      return;
    }
    const { password: savedPwd } = JSON.parse(userData);
    if (savedPwd !== password) {
      Alert.alert('密码错误');
      return;
    }
    onLogin(username);
  };

  const handleRegister = async () => {
    if (!username || !password) {
      Alert.alert('请输入账号和密码');
      return;
    }
    const userData = await AsyncStorage.getItem(`user_${username}`);
    if (userData) {
      Alert.alert('账号已存在，请直接登录');
      return;
    }
    await AsyncStorage.setItem(`user_${username}`, JSON.stringify({ password }));
    Alert.alert('注册成功，请登录');
    setIsRegister(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isRegister ? '注册' : '登录'}</Text>
      <TextInput
        style={styles.input}
        placeholder="账号"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="密码"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity
        style={styles.button}
        onPress={isRegister ? handleRegister : handleLogin}
      >
        <Text style={styles.buttonText}>{isRegister ? '注册' : '登录'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setIsRegister(!isRegister)}>
        <Text style={styles.switchText}>
          {isRegister ? '已有账号？去登录' : '没有账号？去注册'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f8fa',
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 32,
    color: '#222',
  },
  input: {
    width: '90%',
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: '#fafbfc',
  },
  button: {
    backgroundColor: '#4f8cff',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 40,
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  switchText: {
    color: '#4f8cff',
    fontSize: 16,
  },
});
