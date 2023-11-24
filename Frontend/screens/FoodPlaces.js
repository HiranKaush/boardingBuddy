//import liraries
import React, { useState, useEffect, useContext  } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { UserType } from "../UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";

// create a component
const FoodPlaces = () => {
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
    return (
        <View style={styles.container}>
            <Text>FoodPlaces</Text>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
});

//make this component available to the app
export default FoodPlaces;
