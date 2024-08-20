// import React from 'react';
// import {
//   TouchableOpacity,
//   Image,
//   Text,
//   StyleSheet,
//   View,
//   FlatList,
// } from 'react-native';
// import {Images} from '../../assets/images';

// const BookItem = (props: any) => {
//   console.log('props.Book>>>', props.Book);
//   console.log(props.noText);
//   return (
//     <View>
//       <FlatList
//         data={props.Book}
//         horizontal
//         keyExtractor={item => item.id}
//         showsHorizontalScrollIndicator={false}
//         contentContainerStyle={styles.flatListContent}
//         renderItem={({item}) => (
//           <TouchableOpacity style={styles.itemContainer}>
//             <Image source={item.image} style={styles.Flat_image} />
//             {!props.noText && (
//               <Text style={styles.titleText}>{item.title}</Text>
//             )}
//             {props.lock && (
//               <View
//               style={{flexDirection: 'row', justifyContent: 'space-between'}}>
//               <Text style={styles.titleText}>{item.title}</Text>
//               <Image
//                 source={Images.Lock}
//                 style={{
//                   width: 14,
//                   height: 18,
//                   resizeMode: 'contain',
//                   alignSelf: 'center',
//                 }}
//               />
//             </View>
//             )}
//           </TouchableOpacity>
//         )}
//       />
//     </View>
//   );
// };
// export default BookItem;

// const styles = StyleSheet.create({
//   itemContainer: {
//     marginRight: 10,
//     // Space between items
//   },
//   Flat_image: {
//     width: 161,
//     height: 215,
//     resizeMode: 'contain',
//   },
//   titleText: {
//     fontSize: 14,
//     fontWeight: '500',
//     marginHorizontal: 5,
//     marginTop: 5,
//   },
//   flatListContent: {
//     paddingHorizontal: 25,
//   },
// });
import React from 'react';
import {
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  View,
  ListRenderItem,
  FlatList,
  // FlatList,
  // ListRenderItem,
} from 'react-native';
import {Images} from '../../assets/images';

// Define types for the book item and props
interface BookItemProps {
  Book: Array<{
    id: string;
    title: string;
    image: any; // Replace 'any' with the specific type for the image source if available
  }>;
  noText?: boolean;
  lock?: boolean;
}

const BookItem: React.FC<BookItemProps> = props => {
  const renderItem: ListRenderItem<BookItemProps['Book'][0]> = ({
    item,
  }: any) => (
    <TouchableOpacity style={styles.itemContainer}>
      <Image source={item.image} style={styles.Flat_image} />
      {!props.noText && <Text style={styles.titleText}>{item.title}</Text>}
      {props.lock && (
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
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
  );

  return (
    <View>
      <FlatList
        data={props.Book}
        horizontal
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
        renderItem={renderItem}
      />
    </View>
  );
};

export default BookItem;

const styles = StyleSheet.create({
  itemContainer: {
    marginRight: 10,
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
