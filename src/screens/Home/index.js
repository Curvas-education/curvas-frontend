import { Dimensions, Image, Platform, ScrollView, StyleSheet, View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import Navbar from "../../components/Navbar";

const OnMobile = () => {
  const theme = useTheme();

  return (
    Platform.OS === 'android' || Platform.OS === 'ios' ?
      <>
        <Navbar />
        <View style={{ ...styles.container, backgroundColor: theme?.colors?.background }}>

          <View style={{ width: '85%', marginTop: 40 }}>
            <Text style={{ ...styles.title, color: theme?.colors?.secondary, textAlign: 'left' }}>
              Ganhe mais controle sobre suas <Text style={{ color: theme?.colors?.primary }}>curvas de aprendizado</Text> com a nossa solução
            </Text>
            <Text style={{ ...styles.subtitle, color: theme?.colors?.secondary }}>
              Descubra sobre o que é o <Text style={{ color: theme?.colors?.primary }}>Curvas</Text> e comece a se desenvolver agora
            </Text>

            <Button
              style={{ marginTop: 15, width: 150, maxWidth: '80%', borderRadius: 45 }}
              mode="contained"
              onPress={() => { }}
              buttonColor={theme.colors.primary}
              textColor={theme?.colors?.background}
            >
              Descubra
            </Button>
          </View>

          {
            Dimensions.get('window').width >= 375 ?
              <Image
                source={require('../../../assets/placeholders/home-art.png')}
                style={{
                  position: "absolute",
                  bottom: 0,
                  width: Dimensions.get('window').width,
                  height: Dimensions.get('window').width - 34,
                }}
              />
              :
              <></>
          }
        </View>
      </>
      :
      <></>
  )
};

const OnWeb = () => {
  const theme = useTheme();

  return (
    Platform.OS === 'web' ?
      <>
        <Navbar />
        <ScrollView
          style={{ backgroundColor: theme?.colors?.background }}
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={{ ...styles.container, justifyContent: "space-evenly", flexDirection: 'row', flexWrap: 'wrap' }}>

            <View style={{ flexDirection: 'column', width: '30%', marginTop: 45 }}>
              <Text style={{ ...styles.title, color: theme?.colors?.secondary, textAlign: 'left' }}>
                Ganhe mais controle sobre suas <Text style={{ color: theme?.colors?.primary }}>curvas de aprendizado</Text> com a nossa solução
              </Text>
              <Text style={{ ...styles.subtitle, color: theme?.colors?.secondary }}>
                Descubra sobre o que é o <Text style={{ color: theme?.colors?.primary }}>Curvas</Text> e comece a se desenvolver agora
              </Text>

              <Button
                style={{ marginTop: 15, width: 150, maxWidth: '80%', borderRadius: 45 }}
                mode="contained"
                onPress={() => { }}
                buttonColor={theme.colors.primary}
                textColor={theme?.colors?.background}
              >
                Descubra
              </Button>
            </View>

            <Image
              source={require('../../../assets/placeholders/home-art.png')}
              style={{
                width: 420,
                height: 420 - 34,
                borderRadius: '100%'
              }}
            />

            <View style={{ marginBottom: 20 }} />

          </View>

        </ScrollView>
      </>
      :
      <></>
  )
};


const Home = () => {
  return (
    <>
      <OnMobile />
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
    fontFamily: "Roboto-Regular",
    alignSelf: "flex-start",
    marginBottom: 15,
    fontSize: 16,
  },
});

export default Home;
