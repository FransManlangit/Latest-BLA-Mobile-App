import React, { useState } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar'
import Animated, { FadeIn, FadeInDown, FadeInUp, FadeOut } from 'react-native-reanimated';


import axios from 'axios';
import baseURL from '../../assets/common/baseUrl';
import Toast from "react-native-toast-message";




const Register = (props) => {

const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [phone, setPhone] = useState("");
const [error, setError] = useState("");

const navigation = useNavigation()

const register = () => {

    if (email === "" || name === "" || phone === "" || password === "") {
        setError("Please fill in the form correctly");
    }

    let user = {
        name: name,
        email: email,
        password: password,
        phone: phone,
        isAdmin: false,

    }

    axios
    .post(`${baseURL}users/register`, user)
    .then((res) => {
        if (res.status == 200) {
            Toast.show({
               topOffset: 60,
               type: "success",
               text1: "Registration Succeeded",
               text2: "Please Login into your account",
            });
            setTimeout(() => {
                navigation.navigate("Login");
            },500);
        }
    })
    .catch((error) => {
        Toast.show({
            position: 'bottom',
            bottomOffset: 20,
            type: "error",
            text1: "Something went wrong",
            text2: "Please try again",
        });
    });    
}
  return (
    <View className="bg-white h-full w-full">
        <StatusBar style="light"/>
        <Image className="h-full w-full absolute" source={require('../../assets/background.png')}/>
      
      {/*title and form*/}
     <View className="h-full w-full flex justify-around pt-52">
        {/*title*/}
     <View className="flex items-center">
             <Animated.Text entering={FadeInUp.duration(1000).springify()} className="text-yellow-900 font-bold tracking-wider text-6xl">
                Register
            </Animated.Text>
        </View>

        {/*form*/}
      <View style={{ alignItems: 'center', marginHorizontal: 20, marginVertical:35 }}>
      <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()}  className="bg-black/5 p-4 rounded-2xl w-full">
            <TextInput placeholder='Name' name={"name"} id={"name"} onChangeText={(text) => setName(text)}
            placeholderTextColor={'black'} />
        </Animated.View>
        <Animated.View entering={FadeInDown.duration(400).springify()} className="bg-black/5 p-4 rounded-2xl w-full">
            <TextInput placeholder='Email' name={"email"} id={"email"} onChangeText={(text) => setEmail(text.toLowerCase())}
             placeholderTextColor={'black'} />
        </Animated.View>
      
        <Animated.View entering={FadeInDown.delay(600).duration(1000).springify()} className="bg-black/5 p-4 rounded-2xl w-full">
            <TextInput placeholder='Password'  name={"password"} id={"password"}  
            placeholderTextColor={'black'} secureTextEntry={true} onChangeText={(text) => setPassword(text)}/>
        </Animated.View>
        <Animated.View entering={FadeInDown.delay(800).duration(1000).springify()} className="bg-black/5 p-4 rounded-2xl w-full">
            <TextInput placeholder='Phone Number' name={"phone"} id={"phone"} keyboardType={"numeric"} onChangeText={(text) => setPhone(text)}
            placeholderTextColor={'black'} />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(1000).duration(1000).springify()} className="w-full">
            <TouchableOpacity 
            large primary onPress={() => register()}
            className="w-full bg-yellow-900 p-3 rouded-2xl mb-3">
                <Text  className="tex-xl font-bold text-white text-center">Register</Text>
            </TouchableOpacity>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(1000).duration(1000).springify()} className="flex-row justify-center">
            <Text>Already have an Account?</Text>
            <TouchableOpacity onPress={()=> navigation.push('Login')}>
                <Text className="text-yellow-900">Login</Text>
            </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
</View>
  

)};

export default Register;