import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import LoginForm from '../organisms/LoginForm';

const AuthTemplate: React.FC<{children?:React.ReactNode }> = ({ children }) => {
  return (
    <SafeAreaView style={styles.container}>
      {children}
      <LoginForm />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
});

export default AuthTemplate;
