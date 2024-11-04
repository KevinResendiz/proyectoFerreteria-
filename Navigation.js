import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";

//screens

import Inventario from "./screens/Inventario";
import Venta from "./screens/Venta";
<<<<<<< HEAD
import Usuarios from "./screens/Usuarios";
import Login from "./screens/Login";
=======
import Registro from "./screens/Registro";
import Usuarios from "./screens/Usuarios";
import Login from "./screens/Login";
import Tickets from "./screens/Tickets";
>>>>>>> upstream/main



import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const HomeStackNavigator = createNativeStackNavigator();




const Tab = createBottomTabNavigator();

function MyTabs() {
return (
    <Tab.Navigator
        initialRouteName="Login"
        screenOptions= {{
            tabBarActiveTintColor: 'purple',
        }}
    >
        <Tab.Screen 
            name="Login" 
            component={Login} 
            options={{
                tabBarLabel: 'Login',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="numeric-1" color={color} size={30} />
                ),
                
            }}
        />
<<<<<<< HEAD
         <Tab.Screen 
                name="Inventario" 
                component={Inventario} 
                options={{
                    tabBarLabel: 'Inventario',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="numeric-2" color={color} size={30} />
                    ),
                }}
            />
=======
        <Tab.Screen 
            name="Inventario" 
            component={Inventario}
            options={{
                tabBarLabel: 'Inventario',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="numeric-2" color={color} size={30} />
                ),
            }}
        />
>>>>>>> upstream/main
        <Tab.Screen 
            name="Venta" 
            component={Venta}
            options={{
                tabBarLabel: 'Venta',
                tabBarIcon: ({ color, size }) => (
                    
                    <MaterialCommunityIcons  name="numeric-3" color={color} size={30} />
                ),
                
            }}
        />
        <Tab.Screen 
<<<<<<< HEAD
        name="Usuario" 
        component={Usuarios}
        options={{
            tabBarLabel: 'Usuario',
            tabBarIcon: ({ color, size }) => (
                
                <MaterialCommunityIcons  name="numeric-4" color={color} size={30} />
            ),
            
        }}
    />
=======
            name="Usuario" 
            component={Usuarios}
            options={{
                tabBarLabel: 'Usuario',
                tabBarIcon: ({ color, size }) => (
                    
                    <MaterialCommunityIcons  name="numeric-4" color={color} size={30} />
                ),
                
            }}
        />
        <Tab.Screen 
            name="Tickets" 
            component={Tickets}
            options={{
                tabBarLabel: 'Tickets',
                tabBarIcon: ({ color, size }) => (
                    
                    <MaterialCommunityIcons  name="numeric-5" color={color} size={30} />
                ),
                
            }}
        />
>>>>>>> upstream/main
    </Tab.Navigator>
    );
}


export default function Navigation() {
return (
    <NavigationContainer>
    <MyTabs />
    </NavigationContainer>
);
}