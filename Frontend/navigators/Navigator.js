import React from "react";
import { StyleSheet} from "react-native";
import jwt_decode from "jwt-decode";

import { UserType } from "../UserContext";
import { useState, useEffect, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";

import TenantNavigator from "./TenantNavigator";
import RestaurantNavigator from "./RestaurantNavigator";
import LandlordNavigator from "./LandlordNavigator";
import Loading from "../screens/Loading";
import TestImageupload from "../screens/TestImageupload";

const Stack = createNativeStackNavigator();

// -------------------- # Main Stack # --------------------
const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>

         {/* ---------- test ---------- */}
      {/* <Stack.Screen
          name="test"
          component={TestImageupload}
          
        /> */}

        {/* ---------- test ---------- */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={UserSelection}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Navigator;
const styles = StyleSheet.create({});


// --------------------  Get the user's role and provide appropriate tab navigation   --------------------
function UserSelection() {
  const { userId, setUserId,userRole,setUserRole } = useContext(UserType);
  const [role, setRole] = useState("default");

  useEffect(() => {
    const fetchUsers = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const urole = await AsyncStorage.getItem("urole");

      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;
      setRole(urole);
      setUserId(userId);
      setUserRole(role);
      console.log("urole -- " + urole);
      console.log("userId -- " + userId);
      console.log("role -- " + role);
    };

    fetchUsers();
  }, [role]);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tabselecter"
        component={
          role === "tenant" ? TenantNavigator
            : role === "restaurant" ? RestaurantNavigator
            : role === "landlord" ? LandlordNavigator
            : role === "default" ? Loading
            : null
        }
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}