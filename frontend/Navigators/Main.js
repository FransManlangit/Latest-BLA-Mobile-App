import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Icon from "react-native-vector-icons/FontAwesome";
import AuthGlobal from "../Context/Store/AuthGlobal";

import CartIcon from "../Shared/CartIcon";
import UserNavigator from "./UserNavigator";
import HomeNavigator from "./HomeNavigator";
import CartNavigator from "./CartNavigator";
import AdminNavigator from "./AdminNavigator";

const Tab = createBottomTabNavigator();

const Main = () => {
  const context = useContext(AuthGlobal);
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#e91e63",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => {
            return (
              <Icon
                name="home"
                style={{ position: "relative" }}
                color={color}
                size={30}
              />
            );
          },
        }}
      />

      <Tab.Screen
        name="Cart"
        component={CartNavigator}
        options={{
          tabBarIcon: ({ color }) => {
            return (
              <Icon
                name="shopping-cart"
                style={{ position: "relative" }}
                color={color}
                size={30}
              />
            );
          },
        }}
      />

      <Tab.Screen
        name="User"
        component={UserNavigator}
        options={{
          tabBarIcon: ({ color }) => {
            return (
              <Icon
                name="user"
                style={{ position: "relative" }}
                color={color}
                size={30}
              />
            );
          },
        }}
      />

      <Tab.Screen
        name="Admin"
        component={AdminNavigator}
        options={{
          tabBarIcon: ({ color }) => {
            return (
              <Icon
                name="cog"
                style={{ position: "relative" }}
                color={color}
                size={30}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default Main;