import { StyleSheet, View, Pressable, Text } from 'react-native';

type Props = {
  label: string;
  onPress: () => void;
  backgroundColor?: string;
};

export default function Button({ label, onPress, backgroundColor = '#007BFF' }: Props) {
  return (
    <View style={styles.buttonContainer}>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          { backgroundColor },
          pressed && styles.buttonPressed,
        ]}
        onPress={onPress}
      >
        <Text style={styles.buttonLabel}>{label}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 200,
    height: 50,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
  },
  button: {
    borderRadius: 8,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  buttonPressed: {
    opacity: 0.7,
  },
  buttonLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    textTransform: 'uppercase',
  },
});