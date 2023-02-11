import React from "react";
import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";
// import { Instructions, SelectUserType } from "../screens/SignUp";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Splash from "../screens/Splash";

const AuthStack = createNativeStackNavigator();

const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const AuthRoutes = () => (
  <AuthStack.Navigator
    screenOptions={{
      headerShown: false,
      title: "Conta - Curvas",
      animation: 'slide_from_right',
    }}
  >
    {/* <AuthStack.Screen name="splash" component={Splash} /> */}
    <AuthStack.Screen name="signin" component={SignIn} />
    <AuthStack.Screen name="signup" component={SignUp} />
  </AuthStack.Navigator>
);

export default AuthRoutes;