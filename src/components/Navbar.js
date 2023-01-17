import { Appbar, Button, useTheme, TouchableRipple } from "react-native-paper";
import { useContext } from "react";
import AuthContext from "../contexts/auth";
import { Image, StyleSheet, Platform } from "react-native";

const styles = StyleSheet.create({
  logo: {
    width: 20,
    height: 40,
    margin: 6,
  },
});

const Navbar = ({ onReturn = null }) => {
  const { signed, logout } = useContext(AuthContext);
  const theme = useTheme();

  return (
    <Appbar.Header
      theme={theme}
      style={{
        backgroundColor: theme?.colors?.navbar?.background,
        borderBottomColor: theme?.colors?.navbar?.color,
        borderBottomWidth: 1,
      }}
    >
      {onReturn ? (
        <Appbar.BackAction
          onPress={onReturn}
          color={theme?.colors?.navbar?.color}
        />
      ) : (
        <></>
      )}

      <TouchableRipple
        rippleColor={
          Platform.OS === "web"
            ? undefined
            : theme?.colors?.bottomNav?.background
        }
        onPress={() => {}}
        style={{ paddingRight: 5, paddingLeft: 5 }}
      >
        <Image style={styles.logo} source={require("../../assets/logo.png")} />
      </TouchableRipple>

      <Appbar.Content />

      {signed ? (
        <>
          <Appbar.Action
            color={theme?.colors?.navbar?.color}
            icon="magnify"
            onPress={() => {}}
          />
          <Appbar.Action
            color={theme?.colors?.navbar?.color}
            icon="exit-run"
            onPress={logout}
          />
        </>
      ) : (
        <></>
      )}
    </Appbar.Header>
  );
};

export default Navbar;
