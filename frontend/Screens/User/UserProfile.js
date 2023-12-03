import React, { useContext, useState, useEffect } from 'react';
import { View, Text, ScrollView, Button, StyleSheet } from 'react-native';
import { Container } from "native-base"
import { useNavigation } from "@react-navigation/native"
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios';
import baseURL from "../../assets/common/baseUrl"
import AuthGlobal from "../../Context/Store/AuthGlobal"
import { logoutUser } from "../../Context/Actions/Auth.actions"

const UserProfile = () => {
    const context = useContext(AuthGlobal)
    const [userProfile, setUserProfile] = useState(null)
    const navigation = useNavigation()

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const jwt = await AsyncStorage.getItem("jwt");
                if (!jwt) {
                    // If JWT token is not available, redirect to the login screen.
                    navigation.navigate("Login");
                    return;
                }

                const response = await axios.get(
                    `${baseURL}users/${context.stateUser.user.userId}`,
                    {
                        headers: { Authorization: `Bearer ${jwt}` },
                    }
                );

                setUserProfile(response.data);
            } catch (error) {
                console.error("Error fetching user profile:", error);
                // You can show a user-friendly error message here.
            }
        };

        fetchUserProfile();
    }, [context.stateUser.user.userId, navigation]);

    const handleSignOut = async () => {
        // Perform sign-out actions here, such as clearing the JWT token and user data.
        await AsyncStorage.removeItem("jwt");
        logoutUser(context.dispatch);
        // Redirect to the login screen or perform other necessary actions.
        navigation.navigate("Login");
    };

    return (
        <Container style={styles.container}>
            <ScrollView contentContainerStyle={styles.subContainer}>
                {userProfile ? (
                    <Text style={{ fontSize: 30 }}>{userProfile.name}</Text>
                ) : (
                    <Text>Loading...</Text>
                )}
                <View style={{ marginTop: 20 }}>
                    <Text style={{ margin: 10 }}>
                        Email: {userProfile ? userProfile.email : ""}
                    </Text>
                    <Text style={{ margin: 10 }}>
                        Phone: {userProfile ? userProfile.phone : ""}
                    </Text>
                </View>
                <View style={{ marginTop: 80 }}>
                    <Button title="Sign Out" onPress={handleSignOut} />
                </View>
            </ScrollView>
        </Container>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center"
    },
    subContainer: {
        alignItems: "center",
        marginTop: 60
    }
});

export default UserProfile;
