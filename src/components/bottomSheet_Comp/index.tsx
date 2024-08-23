import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Images} from '../../assets/images';

const BottomsheetComp = (props: any) => {
  return (
    <View>
      <TouchableOpacity
        onPress={props.OnPress}
        style={{
          marginVertical: 10,
          padding: 8,
          borderRadius: 8,
          borderWidth: 1,
          backgroundColor: '#FFFFFf',
          borderColor: '#FFF8F5',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={{fontSize: 16, color: '#191C20', fontWeight: '400'}}>
          {props.Title}
        </Text>
        <Image
          source={Images.SettingArrow}
          style={{
            width: 12,
            height: 12,
            resizeMode: 'contain',
            alignSelf: 'center',
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default BottomsheetComp;

const styles = StyleSheet.create({});
