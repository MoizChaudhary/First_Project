import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {Images} from '../../assets/images';
import {useNavigation} from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox';
import styles from './styles';
import Btn from '../../components/btn';
const DATA = [
  {id: '0', title: 'Be consistent in learning', image: Images.G1},
  {id: '1', title: 'Understand the Quran', image: Images.G2},
  {id: '2', title: 'Study the Sunnah', image: Images.G3},
  {id: '3', title: 'Listen to Tafseer', image: Images.G3},
  {id: '4', title: 'Get closer to Allah', image: Images.G4},
  {id: '5', title: 'Explore Islam', image: Images.G5},
  {id: '6', title: 'Listen to Quran in easy Language', image: Images.G6},
];
const Goals = ({onPress}: any) => {
  const navigation: any = useNavigation();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isSelected, setSelection] = useState<boolean[]>(
    Array(DATA.length).fill(false),
  );
  const handleCheckBoxChange = (id: string, index: number) => {
    const updatedSelection = [...isSelected];
    updatedSelection[index] = !updatedSelection[index];
    setSelection(updatedSelection);

    setSelectedIds(prevSelectedIds => {
      if (prevSelectedIds.includes(id)) {
        return prevSelectedIds.filter(selectedId => selectedId !== id);
      } else {
        return [...prevSelectedIds, id];
      }
    });
  };
  const Item = ({item}: any) => (
    <TouchableOpacity
      onPress={() => handleCheckBoxChange(item.id, parseInt(item.id))}
      style={[
        styles.item,
        selectedIds.includes(item.id) && styles.selectedItem,
      ]}>
      <Image source={item.image} style={styles.FlatList_Img} />
      <Text
        style={[
          styles.title,
          {color: selectedIds.includes(item.id) ? 'black' : 'black'},
        ]}>
        {item.title}
      </Text>
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={isSelected[parseInt(item.id)]}
          tintColors={{true: '#0166FF', false: 'black'}}
          onValueChange={() => handleCheckBoxChange(item.id, parseInt(item.id))}
          style={styles.checkbox}
        />
      </View>
    </TouchableOpacity>
  );
  const renderItem = ({item}: any) => (
    <Item
      item={item}
      backgroundColor={selectedIds.includes(item.id) ? 'blue' : 'green'}
      textColor={selectedIds.includes(item.id) ? 'black' : 'blue'}
    />
  );
  return (
    <View style={styles.MainView}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />

      <View style={styles.Line_Main_View}>
        <View style={[styles.Digit_View, {marginLeft: -15}]}>
          <Text style={styles.Digit_Text}>1</Text>
        </View>

        <View>
          <View style={styles.Line1_View}></View>
        </View>

        <View style={styles.Digit_View}>
          <Text style={styles.Digit_Text}>2</Text>
        </View>

        <View style={styles.Main_Line2_View}>
          <View style={styles.Line2_View}></View>
          <View style={styles.Line3_View}></View>
        </View>
        <View style={styles.Digit_View}>
          <Text style={styles.Digit_Text}>2</Text>
        </View>
      </View>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{color: '#191C20'}}>Goals</Text>
      </View>
      <View style={styles.Title_View}>
        <Text style={styles.Title_Text}>What are your Goals?</Text>
        <Text style={styles.Text_Style}>Choose up to 3</Text>
      </View>
      <ScrollView>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          extraData={selectedIds}
        />
      </ScrollView>
      <View style={styles.Btn_View}>
        <Btn
          title={'Continue'}
          onPress={() => {
            navigation.navigate('Prefer1');
          }}
        />
      </View>
    </View>
  );
};

export default Goals;
