import {
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
  Image
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = () => {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  // useEffect(() => {
  //   const checkLoginStatus = async () => {
  //     try {
  //       const token = await AsyncStorage.getItem("authToken");
  //       const role = await AsyncStorage.getItem("urole");
  //       console.log("this role" + role);

  //       if (token) {
  //         navigation.replace("Home");
  //       } else {
  //         // token not found , show the login screen itself
  //       }
  //     } catch (error) {
  //       console.log("error", error);
  //     }
  //   };

  //   checkLoginStatus();
  // }, []);
  const handleLogin = () => {
    const user = {
      username: username,
      password: password,
    };

    axios
      .post("http://192.168.1.13:8000/api/user/login", user)
      .then((response) => {
        //console.log(response);
        const token = response.data.token;
        const role = response.data.u_role;

        AsyncStorage.setItem("authToken", token);
        AsyncStorage.setItem("urole", role);
        console.log("set AsyncStorage role -- ", role);

        navigation.replace("Home");
      })
      .catch((error) => {
        Alert.alert("Login Error", "Invalid username or password");
        console.log("Login Error", error);
      });
  };
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView>
        <View style={styles.titleContainer}>
        <Image
                source={require("../assets/boardingbuddylogohorizontal.png")}
                style={{ width: 150, height: 150 }}
              />

          <Text style={styles.subTitleText}>Welcome back, Sign in to your account</Text>
        </View>

        <View style={{ marginTop: 50 }}>
          <View>
            

            <TextInput
              value={username}
              placeholderTextColor="#a6a6a6"
              onChangeText={(text) => setusername(text)}
              style={styles.input}
              placeholder="Username"
            />
          </View>

          <View style={{ marginTop: 10 }}>
           

            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              style={styles.input}
              placeholderTextColor="#a6a6a6"
              placeholder="Password"
            />
          </View>

          <Pressable onPress={handleLogin} style={styles.button}>
            <Text style={styles.buttonText}>Sign In</Text>
          </Pressable>

          <Pressable onPress={() => navigation.navigate('Register')} style={{ marginTop: 40 }}>
            <Text style={styles.signUpText}>Don't have an account? <Text style={{ color: '#1DAB87' }}>Sign Up</Text></Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'center',
  },
  titleContainer: {
    marginTop: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    color: '#4A55A2',
    fontSize: 17,
    fontWeight: '600',
  },
  subTitleText: {
    fontSize: 17,
    fontWeight: '600',
    marginTop: 15,
  },
  inputLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: 'gray',
  },
  input: {
    fontSize: 18,
    
    marginVertical: 10,
    width: 320,
    height: 50,
    padding: 10, // Add padding to the input field
    borderRadius: 10, // Add rounded corners
    color: 'black',
    backgroundColor: '#ffffff', // Add a light background color
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1.5,
    elevation: 5,
  },
  
  button: {
    width: 200,
    backgroundColor: '#1D3A70', // Updated button background color
    padding: 15,
    marginTop: 50,
    alignSelf: 'center', // Use alignSelf instead of marginLeft and marginRight
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  signUpText: {
    textAlign: 'center',
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold'
  },
});
