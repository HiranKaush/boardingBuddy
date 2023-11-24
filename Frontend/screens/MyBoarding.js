import React, { useState, useEffect,useContext } from 'react';
import { View, Text, StyleSheet, Image,Pressable, Alert,TouchableOpacity,Button,ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { UserType } from "../UserContext";
import axios from "axios";
import { Ionicons } from '@expo/vector-icons';


const MyBoarding = () => {
  const [boardingg, setBoarding] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();
  const { boarding } = route.params;
  const { userId, userRole } = useContext(UserType);


  useEffect(() => {
    const fetchBoardingDetails = async () => {
      try {
        const response = await fetch(`http://192.168.1.13:8000/api/boardings/${boarding}`);
        console.log("Viewid", boarding)
        if (!response.ok) {
          throw new Error('Boarding not found');
        }
        const data = await response.json();
        setBoarding(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBoardingDetails();
  }, [boarding]);

  if (!boardingg) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',}}>
        <Text style={{fontSize: 24}}> You don't have a boarding </Text>
      </View>
    );
  }

  const updateBoarding = async () => {
    try {
      const response = await axios.put(`http://192.168.1.13:8000/api/user/upboarding/${userId}/${boarding}`, {
      });
      console.log(response.data);
      Alert.alert("remove boarding successfully")
      navigation.goBack()
     
      // Handle success or other operations on successful update
    } catch (error) {
      console.error("Error updating user", error);
      // Handle error state or display error message
    }
  };

  const handleFeedbackPress = () => {
    // Pass boardingId as a parameter when navigating to the FeedBack component
    navigation.navigate("FeedBack", { boardingId: boarding });
  };
  const handletenants = () => {
    // Pass boardingId as a parameter when navigating to the FeedBack component
    navigation.navigate("Tenantinfo", { boardingId: boarding });
  };

  return (

    <ScrollView
    showsVerticalScrollIndicator={false}
    style={{ backgroundColor: "#ffffff" }}
  >
    <View style={styles.container}>
     
      <Image source={{ uri: boardingg.imgURL }} style={styles.image} />

      
      {/* <Button title="Feedback" onPress={handleFeedbackPress} style={styles.allRequestsButton} /> */}

      <TouchableOpacity style={styles.row} onPress={() => handleFeedbackPress()}>
        <View style={styles.leftContent}>
          <View style={styles.image2}>
            <Image
              source={require("../assets/star.png")} // Replace with your image source
              style={{ width: 30, height: 30 }}
            />
          </View>
          <Text style={styles.text2}>Give Review</Text>
        </View>
        <Ionicons style={styles.icon} name="chevron-forward-outline" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.row} onPress={() => handletenants()}>
        <View style={styles.leftContent}>
          <View style={styles.image2}>
            <Image
              source={require("../assets/tenants.png")} // Replace with your image source
              style={{ width: 30, height: 30 }}
            />
          </View>
          <Text style={styles.text2}>Tenants</Text>
        </View>
        <Ionicons style={styles.icon} name="chevron-forward-outline" />
      </TouchableOpacity>

      <View style={styles.textbox}>
      <Text style={styles.text}>Location: {boardingg.boardingLocation}</Text>
      <Text style={styles.text}>Gender: {boardingg.gender}</Text>
      <Text style={styles.text}>Price: Rs {boardingg.price}</Text>
      <Text style={styles.text}>Description: {boardingg.description}</Text>
</View>


      {/* <TouchableOpacity 
  style={styles.editButton}
  onPress={updateBoarding}
>
  <Text style={styles.editButtonText}>remove boarding</Text>
</TouchableOpacity> */}


     
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    alignItems: 'center',
    backgroundColor: '#ffffff',
        marginBottom: 200,

  },
  image: {
    marginTop:30,
    width: 350,
    height: 250,
    marginBottom: 40,
    borderRadius: 10,

  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    //marginBottom: 10,
    //marginTop:-250,
    marginRight:270,
    color: '#070808',
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
    //marginLeft:-200,
    color: '#000000',
  },
  backButton: {
    position: 'absolute',
    top: 35,
    left: 20,
  },
  editButton: {
    width: 180,
backgroundColor: '#1D3A70', // Updated button background color
padding: 15,
marginTop: 30,
alignSelf: 'center', // Use alignSelf instead of marginLeft and marginRight
borderRadius: 10,

  },
  editButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: 10,
    height: 56,
    borderRadius: 15,
    backgroundColor: "#ffffff",
    width: 350,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5,
  },
  leftContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  text2: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  image2: {
    width: 40,
    height: 40,
    padding: 4,
    borderRadius: 13,
    marginRight: 10,
   
  },
  textbox:{
    flex: 1,
    padding:10,
//marginLeft:-160,
marginTop:10,
    alignItems: "flex-start",
    borderRadius: 10,
    backgroundColor:"#ffffff",
    
    width: 350,
    marginBottom:10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5,
  },
});

export default MyBoarding;
