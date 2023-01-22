import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import { Button, useTheme } from "react-native-paper";

const Splash = () => {
  const theme = useTheme();
  const navigation = useNavigation();

  const skip = () => {
    navigation.navigate('signin');
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme?.colors?.background }]}
    >
      <Button
        mode="contained"
        onPress={skip}
        contentStyle={{ margin: 10 }}
        labelStyle={{
          fontFamily: "Roboto-Bold",
          paddingLeft: 50,
          paddingRight: 50
        }}
        style={[
          styles.buttonFixedToBottom,
          {
            borderRadius: 35
          }
        ]}
      >
        Começar Agora
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonFixedToBottom: {
    position: "absolute",
    bottom: "5%",
  },
});

export default Splash;
