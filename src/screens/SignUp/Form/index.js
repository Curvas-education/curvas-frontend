import React, { useContext, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";
import AuthContext from "../../../contexts/auth";
import { useNavigation } from "@react-navigation/native";

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
      <View
        style={[styles.container, { backgroundColor: theme?.colors?.primary }]}
      >
        <Image
          style={styles.logo}
          source={require("../../../../assets/logo_variant.png")}
        />
        <ScrollView style={styles.sm_container}>
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
            left={
              <TextInput.Icon
                icon="account"
                iconColor={theme?.colors?.primary}
                onPress={()=>alert('Neste campo você deve inserir o seu nome de usuário','info')}
              />
            }
            placeholder="E-mail"
            placeholderTextColor={theme?.colors?.primary}
            textColor={theme?.colors?.primary}
            underlineColor={theme?.colors?.primary}
            contentStyle={{
              fontFamily: "Roboto-Regular",
            }}
            autoCorrect={false}
            style={styles.input}
          />
          <TextInput
            left={
              <TextInput.Icon
                icon="key-variant"
                iconColor={theme?.colors?.primary}
                onPress={()=>alert('Neste campo você deve inserir a sua palavra-chave','info')}
              />
            }
            right={
              <TextInput.Icon
                icon="eye-outline"
                iconColor={theme?.colors?.primary}
                onPress={toggleSecurePassword}
              />
            }
            placeholder="Senha"
            placeholderTextColor={theme?.colors?.primary}
            textColor={theme?.colors?.primary}
            underlineColor={theme?.colors?.primary}
            contentStyle={{
              fontFamily: "Roboto-Regular",
            }}
            secureTextEntry={securePassword}
            autoCorrect={false}
            style={styles.input}
          />

          <TextInput
            left={
              <TextInput.Icon
                icon="key-variant"
                iconColor={theme?.colors?.primary}
                onPress={()=>alert('Neste campo você deve repetir a sua palavra-chave','info')}
              />
            }
            right={
              <TextInput.Icon
                icon="eye-outline"
                iconColor={theme?.colors?.primary}
                onPress={toggleSecureRePassword}
              />
            }
            placeholder="Repetir Senha"
            placeholderTextColor={theme?.colors?.primary}
            textColor={theme?.colors?.primary}
            underlineColor={theme?.colors?.primary}
            contentStyle={{
              fontFamily: "Roboto-Regular",
            }}
            secureTextEntry={secureRePassword}
            autoCorrect={false}
            style={styles.input}
          />

          <Button
            style={[
              styles.square_button,
              {
                backgroundColor: theme?.colors?.background,
                marginTop: 25,
                borderRadius: 5,
              }
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
        </ScrollView>
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
    maxHeight: 350
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
