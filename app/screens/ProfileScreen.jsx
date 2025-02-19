import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useAuthStore } from "../services/useAuthStore";
import { Camera, Mail, User } from "lucide-react-native";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImg(result.assets[0].uri);
      await updateProfile({ profilePic: result.assets[0].uri });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Text style={styles.title}>Your Profile</Text>

        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: selectedImg || authUser.profilePic || "https://via.placeholder.com/150" }}
            style={styles.avatar}
          />
          <TouchableOpacity onPress={handleImageUpload} style={styles.cameraButton} disabled={isUpdatingProfile}>
            <Camera size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <User size={20} color="#666" style={styles.icon} />
            <Text style={styles.label}>Full Name</Text>
            <Text style={styles.info}>{authUser?.fullName}</Text>
          </View>

          <View style={styles.infoRow}>
            <Mail size={20} color="#666" style={styles.icon} />
            <Text style={styles.label}>Email Address</Text>
            <Text style={styles.info}>{authUser?.email}</Text>
          </View>
        </View>

        <View style={styles.accountInfo}>
          <Text style={styles.accountTitle}>Account Information</Text>
          <View style={styles.accountRow}>
            <Text>Member Since</Text>
            <Text>{authUser.createdAt?.split("T")[0]}</Text>
          </View>
          <View style={styles.accountRow}>
            <Text>Account Status</Text>
            <Text style={{ color: "green" }}>Active</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    padding: 20,
  },
  profileContainer: {
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  avatarContainer: {
    position: "relative",
    marginTop: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#ddd",
  },
  cameraButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#007bff",
    padding: 8,
    borderRadius: 20,
  },
  infoContainer: {
    width: "100%",
    marginTop: 20,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
  },
  label: {
    fontWeight: "bold",
    flex: 1,
  },
  info: {
    color: "#333",
  },
  accountInfo: {
    marginTop: 20,
    width: "100%",
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 8,
  },
  accountTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  accountRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
});

export default ProfilePage;
