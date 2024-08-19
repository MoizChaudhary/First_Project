import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {TextInput} from 'react-native-paper';
//@ts-ignore
import Icon from 'react-native-vector-icons/FontAwesome';

const PasswordField = (props: any) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <View>
      <TextInput
        mode="outlined"
        style={styles.passwordD}
        secureTextEntry={!passwordVisible}
        value={props.value}
        right={
          <TextInput.Icon
            icon={() => (
              <Icon
                name={passwordVisible ? 'eye' : 'eye-slash'}
                size={20}
                color={'black'}
              />
            )}
            onPress={() => {
              setPasswordVisible(!passwordVisible);
            }}
          />
        }
        label={props.label}
        theme={{colors: {primary: '#1e90ff'}}}
        onChangeText={props.onChangeText}
      />
    </View>
  );
};

export default PasswordField;

const styles = StyleSheet.create({
  passwordD: {
    marginTop: 20,
    marginHorizontal: 30,

    fontSize: 14,
  },
});
