import { Link, useNavigation } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import { IconButton, Text, useTheme } from "react-native-paper";

const Breadcrumb = ({ style = {}, children }) => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", ...style }}>
      {children}
    </View>
  );
};

Breadcrumb.Page = ({ label, link }) => {
  const navigation = useNavigation();

  const navigateTo = () => {
    if (!link) return;
    navigation.navigate(link);
  };

  return (
    <>
      <Text onPress={navigateTo} style={linkStyles[!!link]}>
        {label}
      </Text>
      <Text style={{ fontFamily: "Roboto-Regular" }}> / </Text>
    </>
  );
};

Breadcrumb.Icon = ({ icon, link }) => {
  const theme = useTheme();

  const navigation = useNavigation();

  const navigateTo = () => {
    if (!link) return;
    navigation.navigate(link);
  };

  return (
    <>
      <IconButton
        icon={icon}
        iconColor={theme?.colors?.primary}
        style={{ width: 24, height: 24, margin: 0 }}
        size={24}
        onPress={navigateTo}
      />
      <Text style={{ fontFamily: "Roboto-Regular" }}> / </Text>
    </>
  );
};

const linkStyles = StyleSheet.create({
  true: {
    fontFamily: "Roboto-Bold",
  },
  false: {
    fontFamily: "Roboto-Regular",
  },
});

export default Breadcrumb;
