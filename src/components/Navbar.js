import { Appbar, useTheme } from "react-native-paper";

const Navbar = () => {
  const theme = useTheme();

  return (
    <Appbar.Header
      theme={theme}
      style={{
        backgroundColor: theme?.colors?.navbar?.background,
      }}
    >
      <Appbar.Content color={theme?.colors?.navbar?.color} title="Curvas" />
      <Appbar.Action
        color={theme?.colors?.navbar?.color}
        icon="magnify"
        onPress={() => {}}
      />
    </Appbar.Header>
  );
};

export default Navbar;
