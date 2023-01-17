import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Image } from "react-native";
import { Text, useTheme, IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const Instructions = () => {
  const theme = useTheme();
  const navigation = useNavigation();


  return (
    <>
      <View style={[styles.container, { backgroundColor: theme?.colors?.primary }]}>
      <Image style={styles.logo} source={require("../../../assets/logo_variant.png")} />
      <View>
        <Text style={[styles.title, , { color: theme?.colors?.background }, {marginBottom: 45 }]}>
            Nos passos a seguir{'\n'} complete o seu cadastro.{'\n'} Tenha em mãos seu RG,{'\n'} CPF e ID ou matrícula escolar.
          </Text>
          <Text style={[styles.title, , { color: theme?.colors?.background }]}>
            Vamos dar ínicio a essa {'\n'} experiência incrível?
          </Text>
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
  }
});

export default Instructions;
