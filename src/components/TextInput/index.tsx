import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TextInput} from 'react-native-paper';

const InputField = (props: any) => {
  return (
    <View>
      <TextInput
        mode="outlined"
        style={styles.emailD}
        label={props.label}
        value={props.value}
        theme={{
          colors: {primary: '#1e90ff', secondary: 'red'},
        }}
        onChangeText={props.onChangeText}
      />
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  emailD: {
    marginTop: 20,
    marginHorizontal: 30,

    fontSize: 14,
  },
});
