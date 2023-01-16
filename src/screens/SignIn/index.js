import React, { useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import Navbar from "../../components/Navbar";
import AuthContext from "../../contexts/auth";
import { useNavigation } from "@react-navigation/native";

const SignIn = () => {
  const { login } = useContext(AuthContext);
  const navigation = useNavigation();

  async function handleSignIn() {
    await login("admin", "p4ssw0rd");
  }

  const swipeToSignUp = () => {
    navigation.navigate("signup");
  };

  return (
    <>
      <Navbar />
      <View style={styles.container}>
        <Button mode="contained" onPress={handleSignIn}>
          Logar
        </Button>
        <Button mode="contained" onPress={swipeToSignUp}>
          Deseja cadastrar?
        </Button>
        <StatusBar style="auto" />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SignIn;
