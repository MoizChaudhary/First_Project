import React, {useState} from 'react';
import {
  View,
  Text,
  Alert,
  Switch,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {
  CardField,
  StripeProvider,
  useStripe,
} from '@stripe/stripe-react-native';
import {TextInput} from 'react-native-paper';
import {Images} from '../../assets/images';
import {useNavigation} from '@react-navigation/native';

const PaymentScreen = () => {
  const navigation = useNavigation();
  const [selectedCardType, setSelectedCardType] = useState<string | null>(null);
  const {confirmPayment} = useStripe();
  const [cardDetails, setCardDetails] = useState(null);
  const [saveCard, setSaveCard] = useState(false);
  const [amount, setAmount] = useState<string>(''); // Store amount as a string to prevent errors during input handling.
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [loader, setLoader] = useState(false);

  const selectPrice = (price: any) => {
    setSelectedPrice(price);
    setModalVisible(false);
  };

  const handlePayPress = async () => {
    //@ts-ignore
    if (!cardDetails?.complete) {
      Alert.alert('Error', 'Please enter complete card details');
      return;
    }
    setLoader(true);
    // Fetch payment intent from backend
    const clientSecret =
      'pi_3Q4zsLRttQHY6bdD1NbK6aKu_secret_Y1Ty1ZxNM5Tqli0uf6VIer5Ng';

    const {paymentIntent, error} = await confirmPayment(clientSecret, {
      paymentMethodType: 'Card',
      //@ts-ignore
      type: 'Card',
      billingDetails: {
        email: 'moizwork1234@gmail.com', // Use actual customer details
      },
    });
    setLoader(false);

    if (error) {
      Alert.alert(`Payment failed: ${error.message}`);
      setLoader(false);
    } else if (paymentIntent) {
      console.log('paymentIntent: ', paymentIntent);
      Alert.alert(
        'Payment successful',
        `Payment successful with ID: ${paymentIntent.id}`,
      );
      setLoader(false);
    }
  };

  return (
    <StripeProvider publishableKey="pk_test_51Q3YgjRttQHY6bdDuw6AaGZSOw4xQSyUb8qVf4kFdBSRKe5qmEgtJFyExQgd5gcE6nXdJVV8zYbjUVqy7Dk5Cm5c00RCNVYM5W">
      <View style={styles.container}>
        <StatusBar backgroundColor="#060A75" barStyle="light-content" />
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.goBackButton}
            onPress={() => navigation.goBack()}>
            <Image source={Images.GoBack} style={styles.goBackIcon} />
          </TouchableOpacity>
          <Text style={styles.headerText}> Payment</Text>
          <TouchableOpacity>
            <Image source={Images.share} style={styles.shareIcon} />
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View>
            <TouchableOpacity style={styles.applePayButton}>
              <Image source={Images.p4} style={styles.applePayIcon} />
              <Text style={styles.applePayText}>Apple Pay</Text>
            </TouchableOpacity>

            <Text style={styles.title}>Or pay using</Text>

            <View style={styles.paymentMethods}>
              <TouchableOpacity
                onPress={() => setSelectedCardType('PayPal')}
                style={[
                  styles.methodText,
                  selectedCardType === 'PayPal' && styles.selectedMethod,
                ]}>
                <Image source={Images.p1} style={styles.methodIcon} />
                <Text style={styles.methodLabel}>PayPal</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setSelectedCardType('UnionPay')}
                style={[
                  styles.methodText,
                  selectedCardType === 'UnionPay' && styles.selectedMethod,
                ]}>
                <Image source={Images.p2} style={styles.methodIcon} />
                <Text style={styles.methodLabel}>Union Pay</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setSelectedCardType('VISA')}
                style={[
                  styles.methodText,
                  selectedCardType === 'VISA' && styles.selectedMethod,
                ]}>
                <Image source={Images.p3} style={styles.methodIcon} />
                <Text style={styles.methodLabel}>VISA</Text>
              </TouchableOpacity>
            </View>

            <CardField
              postalCodeEnabled={false}
              placeholders={{number: 'Card number'}}
              cardStyle={styles.card}
              style={styles.cardField}
              //@ts-ignore
              onCardChange={details => setCardDetails(details)} // Avoid inline functions if causing unnecessary re-renders
            />

            <View style={styles.inputContainer}>
              <TextInput
                mode="outlined"
                style={styles.textInput}
                label="Country or region"
                theme={{
                  colors: {primary: '#1e90ff'},
                }}
              />

              {/* <TextInput
                mode="outlined"
                style={styles.textInput}
                label="Enter Amount"
                keyboardType="numeric"
                value={amount}
                onChangeText={e => setAmount(e)} // Ensure this isn't called inside a render cycle
                theme={{
                  colors: {primary: '#1e90ff'},
                }}
              /> */}
              <TouchableOpacity
                style={styles.button}
                onPress={() => setModalVisible(true)}>
                <Text style={styles.buttonText}>
                  Selected Price: ${selectedPrice}
                </Text>
              </TouchableOpacity>

              {/* Show Selected Price
              {selectedPrice && (
                <Text style={styles.selectedText}>
                  Selected Price: ${selectedPrice}
                </Text>
              )} */}

              {/* Modal */}
              <Modal
                transparent={true}
                visible={modalVisible}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}>
                <View style={styles.modalOverlay}>
                  <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Select a Price</Text>

                    {/* Option 1 */}
                    <TouchableOpacity
                      style={styles.optionButton}
                      onPress={() => selectPrice('9.99')}>
                      <Text style={styles.optionText}>$9.99</Text>
                    </TouchableOpacity>

                    {/* Option 2 */}
                    <TouchableOpacity
                      style={styles.optionButton}
                      onPress={() => selectPrice('89.9')}>
                      <Text style={styles.optionText}>$89.9</Text>
                    </TouchableOpacity>

                    {/* Close Modal */}
                    <TouchableOpacity
                      style={[styles.optionButton, styles.closeButton]}
                      onPress={() => setModalVisible(false)}>
                      <Text style={styles.optionText}>Close</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </View>

            <View style={styles.saveCardContainer}>
              <Switch
                trackColor={{false: '#767577', true: '#767577'}}
                thumbColor={saveCard ? '#000000' : '#f4f3f4'}
                value={saveCard}
                onValueChange={setSaveCard}
              />
              <Text style={styles.saveCardText}>
                Save this card for future payments
              </Text>
            </View>
          </View>
        </ScrollView>

        <View style={styles.payButtonContainer}>
          {loader ? (
            <ActivityIndicator size={'large'} />
          ) : (
            <>
              <TouchableOpacity
                onPress={handlePayPress}
                style={styles.payButton}>
                <Text style={styles.payButtonText}>
                  {`Pay $${selectedPrice || 0}`}
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </StripeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#060A75',
  },
  header: {
    flexDirection: 'row',
    marginVertical: 20,
    justifyContent: 'space-between',
    marginHorizontal: 20,
    padding: 10,
  },
  goBackButton: {
    borderRadius: 25,
    backgroundColor: '#fff',
    borderWidth: 1,
    padding: 8,
    alignSelf: 'center',
  },
  goBackIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  headerText: {
    color: '#fff',
    fontSize: 24,
  },
  shareIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  contentContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    top: 60,
  },
  applePayButton: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#000',
    marginHorizontal: 25,
    padding: 15,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  applePayIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginHorizontal: 10,
  },
  applePayText: {
    color: '#fff',
    alignSelf: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 20,
    alignSelf: 'center',
  },
  paymentMethods: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  methodText: {
    padding: 10,
    borderRadius: 5,
    width: '30%',
    borderWidth: 1,
    borderColor: '#efefef',
    textAlign: 'center',
  },
  selectedMethod: {
    borderColor: '#000',
  },
  methodIcon: {
    width: 34,
    height: 34,
    resizeMode: 'contain',
  },
  methodLabel: {
    fontSize: 16,
    color: '#000',
    fontWeight: '800',
  },
  cardField: {
    height: 50,
    marginVertical: 20,
  },
  card: {},
  inputContainer: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#EFEFEF',
    paddingHorizontal: 10,
  },
  textInput: {
    marginVertical: 10,
  },
  saveCardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  saveCardText: {
    marginLeft: 10,
  },
  payButtonContainer: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    width: '100%',
  },
  payButton: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  payButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  button: {
    backgroundColor: 'gray',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  selectedText: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 10,
    width: 300,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: 'gray',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    marginTop: 10,
    alignItems: 'center',
  },
  optionText: {
    color: 'white',
    fontSize: 18,
  },
  closeButton: {
    backgroundColor: 'red',
    marginTop: 20,
  },
});

export default PaymentScreen;
