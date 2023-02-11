import { NativeModules, Platform } from "react-native";
import { Snackbar as Snack, Text, useTheme } from "react-native-paper";

const { StatusBarManager } = NativeModules;

const Snackbar = ({ visible, message, type, hide }) => {
  const theme = useTheme();

  const STATUSBAR_HEIGHT = ["ios", "android"].includes(Platform.OS)
    ? StatusBarManager.HEIGHT
    : null;

  const typeStyling = () => {
    switch (type) {
      case "error":
        return {
          backgroundColor: theme?.colors?.danger,
        };
      case "success":
        return {
          backgroundColor: theme?.colors?.success,
        };
      case "warning":
        return {
          backgroundColor: theme?.colors?.warning,
        };
      default:
        return {};
    }
  };

  return (
    <Snack
      visible={visible}
      onDismiss={hide}
      style={{
        ...typeStyling(),
      }}
      wrapperStyle={{
        position: "absolute",
        top: STATUSBAR_HEIGHT ?? 0,
        zIndex: 9999,
      }}
      icon={"close"}
      onIconPress={hide}
    >
      <Text
        style={{
          fontFamily: "Roboto-Bold",
          color: theme?.colors?.background,
          // fontSize: 11
        }}
      >
        {message}
      </Text>
    </Snack>
  );
};

export default Snackbar;
