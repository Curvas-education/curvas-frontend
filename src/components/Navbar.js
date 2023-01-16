import { Appbar, Button, useTheme } from "react-native-paper";
import { useContext } from "react";
import AuthContext from "../contexts/auth";
import { Image, StyleSheet } from "react-native";

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
      <Appbar.Content
        color={theme?.colors?.navbar?.color}
        title={
          <Button onPress={() => {}} style={{ borderRadius: 0 }}>
            <Image
              style={styles.logo}
              source={require("../../assets/logo.png")}
            />
          </Button>
        }
      />
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
