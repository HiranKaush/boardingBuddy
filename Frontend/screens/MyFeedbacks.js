//import liraries
import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import { UserType } from "../UserContext";

import DropDownPicker from 'react-native-dropdown-picker';

// create a component
const MyFeedbacks = () => {
    const { userId } = useContext(UserType);
    const [bardingData, setBardingData] = useState([]);
    const [open, setOpen] = useState(false);
    const [boarding, setBoarding] = useState(null);
    const [items, setItems] = useState([]);

    const fetchboardingdata = async () => {
        try {
            const response = await fetch(
                `http://192.168.1.13:8000/api/user/getownboardings/${userId}`
            );

            const data = await response.json();

            setBardingData(data);
            const formattedData = data.map(boarding => ({
                label: boarding.name,
                value: boarding.id
            }));
            setItems(formattedData);
        } catch (error) {
            console.log("error retrieving details", error);
        }
    };

    useEffect(() => {
        fetchboardingdata();
    }, []);

    return (
        <View style={styles.container}>
            <Text>MyFeedbacks</Text>

            <DropDownPicker
                open={open}
                value={role}
                items={items}
                setOpen={setOpen}
                setValue={setRole}
                setItems={setItems}
                style={styles.dropdown}
                dropDownContainerStyle={styles.dropdownContainer}
                textStyle={styles.textStyle}
                placeholderTextColor="#a6a6a6"
                placeholder="Type"
            />
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

//make this component available to the app
export default MyFeedbacks;
