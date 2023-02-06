import {
  Appbar,
  Button,
  useTheme,
  TouchableRipple,
  Portal,
  Modal,
  Text,
} from "react-native-paper";
import { useContext, useState } from "react";
import AuthContext from "../contexts/auth";
import { Image, StyleSheet, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";

const styles = StyleSheet.create({
  logo: {
    width: 20,
    height: 40,
    margin: 6,
  },
});

const Navbar = ({ onReturn = null, showExitButton = false }) => {
  const { signed, logout } = useContext(AuthContext);
  const [openLogoutModal, setOpenLogoutModal] = useState(false);
  const theme = useTheme();
  const navigation = useNavigation();

  const toggleLogoutModal = () => {
    setOpenLogoutModal(!openLogoutModal);
  };

  const handleSignOut = async () => {
    await logout();
    navigation.navigate("signin");
  };

  return (
    <Appbar.Header
      theme={theme}
      style={{
        backgroundColor: theme?.colors?.navbar?.background,
        // borderBottomColor: theme?.colors?.navbar?.color,
        // borderBottomWidth: 1,
      }}
    >
      <Portal>
        <Modal
          visible={openLogoutModal}
          onDismiss={toggleLogoutModal}
          contentContainerStyle={{
            backgroundColor: theme?.colors?.background,
            padding: 20,
            width: 250,
            alignSelf: "center",
            borderRadius: 5,
          }}
        >
          <Text style={{ fontFamily: "Roboto-Bold", marginBottom: 10 }}>
            Você deseja desconectar da sua conta?
          </Text>
          <Button
            icon="exit-run"
            onPress={handleSignOut}
            textColor={theme?.colors?.background}
            style={{
              backgroundColor: theme?.colors?.primary,
              borderRadius: 5,
              marginBottom: 10,
            }}
          >
            <Text
              style={{
                color: theme?.colors?.background,
                fontFamily: "Roboto-Bold",
              }}
            >
              Sair
            </Text>
          </Button>
          <Button
            mode="text"
            onPress={toggleLogoutModal}
            style={{
              borderRadius: 5,
            }}
          >
            <Text
              style={{
                color: theme?.colors?.primary,
                fontFamily: "Roboto-Bold",
              }}
            >
              Cancelar
            </Text>
          </Button>
        </Modal>
      </Portal>

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
        onPress={() => navigation.navigate("home")}
        style={{ paddingRight: 5, paddingLeft: 5 }}
      >
        <Image
          style={styles.logo}
          source={require("../../assets/logo_variant.png")}
        />
      </TouchableRipple>

      <Appbar.Content />

      {signed ? (
        <>
          <Appbar.Action
            color={theme?.colors?.navbar?.color}
            icon="sticker-text"
            onPress={() => navigation.navigate("questionlist")}
          />
          <Appbar.Action
            color={theme?.colors?.navbar?.color}
            icon="file-question"
            onPress={() => navigation.navigate("quizview")}
          />
          <Appbar.Action
            color={theme?.colors?.navbar?.color}
            icon="account-circle"
            onPress={() => navigation.navigate("profile")}
          />
        </>
      ) : (
        <></>
      )}
      {
        showExitButton ?
          <Appbar.Action
            color={theme?.colors?.navbar?.color}
            icon="exit-run"
            onPress={toggleLogoutModal}
          />
          :
          <></>
      }
    </Appbar.Header>
  );
};

export default Navbar;
