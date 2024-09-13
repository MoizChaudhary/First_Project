import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth'; // Firebase Authentication
import {Images} from '../../assets/images';
import {useNavigation} from '@react-navigation/native';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const navigation = useNavigation();
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const currentUser = auth().currentUser;
  const [currentUserData, setCurrentUserData] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoader(true);
        const usersCollection = await firestore().collection('Users').get();
        setLoader(false);

        const usersData = usersCollection.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        //@ts-ignore
        setUsers(usersData);
      } catch (error) {
        setLoader(false);
        console.log('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch the current user ID
        const userId = auth().currentUser?.uid;
        console.log('Current User ID:', userId); // Debugging statement

        if (!userId) {
          console.error('User is not authenticated');
          return;
        }
        setLoader(true);
        console.log('setLoader: ', setLoader);
        // Fetch the user document from Firestore
        const userDoc = await firestore().collection('Users').doc(userId).get();
        setLoader(false);
        console.log('Document Data:', userDoc.data()); // Debugging statement

        if (userDoc.exists) {
          //@ts-ignore
          setCurrentUserData(userDoc.data());
        } else {
          console.error('User document does not exist');
          setCurrentUserData(null);
        }
      } catch (error) {
        setLoader(false);
        console.error('Error fetching user data: ', error);
      }
    };

    fetchUserData();
  }, []);

  const checkRoomByUserId = async (otherId: any, otherData: any) => {
    if (!currentUser) {
      console.log('No current user found.');
      return;
    }

    const cuid = currentUser.uid;
    const otherUserId = otherId;

    const chatsCollection = firestore().collection('chats');

    console.log('currentUserId : ', cuid);
    console.log('otherUserId: ', otherUserId);
    console.log('No matching chat found.');
    try {
      // Create a query to find chats where the 'users' array contains an object with the current userId
      const querySnapshot = await chatsCollection
        .where('userIds', 'array-contains', cuid)
        .get();

      // Filter through the results to find a chat where both IDs exist
      const matchingChat = querySnapshot.docs.find(doc => {
        const userIds = doc.data().userIds;
        return userIds.includes(otherUserId);
      });

      let roomId = '';

      if (matchingChat) {
        console.log('Matching chat found:', matchingChat.id);
        roomId = matchingChat.id;
      } else {
        console.log('No matching chat found.');
        roomId = '';
      }
      //@ts-ignore

      navigation.navigate('ChatScreen', {
        roomID: roomId,
        otherUser: otherData,
        currentUser: currentUserData,
      });
    } catch (error) {
      console.error('Error getting chats:', error);
    }
  };

  const renderUser = ({item}: any) => {
    console.log('item: ', item);
    return (
      <TouchableOpacity
        onPress={() => checkRoomByUserId(item.uid, item)}
        style={styles.userItem}>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={Images.Avatar2}
            style={{
              width: 50,
              height: 50,
              resizeMode: 'contain',
            }}
          />
          <Text style={styles.userName}>{item.userName}</Text>
        </View>
        <Text style={styles.userEmail}>Email: {item.email}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#000066" barStyle="light-content" />

      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          padding: 20,
          // marginVertical: 10,
          backgroundColor: '#000066',
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{
            borderRadius: 35,
            backgroundColor: '#ffffff',
            alignSelf: 'center',
            // marginHorizontal: 10,
            marginVertical: 10,
            padding: 5,
          }}>
          <Image
            source={Images.GoBack}
            style={{
              width: 16,
              height: 16,
              resizeMode: 'contain',
              alignSelf: 'center',
            }}
          />
        </TouchableOpacity>
        <View>
          <Text
            numberOfLines={1}
            style={{
              color: '#ffffff',
              fontSize: 26,
              marginHorizontal: 15,
              marginVertical: 4,
              textAlign: 'center',
              alignSelf: 'center',
            }}>
            Users
          </Text>
        </View>
      </View>
      <View style={styles.header}>
        <Text style={styles.title}>Users List:</Text>
        <Text>Here are all the users that are logged in</Text>
      </View>
      {loader ? (
        <ActivityIndicator size={'large'} />
      ) : (
        <>
          <FlatList
            data={users}
            //@ts-ignore
            keyExtractor={item => item.id}
            renderItem={renderUser}
          />
        </>
      )}
    </View>
  );
};

export default UserList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
  title: {
    fontSize: 24,
    color: '#000000',
    fontWeight: 'bold',
  },
  userItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  userName: {
    fontSize: 18,
    color: '#000000',
    alignSelf: 'center',
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
  },
});
