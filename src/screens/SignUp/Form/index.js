import React, { useContext, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import AuthContext from "../../../contexts/auth";
import { useNavigation } from "@react-navigation/native";
import TextInput from "../../../components/TextInput";

const Form = ({ alert }) => {
  const { login } = useContext(AuthContext);
  const theme = useTheme();
  const navigation = useNavigation();

  const [securePassword, setSecurePassword] = useState(true);
  const [secureRePassword, setSecureRePassword] = useState(true);

  async function handleSignIn() {
    await login("admin", "p4ssw0rd");
  }

  const swipeToSignUp = () => {
    navigation.navigate("signin");
  };

  const toggleSecurePassword = () => {
    setSecurePassword(!securePassword);
  };

  const toggleSecureRePassword = () => {
    setSecureRePassword(!secureRePassword);
  };

  return (
    <>
      <ScrollView
        style={{ backgroundColor: theme?.colors?.primary }}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Image
          style={styles.logo}
          source={require("../../../../assets/logo_variant.png")}
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
            Cadastro
          </Text>

          <TextInput
            leftIcon="account"
            leftPress={() =>
              alert(
                "Neste campo você deve inserir o seu nome de usuário",
                "info"
              )
            }
            placeholder="E-mail"
            style={styles.input}
          />

          <TextInput
            leftIcon="key-variant"
            leftPress={() =>
              alert("Neste campo você deve inserir a sua palavra-chave", "info")
            }
            rightIcon="eye-outline"
            rightPress={toggleSecurePassword}
            placeholder="Senha"
            style={styles.input}
            secure={securePassword}
          />

          <TextInput
            leftIcon="key-variant"
            leftPress={() =>
              alert("Neste campo você deve repetir a sua palavra-chave", "info")
            }
            rightIcon="eye-outline"
            rightPress={toggleSecureRePassword}
            placeholder="Repetir Senha"
            style={styles.input}
            secure={secureRePassword}
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
            placeholder="password"
            labelStyle={{ fontFamily: "Roboto-Bold" }}
            textColor={theme?.colors?.primary}
            mode="contained"
            onPress={handleSignIn}
          >
            Cadastrar
          </Button>

          <StatusBar style="auto" />
        </View>
      </ScrollView>
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
    maxHeight: 350,
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
    marginTop: 55,
    marginBottom: 40,
    width: 64,
    height: 128,
  },
});

export default Form;
