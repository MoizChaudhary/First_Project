import {View, Text, StatusBar, TouchableOpacity} from 'react-native';
import Svg, {SvgXml, Use} from 'react-native-svg';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {MaleSelected, MaleUnSelected} from '../../assets/svg/male';
import {FemaleSelected, FemaleUnSelected} from '../../assets/svg/female';
import styles from './styles';
const Gender = ({onPress}: any) => {
  const navigation: any = useNavigation();
  const [maleSelected, setMaleSelected] = useState(false);
  const [femaleSelected, setFemaleSelected] = useState(false);

  return (
    <View style={styles.MainView}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />

      <View style={styles.Line_Main_View}>
        <View style={styles.Digit_View}>
          <Text style={styles.Digit_Text}>1</Text>
        </View>
        <View style={styles.Line_View}>
          <View style={styles.Line1_View}></View>
          <View style={styles.Line2_View}></View>
        </View>
      </View>

      <View style={styles.About_View}>
        <Text style={{color: '#191C20'}}>About You</Text>
      </View>
      <View style={styles.Title_View}>
        <Text style={styles.Title_Text}>Select your Gender</Text>
      </View>
      <View style={styles.Gender_Main_View}>
        <View style={styles.Gender_View}>
          <TouchableOpacity
            onPress={() => {
              setMaleSelected(!maleSelected);
              setFemaleSelected(false);
            }}
            style={[
              styles.Svg_View,
              {
                backgroundColor: maleSelected ? '#E3EEFF' : '#FFFFFF',
                borderColor: maleSelected ? '#0166FF' : '#FFFFFF',
              },
            ]}>
            <View>
              <SvgXml
                xml={maleSelected ? MaleSelected : MaleUnSelected}
                style={styles.Svg_Style}
              />
            </View>
            <Text
              style={{
                textAlign: 'center',
                color: maleSelected ? '#0166FF' : '#191C20',
              }}>
              Male
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.Gender_View}>
          <TouchableOpacity
            onPress={() => {
              setFemaleSelected(!femaleSelected);
              setMaleSelected(false);
            }}
            style={[
              styles.Svg_View,
              {
                backgroundColor: femaleSelected ? '#E3EEFF' : '#FFFFFF',
                borderColor: femaleSelected ? '#0166FF' : '#FFFFFF',
              },
            ]}>
            <View>
              <SvgXml
                xml={femaleSelected ? FemaleSelected : FemaleUnSelected}
                style={styles.Svg_Style}
              />
            </View>
            <Text
              style={{
                textAlign: 'center',
                color: femaleSelected ? '#0166FF' : '#191C20',
              }}>
              Female
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{justifyContent: 'flex-end'}}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Age');
          }}
          style={styles.button}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Gender;
