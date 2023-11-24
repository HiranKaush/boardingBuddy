import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";


const PremiumIntroPage = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Why go Premium?</Text>
      <Text style={styles.boldText}>Effortlessly Link your account to your Uber Eats or Pick me account.</Text>
      <Text style={styles.boldText}>Schedule your offers and discounts through an easy-to-use interface.</Text>
      <Text style={styles.boldText}>Increase your reach through the app.</Text>
      <TouchableOpacity
        style={styles.itemButton}
        onPress={() => {
          navigation.navigate("PremiumPage")
        }}
      >
        <Text style={styles.itemButtonText}>Proceed</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title:{ 
    fontWeight: 'bold',
    fontSize: 28,
    marginBottom: '15%',
    marginLeft: 20, // Add left margin to all text
    alignContent: 'flex-start', 
    color: '#1DAB87',
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: '15%',
    marginLeft: 20, // Add left margin to all text
    alignContent: 'flex-start',
  },
  normalText: {
    fontSize: 16,
  },
  itemButton: {
    backgroundColor: '#1D3A70',
    width: '70%',
    height: 50,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  itemButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default PremiumIntroPage;
