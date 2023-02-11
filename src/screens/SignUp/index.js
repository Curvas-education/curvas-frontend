import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import BottomNavbar from "../../components/BottomNav";
import { BottomNavigation } from "react-native-paper";
import Form from "./Form";
import Guide from "./Guide";
import Type from "./Type";
import Snackbar from "../../components/Snackbar";

const SignUp = () => {
  const [formType, setFormType] = useState(null);
  const [index, setIndex] = useState(0);
  const [snackbar, setSnackbar] = useState({
    type: "info",
    message: "",
    visible: false,
    alert: (msg, type) => {
      setSnackbar({...snackbar, message: msg, type: type, visible: true});
    },
    hide: () => {
      setSnackbar({...snackbar, visible: false});
    }
  })
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
      onRender: <Form alert={snackbar?.alert} formType={formType} />,
    },
  ];

  const onIndexChange = (number) => {
    if (routes[number]?.key === "form" && !formType) {
      snackbar.alert("Você deve selecionar um tipo de cadastro antes de avançar para o formulário","error");
      return;
    }

    setIndex(number);
  };

  return (
    <>
      <Snackbar hide={snackbar.hide} message={snackbar.message} type={snackbar.type} visible={snackbar.visible} />
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
    height: 80,
    width: "100%",
  },
});

export default SignUp;
