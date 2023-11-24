// ProfileScreen.js
import React , {useState, useEffect, useContext} from 'react';
import { View, Image, Text, TouchableOpacity,StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigation } from "@react-navigation/native";
import { UserType } from "../../UserContext";

const merchantProfile = ({ navigation }) => {
  //const navigation = useNavigation();

    const [store, setStore] = useState('');
    const [storeImage, setStoreImage] = useState('');
    const [user, setUser] = useState('');
    const { userId, setUserId } = useContext(UserType);

    useEffect(() => {
        // Create a separate function for the API request
        const fetchStoreName = async () => {
          try {
            const response = await axios.get(`http://192.168.1.13:8000/api/store/getStore/${userId}`);
            setStore(response.data);
          } catch (error) {
            console.error('Error fetching store data:', error);
          }
        };
    
        // Call the function when the component mounts
        fetchStoreName();
      }, []);
    return (
        <View style={styles.container}>
          <TouchableOpacity 
            onPress={() => {
            navigation.navigate("EditStoreImage")}}>
          <Image
            source={{uri: store.storeImage}}
            style={styles.profileImage}
          />
          </TouchableOpacity>
        <Text style={styles.name}>{store.storeName}</Text>
          <Text style={styles.subtitle}>Your Name</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Tenant_Profile')}
            >
              <Text style={styles.buttonText}>Manage Account</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('CreateStoreForm')}
            >
              <Text style={styles.buttonText}>Manage Store</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Menu')}
            >
              <Text style={styles.buttonText}>Manage Menu</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('StoreReviews')}
            >
              <Text style={styles.buttonText}>View Reviews</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('PremiumIntroPage')}
            >
              <Text style={styles.buttonText}>Upgrade to Premium</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
          flexGrow: 1,
          },
          profileImage: {
            width: '100%',
            height: 200,
            borderRadius: 18, // Apply border radius
          },
          name: {
            fontSize: 24,
            marginTop: 10,
            color: '#061176',
            textDecorationStyle: 'solid',
            paddingLeft: 10,
          },
          subtitle: {
            fontSize: 18,
            paddingLeft: 10,
          },
          buttonContainer: {
            width: '100%', // Make buttons fill the whole screen width
            marginTop: 0,
            justifyContent: 'space-around', // Make buttons spread evenly
            alignItems: 'center',
          },
          button: {
            width: '100%', // Make buttons fill the screen width
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
    });

export default merchantProfile;
