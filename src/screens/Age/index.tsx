import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
const DATA = [
  {
    id: 'age1',
    title: '18-24',
  },
  {
    id: 'age2',
    title: '25-34',
  },
  {
    id: 'age3',
    title: '35-44',
  },
  {
    id: 'age4',
    title: '45-54',
  },
  {
    id: 'age5',
    title: '55+',
  },
];
const Age = ({onPress}: any) => {
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
        <Text style={styles.Title_Text}>What is your Age?</Text>
      </View>
      <View style={{marginTop: 80}}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          extraData={selectedId}
        />
      </View>

      <View style={styles.Button_View}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Goals');
          }}
          style={styles.button}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Age;
