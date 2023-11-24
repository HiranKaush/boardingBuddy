import React , {useEffect, useState, useContext}from 'react';
import { View, Text, Button, Image, FlatList, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import axios from 'axios';
import { UserType } from "../../UserContext";
import { useNavigation } from "@react-navigation/native";



const StoreMenu = () => {

  const [menu, setMenu] = useState([]); // Initial empty array of users
  const { userId, setUserId } = useContext(UserType);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://192.168.1.13:8000/api/store/getStore/${userId}`);
        setMenu(response.data.menu);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData(); 
    }, []);

    const deleteItemFromMenu = async(itemId) => {
      try {
        const response = await axios.delete(`http://192.168.1.13:8000/api/store/deleteItemFromMenu/${userId}/${itemId}`);
        if(response.status == 200){
          alert('Item deleted');
          setMenu((prevMenu) => prevMenu.filter((item) => item._id !== itemId));
        }
      }
      catch(error){
        console.error(error);
      }
    };


  return (
    <SafeAreaView style={styles.container}>
    <ScrollView contentContainerStyle={styles.container}>
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
              style={[styles.button, styles.blueButton]}
              onPress={() => navigation.navigate('AddItemToMenu')}
            >
              <Text style={[styles.buttonText, styles.whiteText]}>Add Item +</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={menu}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
              <View style={styles.textContainer}>
                <Text style={styles.itemText}>{item.name}</Text>
                <Text style={styles.itemText}>{item.price}</Text>
              </View>
              <View style={styles.buttonsContainer}>
                <TouchableOpacity
                  style={styles.itemButton}
                  onPress={() => {
                    // Handle the first button action here
                  }}
                >
                  <Text style={styles.itemButtonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.itemButton}
                  onPress={() => {
                    deleteItemFromMenu(item._id)
                  }}
                >
                  <Text style={styles.itemButtonText}>Delete</Text>
                </TouchableOpacity>
              </View>
          </View>
        )}
      />
    </View>
    </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  headerText: {
    fontSize: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  itemImage: {
    width: 80,
    height: 80,
    marginRight: 16,
  },
  itemText: {
    fontSize: 16,
    marginTop: 10,	
  },
  button: {
    width: '100%', // Make buttons fill the screen width
    padding: 18,
    borderRadius: 18,
    margin: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  blueButton: { 
    backgroundColor: '#1D3A70',
  },
  buttonText: {
    fontSize: 20,
    textAlign: 'center',
  },
  textContainer: {
    flexDirection: 'column'
  },
  container: {
    flexGrow: 1,
  },
  whiteText: {
    color: 'white',
  },  
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  headerText: {
    fontSize: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  itemImage: {
    width: 80,
    height: 80,
    marginRight: 16,
  },
  itemText: {
    fontSize: 16,
    marginTop: 10,
  },
  button: {
    width: '100%',
    backgroundColor: 'white',
    padding: 18,
    borderRadius: 18,
    margin: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  buttonText: {
    fontSize: 20,
    textAlign: 'center',
  },
  textContainer: {
    flexDirection: 'column',
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginLeft: 'auto',
  },
  itemButton: {
    backgroundColor: 'blue',
    width: 50,
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  itemButtonText: {
    fontSize: 14,
    color: 'white',
  },
});

export default StoreMenu;
