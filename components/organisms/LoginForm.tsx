import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import FormField from '../molecules/FormField';
import Button from '../atoms/Button';
import { useExpoRouter } from 'expo-router/build/global-state/router-store';
import Logo from '../molecules/Logo';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useExpoRouter()

  const handleLogin = () => {
    if (email !== 'test' || password !== 'pass') {
      Alert.alert('Error', 'Wrong Email or Password');
      return;
    }
    Alert.alert('Success', `Logged in with ${email}`);
    router.push('todolist')
  };

  return (
    <View style={styles.container}>
      <Logo />
      <FormField label="Email" value={email} onChangeText={setEmail} />
      <FormField label="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <Button label="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
  },
});

export default LoginForm;
