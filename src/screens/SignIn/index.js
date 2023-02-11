import React, { useContext, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, View, ScrollView } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import AuthContext from "../../contexts/auth";
import { useNavigation } from "@react-navigation/native";
import Snackbar from "../../components/Snackbar";
import pkg from "../../../package.json";
import TextInput from "../../components/TextInput";

const SignIn = () => {
  const { login } = useContext(AuthContext);
  const theme = useTheme();
  const navigation = useNavigation();

  const [securePassword, setSecurePassword] = useState(true);
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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignIn() {
    await login(username, password, snackbar.alert);
  }

  const swipeToSignUp = () => {
    navigation.navigate("signup");
  };

  const toggleSecurePassword = () => {
    setSecurePassword(!securePassword);
  };

  return (
    <>
      <ScrollView
        style={{ backgroundColor: theme?.colors?.primary }}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
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
                fontFamily: "Roboto-Medium",
              },
            ]}
          >
            Boas-vindas
          </Text>

          <TextInput
            value={username}
            onChangeText={setUsername}
            leftIcon="account"
            leftPress={() =>
              snackbar.alert(
                "Neste campo você deve inserir o seu nome de usuário",
                "info"
              )
            }
            label="E-mail"
            style={styles.input}
          />

          <TextInput
            value={password}
            onChangeText={setPassword}
            leftIcon="key-variant"
            leftPress={() =>
              snackbar.alert(
                "Neste campo você deve inserir a sua palavra-chave",
                "info"
              )
            }
            rightIcon={securePassword ? "eye-outline" : "eye"}
            rightPress={toggleSecurePassword}
            secure={securePassword}
            label="Senha"
            style={styles.input}
          />

          <Button
            style={[
              styles.square_button,
              {
                backgroundColor: theme?.colors?.background,
                marginTop: 25,
                borderRadius: 5,
              },
            ]}
            labelStyle={{ fontFamily: "Roboto-Bold" }}
            textColor={theme?.colors?.primary}
            mode="contained"
            onPress={handleSignIn}
          >
            Conectar
          </Button>

          <Button
            style={[
              styles.square_button,
              {
                backgroundColor: theme?.colors?.primary,
              },
            ]}
            labelStyle={{ fontFamily: "Roboto-Bold" }}
            textColor={theme?.colors?.background}
            mode="text"
            onPress={swipeToSignUp}
          >
            Cadastrar
          </Button>
          <StatusBar style="auto" />
        </View>
      </ScrollView>

      <Text
        style={{
          ...styles.bottomText,
          color: theme?.colors?.background,
        }}
      >
        Curvas {pkg?.version}
      </Text>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  sm_container: {
    width: 310,
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 8,
  },
  input: {
    marginBottom: 2,
    marginTop: 2,
    width: 300,
  },
  square_button: {
    borderRadius: 0,
    marginBottom: 5,
    marginTop: 5,
    width: 300,
  },
  logo: {
    marginTop: 55,
    marginBottom: 40,
    width: 64,
    height: 128,
  },
  bottomText: {
    position: "absolute",
    bottom: 0,
    margin: 5,
    fontFamily: "Roboto-Bold",
  },
});

export default SignIn;
