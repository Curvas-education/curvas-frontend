import { Snackbar as Snack, useTheme } from "react-native-paper";

const Snackbar = ({ visible, message, type, hide }) => {
  const theme = useTheme();

  const typeStyling = () => {
    switch (type) {
      case "error":
        return {
          backgroundColor: theme?.colors?.danger,
          backgroundColor: theme?.colors?.background,
        };
      case "success":
        return {
          backgroundColor: theme?.colors?.success,
          backgroundColor: theme?.colors?.background,
        };
      case "warning":
        return {
          backgroundColor: theme?.colors?.warning,
          backgroundColor: theme?.colors?.background,
        };
      default:
        return {
          backgroundColor: theme?.colors?.info,
          backgroundColor: theme?.colors?.background,
        };
    }
  };

  return (
    <Snack
      visible={visible}
      onDismiss={hide}
      wrapperStyle={{
        ...typeStyling(),
      }}
      action={{
        label: "Fechar",
        onPress: hide,
      }}
    >
      {message}
    </Snack>
  );
};

export default Snackbar;
