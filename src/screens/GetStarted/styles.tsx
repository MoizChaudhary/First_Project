import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  MainViw: {flex: 1, justifyContent: 'flex-end', backgroundColor: 'white'},
  Img_View: {justifyContent: 'flex-end', marginTop: '40%'},
  Img_style: {
    width: '90%',
    height: '80%',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  Logo_style: {width: 21, height: 21, marginHorizontal: 25},
  Title_style: {
    fontSize: 20,
    marginHorizontal: 25,
    marginVertical: 0,
    color: 'black',
    fontWeight: 'bold',
  },
  Text_style: {marginHorizontal: 25, marginVertical: 5, fontSize: 12},
  LogIN_btn: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginTop: 10,
    padding: 20,
    borderRadius: 8,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#5686F5',
  },
  LogIn_Text: {color: '#5686F5', alignSelf: 'center'},
  button: {
    backgroundColor: '#5686F5',
    marginHorizontal: 20,
    marginTop: 10,
    padding: 20,
    borderRadius: 8,
    marginVertical: 5,
  },
  buttonText: {color: 'white', alignSelf: 'center'},
});
export default styles;
