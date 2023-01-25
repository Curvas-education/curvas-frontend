import React from 'react';
import Home from "../screens/Home";
import List from '../screens/Question/List';

import { createNativeStackNavigator } from "@react-navigation/native-stack";

const AppStack = createNativeStackNavigator();

const AppRoutes = () => (
    <AppStack.Navigator screenOptions={{
        headerShown: false,
        title: 'Curvas'
      }}>
        <AppStack.Screen name="home" component={Home} />
        <AppStack.Screen name="questionlist" component={List} />
    </AppStack.Navigator>
);

export default AppRoutes;