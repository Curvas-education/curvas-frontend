import { useState, useEffect } from "react";
import { BottomNavigation, useTheme } from "react-native-paper";

const BottomNavbar = ({
  setScene = () => {},
  routes: add = {},
  renderScene = () => {},
}) => {
  const theme = useTheme();

  const [index, setIndex] = useState(0);
  const [routes] = useState([...add]);

  useEffect(() => {
    setScene(routes[index]);
  }, [index]);

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
