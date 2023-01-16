import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import Navbar from "../../components/Navbar";
import { useNavigation } from "@react-navigation/native";

const SignUp = () => {
  const navigation = useNavigation();

  const swipeToSignUp = () => {
    navigation.navigate("signin");
  };

  return (
    <>
      <Navbar />
      <View style={styles.container}>
        <Button mode="contained">Cadastro</Button>
        <Button mode="contained" onPress={swipeToSignUp}>
          Deseja logar?
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

export default SignUp;
