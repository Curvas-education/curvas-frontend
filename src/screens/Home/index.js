import { Image, ScrollView, StyleSheet, View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import Navbar from "../../components/Navbar";

const OnWeb = () => {
  const theme = useTheme();

  return (
    <>
      <Navbar />
      <ScrollView
        style={{ backgroundColor: theme?.colors?.background }}
        contentContainerStyle={{
          width: '100%',
          height: '100%',
          justifyContent: "center",
          alignItems: "center",
          zIndex: 100
        }}
      >
        <View style={{ height: '100%' }}>

          <View style={{ alignSelf: "center", width: '80%', marginTop: 45 }}>
            <Text style={{ ...styles.title, color: theme?.colors?.secondary, textAlign: 'left' }}>
              Ganhe mais controle sobre suas <Text style={{ color: theme?.colors?.primary }}>curvas de aprendizado</Text> com a nossa solução
            </Text>
            <Text style={{ ...styles.subtitle, color: theme?.colors?.secondary }}>
              Descubra sobre o que é o <Text style={{ color: theme?.colors?.primary }}>Curvas</Text> e comece a se desenvolver agora
            </Text>

            <Button
              style={{ marginTop: 15, width: 150, maxWidth: '80%', borderRadius: 45 }}
              mode="contained"
              icon="book-open-page-variant-outline"
              onPress={() => { }}
              buttonColor={theme.colors.primary}
              textColor={theme?.colors?.background}
            >
              Descubra
            </Button>
          </View>

        </View>

      </ScrollView>

      <View style={{ width: '100%', backgroundColor: theme?.colors?.background }}>
        <Image
          source={require('../../../assets/placeholders/home-art.png')}
          style={{
            alignSelf: "center",
            maxWidth: "100%",
            width: 1018 / 2,
            height: 499 / 2,
          }}
        />
      </View>
    </>
  )
};


const Home = () => {
  return (
    <>
      <OnWeb />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  title: {
    fontFamily: "Roboto-Bold",
    alignSelf: "flex-start",
    marginBottom: 15,
    fontSize: 20,
  },
  subtitle: {
    fontFamily: "Roboto-Medium",
    alignSelf: "flex-start",
    marginBottom: 15,
    fontSize: 16,
  },
});

export default Home;
