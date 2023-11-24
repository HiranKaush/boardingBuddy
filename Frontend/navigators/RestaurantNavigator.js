//import liraries
import { StyleSheet, Image} from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { useTheme } from "react-native-paper";

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

 import DeleteAccount from "../screens/DeleteAccount";
import ChangePassword from "../screens/ChangePassword";

import Profile from "../screens/Profile";
import AccountInfo from "../screens/AccountInfo";

import EditAccountInfo from "../screens/EditAccountInfo";

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

function TabNavigatorRestaurant() {
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
          name="Premium"
          component={PremiumTabNavigations}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Image
              source={require("../assets/favorite.png")}
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

// -- Restaurant foodpalce
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
  

  // -- Restaurant profile
  function ProfileTabNavigations() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="merchantProfile"
          component={merchantProfile}
          options={{ title: "merchantProfile" }}
        />
         <Stack.Screen
          name="Menu"
          component={Menu}
          options={{ title: "Menu" }}
        />
        <Stack.Screen
          name="AddItemToMenu"
          component={AddItemToMenu}
          options={{ title: "AddItemToMenu" }}
        />
        <Stack.Screen
          name="PremiumIntroPage"
          component={PremiumIntroPage}
          options={{ title: "PremiumIntroPage" }}
        />
        <Stack.Screen
          name="EditStoreImage"
          component={EditStoreImage}
          options={{ title: "EditStoreImage" }}
        />
        <Stack.Screen
          name="CreateStoreForm"
          component={CreateStoreForm}
          options={{ title: "CreateStoreForm" }}
        />
        <Stack.Screen
          name="StoreReviews"
          component={StoreReviews}
          options={{ title: "StoreReviews" }}
        />
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
        name="DeleteAccount"
        component={DeleteAccount}
        options={{ title: "Delete My Account"}}
      />
       <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{ title: ""}}
      />
       
      </Stack.Navigator>
    );
  }

  function PremiumTabNavigations() {
    return (
      <Stack.Navigator>
         <Stack.Screen
          name="PremiumIntroPage"
          component={PremiumIntroPage}
          options={{ title: "PremiumIntroPage" }}
        />
        <Stack.Screen
          name="PremiumPage"
          component={PremiumPage}
          options={{ title: "PremiumPage" }}
        />
        
      </Stack.Navigator>
    );
  }
  
// create a component
const RestaurantNavigator = () => {
    return (
       <TabNavigatorRestaurant/>
    );
};

// define your styles
const styles = StyleSheet.create({
   
});

//make this component available to the app
export default RestaurantNavigator;
