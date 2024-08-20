import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from 'react-native';
import React from 'react';
import {
  useNavigation,
  NavigationProp,
  NavigationState,
} from '@react-navigation/native';

// Define the type for the props
interface BtnProps {
  title: string;
  onPress: () => void;
  customViewStyle?: ViewStyle;
  customTextStyle?: TextStyle;
}

const Btn: React.FC<BtnProps> = props => {
  const navigation = useNavigation<NavigationProp<NavigationState>>();

  return (
    <View>
      <TouchableOpacity
        onPress={props.onPress}
        style={[styles.button, props.customViewStyle]}>
        <Text style={[styles.buttonText, props.customTextStyle]}>
          {props.title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Btn;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#5686F5',
    marginHorizontal: 25,
    marginTop: 25,
    padding: 15,
    borderRadius: 8,
    marginVertical: 15,
  },
  buttonText: {
    color: 'white',
    alignSelf: 'center',
  },
  LogIN_btn: {
    backgroundColor: '#ffffff',
    marginHorizontal: 25,
    marginTop: 12,
    padding: 15,
    borderRadius: 8,
    marginVertical: 15,
    borderWidth: 1,
    borderColor: '#5686F5',
  },
  LogIn_Text: {
    color: '#5686F5',
    alignSelf: 'center',
  },
});

// import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
// import React from 'react';
// import {useNavigation} from '@react-navigation/native';

// const btn = (props: any) => {
//   const navigation: any = useNavigation();

//   return (
//     <View>
//       <TouchableOpacity
//         onPress={props.onPress}
//         style={[styles.button, props.customViewStyle]}>
//         <Text style={[styles.buttonText, props.customTextStyle]}>
//           {props.title}
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default btn;

// const styles = StyleSheet.create({
//   button: {
//     backgroundColor: '#5686F5',
//     marginHorizontal: 25,
//     marginTop: 25,
//     padding: 15,
//     borderRadius: 8,
//     marginVertical: 15,
//   },
//   buttonText: {color: 'white', alignSelf: 'center'},
//   LogIN_btn: {
//     backgroundColor: '#ffffff',
//     marginHorizontal: 25,
//     marginTop: 12,
//     padding: 15,
//     borderRadius: 8,
//     marginVertical: 15,
//     borderWidth: 1,
//     borderColor: '#5686F5',
//   },
//   LogIn_Text: {color: '#5686F5', alignSelf: 'center'},
// });
