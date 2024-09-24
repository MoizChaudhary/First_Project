import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  MainView: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    // position: 'absolute',
    width: 35,
    height: 35,
    resizeMode: 'contain',
    bottom: 0,
    alignSelf: 'center',
  },
  Img_S1: {
    position: 'absolute',
    width: 190,
    height: 190,
    resizeMode: 'contain',
  },
  Img_S2: {
    position: 'absolute',
    width: 350,
    height: 350,
    resizeMode: 'contain',
  },
  Img_S3: {
    position: 'absolute',
    width: 530,
    height: 530,
    resizeMode: 'contain',
  },
  Img_S4: {
    position: 'absolute',
    width: 700,
    height: 700,
    resizeMode: 'contain',
  },
});

export default styles;
