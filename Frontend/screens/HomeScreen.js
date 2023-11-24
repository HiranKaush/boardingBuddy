import { StyleSheet, Text, View,ScrollView } from "react-native";
import React, { useLayoutEffect, useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { UserType } from "../UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import axios from "axios";
import User from "../components/User";
const HomeScreen = () => {
  const navigation = useNavigation();
  const { userId, setUserId,userRole,setUserRole } = useContext(UserType);
  const [users, setUsers] = useState([]);
  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerTitle: "",
  //     headerLeft: () => (
  //       <Text style={{ fontSize: 16, fontWeight: "bold" }}>Swift Chat</Text>
  //     ),
  //     headerRight: () => (
  //       <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
  //         <Ionicons onPress={() => navigation.navigate("Chats")} name="chatbox-ellipses-outline" size={24} color="black" />
  //         <MaterialIcons
  //           onPress={() => navigation.navigate("Friends")}
  //           name="people-outline"
  //           size={24}
  //           color="black"
  //         />
  //       </View>
  //     ),
  //   });
  // }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const role = await AsyncStorage.getItem("urole");

      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
      setUserRole(role);
      console.log("user role ----- ", userRole);

      axios
        .get(`http://192.168.1.13:8000/api/user/users/${userId}`)
        .then((response) => {
          setUsers(response.data);
        })
        .catch((error) => {
          console.log("error retrieving users", error);

        });
    };

    fetchUsers();
  }, []);

  //console.log("users", users);
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor:"#ffffff"}}>
      <View style={{ padding: 10 , backgroundColor:"#ffffff"}}>
        {users.map((item, index) => (
          <User key={index} item={item} />
        ))}
      </View>
    </ScrollView >
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
