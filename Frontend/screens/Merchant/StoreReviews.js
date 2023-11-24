import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { View, Text, SafeAreaView, StyleSheet, Image, ScrollView } from 'react-native';
import { UserType } from "../../UserContext";

const StoreReviews = () => {
    const [reviews, setReviews] = useState([]);
    const { userId, setUserId } = useContext(UserType);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://192.168.1.13:8000/api/store/getStore/${userId}`);
                setReviews(response.data.review);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.container}>
            <View>
                {reviews.map((review, index) => (
                    <View key={index} style={styles.reviewContainer}>
                        <Image style={styles.smallImage} source={require('../../assets/user.png')}></Image>
                        <Text style={styles.reviewName}>{review.name}</Text>
                        <Text style={styles.reviewMessage}>{review.message}</Text>
                    </View>
                ))}
            </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 20, // Add top margin to push content down from the top of the screen
    },
    reviewContainer: {
        borderColor: '#1DAB87', // Add a green border
        borderWidth: 1, // Set the border width
        padding: 10, // Add padding to separate content from the border
    },
    reviewName: {
        fontWeight: 'bold',
        fontSize: 16,
        marginStart: 10,
    },
    reviewMessage: {
        fontSize: 14,
        margin : 10,
    },
    smallImage: {
        width: 50,
        height: 50,
        borderRadius: 18,
        marginBottom: 10,
        justifyContent: 'center',
      },
});

export default StoreReviews;
