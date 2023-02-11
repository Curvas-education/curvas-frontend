import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Image, ScrollView } from "react-native";
import { RadioButton, Text, useTheme } from "react-native-paper";
import RadioButtonComponent from "../../../components/RadioButtonComponent";

const Type = ({ select = null, onSelect }) => {
  const theme = useTheme();

  const [value, setValue] = useState(select);

  useEffect(() => {
    onSelect(value);
  }, [value]);

  const textStyle = (styling = {}) => {
    return { ...styles.title, ...styling };
  };

  const handleValue = (selected) => {
    if (value === selected) {
      setValue(null);
      return;
    }
    setValue(selected);
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
        <View style={styles.textbox}>
          <Text
            style={[
              styles.title,
              {
                color: theme?.colors?.background,
                paddingLeft: 16,
                marginBottom: 10,
              },
            ]}
          >
            Eu sou:
          </Text>
          <RadioButton.Group value={value}>
            <RadioButton.Item
              labelStyle={textStyle({ color: theme?.colors?.background })}
              style={
                value === "aluno"
                  ? { backgroundColor: theme?.colors?.secondary }
                  : {}
              }
              color={theme?.colors?.background}
              uncheckedColor={theme?.colors?.background}
              label="Aluno"
              value="aluno"
              onPress={() => handleValue("aluno")}
            />
            <RadioButton.Item
              labelStyle={textStyle({ color: theme?.colors?.background })}
              style={
                value === "professor"
                  ? { backgroundColor: theme?.colors?.secondary }
                  : {}
              }
              color={theme?.colors?.background}
              uncheckedColor={theme?.colors?.background}
              label="Professor"
              value="professor"
              onPress={() => handleValue("professor")}
            />
            <RadioButton.Item
              labelStyle={textStyle({ color: theme?.colors?.background })}
              style={
                value === "coordenador"
                  ? { backgroundColor: theme?.colors?.secondary }
                  : {}
              }
              color={theme?.colors?.background}
              uncheckedColor={theme?.colors?.background}
              label="Coordenador"
              value="coordenador"
              onPress={() => handleValue("coordenador")}
            />
            <RadioButton.Item
              labelStyle={textStyle({ color: theme?.colors?.background })}
              style={
                value === "gestor"
                  ? { backgroundColor: theme?.colors?.secondary }
                  : {}
              }
              color={theme?.colors?.background}
              uncheckedColor={theme?.colors?.background}
              label="Gestor"
              value="gestor"
              onPress={() => handleValue("gestor")}
            />
          </RadioButton.Group>
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
    justifyContent: "space-between",
  },
  title: {
    fontFamily: "Roboto-Regular",
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
    marginTop: 55,
    marginBottom: 40,
    width: 64,
    height: 128,
  },
  radio: {
    flexDirection: "row-reverse",
    justifyContent: "flex-end",
    alignItems: "center",
  },
});

export default Type;
