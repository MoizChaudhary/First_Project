import { StyleSheet, Text, View } from 'react-native'
const styles = StyleSheet.create({ 
    MainView:{flex: 1, backgroundColor: 'white'},
    Line_Main_View:{
        alignItems: 'center',
        flexDirection: 'row',
      },
      Line1_View:{flexDirection: 'row', marginHorizontal: 5},
      Line2_View:{width: 164, borderWidth: 2, borderRadius: 15},
      Digit_View:{
        backgroundColor: 'black',
        borderRadius: 10,
        width: 20,
      },
      Digit_Text:{color: '#ffff', fontSize: 12, textAlign: 'center'},
      FlatList:{marginTop: 210},
    Title_View:{alignSelf: 'center', marginVertical: 20},
    Title_Text:{color: '#191C20', fontSize: 24, fontWeight: '700'},
    Prefer_View:{alignItems: 'center', justifyContent: 'center'},
    Prefer_Text:{
        color: '#191C20',
        fontSize: 14,
        fontWeight: '400',
        textAlign: 'center',
        marginVertical: 10,
      },
      Btn_View:{flex:1,justifyContent: 'flex-end'},
    button: {
    backgroundColor: '#5686F5',
    marginHorizontal: 25,
    marginVertical: 15,
    padding: 15,
    borderRadius: 8,
  },
  buttonText: {color: 'white', alignSelf: 'center'},
  item: {
    justifyContent: 'flex-end',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 25,
    borderRadius: 10,
    borderColor:'#EFEFEF',
    borderWidth: 1,
  },
  selectedItem: {
    borderColor: '#0166FF',
    backgroundColor: '#E3EEFF',
  },
  title: {
    fontSize: 12,
    color: 'red',
    textAlign: 'center',
  },})

export default styles

