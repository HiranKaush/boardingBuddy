import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking, ScrollView  } from 'react-native';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';

const TenantProfile = () => {
  const route = useRoute();
  const { tenantid } = route.params;
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`http://192.168.1.13:8000/api/user/user/${tenantid}`);
        setUserDetails(response.data); // Assuming the API response contains user details
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserProfile();
  }, [tenantid]);

  const makePhoneCall = () => {
    if (userDetails && userDetails.phoneNum) {
      const phoneNumber = userDetails.phoneNum;
      Linking.openURL(`tel:${phoneNumber}`);
    }
  };
  const openWhatsApp = () => {
    if (userDetails && userDetails.phoneNum) {
      const phoneNumber = userDetails.phoneNum;
      // Check if the phone number starts with '0', indicating a local number in Sri Lanka
      // If it does, replace the '0' with the country code '+94'
      const formattedPhoneNumber = phoneNumber.startsWith('0') ? `+94${phoneNumber.substring(1)}` : phoneNumber;
      const whatsappUrl = `whatsapp://send?phone=${formattedPhoneNumber}`;
      
      Linking.canOpenURL(whatsappUrl)
        .then(supported => {
          if (supported) {
            return Linking.openURL(whatsappUrl);
          } else {
            console.log("WhatsApp is not installed on your device");
          }
        })
        .catch(error => console.log(error));
    }
  };
  const openEmailApp = () => {
    if (userDetails && userDetails.email) {
      const email = userDetails.email;
      const emailUrl = `mailto:${email}`;
      Linking.canOpenURL(emailUrl)
        .then(supported => {
          if (supported) {
            return Linking.openURL(emailUrl);
          } else {
            console.log("Email app is not available on your device");
          }
        })
        .catch(error => console.log(error));
    }
  }
  
  

  if (!userDetails) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }
  const isContactInfoAvailable = userDetails.email || userDetails.phoneNum;
  const isProfilePhotoAvailable = userDetails.image !== null && userDetails.image !== undefined;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileContainer}>
      
     
      <View style={styles.viewContainer1}>
      {isProfilePhotoAvailable && (
        <Image source={{ uri: userDetails.image }} style={styles.userImage} />
        )}
         {!isProfilePhotoAvailable && (
            <Text style={styles.noProfilePhotoText}>No profile photo available</Text>
          )}
        </View>
        <Text style={styles.title}>Personal Information</Text>
        <View style={styles.viewContainer}>
        <Text style={styles.userName}>Name:{userDetails.name}</Text>
        <Text style={styles.userInfo}>Gender:{userDetails.gender}</Text>
        </View>
        <Text style={styles.title}>Contact Information</Text>
        <View style={styles.viewContainer}>
        <Text style={styles.userInfo}>Email: {userDetails.email}</Text>
        <Text style={styles.userInfo}>Phone Number: {userDetails.phoneNum}</Text>
        {/* Render other user details here */}
        </View>
        <Text style={styles.title}>Contact </Text>
        <View style={styles.viewContainer}>
        {isContactInfoAvailable ? (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {userDetails.phoneNum && (
              <TouchableOpacity onPress={makePhoneCall}>
                <Image source={require('../assets/phonecall.jpg')} style={styles.itemImage} />
              </TouchableOpacity>
            )}
       {userDetails.phoneNum && (
              <TouchableOpacity onPress={openWhatsApp}>
                <Image source={require('../assets/whatsapp.png')} style={styles.itemImage} />
              </TouchableOpacity>
            )}
            {userDetails.email && (
              <TouchableOpacity onPress={openEmailApp}>
                <Image source={require('../assets/email.jpg')} style={styles.itemImage} />
              </TouchableOpacity>
            )}
          </View>
           ) : (
            <Text style={styles.noContactText}>No contact information available</Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  profileContainer: {
    alignItems: 'center',
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  userName: {
    fontSize: 18,
    //fontWeight: 'bold',
    marginBottom: 10,
  },
  userInfo: {
    fontSize: 18,
    marginBottom: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  viewContainer: {
       
    width:300,
    borderWidth: 1,
    borderColor: '#1DAB87',
    padding: 10,
    marginBottom: 20,
    borderRadius: 10,
  },
  viewContainer1: {
       
    width:300,
    borderWidth: 1,
    borderColor: '#1DAB87',
    padding: 10,
    marginBottom: 20,
    alignItems:'center',
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color:'#1DAB87',
    marginTop:20,
    marginBottom: 10,
    alignSelf: 'flex-start',
    marginLeft:30,
  },
  itemImage: {
    width: 60, // Set the width of the image
    height: 60, // Set the height of the image
    marginRight: 5, // Optional: Add some margin to the right of the image
    
  },
  noContactText: {
    color: 'red', // Set the text color to red
  },
  noProfilePhotoText: {
    color: 'red', // Set the text color to red
    fontSize: 16,
    marginTop: 10,
  },
});

export default TenantProfile;
