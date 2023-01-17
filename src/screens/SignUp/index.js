import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import BottomNavbar from "../../components/BottomNav";
import { BottomNavigation } from "react-native-paper";
import Form from "./Form";
import Guide from "./Guide";
import Type from "./Type";

const SignUp = () => {
  const [scene, setScene] = useState(<></>);

  return (
    <>
      {scene?.onRender}
      <View style={styles.floatingNavigator}>
        <BottomNavbar
          routes={[
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
              focusedIcon: "head-question",
              onRender: <Type />,
            },
            {
              key: "form",
              title: "Formulário",
              focusedIcon: "head-question",
              onRender: <Form />,
            },
          ]}
          renderScene={BottomNavigation.SceneMap({
            guide: () => {},
            type: () => {},
            form: () => {},
          })}
          setScene={setScene}
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
