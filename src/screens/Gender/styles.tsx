import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  MainView: {flex: 1, backgroundColor: 'white'},

  Line_Main_View: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 185,
  },
  Digit_View: {
    backgroundColor: 'black',
    borderRadius: 10,
    width: 20,
  },
  Digit_Text: {color: '#ffff', fontSize: 12, textAlign: 'center'},
  Line_View: {flexDirection: 'row', marginHorizontal: 5},
  Line1_View: {width: 44, borderWidth: 2, borderRadius: 15},
  Line2_View: {width: 164, borderWidth: 2, borderColor: '#EFEFEF'},
  About_View: {alignItems: 'center', justifyContent: 'center'},
  Title_View: {alignSelf: 'center', marginVertical: 20},
  Title_Text: {color: '#191C20', fontSize: 24, fontWeight: '700'},
  Gender_Main_View: {flexDirection: 'row', flex: 1, justifyContent: 'center'},
  Gender_View: {justifyContent: 'flex-end', marginHorizontal: 25},
  Svg_View: {borderWidth: 2, padding: 10, borderRadius: 10},
  Svg_Style: {width: 60, height: 60, marginHorizontal: 20},
  button: {
    backgroundColor: '#5686F5',
    marginHorizontal: 25,
    marginVertical: 15,
    padding: 15,
    borderRadius: 8,
  },
  buttonText: {color: 'white', alignSelf: 'center'},
});
export default styles;
