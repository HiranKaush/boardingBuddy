//import liraries
import React, { useState } from "react";
import { View, Text, StyleSheet, Alert,Button, Image, Modal, TouchableOpacity} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { firebase } from "../config";
import Spinner from "../components/Spinner";

const TestImageupload = () => {
  
  const [uploading, setUploading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState(null);
  const [imgURL, setImgURL] = useState(null);

// -------- pick image
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setModalVisible(true)
    }
  };

// -------- upload image
  const uploadMedia = async () => {
    setUploading(true);
    setModalVisible(false)
    try {
      const { uri } = await FileSystem.getInfoAsync(image);
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
          resolve(xhr.response);
        };
        xhr.onerror = (e) => {
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", uri, true);
        xhr.send(null);
      });

      const filename = image.substring(image.lastIndexOf("/") + 1);
      const ref = firebase.storage().ref().child(`profileimage/${filename}`);
      //console.log("image ref ---------- " + ref);

      await ref.put(blob);
      const url = await ref.getDownloadURL();

      setImgURL(url);
      //console.log("image url ---------- " + url);
      setUploading(false);
      Alert.alert("photo Successfully uploaded ");
      setImage(null);
    } catch (error) {
      Alert.alert("uploading error");
      setUploading(false);
    }
  };

  return (
    <View style={styles.container}>
          {uploading && <Spinner />}
       
    <Button title="Pick Image" onPress={pickImage} />
    <Image source={{ uri: imgURL }} style={{ width: 200, height: 200, borderWidth:1 }} />


    <Modal
  animationType="slide"
  transparent={true}
  visible={modalVisible}
  onRequestClose={() => {
    setModalVisible(!modalVisible);
  }}
>
  <View style={styles.centeredView}>
    <View style={styles.modalView}>
      <Text style={styles.modalText}>Add profile picture</Text>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button} onPress={uploadMedia}>
          <Text style={styles.buttonText}>Upload</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setModalVisible(!modalVisible)}
        >
          <Text style={styles.buttonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
</Modal>

  </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2c3e50",
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color:'#000000',
   
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '90%',
    marginTop: 20,
  },
  button: {
    width: 100,
    backgroundColor: '#1DAB87',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
  },
});

//make this component available to the app
export default TestImageupload;
