import React, { useContext, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, View } from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";
import AuthContext from "../../contexts/auth";
import { useNavigation } from "@react-navigation/native";
import Snackbar from "../../components/Snackbar";

const SignIn = () => {
  const { login } = useContext(AuthContext);
  const theme = useTheme();
  const navigation = useNavigation();

  const [snackbar, setSnackbar] = useState({
    type: "info",
    message: "",
    visible: false,
    alert: (msg, type) => {
      setSnackbar({ ...snackbar, message: msg, type: type, visible: true });
    },
    hide: () => {
      setSnackbar({ ...snackbar, visible: false });
    },
  });

  async function handleSignIn() {
    snackbar.alert("As credenciais estão incorretas", "error");
    return;
    await login("admin", "p4ssw0rd");
  }

  const swipeToSignUp = () => {
    navigation.navigate("signup");
  };

  return (
    <>
      <View
        style={[styles.container, { backgroundColor: theme?.colors?.primary }]}
      >
        <Snackbar
          hide={snackbar.hide}
          message={snackbar.message}
          type={snackbar.type}
          visible={snackbar.visible}
        />
        <Image
          style={styles.logo}
          source={require("../../../assets/logo_variant.png")}
        />
        <View style={styles.sm_container}>
          <Text
            style={[
              styles.title,
              {
                color: theme?.colors?.background,
                fontFamily: "JetBrainsMono-Regular",
              },
            ]}
          >
            Entrar
          </Text>

          <TextInput
            label="Email"
            contentStyle={{
              fontFamily: "JetBrainsMono-Regular",
            }}
            placeholder="john.doe@email.com"
            style={styles.input}
          />
          <TextInput
            contentStyle={{
              fontFamily: "JetBrainsMono-Regular",
            }}
            label="Senha"
            secureTextEntry
            style={styles.input}
          />

          <Button
            style={[
              styles.square_button,
              {
                backgroundColor: theme?.colors?.background,
                marginTop: 25,
              },
            ]}
            labelStyle={{ fontFamily: "JetBrainsMono-Regular" }}
            textColor={theme?.colors?.primary}
            mode="contained"
            onPress={handleSignIn}
          >
            Logar
          </Button>

          <Button
            style={[
              styles.square_button,
              {
                backgroundColor: theme?.colors?.primary,
              },
            ]}
            labelStyle={{ fontFamily: "JetBrainsMono-Regular" }}
            textColor={theme?.colors?.background}
            mode="contained"
            onPress={swipeToSignUp}
          >
            Deseja cadastrar?
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

export default SignIn;
