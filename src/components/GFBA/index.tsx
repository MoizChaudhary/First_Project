import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Images} from '../../assets/images';
import {useNavigation} from '@react-navigation/native';

const SocialIcons = (props: any) => {
  const navigation: any = useNavigation();

  return (
    <View>
      <View style={styles.Line_View}>
        <View style={styles.Img_View}>
          <Image source={Images.line} style={styles.Img_Style} />
        </View>
        <View>
          <Text style={styles.Text_Style}>Or Sign In with</Text>
        </View>
        <View style={styles.Img_View}>
          <Image source={Images.line} style={styles.Img_Style} />
        </View>
      </View>
      <View style={styles.Icon_View}>
        <TouchableOpacity>
          <Image source={Images.Google} style={styles.Icon_Style} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={Images.Facebook} style={styles.Icon_Style} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={Images.Apple} style={styles.Icon_Style} />
        </TouchableOpacity>
      </View>
      <View style={styles.Account_View}>
        <View>
          <Text style={{color: '#000000'}}>{props.text}</Text>
        </View>
        <TouchableOpacity onPress={props.onPress}>
          <Text style={styles.SignIn_btn}>{props.link}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SocialIcons;

const styles = StyleSheet.create({
  Icon_Style: {width: 48, height: 48, marginHorizontal: 5},
  Account_View: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  SignIn_btn: {
    color: '#5686F5',
    fontWeight: '700',
    marginHorizontal: 5,
  },
  Line_View: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 50,
  },
  Img_View: {marginHorizontal: 20},
  Text_Style: {fontSize: 15, fontWeight: '400', color: '#969696'},
  Icon_View: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  Img_Style: {marginTop: 8},
});
