import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  Modal,
  Alert,
  Platform,
  Keyboard,
  Button,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from "react-native";
import axios from "axios";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { firebase } from "../config";
import Spinner from "../components/Spinner";

const EditAccountInfo = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { recepientinfo } = route.params;
  //console.log(recepientinfo);

  const [uploading, setUploading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [imgURL, setImgURL] = useState(null);
  const [image, setImage] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [nic, setNic] = useState("");
  const [phoneNum, setPhoneNum] = useState("");

  // ------------- image upload

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setModalVisible(true);
    }
  };

  const uploadMedia = async () => {
    setUploading(true);
    setModalVisible(false);
    try {
      // const imageRef = firebase.storage().refFromURL(imgURL);
      // await imageRef.delete();
      // console.log("image deleted");

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

  //   const [recepientData, setRecepientData] = useState();

  //   const fetchRecepientData = async () => {
  //     try {
  //       const response = await fetch(
  //         `http://192.168.1.13:8000/api/user/user/${uid}`
  //       );

  //       const data = await response.json();
  //       setRecepientData(data);
  //     } catch (error) {
  //       console.log("error retrieving details", error);
  //     }
  //   };

  useEffect(() => {
    // fetchRecepientData();
    //console.log("message fetched")
    setName(recepientinfo?.name);
    setEmail(recepientinfo?.email);
    setGender(recepientinfo?.gender);
    setNic(recepientinfo?.nic);
    setPhoneNum(recepientinfo?.phoneNum);
    setImgURL(recepientinfo?.image);
  }, [recepientinfo]);

  const updateUser = async () => {
    try {
      const response = await axios.put(
        `http://192.168.1.13:8000/api/user/upuser/${recepientinfo._id}`,
        {
          name,
          email,
          gender,
          nic,
          phoneNum,
          image: imgURL,
        }
      );
      console.log(response.data);
      setName("");
      setEmail("");
      setGender("");
      setNic("");
      setPhoneNum("");
      navigation.navigate("Tenant_Profile");
      // Handle success or other operations on successful update
    } catch (error) {
      console.error("Error updating user", error);
      // Handle error state or display error message
    }
  };

  //if kayboard comes, image picker hides
  const [keyboardIsVisible, setKeyboardIsVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardIsVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardIsVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);


  return (
    <KeyboardAvoidingView
    behavior={'padding'}
    keyboardVerticalOffset={Platform.OS === 'ios' ? 450 : 0}
    style={styles.container}
    >

       {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
      {uploading && <Spinner />}

      {/* --------- popup box for image upload----------- */}
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
            <Image source={{ uri: image }} style={styles.popupimage} />
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

      {!keyboardIsVisible && (<View>
        <Image
        style={{
          marginTop: 30,
          width: 100,
          height: 100,
          borderRadius: 50,
          borderColor: "#1DAB87",
          borderWidth: 1,
          resizeMode: "cover",
        }}
        source={{ uri: imgURL }}
      />
      <Button title="Pick Image" onPress={pickImage} />
      </View>)}
      

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          placeholder="Name"
          onChangeText={setName}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          placeholder="Email"
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Gender</Text>
        <TextInput
          style={styles.input}
          value={gender}
          placeholder="Gender"
          onChangeText={setGender}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>NIC</Text>
        <TextInput
          style={styles.input}
          value={nic}
          placeholder="NIC"
          onChangeText={setNic}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          value={phoneNum}
          placeholder="Phone Number"
          onChangeText={setPhoneNum}
        />
      </View>
      {/* <View style={styles.inputContainer}>
        <Text style={styles.label}>Image</Text>
        <TextInput
          style={styles.input}
          value={image}
          placeholder="Image"
          onChangeText={setImage}
        />
      </View> */}
      {/* Other input fields */}

      <TouchableOpacity style={styles.editButton} onPress={updateUser}>
        <Text style={styles.editButtonText}>Save</Text>
      </TouchableOpacity>
      {/* </TouchableWithoutFeedback> */}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    //padding: 16,
  },
  input: {
    width: 300,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  editButton: {
    width: 180,
    backgroundColor: "#1D3A70", // Updated button background color
    padding: 15,
    marginTop: 30,
    alignSelf: "center", // Use alignSelf instead of marginLeft and marginRight
    borderRadius: 10,
  },
  editButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  label: {
    marginBottom: 5,
    fontWeight: "bold",
  },
  inputContainer: {
    marginBottom: 15,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
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
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
  },
  popupimage: {
    width: 200,
    height: 200,
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "90%",
    marginTop: 20,
  },
  button: {
    width: 100,
    backgroundColor: "#1DAB87",
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
  },
});

export default EditAccountInfo;
