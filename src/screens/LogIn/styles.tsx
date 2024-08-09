import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  MainView: {flex: 1, backgroundColor: 'white'},
  Title_View: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: 20,
    marginTop: 100,
  },
  Title_Text: {fontWeight: 'bold', fontSize: 20, color: '#000000'},
  Text_View: {justifyContent: 'center', alignSelf: 'center'},
  Text_style: {fontSize: 15, color: '#000000'},
  Forget_Touch: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginHorizontal: 25,
    marginVertical: 20,
  },
  Forget_Text: {fontSize: 14, fontWeight: '500', color: '#5686F5'},
  emailD: {
    marginTop: 30,
    marginHorizontal: 30,

    fontSize: 14,
  },
  passwordD: {
    marginTop: 30,
    marginHorizontal: 30,

    fontSize: 14,
  },
  button: {
    backgroundColor: '#5686F5',
    marginHorizontal: 25,
    marginVertical: 15,
    padding: 15,
    borderRadius: 8,
  },
  buttonText: {color: 'white', alignSelf: 'center'},
  Icon_Style: {width: 48, height: 48, marginHorizontal: 5},
  Icon_View: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  Account_View: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  Line_View: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 50,
  },
  Img_View: {marginHorizontal: 20},
  Img_Style: {marginTop: 8},

  Line_Text: {fontSize: 15, fontWeight: '400', color: '#969696'},
  SignUp_Text: {
    color: '#5686F5',
    fontWeight: '700',
    marginHorizontal: 5,
  },
});
export default styles;
