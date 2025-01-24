/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */

import {View, Text, TextInput, StyleSheet} from 'react-native';

interface InputProps {
  label: string;
  placeholder: string;
  secureTextEntry?: boolean;
  handler: {
    handleChange: (value: string) => void;
    handleBlur: () => void;
    handleFocus: () => void;
    error?: string;
  };
  required: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  handler,
  secureTextEntry = false,
  required = false,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          {borderColor: handler.error == '' ? '#fff' : '#B22222'},
        ]}
        placeholder={placeholder}
        placeholderTextColor="rgba(255,255,255,.36)"
        secureTextEntry={secureTextEntry}
        onChangeText={text => {
          handler.handleChange(text);
        }}
        onBlur={() => {
          if (required) handler.handleBlur();
        }}
        onFocus={() => {
          if (required) handler.handleFocus();
        }}
      />
      <Text style={styles.textError}>{handler.error}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'column',
    marginBottom: 30,
  },
  input: {
    marginTop: 15,
    borderColor: '#fff',
    borderWidth: 2,
    paddingLeft: 16,
    borderRadius: 4,
    color: '#fff',
    height: 50,
  },
  label: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '700',
  },
  textError: {
    color: '#B22222',
    fontSize: 13,
    position: 'relative',
    top: 10,
  },
});

export default Input;
