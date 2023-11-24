import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Button, Alert, TextInput,Pressable } from 'react-native';
import { UserType } from "../UserContext";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DeleteAccount = () => {
  const { userId, setUserRole } = useContext(UserType);
  const navigation = useNavigation();
  const [inputValue, setInputValue] = useState('');

  const deleteUser = async () => {
    if (inputValue.toLowerCase() !== 'delete') {
      Alert.alert('Please type "delete" to confirm deletion.');
      return;
    }

    try {
      const response = await fetch(`http://192.168.1.13:8000/api/user/deleteuser/${userId}`, {
        method: 'DELETE',
      });

      if (response.status === 204) {
        Alert.alert('User Deleted Successfully');
        setUserRole(null);
        await AsyncStorage.clear();
        navigation.navigate("Login");

      } else if (response.status === 404) {
        Alert.alert('User not found');
      } else {
        const data = await response.json();
        Alert.alert(data.error);
      }
    } catch (error) {
      Alert.alert('An error occurred while deleting the user.');
    }
  };

  return (
    <View style={styles.container}>
     
      <Text style={styles.text}>Type 'delete' to confirm:</Text>

      <TextInput
        style={styles.input}
        onChangeText={setInputValue}
        value={inputValue}
        placeholderTextColor="#a6a6a6"
              placeholder="Type Here"
      />
     
        <Pressable onPress={deleteUser} style={styles.button}>
          <Text style={styles.buttonText}>Delete Account</Text>
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
    
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    marginTop:100,
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    height: 40,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  buttonContainer: {
    width: 200,
  },
  button: {
    width: 150,
    backgroundColor: "#EC4747", // Updated button background color
    padding: 15,
    marginTop: 20,
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
});

export default DeleteAccount;
