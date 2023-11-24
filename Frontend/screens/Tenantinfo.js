import React, { useState, useEffect ,useContext} from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity ,Alert} from 'react-native';
import axios from 'axios';
import { useNavigation, useRoute } from "@react-navigation/native";
import { UserType } from "../UserContext";


const Tenantinfo = ({ route }) => {
  const { boardingId } = route.params;
  const [boardingLocation, setBoardingLocation] = useState('');
  const [tenants, setTenants] = useState([]);
  const navigation = useNavigation();
  const { userId, userRole } = useContext(UserType);

  useEffect(() => {
    const fetchTenantInfo = async () => {
      try {
        const response = await axios.get(`http://192.168.1.13:8000/api/boardings/${boardingId}`);
        const { tenants, boardingLocation } = response.data;
        setTenants(tenants);
        setBoardingLocation(boardingLocation);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTenantInfo();
  }, [boardingId]);

  const fetchTenantDetails = async () => {
    const tenantDetails = await Promise.all(
      tenants.map(async (tenantId) => {
        try {
          const response = await axios.get(`http://192.168.1.13:8000/api/user/user/${tenantId}`);
          const { name, image } = response.data; // Assuming your API response includes 'name' and 'image' properties
          return { name, image };
        } catch (error) {
          console.error(error);
          return { name: '', image: '' }; // Provide default values or handle errors as needed
        }
      })
    );
    return tenantDetails;
  };

  const [tenantDetails, setTenantDetails] = useState([]);

  useEffect(() => {
    const loadTenantDetails = async () => {
      const details = await fetchTenantDetails();
      setTenantDetails(details);
    };

    loadTenantDetails();
  }, [tenants]);

  const navigateToTenantProfile = (tenantId) => {
    navigation.navigate("TenantProfile", {
      tenantid: tenantId,
    });
  };

  const updateBoarding = async (userId) => {
    try {
      const response = await axios.put(`http://192.168.1.13:8000/api/user/upboarding/${userId}/${boardingId}`, {
      });
      console.log(response.data);
      Alert.alert("remove tenant successfully")
      navigation.goBack()
     
      // Handle success or other operations on successful update
    } catch (error) {
      console.error("Error updating user", error);
      // Handle error state or display error message
    }
  };


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Tenant List for: {boardingLocation}</Text>
      {tenantDetails.map((tenant, index) => (
        <View key={tenants[index]} style={styles.commentContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={{ uri: tenant.image }} style={{ width: 50, height: 50, borderRadius: 25, resizeMode: "cover", marginRight: 10 }} />
            <Text>{tenant.name}</Text>
            <TouchableOpacity
          // style={[styles.button1, { backgroundColor: '#27ae60' }]}
          onPress={() => navigateToTenantProfile(tenants[index])} 
        >
          <Image source={require('../assets/info.png')} style={styles.itemImage} />
          {/* <Text style={styles.buttonText}>Update</Text> */}
        </TouchableOpacity>

        {userRole === "landlord" ? (
                  <TouchableOpacity 
                  style={styles.editButton}
                  onPress={() => updateBoarding(tenants[index])}
                >
                <Image source={require('../assets/delete.png')} style={styles.itemImage2} />
                </TouchableOpacity>
        ) : null}



          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  commentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 350,
    paddingHorizontal: 20,
    marginVertical: 10,
    borderWidth: 1, // Set the width of the border
    borderColor: '#1dab87', // Set the color of the border
    borderRadius: 10, // Optional: Set border radius for rounded corners
    minHeight: 70,
  },
  itemImage: {
    width: 30, // Set the width of the image
    height: 30, // Set the height of the image
    marginRight: 5, // Optional: Add some margin to the right of the image
    marginLeft: 130,
  },
  itemImage2:{
    width: 30, // Set the width of the image
    height: 30, // Set t
  },
  editButton:{
    marginLeft: 20,
  }
});

export default Tenantinfo;
