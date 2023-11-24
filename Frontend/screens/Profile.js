//import liraries
import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { UserType } from "../UserContext";

import { Ionicons } from "@expo/vector-icons";

// create a component
const Profile = () => {
  const { userId, setUserId, userRole, setUserRole } = useContext(UserType);
  const [recepientData, setRecepientData] = useState();

  const navigation = useNavigation();

  const handleLogout = () => {
    //setUserId(null);
    setUserRole(null);
    AsyncStorage.clear();
    navigation.navigate("Login");
  };

  const fetchRecepientData = async () => {
    try {
      const response = await fetch(
        `http://192.168.1.13:8000/api/user/user/${userId}`
      );

      const data = await response.json();
      setRecepientData(data);
    } catch (error) {
      console.log("error retrieving details", error);
    }
  };

  useEffect(() => {
    fetchRecepientData();
    //console.log("message fetched")
  });

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: "#ffffff" }}
    >
      <View style={styles.container}>
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
          source={{ uri: recepientData?.image }}
        />
        <Text
          style={{
            marginTop: 10,
            fontSize: 20,
            fontWeight: "bold",
            color: "#1D3A70",
          }}
        >
          {recepientData?.name}
        </Text>

        <Pressable onPress={handleLogout} style={styles.button}>
          <Text style={styles.buttonText}>Logout</Text>
        </Pressable>

        <TouchableOpacity
          style={styles.row}
          onPress={() =>
            navigation.navigate("accountinfo", {
              recepientinfo: recepientData,
            })
          }
        >
          <View style={styles.leftContent}>
            <View style={styles.image}>
              <Image
                source={require("../assets/profile.png")} // Replace with your image source
                style={{ width: 30, height: 30 }}
              />
            </View>
            <Text style={styles.text}>Account Info</Text>
          </View>
          <Ionicons style={styles.icon} name="chevron-forward-outline" />
        </TouchableOpacity>

        {userRole === "tenant" ? (
          <TouchableOpacity
            style={styles.row}
            onPress={() => {
              navigation.navigate("myboarding_tenant", {
                boarding: recepientData?.myboarding,
              });
            }}
          >
            <View style={styles.leftContent}>
              <View style={styles.image}>
                <Image
                  source={require("../assets/home.png")} // Replace with your image source
                  style={{ width: 30, height: 30 }}
                />
              </View>
              <Text style={styles.text}>My boarding</Text>
            </View>
            <Ionicons style={styles.icon} name="chevron-forward-outline" />
          </TouchableOpacity>
        ) : null}

        {/* <TouchableOpacity style={styles.row} onPress={() => {navigation.navigate('Tenant_MyFeedbacks')}}>
          <View style={styles.leftContent}>
            <View style={styles.image}>
              <Image
                source={require("../assets/chat2.png")} // Replace with your image source
                style={{ width: 30, height: 30 }}
              />
            </View>
            <Text style={styles.text}>My Feedbacks</Text>
          </View>
          <Ionicons style={styles.icon} name="chevron-forward-outline" />
        </TouchableOpacity> */}

       
        <TouchableOpacity style={styles.row} onPress={() => {navigation.navigate('ChangePassword')}}>
          <View style={styles.leftContent}>
            <View style={styles.image}>
              <Image
                source={require("../assets/key.png")} // Replace with your image source
                style={{ width: 30, height: 30 }}
              />
            </View>
            <Text style={styles.text}>Change Password</Text>
          </View>
          <Ionicons style={styles.icon} name="chevron-forward-outline" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.row} onPress={() => {navigation.navigate('DeleteAccount')}}>
          <View style={styles.leftContent}>
            <View style={styles.image}>
              <Image
                source={require("../assets/delete.png")} // Replace with your image source
                style={{ width: 30, height: 30 }}
              />
            </View>
            <Text style={styles.text}>Delete My Account</Text>
          </View>
          <Ionicons style={styles.icon} name="chevron-forward-outline" />
        </TouchableOpacity>
       

        
      </View>
    </ScrollView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#ffffff",
    marginBottom: 200,
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
    // borderWidth: 1,
    width: 350,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1.5,
    elevation: 5,
  },
  leftContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 40,
    height: 40,
    padding: 4,
    borderRadius: 13,
    marginRight: 10,
    
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
  icon: {
    fontSize: 25,
    marginLeft: "auto",
  },
  button: {
    width: 150,
    backgroundColor: "#1D3A70", // Updated button background color
    padding: 15,
    marginTop: 20,
    marginBottom:20,
    alignSelf: "center", // Use alignSelf instead of marginLeft and marginRight
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  line: {
    height: 1,
    width: "90%", // Adjust the width as needed
    backgroundColor: "#1DAB87",
    marginTop: 10,
    marginBottom: 20,
  },
});

//make this component available to the app
export default Profile;
