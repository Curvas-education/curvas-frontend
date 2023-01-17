import React, { useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, View } from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";
import AuthContext from "../../../contexts/auth";
import { useNavigation } from "@react-navigation/native";

const Form = () => {
  const { login } = useContext(AuthContext);
  const theme = useTheme();
  const navigation = useNavigation();

  async function handleSignIn() {
    await login("admin", "p4ssw0rd");
  }

  const swipeToSignUp = () => {
    navigation.navigate("signin");
  };

  return (
    <>
      <View
        style={[styles.container, { backgroundColor: theme?.colors?.primary }]}
      >
        <Image
          style={styles.logo}
          source={require("../../../../assets/logo_variant.png")}
        />
        <View style={styles.sm_container}>
          <Text style={[styles.title, { color: theme?.colors?.background }]}>
            Cadastre-se
          </Text>

          <TextInput
            label="Email"
            placeholder="john.doe@email.com"
            style={styles.input}
          />
          <TextInput label="Senha" secureTextEntry style={styles.input} />

          <Button
            style={[
              styles.square_button,
              {
                backgroundColor: theme?.colors?.background,
                marginTop: 25,
              },
            ]}
            textColor={theme?.colors?.primary}
            mode="contained"
            onPress={handleSignIn}
          >
            Cadastrar
          </Button>

          <Button
            style={[
              styles.square_button,
              {
                backgroundColor: theme?.colors?.primary,
              },
            ]}
            textColor={theme?.colors?.background}
            mode="contained"
            onPress={swipeToSignUp}
          >
            Deseja logar?
          </Button>

          <StatusBar style="auto" />
        </View>
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
  sm_container: {
    width: "60%",
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 8,
  },
  input: {
    marginBottom: 2,
    marginTop: 2,
  },
  square_button: {
    borderRadius: 0,
    marginBottom: 5,
    marginTop: 5,
  },
  logo: {
    position: "absolute",
    top: "10%",
    width: 64,
    height: 128,
  },
});

export default Form;
