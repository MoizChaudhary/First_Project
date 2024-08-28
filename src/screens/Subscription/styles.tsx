import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF8F5',
  },
  header: {
    flexDirection: 'row',
    marginHorizontal: 15,
    marginTop: 15,
  },
  backButton: {
    alignSelf: 'center',
    marginTop: 4,
  },
  backButtonImage: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  headerTitle: {
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
  titleContainer: {
    marginHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#191C20',
    marginTop: 20,
  },
  featuresContainer: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
  featureItem: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  featureImage: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  featureText: {
    color: '#191C20',
    fontSize: 14,
    marginHorizontal: 10,
  },
  planContainer: {
    backgroundColor: '#ffffff',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    padding: 10,
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  planTitle: {
    color: '#191C20',
    fontSize: 18,
    fontWeight: '700',
    marginHorizontal: 10,
    alignSelf: 'center',
  },
  planDiscount: {
    color: '#0166FF',
    fontSize: 16,
    backgroundColor: '#E8F1FF',
    marginHorizontal: 20,
    borderRadius: 4,
    padding: 5,
    alignSelf: 'center',
  },
  subscribeButton: {
    backgroundColor: '#0166FF',
    padding: 12,
    borderRadius: 5,
  },
  subscribeButtonText: {
    color: '#ffffff',
  },
  planPrice: {
    color: '#0166FF',
    fontSize: 24,
    fontWeight: '800',
    marginVertical: 10,
  },
  monthlyPlan: {
    marginVertical: 20,
  },
});
export default styles;
