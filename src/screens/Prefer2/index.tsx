import {View, Text, StatusBar, TouchableOpacity, FlatList} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import Btn from '../../components/btn';
const DATA = [
  {
    id: 'age1',
    title: 'Listening to books',
  },
  {
    id: 'age2',
    title: 'Reading books',
  },
  {
    id: 'age3',
    title: 'Sometimes Listening & sometimes reading',
  },
];
const Prefer2 = ({onPress}: any) => {
  const navigation: any = useNavigation();
  const [selectedId, setSelectedId] = useState(null);
  const Item = (props: any) => {
    const {backgroundColor, item} = props;
    return (
      <TouchableOpacity
        onPress={() => setSelectedId(item.id)}
        style={[
          styles.item,
          item.id === selectedId ? styles.selectedItem : {},
        ]}>
        <Text
          style={[
            styles.title,
            {color: item.id === selectedId ? 'black' : 'black'},
          ]}>
          {item?.title}
        </Text>
      </TouchableOpacity>
    );
  };
  const renderItem = (item: any) => {
    const backgroundColor = item.item.id === selectedId ? 'blue' : 'green';
    const color = item.id === selectedId ? 'black' : 'blue';
    return (
      <Item
        item={item.item}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };
  return (
    <View style={styles.MainView}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />

      <View style={styles.Line_Main_View}>
        <View style={styles.Line1_View}>
          <View style={styles.Line2_View}></View>
        </View>
        <View style={styles.Digit_View}>
          <Text style={styles.Digit_Text}>3</Text>
        </View>
      </View>
      <View style={styles.Prefer_View}>
        <Text style={{color: '#191C20'}}>Preference</Text>
      </View>
      <View style={styles.Title_View}>
        <Text style={styles.Title_Text}>What do you Prefer</Text>
        <Text style={styles.Prefer_Text}>Choose upto 3</Text>
      </View>
      <View style={styles.FlatList}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          extraData={selectedId}
        />
      </View>
      <View style={styles.Btn_View}>
        <Btn
          title={'Continue'}
          onPress={() => {
            navigation.navigate('bottomNavigation');
          }}
        />
      </View>
    </View>
  );
};

export default Prefer2;
