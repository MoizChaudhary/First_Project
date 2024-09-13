import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  ActivityIndicator,
  FlatList,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Images} from '../../assets/images';
import auth from '@react-native-firebase/auth'; // Firebase Authentication
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';

const ChatModal = ({isModalVisible, toggleModal}: any) => {
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]); // Add filtered users state
  const [loader, setLoader] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); // Search query state
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
        //@ts-ignore
        setFilteredUsers(usersData); // Set the filtered list initially to the full users list
      } catch (error) {
        setLoader(false);
        console.log('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  // Function to filter users based on search query
  const filterNames = (query: string) => {
    setSearchQuery(query);
    const filtered = users.filter(user =>
      //@ts-ignore
      user.userName.toLowerCase().includes(query.toLowerCase()),
    );
    setFilteredUsers(filtered);
  };

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
      toggleModal();
    } catch (error) {
      console.error('Error getting chats:', error);
    }
  };

  const renderUser = ({item}: any) => {
    return (
      <TouchableOpacity
        onPress={() => checkRoomByUserId(item.uid, item)}
        style={styles.userItem}>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={Images.Avatar2}
            style={{
              width: '30%',
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
    <Modal visible={isModalVisible} onRequestClose={toggleModal} transparent>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.6)',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 12,
            height: '60%',
            width: '90%',
          }}>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#000066',
              padding: 15,
              borderTopLeftRadius: 12,
              borderTopRightRadius: 12,
            }}>
            <Text style={{textAlign: 'center', fontSize: 18, color: '#ffffff'}}>
              New Chats
            </Text>
            <TouchableOpacity onPress={toggleModal}>
              <Image
                source={Images.Cross}
                style={{
                  width: 22,
                  height: 22,
                }}
              />
            </TouchableOpacity>
          </View>
          <View>
            <TextInput
              style={styles.searchInput}
              placeholder="Search by name"
              value={searchQuery}
              onChangeText={text => filterNames(text)} // Trigger the filter function
            />
          </View>

          {loader ? (
            <ActivityIndicator size={'large'} />
          ) : (
            <FlatList
              data={filteredUsers} // Use filteredUsers instead of users
              //@ts-ignore
              keyExtractor={item => item.id}
              renderItem={renderUser}
            />
          )}
        </View>
      </View>
    </Modal>
  );
};

export default ChatModal;

const styles = StyleSheet.create({
  userItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  userName: {
    fontSize: 18,
    width: '70%',
    color: '#000000',
    alignSelf: 'center',
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
    alignSelf: 'center',
  },
  searchInput: {
    margin: 20,
    borderRadius: 20,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});
