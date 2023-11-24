import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';
import Modal from 'react-native-modal';
import { useRoute, useNavigation } from '@react-navigation/native'; // Import useNavigation
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons for the back button

const Update_LL_Boardings = () => {
  const route = useRoute();
  const { boarding } = route.params;
  const [boardingLocation, setBoardingLocation] = useState('');
  const [gender, setGender] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [boardingData, setBoardingData] = useState(null);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);


  const navigation = useNavigation();

  const showSuccessModal = () => {
    setIsSuccessModalVisible(true);
  };

  useEffect(() => {
    const fetchBoardingDetails = async () => {
      try {
        const response = await fetch(`http://192.168.1.13:8000/api/boardings/${boarding}`);
        if (!response.ok) {
          throw new Error('Boarding not found');
        }
        const data = await response.json();

        setBoardingData(data);
        setBoardingLocation(data.boardingLocation);
        setGender(data.gender);
        setPrice(data.price.toString());
        setDescription(data.description);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBoardingDetails();
  }, [boarding]);

  const handleUpdateBoarding = async () => {
    try {
      const response = await axios.put(`http://192.168.1.13:8000/api/boardings/${boarding}`, {
        boardingLocation,
        gender,
        price,
        description,
      });

      console.log('Boarding updated:', response.data);
      showSuccessModal();
    } catch (error) {
      console.error('Error updating boarding:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}


      <Text style={styles.text}>Boarding Location</Text>
      <TextInput
        style={styles.inputField}
        placeholder="Boarding Location"
        value={boardingLocation}
        onChangeText={(text) => setBoardingLocation(text)}
      />


      <Text style={styles.text2}>Gender</Text>
      <TextInput
        style={styles.inputField}
        placeholder="Gender"
        value={gender}
        onChangeText={(text) => setGender(text)}
      />

      <Text style={styles.text2}>Price</Text>
      <TextInput
        style={styles.inputField}
        placeholder="Price"
        value={price}
        onChangeText={(text) => setPrice(text)}
      />

      <Text style={styles.text2}>Description</Text>
      <TextInput
        style={styles.inputField}
        placeholder="Description"
        value={description}
        onChangeText={(text) => setDescription(text)}
      />

      <TouchableOpacity style={styles.button} onPress={handleUpdateBoarding}>
        <Text style={styles.buttonText}>Update Boarding</Text>
      </TouchableOpacity>

      <Modal isVisible={isSuccessModalVisible}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>Boarding successfully updated!</Text>
          <TouchableOpacity onPress={() => setIsSuccessModalVisible(false)}>
            <Text style={styles.closeModalText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputField: {
    width: 300,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
  },
  button: {
    backgroundColor: '#4BC56A',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  closeModalText: {
    color: 'blue',
    textAlign: 'center',
    marginTop: 10,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  text: {
    marginLeft: -190
  },
  text2: {
    marginLeft: -240
  },
});

export default Update_LL_Boardings;
