import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Images} from '../../assets/images';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth'; // Firebase Authentication

const MyFlatListComponent = ({navigation}: any) => {
  const [data, setData] = useState<any[]>([]);
  const currentUser = auth().currentUser;
  const [currentUserData, setCurrentUserData] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState<any[]>([]); // State for filtered chats

  //@ts-ignore
  const cuid = currentUser.uid;

  useEffect(() => {
    const chatsCollection = firestore().collection('chats');

    // Set up the real-time listener using onSnapshot
    const unsubscribe = chatsCollection
      .where('userIds', 'array-contains', cuid)
      .onSnapshot(
        querySnapshot => {
          console.log(`Found ${querySnapshot.size} documents`);
          if (querySnapshot.empty) {
            console.log('No matching chat found.');
            setData([]); // Clear the data if no matching chats
            setFilteredData([]); // Clear the filtered data
          } else {
            // Collect all matching chats in real-time
            const chats = querySnapshot.docs.map(doc => ({
              ...doc.data(), // Spread the document data
              roomId: doc.id, // Add the roomId (document ID)
            }));
            setData(chats);
            setFilteredData(chats); // Initialize with all chats
          }
        },
        error => {
          console.error('Error getting chats:', error);
        },
      );

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
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
        const userDoc = await firestore().collection('Users').doc(userId).get();
        console.log('Document Data:', userDoc.data()); // Debugging statement

        if (userDoc.exists) {
          //@ts-ignore
          setCurrentUserData(userDoc.data());
        } else {
          console.error('User document does not exist');
          setCurrentUserData(null);
        }
      } catch (error) {
        console.error('Error fetching user data: ', error);
      }
    };

    fetchUserData();
  }, []);

  // Function to filter chat data based on search query
  const filterNames = (text: string) => {
    setSearchQuery(text);
    if (text === '') {
      setFilteredData(data); // Reset to all data if search query is empty
    } else {
      const filtered = data.filter(chat => {
        const users = chat?.users || [];
        const otherUser = users.find((user: any) => user.uid !== cuid);
        return otherUser?.userName?.toLowerCase().includes(text.toLowerCase());
      });
      setFilteredData(filtered); // Set filtered chat data
    }
  };

  const renderItem = ({item}: any) => {
    const users = item?.users || [];
    const otherUser = users.filter((user: any) => user.uid !== cuid);
    let title = 'N/A';
    if (otherUser && otherUser.length > 0) {
      title = otherUser[0].userName;
    }

    return (
      <View
        style={{
          padding: 15,
          flexDirection: 'row',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginVertical: 10,
          marginHorizontal: 20,
        }}>
        <View
          style={{
            width: '75%',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image
            source={Images.Avatar2}
            style={{
              width: 40,
              height: 40,
              resizeMode: 'contain',
              borderRadius: 20,
              alignSelf: 'center',
            }}
          />
          <TouchableOpacity>
            <Text
              style={{
                color: '#ffffff',
                fontSize: 22,
                fontWeight: '400',
                marginHorizontal: 17,
              }}>
              {title}
            </Text>
            <Text
              style={{
                color: '#fff',
                marginHorizontal: 20,
              }}>
              {item.lastMessage || ''}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={{marginRight: 35}}
          onPress={() => {
            navigation.navigate('ChatScreen', {
              roomID: item.roomId,
              otherUser: otherUser[0],
              currentUser: currentUserData,
            });
          }}>
          <Image
            source={Images.chats}
            style={{
              width: 30,
              height: 30,
              resizeMode: 'contain',
            }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderEmpty = () => {
    return (
      <View style={{alignSelf: 'center'}}>
        <Text style={{color: '#ffffff', fontSize: 20}}>No match Found.</Text>
      </View>
    );
  };

  return (
    <View>
      <View>
        <TextInput
          style={styles.searchInput}
          placeholderTextColor={'#ffffff'}
          placeholder="Search by name"
          value={searchQuery}
          onChangeText={filterNames} // Trigger the filter function
        />
      </View>
      <FlatList
        data={filteredData} // Use filtered data
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        ListEmptyComponent={renderEmpty}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchInput: {
    margin: 20,
    borderRadius: 20,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    color: '#ffffff',
  },
});

export default MyFlatListComponent;
