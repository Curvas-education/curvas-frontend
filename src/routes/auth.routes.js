import React from "react";
import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

const AuthStack = createNativeStackNavigator();

const AuthRoutes = () => (
  <AuthStack.Navigator
    screenOptions={{
      headerShown: false,
      title: "Conta - Curvas"
    }}
  >
    <AuthStack.Screen name="signin" component={SignIn} />
    <AuthStack.Screen name="signup" component={SignUp} />
  </AuthStack.Navigator>
);

export default AuthRoutes;
