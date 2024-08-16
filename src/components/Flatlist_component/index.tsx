import React from 'react';
import {
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  View,
  FlatList,
} from 'react-native';
import {Images} from '../../assets/images';

const BookItem = (props: any) => {
  console.log('props.Book>>>', props.Book);
  console.log(props.noText);
  return (
    <View>
      <FlatList
        data={props.Book}
        horizontal
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
        renderItem={({item}) => (
          <TouchableOpacity style={styles.itemContainer}>
            <Image source={item.image} style={styles.Flat_image} />
            {!props.noText && (
              <Text style={styles.titleText}>{item.title}</Text>
            )}
            {props.lock && (
              <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.titleText}>{item.title}</Text>
              <Image
                source={Images.Lock}
                style={{
                  width: 14,
                  height: 18,
                  resizeMode: 'contain',
                  alignSelf: 'center',
                }}
              />
            </View>
            )}
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
export default BookItem;

const styles = StyleSheet.create({
  itemContainer: {
    marginRight: 10,
    // Space between items
  },
  Flat_image: {
    width: 161,
    height: 215,
    resizeMode: 'contain',
  },
  titleText: {
    fontSize: 14,
    color: '#191C20',
    fontWeight: '500',
    marginHorizontal: 5,
    marginTop: 5,
  },
  flatListContent: {
    paddingHorizontal: 25,
  },
});
