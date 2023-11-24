import React, { useState, useEffect,useContext } from 'react';
import { View, Text, StyleSheet, Image,Pressable,TouchableOpacity,ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { UserType } from "../UserContext";

const ViewBoarding = () => {
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
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const acceptRequest = async (friendRequestId) => {
    try {
      const response = await fetch(
        "http://192.168.1.13:8000/api/user/friend-request/accept",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            senderId: friendRequestId,
            recepientId: userId,
          }),
        }
      );

      if (response.ok) {
        // navigation.navigate("Chats");
        navigation.navigate("Messages1", {
          recepientId: friendRequestId,
        })
      }
    } catch (err) {
      console.log("error acceptin the friend request", err);
    }
  };

  const handleFeedbackPress2 = () => {
    // Pass boardingId as a parameter when navigating to the FeedBack component
    navigation.navigate("BoardingFeedBack", { boardingId: boarding });
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
      {/* <Ionicons
        name="ios-arrow-back"
        size={32}
        color="black"
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      /> */}
     
      <Image source={{ uri: boardingg.imgURL }} style={styles.image} />
     


      <TouchableOpacity style={styles.row} onPress={() => handleFeedbackPress2()}>
        <View style={styles.leftContent}>
          <View style={styles.image2}>
            <Image
              source={require("../assets/star.png")} // Replace with your image source
              style={{ width: 30, height: 30 }}
            />
          </View>
          <Text style={styles.text2}>Ratings & reviews</Text>
        </View>
        <Ionicons style={styles.icon} name="chevron-forward-outline" />
      </TouchableOpacity>


      {/* <Button title="ALL Feedback" onPress={handleFeedbackPress2} style={styles.allRequestsButton} /> */}

      {userRole === "tenant" ? (
        
        //   <Pressable
        //   onPress={() => acceptRequest(boardingg.userId)}
        //   style={{ backgroundColor: "#0066b2", padding: 10, borderRadius: 6 }}
        // >
        //   <Text style={{ textAlign: "center", color: "white" }}>Chat with me</Text>
        // </Pressable>
        <TouchableOpacity style={styles.row} onPress={() => acceptRequest(boardingg.userId)}>
        <View style={styles.leftContent}>
          <View style={styles.image2}>
            <Image
              source={require("../assets/chat2.png")} // Replace with your image source
              style={{ width: 30, height: 30 }}
            />
          </View>
          <Text style={styles.text2}>Chat with me</Text>
        </View>
        <Ionicons style={styles.icon} name="chevron-forward-outline" />
      </TouchableOpacity>

        
         
        ):userRole === "landlord" ? (
        <TouchableOpacity style={styles.row} onPress={() => handletenants()}>
        <View style={styles.leftContent}>
          <View style={styles.image2}>
            <Image
              source={require("../assets/tenants.png")} // Replace with your image source
              style={{ width: 30, height: 30 }}
            />
          </View>
          <Text style={styles.text2}>Other tenants</Text>
        </View>
        <Ionicons style={styles.icon} name="chevron-forward-outline" />
      </TouchableOpacity>
        ):null}
      <View style={styles.textbox}>
      <Text style={styles.text}>Location: {boardingg.boardingLocation}</Text>
      <Text style={styles.text}>Gender: {boardingg.gender}</Text>
      <Text style={styles.text}>Price: Rs {boardingg.price}</Text>
      <Text style={styles.text}>Description: {boardingg.description}</Text>
     
      </View>
     
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    alignItems: 'center',
    backgroundColor: '#ffffff',
    marginBottom:150,
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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 5,
  },
  image: {
    marginTop:30,
    height: 250,
    marginBottom: 40,
    borderRadius: 10,
    backgroundColor:"#F9FAFB",
    borderWidth: 1,
    borderColor:'#000000',
    width: 350,
    
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
    // marginLeft:-200,
    color: '#000000',
  },
  backButton: {
    position: 'absolute',
    top: 35,
    left: 20,
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
    shadowRadius: 2,
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
});

export default ViewBoarding;
