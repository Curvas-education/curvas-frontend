import React, {useState} from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Image } from "react-native";
import { RadioButton, Text, useTheme, IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import RadioButtonComponent from "../../components/RadioButtonComponent";

const SelectUserType = () => {
  const theme = useTheme();
  const navigation = useNavigation();

  const [value, setValue] = useState('aluno');

  return (
    <>
      <View style={[styles.container, { backgroundColor: theme?.colors?.primary }]}>
      <Image style={styles.logo} source={require("../../../assets/logo_variant.png")} />
      <View>
        <Text style={[styles.title, , { color: theme?.colors?.background }, {marginBottom: 45 }]}>
            Eu sou:
        </Text>
        <RadioButton.Group value={value}>
          <RadioButtonComponent value="aluno" text="Aluno" onPress={() => setValue("aluno")}/>
          <RadioButtonComponent value="professor" text="Professor" onPress={() => setValue("professor")} />
          <RadioButtonComponent value="coordenador" text="Coordenador" onPress={() => setValue("coordenador")} />
          <RadioButtonComponent value="gestor" text="Gestor" onPress={() => setValue("gestor")} />
        </RadioButton.Group>
      </View>
      <View style={styles.bottomButtons}>
        <IconButton icon='arrow-left' mode="contained" iconColor={theme?.colors?.primary} containerColor={theme?.colors?.background} size={45} onPress={navigation.goBack}/>
        <IconButton icon='arrow-right' mode="contained" iconColor={theme?.colors?.primary} containerColor={theme?.colors?.background} size={45} onPress={() => navigation.navigate("selectusertype")}/>
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
  logo: {
    top: '10%',
    width: 64,
    height: 128
  },
  bottomButtons: {
    flexDirection: 'row',
    padding: 32,
    width: '100%',
    justifyContent: 'space-between'
  },
  radio: {
    flexDirection: 'row-reverse',
    justifyContent: 'flex-end',
    alignItems: 'center',
  }
});

export default SelectUserType;
