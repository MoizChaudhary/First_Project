import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F5',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    marginHorizontal: 15,
    marginTop: 15,
    alignItems: 'center',
  },
  goBack: {
    marginTop: 4,
  },
  icon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 18,
    color: '#191C20',
    fontWeight: '700',
    marginHorizontal: 10,
  },
  divider: {
    borderWidth: 1,
    borderColor: '#EFEFEF',
    marginVertical: 10,
  },
  centerContent: {
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: '40%',
  },
  mainText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#191C20',
    marginTop: 20,
    textAlign: 'center',
  },
  image: {
    width: 272,
    height: 272,
    resizeMode: 'contain',
    marginVertical: 20,
  },
  price: {
    color: '#191C20',
    fontSize: 24,
    fontWeight: '800',
    marginVertical: 10,
  },
  description: {
    textAlign: 'center',
    color: '#191C20',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
  },
});

export default styles;
