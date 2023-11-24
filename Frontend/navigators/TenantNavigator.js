//import liraries
import { StyleSheet, Image} from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { useTheme } from "react-native-paper";

import FriendsScreen from "../screens/FriendsScreen";
import ChatsScreen from "../screens/ChatsScreen";
import ChatMessagesScreen from "../screens/ChatMessagesScreen";
import FoodPlaces from "../screens/FoodPlaces";
import Profile from "../screens/Profile";
import AccountInfo from "../screens/AccountInfo";
import GetAllBoardingsTenant from "../screens/GetAllBoardingsTenant";
import ViewBoarding from "../screens/View_LL_Boarding";
import EditAccountInfo from "../screens/EditAccountInfo";
import MyBoarding from "../screens/MyBoarding";
import FeedBack from "../screens/FeedBack";
import BoardingFeedBack from "../screens/BoardingFeedBack"
import Tenantinfo from "../screens/Tenantinfo";
import TenantProfile from "../screens/TenantProfile";

import DeleteAccount from "../screens/DeleteAccount";
import ChangePassword from "../screens/ChangePassword";
import MyFeedbacks from "../screens/MyFeedbacks";

import CreateStoreForm from "../screens/Merchant/CreateStoreScreen";
 import AddItemToMenu from "../screens/Merchant/AddMenuItem";
 import merchantProfile from "../screens/Merchant/MerchantProfile";
 import Menu from "../screens/Merchant/Menu";
 import PremiumPage from "../screens/Merchant/PremiumPage";
 import PremiumIntroPage from "../screens/Merchant/PremiumIntroPage";
 import Store from "../screens/Merchant/Stores";
 import StoreDetails from "../screens/Merchant/StoreDetails";
 import EditStoreImage from "../screens/Merchant/EditStoreProfileImage";
 import StoreReviews from '../screens/Merchant/StoreReviews'

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

function TabNavigatorTenant() {
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
          name="Boardings"
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
          name="FoodPlaces"
          component={FoodPlacesTabNavigations}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Image
                source={require("../assets/food.png")}
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
  
// -- Tenant boarding
function BoardingTabNavigations() {
    return (
      <Stack.Navigator>
        {/* <Stack.Screen
          name="Tenant_Boarding"
          component={HomeScreen}
          options={{ title: "Boardings" }}
        />
        <Stack.Screen
          name="Messages1"
          component={ChatMessagesScreen}
          options={{ presentation: "modal" }}
        /> */}
        <Stack.Screen
          name="Tenant_Boarding"
          component={GetAllBoardingsTenant}
          options={{ title: "Boardings" }}
        />
         <Stack.Screen
          name="view_Boarding"
          component={ViewBoarding}
          options={{ title: "Boardings" }}
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
      </Stack.Navigator>
    );
  }

// -- Tenant foodplaces
  function FoodPlacesTabNavigations() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Stores"
          component={Store}
          options={{ title: "Stores" }}
        />
        <Stack.Screen
          name="StoreDetails"
          component={StoreDetails}
          options={{ title: "StoreDetails" }}  
        />
        <Stack.Screen
          name="Reviews"
          component={CreateStoreForm}
          options={{ title: "CreateStore" }}
          />
           <Stack.Screen
          name="StoreReviews"
          component={StoreReviews}
          options={{ title: "StoreReviews" }}
        />
      </Stack.Navigator>
    );
  }
  
// -- Tenant chat
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

// -- Tenant profile
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
          options={{ title: "AccountInfo", presentation: "modal" }}
        />
         <Stack.Screen
          name="editaccountinfo"
          component={EditAccountInfo}
          options={{ title: "Edit Account Info",presentation: "modal" }}
        />
         <Stack.Screen
          name="myboarding_tenant"
          component={MyBoarding}
          options={{ title: "My Boarding"}}
        />
         <Stack.Screen
        name="FeedBack"
        component={FeedBack}
        options={{ title: "Give Review"}}
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
      <Stack.Screen
        name="DeleteAccount"
        component={DeleteAccount}
        options={{ title: "Delete My Account"}}
      />
       <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{ title: ""}}
      />
       <Stack.Screen
        name="Tenant_MyFeedbacks"
        component={MyFeedbacks}
        options={{ title: "My Feedbacks"}}
      />
      </Stack.Navigator>
    );
  }
  
// create a component
const TenantNavigator = () => {
    return (
      <TabNavigatorTenant/>
    );
};

// define your styles
const styles = StyleSheet.create({
});

//make this component available to the app
export default TenantNavigator;
