import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TextInput, Alert, Pressable } from 'react-native';
import { UserType } from "../UserContext";
import { useNavigation } from "@react-navigation/native";

const ChangePassword = () => {
  const { userId } = useContext(UserType);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [data, setData] = useState('');
  const navigation = useNavigation();



  const fetchRecepientData = async () => {
    try {
      const response = await fetch(
        `http://192.168.1.13:8000/api/user/user/${userId}`
      );

      const data = await response.json();
      setData(data);
    } catch (error) {
      console.log("error retrieving details", error);
    }
  };

  useEffect(() => {
    fetchRecepientData();
  }, []);

  const updatePassword = async () => {

    if(currentPassword === "" || newPassword === "" || confirmNewPassword === ""){
      Alert.alert('Some fields are empty');
      return;
    }
    // Add logic to verify current password first
    if (currentPassword !== data.password) {
      Alert.alert('Current password is incorrect. Please try again.');
      return;
    }

    if (currentPassword === newPassword) {
      Alert.alert('Please choose a new password that is different from your current one.');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      Alert.alert('New passwords do not match. Please re-enter.');
      return;
    }

    try {
      const response = await fetch(`http://192.168.1.13:8000/api/user/upuserpass/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: newPassword,
        }),
      });

      const data = await response.json();
      Alert.alert(data.message);
      navigation.navigate("Tenant_Profile");
    } catch (error) {
      console.log("error updating password", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
      <Text style={styles.title}>Change Password</Text>
      <Text style={styles.title2}>Please, enter a new password below different from the previous password</Text>

      </View>
     
      <TextInput
        style={styles.input}
        placeholder="Current Password"
        onChangeText={setCurrentPassword}
        value={currentPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="New Password"
        onChangeText={setNewPassword}
        value={newPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm New Password"
        onChangeText={setConfirmNewPassword}
        value={confirmNewPassword}
        secureTextEntry
      />
    
      <Pressable onPress={updatePassword} style={styles.button}>
          <Text style={styles.buttonText}>Confirm</Text>
        </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor:'#ffffff'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color:'#1DAB87'
  },
  
  input: {
    fontSize: 18,
    marginVertical: 10,
    width: 320,
    height: 50,
    padding: 10, // Add padding to the input field
    borderRadius: 10, // Add rounded corners
    color: 'black',
    backgroundColor: '#ffffff', // Add a light background color
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1.5,
    elevation: 5,
  },
  button: {
    width: 120,
    backgroundColor: "#1D3A70", // Updated button background color
    padding: 15,
    marginTop: 100,
    marginBottom:20,
    alignSelf: "center", // Use alignSelf instead of marginLeft and marginRight
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  title2:{
    fontSize: 16,
    marginBottom:50,
  },
  container2:{
    // flex: 1,
    alignItems: 'flex-start',
    marginTop: 50,
    width:320,
    
    
    

  }
});

export default ChangePassword;
