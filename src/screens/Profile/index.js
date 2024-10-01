// ProfileScreen.js
import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons"; // or any other icon set
import styles from "./style";
import { deleteProfile } from "../../utils/user/profileUser";
import { clearProfileRedux } from "../../store/slice/profileSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
const ProfileScreen = () => {
  const dispatch = useDispatch();
  const { userId, email, name } = useSelector((state) => state.profile);
  const [userName, setUserName] = useState(name);
  const [userEmail, setUserEmail] = useState(email);
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(userName);
  const navigation = useNavigation();
  // console.log(userId, name, email);
  const handleLogout = async () => {
    await deleteProfile();
    dispatch(clearProfileRedux());
    navigation.navigate("Login");
  };

  // Function to handle updating the name
  const handleUpdateName = () => {
    setUserName(inputValue);
    setIsEditing(false);
  };

  return (
    <View style={styles.container}>
      {/* Profile Info */}
      <View style={styles.profileContainer}>
        <Icon name="account-circle" size={100} color="#2ecc71" />

        {/* Editable name field */}
        {isEditing ? (
          <TextInput
            value={inputValue}
            onChangeText={setInputValue}
            style={styles.input}
          />
        ) : (
          <View style={styles.infoContainer}>
            <Text style={styles.userName}>Họ Tên: {userName}</Text>
            <Text style={styles.userEmail}>Email: {userEmail}</Text>
          </View>
        )}

        {/* Update Name Button */}
        {isEditing ? (
          <TouchableOpacity
            style={styles.updateButton}
            onPress={handleUpdateName}
          >
            <Text style={styles.updateText}>Cập nhật tên</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setIsEditing(true)}
          >
            <Text style={styles.editText}>Cập nhật thông tin</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Đăng xuất</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;
