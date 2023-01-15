import React from 'react';
import SignIn from "../screens/SignIn";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

const AuthStack = createNativeStackNavigator();

const AuthRoutes = () => (
    <AuthStack.Navigator screenOptions={{
        headerShown: false,
        title: 'Login'
      }}>
        <AuthStack.Screen name="SignIn" component={SignIn}/>
    </AuthStack.Navigator>
);

export default AuthRoutes;