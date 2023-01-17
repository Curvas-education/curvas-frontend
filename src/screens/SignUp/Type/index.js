import React, {useState} from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Image } from "react-native";
import { RadioButton, Text, useTheme } from "react-native-paper";
import RadioButtonComponent from "../../../components/RadioButtonComponent";

const Type = () => {
  const theme = useTheme();

  const [value, setValue] = useState('aluno');

  return (
    <>
      <View style={[styles.container, { backgroundColor: theme?.colors?.primary }]}>
      <Image style={styles.logo} source={require("../../../../assets/logo_variant.png")} />
      <View style={styles.textbox}>
        <Text style={[styles.title, { color: theme?.colors?.background, marginBottom: 45 }]}>
            Eu sou:
        </Text>
        <RadioButton.Group value={value}>
          <RadioButtonComponent value="aluno" text="Aluno" onPress={() => setValue("aluno")}/>
          <RadioButtonComponent value="professor" text="Professor" onPress={() => setValue("professor")} />
          <RadioButtonComponent value="coordenador" text="Coordenador" onPress={() => setValue("coordenador")} />
          <RadioButtonComponent value="gestor" text="Gestor" onPress={() => setValue("gestor")} />
        </RadioButton.Group>
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
  radioText: {
    fontSize: 20
  },
  title: {
    fontSize: 20,
    lineHeight: 27.28,
    letterSpacing: 0.6,
    fontWeight: "500",
    marginBottom: 8,
    textAlign: 'center'
  },
  textbox: {
    position: "absolute",
    top: "30%",
  },
  logo: {
    position: "absolute",
    top: '10%',
    width: 64,
    height: 128
  },
  radio: {
    flexDirection: 'row-reverse',
    justifyContent: 'flex-end',
    alignItems: 'center',
  }
});

export default Type;
