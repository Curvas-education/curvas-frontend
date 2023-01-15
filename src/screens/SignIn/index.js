import React, {useContext} from 'react'
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import Navbar from "../../components/Navbar";
import AuthContext from '../../contexts/auth';

const SignIn = () => {
  const {signIn} = useContext(AuthContext)

  function handleSignIn() {
    signIn();
  }
  return (
    <>
      <Navbar />
      <View style={styles.container}>
        <Text>Login</Text>
        <Button mode="contained" onPress={handleSignIn}>
          Teste
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
