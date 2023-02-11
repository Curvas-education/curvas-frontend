import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import TextInput from "../../../components/TextInput";
import api from "../../../services/api";
import { useNavigation } from "@react-navigation/native";

const Form = ({ alert, formType }) => {
  const theme = useTheme();

  const { navigate } = useNavigation();

  const [securePassword, setSecurePassword] = useState(true);
  const [secureRePassword, setSecureRePassword] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [phone, setPhone] = useState("");

  async function handleSignUp() {
    try {
      const { status } = await api.post('/user/create', {
        matricula: "" + Math.floor(Math.random() * 100000000),
        nome: name,
        email: email,
        senha: password,
        telefone: phone.replace(/[()-\s]/g, "").trim(),
        cargo: formType,
        foto: null,
        criado_por: null
      })

      if (status >= 400) throw new Error("Ocorreu um erro não identificado")

      console.log(response);
      navigate("signin");
    } catch (err) {
      console.log(err);
      alert(err?.message ?? "Ocorreu um erro ao tentar cadastrar a sua conta", "error");
    };
    // await login("admin", "p4ssw0rd");
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
          alignItems: "center",
        }}
      >
        <Image
          style={styles.logo}
          source={require("../../../../assets/logo_variant.png")}
        />
        {/* <View style={styles.sm_container}> */}
        <Text
          style={[
            styles.title,
            {
              color: theme?.colors?.background,
              fontFamily: "Roboto-Medium",
            },
          ]}
        >
          Cadastro de {formType?.charAt(0)?.toUpperCase() + formType?.slice(1) ?? ""}
        </Text>

        <TextInput
          value={name}
          onChangeText={setName}
          leftIcon="account"
          leftPress={() =>
            alert(
              "Neste campo você deve inserir o seu nome",
              "info"
            )
          }
          label="Nome"
          style={styles.input}
        />

        <TextInput
          value={email}
          onChangeText={setEmail}
          leftIcon="email"
          leftPress={() =>
            alert(
              "Neste campo você deve inserir o seu e-mail",
              "info"
            )
          }
          label="E-mail"
          style={styles.input}
        />

        <TextInput
          value={phone}
          onChangeText={setPhone}
          leftIcon="phone"
          leftPress={() =>
            alert(
              "Neste campo você deve inserir o seu telefone",
              "info"
            )
          }
          mask={['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
          label="Telefone"
          style={styles.input}
        />

        <TextInput
          value={password}
          onChangeText={setPassword}
          leftIcon="key-variant"
          leftPress={() =>
            alert("Neste campo você deve inserir a sua palavra-chave", "info")
          }
          rightIcon={securePassword ? "eye-outline" : "eye"}
          rightPress={toggleSecurePassword}
          label="Senha"
          style={styles.input}
          secure={securePassword}
        />

        <TextInput
          value={repassword}
          onChangeText={setRepassword}
          leftIcon="key-variant"
          leftPress={() =>
            alert("Neste campo você deve repetir a sua palavra-chave", "info")
          }
          rightIcon={secureRePassword ? "eye-outline" : "eye"}
          rightPress={toggleSecureRePassword}
          label="Repetir Senha"
          style={styles.input}
          secure={secureRePassword}
        />

        <Button
          style={[
            styles.square_button,
            {
              backgroundColor: theme?.colors?.background,
              marginTop: 25,
              marginBottom: 25,
              borderRadius: 5,
            },
          ]}
          placeholder="password"
          labelStyle={{ fontFamily: "Roboto-Bold" }}
          textColor={theme?.colors?.primary}
          mode="contained"
          onPress={handleSignUp}
        >
          Cadastrar
        </Button>
        {/* </View> */}
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
    width: 300,
    maxWidth: '90%'
  },
  square_button: {
    width: 300,
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
