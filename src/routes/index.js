import React, { useContext } from "react";
import AuthContext from "../contexts/auth";

import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes";

import { ActivityIndicator, useTheme } from "react-native-paper";
import { View } from "react-native";

const Routes = () => {
  const { signed, loading } = useContext(AuthContext);
  const theme = useTheme();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator
          animating={true}
          color={theme?.colors?.primary}
          size={"large"}
        />
      </View>
    );
  }

  return (
    <>
      {signed ? <AppRoutes /> : <AuthRoutes />}
    </>
  );
};
export default Routes;
