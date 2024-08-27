import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator, // Import ActivityIndicator
} from 'react-native';
import React, {useState, useEffect, useCallback, useMemo, useRef} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

import {Images} from '../../assets/images';
import {fonts} from '../../assets/fonts';
import {ScrollView} from 'react-native-gesture-handler';
import * as Progress from 'react-native-progress';
import Modal from 'react-native-modal';
import BottomSheet from '@gorhom/bottom-sheet';
import BottomsheetComp from '../../components/bottomSheet_Comp';
import Btn from '../../components/btn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const Proflie = (props: any) => {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false); // Add loading state
  const navigation: any = useNavigation();

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prevProgress =>
        prevProgress < 0.5 ? prevProgress + 0.1 : 0.5,
      );
    }, 10); // 20 milliseconds interval

    return () => clearInterval(interval);
  }, []);

  const resetProgress = () => {
    setProgress(0);
  };

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['3%', '50%', '60%'], []);

  const handleOpenPress = () => {
    // @ts-ignore
    bottomSheetRef.current?.expand();
  };

  const handleLogout = async () => {
    console.log('Clicked');
    setLoading(true); // Set loading to true
    try {
      // Clear the user information from AsyncStorage
      await AsyncStorage.removeItem('userInfo');

      console.log('User Signed Out and Info Cleared!');

      navigation.reset({
        index: 0,
        routes: [{name: 'LogIn'}], // Replace 'LogIn' with the correct route name
      });
    } catch (error) {
      console.error('Error signing out:', error);
      // Optionally, display a user-friendly error message
      setErrorMessage('Logout failed. Please try again.');
    } finally {
      setLoading(false); // Set loading to false
    }
    function auth() {
      throw new Error('Function not implemented.');
    }

    function setErrorMessage(arg0: string) {
      throw new Error('Function not implemented.');
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFF8F5'}}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <TouchableOpacity
        style={{
          justifyContent: 'flex-end',
          position: 'static',
          alignSelf: 'flex-end',
          marginHorizontal: 20,
          marginTop: 20,
        }}
        onPress={handleOpenPress}>
        <Image
          source={Images.setting}
          style={{width: 24, height: 24, resizeMode: 'contain'}}
        />
      </TouchableOpacity>
      <View style={{marginHorizontal: 20}}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: '700',
            fontFamily: 'RobotoBold',
            color: '#000000',
          }}>
          Proflie
        </Text>
      </View>
      <ScrollView>
        <View
          style={{
            borderWidth: 1,
            borderColor: '#EFEFEF',
            marginVertical: 10,
          }}></View>
        <View style={{marginHorizontal: 20, marginVertical: 10}}>
          <Text
            style={{
              color: '#191C20',
              margin: 5,
              fontSize: 18,
              fontWeight: '700',
            }}>
            Achivemnets
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 20,
            alignSelf: 'center',
          }}>
          <TouchableOpacity
            style={{marginHorizontal: 20}}
            onPress={toggleModal}>
            <Image
              source={Images.AchievementsP}
              style={{width: 150, height: 150, resizeMode: 'contain'}}
            />
            <Text
              style={{
                alignSelf: 'center',
                color: '#191C20',
                margin: 5,
                fontSize: 16,
                fontWeight: '700',
              }}>
              Achivement
            </Text>
          </TouchableOpacity>
          <View>
            <Image
              source={Images.steaksP}
              style={{width: 150, height: 150, resizeMode: 'contain'}}
            />
            <Text
              style={{
                alignSelf: 'center',
                color: '#191C20',
                margin: 5,
                fontSize: 16,
                fontWeight: '700',
              }}>
              3 Day Steaks
            </Text>
          </View>
        </View>
        <View
          style={{
            marginHorizontal: 20,
            backgroundColor: 'white',
            borderWidth: 1,
            borderColor: '#EFEFEF',
            alignSelf: 'center',
            alignItems: 'center',
            marginVertical: 20,
            borderRadius: 10,
          }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '700',
              color: '#191C20',
              marginTop: 10,
            }}>
            Summary
          </Text>
          <Text
            style={{
              color: '#8C8C8C',
              marginHorizontal: 30,
              textAlign: 'center',
              marginVertical: 10,
            }}>
            I read and listen more then 32% of headway readers
          </Text>
          <View style={{margin: 20}}>
            <Progress.Circle
              progress={progress}
              size={112}
              thickness={8}
              color="#0066ff"
              unfilledColor="#D7FFCD"
              borderWidth={0}
              showsText={true}
              formatText={() => `${Math.round(progress * 100)}%`}
              textStyle={styles.progressText}
            />
          </View>
          <View style={{flexDirection: 'row', margin: 20}}>
            <View style={{marginHorizontal: 20}}>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: '900',
                  textAlign: 'center',
                  color: '#0166FF',
                }}>
                11
              </Text>
              <Text
                style={{
                  marginVertical: 5,
                  fontSize: 16,
                  fontWeight: '400',
                  color: '#191C20',
                }}>
                Book Finished
              </Text>
            </View>
            <View style={{marginHorizontal: 20}}>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: '900',
                  textAlign: 'center',
                  color: '#0166FF',
                }}>
                200
              </Text>
              <Text
                style={{
                  marginVertical: 5,
                  fontSize: 16,
                  fontWeight: '400',
                  color: '#191C20',
                }}>
                Pages Reads
              </Text>
            </View>
          </View>
        </View>

        <View>
          <Modal isVisible={isModalVisible}>
            <View
              style={{
                marginHorizontal: 20,
                backgroundColor: 'white',
                borderWidth: 1,
                borderColor: '#EFEFEF',
                alignSelf: 'center',
                alignItems: 'center',
                marginVertical: 20,
                borderRadius: 10,
                justifyContent: 'center',
                height: '40%',
              }}>
              <TouchableOpacity
                onPress={toggleModal}
                style={{
                  justifyContent: 'flex-start',
                  alignSelf: 'flex-start',
                  marginHorizontal: 10,
                  marginTop: 10,
                }}>
                <Image
                  source={Images.Cross}
                  style={{width: 18, height: 18, resizeMode: 'contain'}}
                />
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '700',
                  color: '#191C20',
                  marginTop: 10,
                  alignSelf: 'center',
                  justifyContent: 'center',
                }}>
                Daily Goal
              </Text>
              <Text
                style={{
                  color: '#8C8C8C',
                  marginHorizontal: 30,
                  textAlign: 'center',
                  marginVertical: 10,
                }}>
                To get new recommendations, you need to adjust your goals
              </Text>
              <View style={{margin: 20}}>
                <Progress.Circle
                  progress={progress}
                  size={112}
                  thickness={8}
                  color="#26E350"
                  unfilledColor="#D7FFCD"
                  borderWidth={0}
                  showsText={true}
                  formatText={() => `${Math.round(progress * 0)} of 6`}
                  textStyle={styles.modalText}
                />
              </View>

              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  borderRadius: 5,
                  padding: 5,
                  marginBottom: 15,
                  backgroundColor: '#EFEFEF',
                  borderColor: '#D1D1D1',
                }}>
                <Text style={{color: '#191C20'}}>Adjust daily Goal</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
      </ScrollView>
      <BottomSheet
        ref={bottomSheetRef}
        index={-1} // Initially hidden
        snapPoints={snapPoints}>
        <ScrollView style={styles.contentContainer}>
          <View>
            <Text style={{fontSize: 18, color: '#191C20', fontWeight: '600'}}>
              Settings
            </Text>
          </View>

          <BottomsheetComp Title={'Notifications'} />
          <BottomsheetComp Title={'Gift Headway'} />
          <BottomsheetComp Title={'Language Selection'} />
          <BottomsheetComp Title={'Privacy Policy'} />
          <BottomsheetComp Title={'Terms & Conditions'} />
          <BottomsheetComp Title={'Subscription Terms'} />
          <BottomsheetComp Title={'Manage Subscription'} />
          <BottomsheetComp Title={'Playback settings'} />
          <BottomsheetComp Title={'Delete account'} />
          <BottomsheetComp
            Title={'Dark mode'}
            handleOnPress={() => props.navigation.navigate('DarkMode')}
          />

          <BottomsheetComp Title={'Logout'} OnPress={() => handleLogout()} />
          <Btn
            title="Contact Support"
            customTextStyle={{
              color: '#191C20',
              alignSelf: 'center',
              fontSize: 16,
            }}
            customViewStyle={{
              backgroundColor: '#F6F6F6',
              borderWidth: 1,
              borderColor: '#D1D1D1',
              marginTop: 15,
            }}
            onPress={() => {
              navigation.navigate('');
            }}
          />
        </ScrollView>
      </BottomSheet>

      {/* Show ActivityIndicator when loading */}
      {loading && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#0066ff" />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Proflie;

const styles = StyleSheet.create({
  progressText: {
    color: '#333',
    fontSize: 28,
    fontWeight: 'bold',
  },
  modalText: {
    color: '#333',
    fontSize: 14,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
  contentContainer: {
    marginHorizontal: 20,
    marginTop: 10,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
