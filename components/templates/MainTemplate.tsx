import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import TodoList from '../organisms/TodoList';
import { Provider } from 'react-redux';
import store from '@/redux/store';

const MainTemplate: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <SafeAreaView style={styles.container}>
      {children}
      <Provider store={store}>
        <TodoList />
      </Provider>
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