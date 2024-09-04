import React, {useState, useEffect, useMemo, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  // ScrollView,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import * as Progress from 'react-native-progress';
import Modal from 'react-native-modal';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import BottomsheetComp from '../../components/bottomSheet_Comp';
import Btn from '../../components/btn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {Images} from '../../assets/images';
import styles from './styles'; // Import the styles from the separate file

const Proflie = (props: any) => {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigation: any = useNavigation();

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prevProgress =>
        prevProgress < 0.5 ? prevProgress + 0.1 : 0.5,
      );
    }, 10);

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
    //@ts-ignore
    bottomSheetRef.current?.expand();
  };

  const handleLogout = async () => {
    console.log('Clicked');
    setLoading(true);
    try {
      await AsyncStorage.removeItem('userInfo');
      console.log('User Signed Out and Info Cleared!');

      navigation.reset({
        index: 0,
        routes: [{name: 'LogIn'}],
      });
    } catch (error) {
      console.error('Error signing out:', error);
      setErrorMessage('Logout failed. Please try again.');
    } finally {
      setLoading(false);
    }

    function setErrorMessage(arg0: string) {
      throw new Error('Function not implemented.');
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <TouchableOpacity style={styles.settingButton} onPress={handleOpenPress}>
        <Image source={Images.setting} style={styles.settingIcon} />
      </TouchableOpacity>
      <View style={styles.profileTitleContainer}>
        <Text style={styles.profileTitle}>Proflie</Text>
      </View>
      <ScrollView>
        <View style={styles.divider}></View>
        <View style={styles.achievementsContainer}>
          <Text style={styles.achievementsText}>Achivemnets</Text>
        </View>
        <View style={styles.achievementsRow}>
          <TouchableOpacity
            style={styles.achievementButton}
            onPress={toggleModal}>
            <Image
              source={Images.AchievementsP}
              style={styles.achievementImage}
            />
            <Text style={styles.achievementText}>Achivement</Text>
          </TouchableOpacity>
          <View>
            <Image source={Images.steaksP} style={styles.achievementImage} />
            <Text style={styles.achievementText}>3 Day Steaks</Text>
          </View>
        </View>
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryTitle}>Summary</Text>
          <Text style={styles.summaryDescription}>
            I read and listen more then 32% of headway readers
          </Text>
          <View style={styles.progressContainer}>
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
          <View style={styles.booksStats}>
            <View style={styles.bookStat}>
              <Text style={styles.bookStatCount}>11</Text>
              <Text style={styles.bookStatLabel}>Book Finished</Text>
            </View>
            <View style={styles.bookStat}>
              <Text style={styles.bookStatCount}>200</Text>
              <Text style={styles.bookStatLabel}>Pages Reads</Text>
            </View>
          </View>
        </View>
        <View>
          <Modal isVisible={isModalVisible}>
            <View style={styles.modalContainer}>
              <TouchableOpacity
                onPress={toggleModal}
                style={styles.closeButton}>
                <Image source={Images.Cross} style={styles.closeIcon} />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Daily Goal</Text>
              <Text style={styles.modalDescription}>
                To get new recommendations, you need to adjust your goals
              </Text>
              <View style={styles.modalProgressContainer}>
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
              <TouchableOpacity style={styles.adjustGoalButton}>
                <Text style={styles.adjustGoalText}>Adjust daily Goal</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
      </ScrollView>
      <BottomSheet ref={bottomSheetRef} index={-1} snapPoints={snapPoints}>
        <BottomSheetScrollView style={styles.contentContainer}>
          <View>
            <Text style={styles.bottomSheetTitle}>Settings</Text>
          </View>
          <BottomsheetComp Title={'Notifications'} />
          <BottomsheetComp Title={'Gift Headway'} />
          <BottomsheetComp Title={'Language Selection'} />
          <BottomsheetComp Title={'Privacy Policy'} />
          <BottomsheetComp Title={'Terms & Conditions'} />
          <BottomsheetComp
            Title={'Subscription Terms'}
            handleOnPress={() => props.navigation.navigate('Subscription')}
          />
          <BottomsheetComp Title={'Manage Subscription'} />
          <BottomsheetComp Title={'Playback settings'} />
          <BottomsheetComp Title={'Delete account'} />
          <BottomsheetComp
            Title={'Dark mode'}
            handleOnPress={() => props.navigation.navigate('DarkMode')}
          />
          <BottomsheetComp
            Title={'Logout'}
            handleOnPress={() => handleLogout()}
          />
          <Btn
            title="Contact Support"
            customTextStyle={styles.contactSupportText}
            customViewStyle={styles.contactSupportButton}
            onPress={() => {
              navigation.navigate('');
            }}
          />
        </BottomSheetScrollView>
      </BottomSheet>
      {loading && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#0066ff" />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Proflie;
