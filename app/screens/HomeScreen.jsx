import React, { useEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { useChatStore } from '../../assets/services/useChatStore';
import { useAuthStore } from '../../assets/services/useAuthStore';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const { users, selectUser, getUsers } = useChatStore();
  const { logout, onlineUsers } = useAuthStore();
  const navigation = useNavigation();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const handleUserPress = (user) => {
    selectUser(user);
    navigation.navigate('Chat', { userId: user._id });
  };

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  return (
    <View style={styles.container}>
      {/* Sidebar - User List */}
      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.userItem} onPress={() => handleUserPress(item)}>
            <Image source={{ uri: item.profilePic || '/avatar.png' }} style={styles.userAvatar} />
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{item.name}</Text>
              <Text style={styles.userStatus}>{onlineUsers.includes(item._id) ? 'Online' : 'Offline'}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Show Online Users Toggle */}
      <TouchableOpacity style={styles.toggleButton} onPress={() => setShowOnlineOnly(!showOnlineOnly)}>
        <Text style={styles.toggleText}>{showOnlineOnly ? 'Show All Users' : 'Show Online Only'}</Text>
      </TouchableOpacity>

      {/* Profile & Logout Button */}
      <TouchableOpacity style={styles.profileButton} onPress={() => navigation.navigate('Profile')}>
        <Text style={styles.buttonText}>Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '500',
  },
  userStatus: {
    fontSize: 12,
    color: 'gray',
  },
  toggleButton: {
    padding: 10,
    backgroundColor: 'gray',
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  toggleText: {
    color: 'white',
    fontWeight: 'bold',
  },
  profileButton: {
    position: 'absolute',
    top: 10,
    right: 20,
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  logoutButton: {
    position: 'absolute',
    top: 10,
    left: 20,
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});