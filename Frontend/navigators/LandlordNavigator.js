//import liraries
import { StyleSheet, Image} from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { useTheme } from "react-native-paper";

import HomeScreen from "../screens/HomeScreen";
import FriendsScreen from "../screens/FriendsScreen";
import ChatsScreen from "../screens/ChatsScreen";
import ChatMessagesScreen from "../screens/ChatMessagesScreen";

import Profile from "../screens/Profile";
import AccountInfo from "../screens/AccountInfo";

import LL_boardings from "../screens/LL-boardings";
import Get_LL_boardings from "../screens/Get_LL_Boardings";
import Update_LL_Boardings from "../screens/Update_LL_boardings";
import ViewBoarding from "../screens/View_LL_Boarding";
import MakePayment from "../screens/Make_Payment";
import CardDetails from "../screens/LL_Card_Details";
import EditAccountInfo from "../screens/EditAccountInfo";
import MyFeedbacks from "../screens/MyFeedbacks";
import BoardingFeedBack from "../screens/BoardingFeedBack";
import Tenantinfo from "../screens/Tenantinfo";
import TenantProfile from "../screens/TenantProfile";
import ChangePassword from "../screens/ChangePassword";
import DeleteAccount from "../screens/DeleteAccount";

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();


function TabNavigatorLandlord() {
    const theme = useTheme();
    theme.colors.secondaryContainer = "#1DAB87";
    return (
      <Tab.Navigator
        activeColor="#1DAB87"
        inactiveColor="#ffffff"
        activeBackgroundColor="#ffffff"
        barStyle={{
          backgroundColor: "#1D3A70",
  
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          position: "absolute",
          overflow: "hidden",
          left: 0,
          bottom: 0,
          right: 0,
          paddingTop: 5,
        }}
      >
        <Tab.Screen
          name="My Boarding"
          component={BoardingTabNavigations}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Image
                source={require("../assets/house.png")}
                style={{ width: 25, height: 25 }}
              />
            ),
          }}
        />
       
        <Tab.Screen
          name="Chats"
          component={ChatTabNavigations}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Image
                source={require("../assets/chat.png")}
                style={{ width: 25, height: 25 }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileTabNavigations}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Image
                source={require("../assets/user.png")}
                style={{ width: 25, height: 25 }}
              />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }

// -- Landlord boarding
  function BoardingTabNavigations() {
    return (
      <Stack.Navigator>
       <Stack.Screen
        name="Get_LL_boardings"
        component={Get_LL_boardings}
        options={{ title: "My Boardings"  }}
      />
       <Stack.Screen
        name="LL_boardings"
        component={LL_boardings}
        options={{ title: "Add a new Boarding" }}
      />
      <Stack.Screen
        name="ViewBoarding"
        component={ViewBoarding}
        options={{ title: "My Boardings" }}
      />
      <Stack.Screen
        name="Update_LL_Boardings"
        component={Update_LL_Boardings}
        options={{ title: "Update Boarding" }}
      />
       <Stack.Screen
        name="CardDetails"
        component={CardDetails}
        options={{ headerShown: false }}
      />
      <Stack.Screen
      name="MakePayment"
      component={MakePayment}
      options={{ headerShown: false }}
    />
     <Stack.Screen
          name="Messages1"
          component={ChatMessagesScreen}
          options={{ presentation: "modal" }}
        />
        <Stack.Screen
        name="BoardingFeedBack"
        component={BoardingFeedBack}
        options={{ title: "Boarding FeedBacks" }}
      />
       <Stack.Screen
        name="Tenantinfo"
        component={Tenantinfo}
        options={{ title: "Tenant details"}}
      />
      <Stack.Screen
        name="TenantProfile"
        component={TenantProfile}
        options={{ title: "Tenant details"}}
        />
      </Stack.Navigator>
    );
  }

  
// -- Landlord chat
  function ChatTabNavigations() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Tenant_Chat"
          component={ChatsScreen}
          options={{ title: "Chats" }}
        />
        <Stack.Screen
          name="Messages2"
          component={ChatMessagesScreen}
          options={{ presentation: "modal" }}
        />
      </Stack.Navigator>
    );
  }

  // -- Landlord profile
  function ProfileTabNavigations() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Tenant_Profile"
          component={Profile}
          options={{ title: "Profile" }}
        />
         <Stack.Screen
          name="accountinfo"
          component={AccountInfo}
          options={{ title: "AccountInfo",presentation: "modal" }}
        />
         <Stack.Screen
          name="editaccountinfo"
          component={EditAccountInfo}
          options={{ title: "Edit Account Info",presentation: "modal" }}
        />
        <Stack.Screen
        name="Tenant_MyFeedbacks"
        component={MyFeedbacks}
        options={{ title: "My Feedbacks"}}
      />
       <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{ title: ""}}
      />
      <Stack.Screen
        name="DeleteAccount"
        component={DeleteAccount}
        options={{ title: "Delete My Account"}}
      />
      
     
      </Stack.Navigator>
    );
  }
  

// create a component
const LandlordNavigator = () => {
    return (
       <TabNavigatorLandlord/>
    );
};

// define your styles
const styles = StyleSheet.create({});

//make this component available to the app
export default LandlordNavigator;
