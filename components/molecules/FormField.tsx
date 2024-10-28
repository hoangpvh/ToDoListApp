  import React from 'react';
  import { View, StyleSheet } from 'react-native';
  import Label from '../atoms/Label';
  import Input from '../atoms/Input';

  type FormFieldProps = {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    secureTextEntry?: boolean;
  };

  const FormField: React.FC<FormFieldProps> = ({ label, value, onChangeText, secureTextEntry }) => {
    return (
      <View style={styles.container}>
        <Label text={label} />
        <Input placeholder={label} value={value} onChangeText={onChangeText} secureTextEntry={secureTextEntry} />
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      marginBottom: 15,
    },
  });

  export default FormField;
