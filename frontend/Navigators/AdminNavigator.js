import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import Requests from "../Screens/Admin/Requests"
import Documents from "../Screens/Admin/Documents"
import DocumentForm from "../Screens/Admin/DocumentForm"



const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="Documents"
                component={Documents}
                options={{
                    title: "Documents"
                }}
            />
        
            <Stack.Screen name="Requests" component={Requests} />
            <Stack.Screen name="DocumentForm" component={DocumentForm} />
        </Stack.Navigator>
    )
}
export default function AdminNavigator() {
    return <MyStack />
}