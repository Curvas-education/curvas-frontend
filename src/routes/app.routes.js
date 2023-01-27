import React from 'react';
import Home from "../screens/Home";
import QuestionList from '../screens/Question/List';
import QuestionView from '../screens/Question/View';

import { createNativeStackNavigator } from "@react-navigation/native-stack";

const AppStack = createNativeStackNavigator();

const AppRoutes = () => (
    <AppStack.Navigator screenOptions={{
        headerShown: false,
        title: 'Curvas'
      }}>
        <AppStack.Screen name="home" component={Home} />
        <AppStack.Screen name="questionlist" component={QuestionList} />
        <AppStack.Screen name="questionview" component={QuestionView} />
    </AppStack.Navigator>
);

export default AppRoutes;