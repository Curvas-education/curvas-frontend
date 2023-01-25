import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useTheme } from "react-native-paper";
import Navbar from "../../components/Navbar";

const Home = () => {
  const theme = useTheme();

  return (
    <>
      <Navbar />
      <ScrollView
        style={{
          backgroundColor: theme?.colors?.background,
        }}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Base do Front</Text>
        <StatusBar style="auto" />
      </ScrollView>
      {/* <BottomNavbar /> */}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Home;
