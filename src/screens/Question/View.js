import { useRoute } from "@react-navigation/native";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useTheme } from "react-native-paper";
import Breadcrumb from "../../components/Breadcrumb";
import Navbar from "../../components/Navbar";

const QuestionView = () => {
  const theme = useTheme();
  const route = useRoute();

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
        <View style={{ width: "95%" }}>
          <Breadcrumb style={{ marginTop: 10, marginBottom: 15 }}>
            <Breadcrumb.Icon icon="home" link="home" />
            <Breadcrumb.Page label="Banco de Questões" link="questionlist" />
            <Breadcrumb.Page label={`Questão ${route?.params?.id}`} />
          </Breadcrumb>
        </View>
      </ScrollView>
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

export default QuestionView;
