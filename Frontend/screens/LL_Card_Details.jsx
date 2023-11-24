import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons

const CardDetails = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expireDate, setExpireDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);

  const showSuccessModal = () => {
    setIsSuccessModalVisible(true);
  };

  const hideSuccessModal = () => {
    setIsSuccessModalVisible(false);
    navigation.goBack(); // Navigate back to the previous screen
  };

  const showErrorModal = () => {
    setIsErrorModalVisible(true);
  };

  const hideErrorModal = () => {
    setIsErrorModalVisible(false);
  };

  const handleAddCard = async () => {
    try {
      const response = await axios.post('http://192.168.1.13:8000/api/cards', {
        email,
        cardHolderName,
        cardNumber,
        expireDate,
        cvv,
      });

      console.log('Card added:', response.data);
      showSuccessModal();
    } catch (error) {
      console.error('Error adding card:', error);
      showErrorModal();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backwardIcon} onPress={() => navigation.goBack()}>
          <Ionicons name="ios-arrow-back" size={30} color="blue" />
        </TouchableOpacity>
      </View>

      <Text style={styles.headerText}>Card Details</Text>

      <TextInput
        style={styles.inputField}
        placeholder="Card Holder's Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.inputField}
        placeholder="Card Holder Name"
        value={cardHolderName}
        onChangeText={(text) => setCardHolderName(text)}
      />
      <TextInput
        style={styles.inputField}
        placeholder="Card Number"
        value={cardNumber}
        onChangeText={(text) => setCardNumber(text)}
      />
      <TextInput
        style={styles.inputField}
        placeholder="Expire Date"
        value={expireDate}
        onChangeText={(text) => setExpireDate(text)}
      />
      <TextInput
        style={styles.inputField}
        placeholder="CVV"
        value={cvv}
        onChangeText={(text) => setCvv(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleAddCard}>
        <Text style={styles.buttonText}>Add Card</Text>
      </TouchableOpacity>

      {/* Success Modal */}
      <Modal isVisible={isSuccessModalVisible}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>Card added successfully!</Text>
          <TouchableOpacity onPress={hideSuccessModal}>
            <Text style={styles.closeModalText}>OK</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Error Modal */}
      <Modal isVisible={isErrorModalVisible}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>Error adding card.</Text>
          <TouchableOpacity onPress={hideErrorModal}>
            <Text style={styles.closeModalText}>OK</Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 200
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginLeft: 0
  },
  backwardIcon: {
    marginRight: 100,
    marginTop: -300,

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
  // Modal styles
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  closeModalText: {
    color: '#4BC56A',
    fontSize: 16,
  },
});

export default CardDetails;
