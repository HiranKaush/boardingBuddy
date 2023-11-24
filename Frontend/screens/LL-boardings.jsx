import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, Alert, Image } from "react-native";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { UserType } from "../UserContext";

import * as ImagePicker from 'expo-image-picker';
import {firebase} from '../config';
import * as FileSystem from 'expo-file-system';

const LL_boardings = () => {
  const { userId, setUserId } = useContext(UserType);

  const navigation = useNavigation();
  const [boardingLocation, setBoardingLocation] = useState("");
  const [boardingLocationError, setBoardingLocationError] = useState("");
  const [gender, setGender] = useState("");
  const [price, setPrice] = useState("");
  const [priceError, setPriceError] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imgURL, setImgURL] = useState(null);
  const [uploading, setUploading] = useState(false);

  const pickImage = async() => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadImage = async() => {
    setUploading(true);
    try {
      const { uri } = await FileSystem.getInfoAsync(image);
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
          resolve(xhr.response);
        };
        xhr.onerror = (e) => {
          reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', uri, true);
        xhr.send(null);
      });

      const filename = image.substring(image.lastIndexOf('/') + 1);
      const ref = firebase.storage().ref().child(filename);

      await ref.put(blob);
      const url = await ref.getDownloadURL();
    
      setImgURL(url);
          console.log("image url ---------- " + url);

      setUploading(false);
      Alert.alert('Photo Uploaded !!');
      setImage(null);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const validateForm = () => {
    let valid = true;

    if (boardingLocation.trim() === "") {
      setBoardingLocationError("Boarding location is required");
      valid = false;
    } else {
      setBoardingLocationError("");
    }

    if (price.trim() === "") {
      setPriceError("Price is required");
      valid = false;
    } else {
      setPriceError("");
    }

    return valid;
  };

  const handleAddBoarding = async () => {
    if (validateForm()) {
      console.log("url", imgURL);
      try {
        
  
        console.log("Boardingdata",boardingLocation,gender)
  
        // Pass boarding details as route parameters when navigating to MakePayment
        navigation.navigate("MakePayment", {
          boardingLocation,
          gender,
          price,
          description,
          userId,
          imgURL
        });
      } catch (error) {
        console.error("Error adding boarding:", error);
      }
    }
  };
  

  const handleBackPress = () => {
    navigation.goBack();
  };

  const UpdateImage = async () => {
    try {
        console.log("here")
        console.log(imgURL)
      const response = await axios.post(`http://192.168.1.13:8000/api/boardings/${userId}`, {imgURL: imgURL});

      console.log("there")
      if (response.status === 200) {
        const updatedBoarding = response.data;
        alert(' Image added Successfully!');
      }
    } catch (error) {
      setErrorMessage('An error occurred');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
         
      </View>

      <Text style={styles.text2}>Boarding Location</Text>
      <TextInput
        style={styles.inputField}
        placeholder="Boarding Location"
        value={boardingLocation}
        onChangeText={(text) => setBoardingLocation(text)}
      />
      {boardingLocationError ? (
        <Text style={styles.errorText}>{boardingLocationError}</Text>
      ) : null}

     
      <Text style={styles.text2}>Gender</Text>
      <View style={styles.radioButtons}>
        <TouchableOpacity
          style={[
            styles.radioButton,
            gender === "Male" ? styles.selectedRadioButton : {},
          ]}
          onPress={() => setGender("Male")}
        >
          <Text>Male</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.radioButton,
            gender === "Female" ? styles.selectedRadioButton : {},
          ]}
          onPress={() => setGender("Female")}
        >
          <Text>Female</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.radioButton,
            gender === "Other" ? styles.selectedRadioButton : {},
          ]}
          onPress={() => setGender("Other")}
        >
          <Text>Other</Text>
        </TouchableOpacity>
      </View>

      
      <Text style={styles.text}>Price</Text>
      <TextInput
        style={styles.inputField}
        placeholder="Price"
        value={price}
        onChangeText={(text) => setPrice(text)}
      />
      {priceError ? (
        <Text style={styles.errorText}>{priceError}</Text>
      ) : null}

      <Text style={styles.text}>Description</Text>
      <TextInput
        style={styles.inputField}
        placeholder="Description"
        value={description}
        onChangeText={(text) => setDescription(text)}
      />

      
        <TouchableOpacity style={styles.selectButton} onPress={pickImage}>
          <Text style={styles.buttonText}>Pick an Image</Text>
        </TouchableOpacity>
        <View style={styles.imamgeContainer}>
          {image && <Image 
            source={{uri:image}}
            style={{width:300 , height:300}}
          />}
          <TouchableOpacity style={styles.uploadButton} onPress={uploadImage}>
            <Text style={styles.buttonText}>Upload Image</Text>
          </TouchableOpacity>
        </View>
     

      <TouchableOpacity style={styles.button} onPress={handleAddBoarding}>
        <Text style={styles.submitButtonText}>Add Boarding</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  header: {
    marginTop: -230,
  }, errorText: {
    color: "red",
    marginBottom: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  text: {
    marginRight: 250,
    alignItems: "right",
    justifyContent: "center",
  },
  text2: {
    marginRight: 185,
  },
  backwardIcon: {
    position: "absolute",
    top: -20,
    right: 10,
    marginRight: 200,
  },
  inputField: {
    width: 300,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
  },
  button: {
    backgroundColor: "#4BC56A",
    padding: 10,
    marginBottom:-50,
    marginTop:10,
    borderRadius: 5,
    width:350,
    alignItems:'center',
    height:50,
    justifyContent:'center'
  },
  submitButtonText: {
    color: "black",
    fontWeight: "bold",
    fontSize:24
  },
  radioButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
    marginRight: 75,
  },
  radioButton: {
    marginRight: 20,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },
  selectedRadioButton: {
    backgroundColor: "#4BC56A",
    borderColor: "#4BC56A",
  },
  selectButton:{
    borderRadius:5,
    width:120,
    height:50,
    marginBottom:10,
    backgroundColor:'blue',
    alignItems:'center',
    justifyContent:'center'
  },
    buttonText:{
      color:'#fff',
      fontSize:18,
      fontWeight:'bold'
    },
    uploadButton:{
      borderRadius:5,
      width:120,
      height:50,
      marginBottom:10,
      backgroundColor:'#4BC56A',
      alignItems:'center',
      justifyContent:'center',
      marginTop:20
    }
  
});

export default LL_boardings;
