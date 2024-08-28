import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF8F5',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerMain: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 20,
  },
  containerView: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  waveform: {
    width: 100,
    height: 100,
    backgroundColor: 'blue',
    alignSelf: 'center',
  },
  slider: {
    width: '80%',
    height: 40,
    marginVertical: 20,
  },
  timeText: {
    color: 'Black',
  },
  darkTheme: {
    backgroundColor: '#000000',
    color: '#ffffff',
  },
  lightTheme: {
    backgroundColor: '#ffffff',
    color: '#000000',
  },
  toggleContainer: {
    marginVertical: 10,
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    marginHorizontal: 10,
  },
  labelStyle: {
    fontWeight: '900',
  },
  centeredFlex: {
    flex: 1,
    justifyContent: 'center',
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  marginHorizontal20: {
    marginHorizontal: 20,
  },
  controlIcon: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },
  skipIcon: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
  subsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    alignSelf: 'center',
    padding: 5,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#D1D1D180',
    marginVertical: 20,
  },
  subsImage: {
    width: 62,
    height: 62,
    resizeMode: 'contain',
    marginHorizontal: 20,
  },
});
export default styles;
