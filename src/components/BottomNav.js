import { useState, useEffect } from "react";
import { Text } from "react-native";
import { BottomNavigation, useTheme } from "react-native-paper";

const BottomNavbar = ({
  routes: add = {},
  index,
  renderScene = () => {},
  onIndexChange = (number) => {},
}) => {
  const theme = useTheme();

  const [routes] = useState([...add]);

  return (
    <BottomNavigation
      barStyle={{
        backgroundColor: theme?.colors?.bottomNav?.background,
        color: theme?.colors?.bottomNav?.color,
      }}
      navigationState={{ index, routes }}
      onIndexChange={onIndexChange}
      renderScene={renderScene}
      renderLabel={(props) => (
        <Text
          style={{
            direction: "ltr",
            textAlign: 'center',
            fontFamily: 'Roboto-Regular',
            letterSpacing: 0.5,
            fontWeight: "500",
            lineHeight: 16,
            fontSize: 12,
          }}
        >
          {props?.route?.title}
        </Text>
      )}
    />
  );
};

export default BottomNavbar;