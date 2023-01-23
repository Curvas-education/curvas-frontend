import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Image, ScrollView } from "react-native";
import { Text, useTheme, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const Guide = () => {
  const theme = useTheme();

  const navigation = useNavigation();

  const handleReturn = () => {
    navigation.navigate("signin");
  };

  const textStyle = (styling = {}) => {
    return {
      ...styles.title,
      color: theme?.colors?.background,
      fontFamily: "Roboto-Regular",
      marginBottom: 45,
      ...styling,
    };
  };

  return (
    <>
      <ScrollView
        style={{ backgroundColor: theme?.colors?.primary }}
        contentContainerStyle={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <View style={styles.textbox}>
          <Text style={textStyle()}>
            Nos passos a seguir complete o seu cadastro. Tenha em mãos seu RG,
            CPF e ID ou matrícula escolar.
          </Text>
          <Text style={textStyle({ marginBottom: 0 })}>
            Vamos dar ínicio a essa experiência incrível?
          </Text>

          <Button
            style={[
              styles.square_button,
              {
                backgroundColor: theme?.colors?.background,
                marginTop: 25,
                borderRadius: 5
              }
            ]}
            placeholder="password"
            labelStyle={{ fontFamily: "Roboto-Bold" }}
            textColor={theme?.colors?.primary}
            mode="contained"
            onPress={handleReturn}
          >
            Retornar para o Login
          </Button>
        </View>
        <StatusBar style="auto" />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    lineHeight: 27.28,
    letterSpacing: 0.6,
    fontWeight: "500",
    marginBottom: 8,
    textAlign: "left",
  },
  textbox: {
    width: 300,
  },
  logo: {
    position: "absolute",
    top: "10%",
    width: 64,
    height: 128,
  },
});

export default Guide;
