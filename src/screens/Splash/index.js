import { useNavigation } from "@react-navigation/native";
import { Image, StyleSheet, View } from "react-native";
import { Button, useTheme, Text } from "react-native-paper";

const Splash = () => {
  const theme = useTheme();
  const navigation = useNavigation();

  const skip = () => {
    navigation.navigate('signin');
  };

  return (
    <View style={styles.container}>

      <View style={{
        position: "absolute",
        top: "25%"
      }}>
        <Image
          source={require('../../../assets/placeholders/books.png')}
          style={{
            marginTop: 120,
            width: 786 / 4,
            height: 526 / 4
          }}
        />

        <Text>
          Educação
        </Text>

        <Text>
          Curvas de Aprendizado
        </Text>

        <Text>
          Insights personalizados permitir que você tenha um rápido desenvolvimento
        </Text>
      </View>

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
            borderRadius: 10
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
    alignItems: "center",
    height: "100%"
  },
  buttonFixedToBottom: {
    position: "absolute",
    bottom: "5%",
  },
});

export default Splash;
