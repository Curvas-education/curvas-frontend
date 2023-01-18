import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import BottomNavbar from "../../components/BottomNav";
import { BottomNavigation } from "react-native-paper";
import Form from "./Form";
import Guide from "./Guide";
import Type from "./Type";

const SignUp = () => {
  const [formType, setFormType] = useState(null);
  const [index, setIndex] = useState(0);
  const routes = [
    {
      key: "guide",
      title: "Guia",
      focusedIcon: "notebook",
      unfocusedIcon: "notebook-outline",
      onRender: <Guide />,
    },
    {
      key: "type",
      title: "Tipo de Cadastro",
      focusedIcon: "human-greeting-variant",
      onRender: <Type select={formType} onSelect={setFormType} />,
    },
    {
      key: "form",
      title: "Formulário",
      focusedIcon: "form-select",
      onRender: <Form />,
    },
  ]

  const onIndexChange = (number) => {
    if(routes[number]?.key === 'form' && !formType){
      return;
    };

    setIndex(number);
  };

  return (
    <>
      {routes[index]?.onRender}
      <View style={styles.floatingNavigator}>
        <BottomNavbar
          index={index}
          onIndexChange={onIndexChange}
          routes={routes}
          renderScene={BottomNavigation.SceneMap({
            guide: () => {},
            type: () => {},
            form: () => {},
          })}
        />
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
  floatingNavigator: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
});

export default SignUp;
