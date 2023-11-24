import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ScrollView, TouchableOpacity, Button } from 'react-native';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { UserType } from "../UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import { useFocusEffect } from '@react-navigation/native';


const Get_LL_boardings = () => {
  const { userId, setUserId } = useContext(UserType);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    };

    fetchUsers();
  }, []);

  const navigation = useNavigation();
  const [boardings, setBoardings] = useState([]);
  const [isConfirmationModalVisible, setIsConfirmationModalVisible] = useState(false);
  const [boardingToDelete, setBoardingToDelete] = useState(null);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handlePlusIconPress = () => {
    navigation.navigate('LL_boardings'); 
  };




  const handleViewPress = (id) => {
    navigation.navigate('ViewBoarding', { boarding: id });
  };

  const handleUpdatePress = (id) => {
    navigation.navigate('Update_LL_Boardings', { boarding: id });
  };

  const handleDeletePress = (item) => {
    setBoardingToDelete(item);
    setIsConfirmationModalVisible(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(`http://192.168.1.13:8000/api/boardings/${boardingToDelete._id}`, {
        method: 'DELETE',
      });

      if (response.status === 204) {
        setIsConfirmationModalVisible(false);
        setSuccessMessage('Boarding data deleted successfully');
        setIsSuccessModalVisible(true);
        fetchBoardings();
      } else {
        console.error('Error deleting boarding data');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const hideSuccessMessage = () => {
    setIsSuccessModalVisible(false);
    setSuccessMessage('');
  };

  const hideConfirmationModal = () => {
    setIsConfirmationModalVisible(false);
    setBoardingToDelete(null);
  };

  useEffect(() => {
    fetchBoardings();
  }, []);

  const fetchBoardings = async () => {
    try {
      const response = await fetch('http://192.168.1.13:8000/api/boardings');
      if (response.ok) {
        const data = await response.json();
        setBoardings(data);
      } else {
        console.error('Failed to fetch boardings');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const renderBoardingItem = ({ item }) => (
    <View style={styles.boardingItem}>
      <Image source={{ uri: item.imgURL }} style={styles.boardingImage} />
      <ScrollView style={styles.boardingDetails}>
        <Text style={styles.boardingText}>Location: {item.boardingLocation}</Text>
        <Text style={styles.boardingText}>Gender: {item.gender}</Text>
        <Text style={styles.boardingText}>Price: Rs.{item.price}</Text>
        <Text style={styles.boardingText}>Description: {item.description}</Text>
      </ScrollView>
      <View style={styles.iconButtonContainer}>
        <TouchableOpacity style={styles.iconButton} onPress={() => handleUpdatePress(item._id)}>
          <Ionicons name="md-create" size={24} color="blue" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={() => handleDeletePress(item)}>
          <Ionicons name="md-trash" size={24} color="red" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={() => handleViewPress(item._id)}>
          <Ionicons name="md-eye" size={24} color="green" />
        </TouchableOpacity>
      </View>
    </View>
  );

  useFocusEffect(
    React.useCallback(() => {
      fetchBoardings();
    }, [])
  );


  return (
    <View style={styles.container}>
            
   
     
            <View style={styles.addboarding}>
      <View style={styles.centeredContainer}>
        <TouchableOpacity style={styles.plusIcon} onPress={handlePlusIconPress}>
          <Ionicons name="ios-add" size={30} color="blue" />
        </TouchableOpacity>
      </View>
    </View>
      
      <FlatList
      style={styles.container2}
        data={boardings}
        keyExtractor={(item) => item._id}
        renderItem={renderBoardingItem}
      />

      <Modal isVisible={isConfirmationModalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.confirmationModal}>
            <Text>Are you sure you want to delete this boarding?</Text>
            <Button title="Yes" onPress={confirmDelete} />
            <Button title="No" onPress={hideConfirmationModal} />
          </View>
        </View>
      </Modal>

      <Modal isVisible={isSuccessModalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.successModal}>
            <Text>{successMessage}</Text>
            <Button title="OK" onPress={hideSuccessMessage} />
          </View>
        </View>
      </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },headerContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between', 
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 40,
  },
  container2:{
marginBottom:150,
  },
  header: {
    fontSize: 24,
    padding: 10,
    marginLeft: 100,
    marginTop:50
  },
  // plusIcon: {
  //   justifyContent: 'center',
  //   alignItems: 'center', // Adjust the margin to your preference for the backward icon
  // },
  
  boardingItem: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 3,
    borderBottomColor: '#ccc',
  },
  addboarding: {
   marginBottom:10,
   marginTop:10,
    justifyContent: 'center',
    alignItems: 'center',
   
  },
  centeredContainer: {
   width:300,
   height:50,
   borderRadius:20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1, // Add border properties here
    borderColor: 'black', // Choose the desired color
  },
  boardingImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  boardingDetails: {
    flex: 1,
    marginLeft: 10,
  },
  boardingText: {
    fontSize: 16,
  },
  iconButtonContainer: {
    justifyContent: 'center',
  },
  iconButton: {
    marginRight: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmationModal: {
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center',
  },
  successModal: {
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center',
  },
});

export default Get_LL_boardings;
