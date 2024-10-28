import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import TodoList from '../organisms/TodoList';

const MainTemplate: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <SafeAreaView style={styles.container}>
      {children}
      <TodoList />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

export default MainTemplate;