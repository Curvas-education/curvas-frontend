import { useState } from "react";
import { BottomNavigation, useTheme } from "react-native-paper";

const BottomNavbar = () => {
  const theme = useTheme();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {
      key: "student",
      title: "Área do Aluno",
      focusedIcon: "notebook",
      unfocusedIcon: "notebook-outline",
    },
    { key: "questions", title: "Suas Perguntas", focusedIcon: "head-question" },
    { key: "alerts", title: "Avisos", focusedIcon: "alert-circle-outline" },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    student: () => {},
    questions: () => {},
    alerts: () => {},
  });

  return (
    <BottomNavigation
      barStyle={{
        backgroundColor: theme?.colors?.bottomNav?.background,
        color: theme?.colors?.bottomNav?.color,
      }}
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default BottomNavbar;
