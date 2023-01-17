import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Image } from "react-native";
import { Text, useTheme, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const Guide = () => {
  const theme = useTheme();

  const navigation = useNavigation();

  const handleReturn = () => {
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
        <View style={styles.textbox}>
          <Text
            style={[
              styles.title,
              { color: theme?.colors?.background, marginBottom: 45 },
            ]}
          >
            Nos passos a seguir{"\n"} complete o seu cadastro.{"\n"} Tenha em
            mãos seu RG,{"\n"} CPF e ID ou matrícula escolar.
          </Text>
          <Text style={[styles.title, , { color: theme?.colors?.background }]}>
            Vamos dar ínicio a essa {"\n"} experiência incrível?
          </Text>
          <Button
            style={{
              backgroundColor: theme?.colors?.background,
              marginTop: 15,
            }}
            textColor={theme?.colors?.primary}
            mode="contained"
            onPress={handleReturn}
          >
            Retornar para o login
          </Button>
        </View>
        <StatusBar style="auto" />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 20,
    lineHeight: 27.28,
    letterSpacing: 0.6,
    fontWeight: "500",
    marginBottom: 8,
    textAlign: "center",
  },
  textbox: {
    position: "absolute",
    top: "30%",
  },
  logo: {
    position: "absolute",
    top: "10%",
    width: 64,
    height: 128,
  },
});

export default Guide;
