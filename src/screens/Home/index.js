import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "react-native-paper";
// import BottomNavbar from "../../components/BottomNav";
import Navbar from "../../components/Navbar";

const Home = () => {
  const theme = useTheme();

  return (
    <>
      <Navbar />
      <View
        style={[
          styles.container,
          { backgroundColor: theme?.colors?.background },
        ]}
      >
        <Text>Base do Front</Text>
        <StatusBar style="auto" />
      </View>
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
