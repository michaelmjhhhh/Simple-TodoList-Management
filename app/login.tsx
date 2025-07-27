import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('请输入账号和密码');
      return;
    }
    setLoading(true);
    try {
      // 本地账号密码校验
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
      await AsyncStorage.setItem('token', username); // 用用户名做token
      router.replace('/');
    } catch (e) {
      Alert.alert('登录异常');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!username || !password) {
      Alert.alert('请输入账号和密码');
      return;
    }
    setLoading(true);
    try {
      const userData = await AsyncStorage.getItem(`user_${username}`);
      if (userData) {
        Alert.alert('账号已存在，请直接登录');
        return;
      }
      await AsyncStorage.setItem(`user_${username}`, JSON.stringify({ password }));
      Alert.alert('注册成功，请登录');
      setIsRegister(false);
    } catch (e) {
      Alert.alert('注册异常');
    } finally {
      setLoading(false);
    }
  };

  // 退出登录
  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    setUsername('');
    setPassword('');
    setIsRegister(false);
    router.replace('/login');
  };

  return (
    <View style={styles.container}>
    
      <Text style={styles.title}>{isRegister ? 'Account Register' : 'Account Login'}</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity
        style={styles.button}
        onPress={isRegister ? handleRegister : handleLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>{loading ? (isRegister ? 'registering...' : 'logging in...') : (isRegister ? 'Register' : 'Login')}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setIsRegister(!isRegister)}>
        <Text style={{ color: '#4f8cff', fontSize: 16, marginTop: 18 }}>
          {isRegister ? ('Has account？[Go Login]') : ('No account? [Register now]')}
        </Text>
      </TouchableOpacity>
      {(!isRegister && !loading) && (
        <TouchableOpacity onPress={handleLogout} style={{ marginTop: 18 }}>
          <Text style={{ color: '#888', fontSize: 16 }}>Logout</Text>
        </TouchableOpacity>
      )}
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
    width: '100%',
    maxWidth: 320,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 18,
    backgroundColor: '#fafbfc',
  },
  button: {
    backgroundColor: '#4f8cff',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoutBtn: {
    position: 'absolute',
    top: 32,
    right: 24,
    zIndex: 10,
    padding: 6,
  },
});
