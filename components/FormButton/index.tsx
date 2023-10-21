import { StyleSheet, Text, TouchableOpacity } from 'react-native';

type TFormButtonProps = {
  isDisabled: boolean;
  onPress: () => void;
  buttonText: string;
};

const FormButton: React.FC<TFormButtonProps> = ({ isDisabled, onPress, buttonText }) => {
  return (
    <TouchableOpacity
      style={[styles.button, { opacity: !isDisabled ? 1 : 0.5 }]}
      disabled={isDisabled}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

export default FormButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'green',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 12
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  }
});
