import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { DataTable, IconButton, useTheme } from "react-native-paper";
import Breadcrumb from "../../components/Breadcrumb";
import Navbar from "../../components/Navbar";
import Snackbar from "../../components/Snackbar";
import TextInput from "../../components/TextInput";

const optionsPerPage = [10, 20, 30];

const QuestionList = () => {
  const theme = useTheme();
  const navigation = useNavigation();

  const [snackbar, setSnackbar] = useState({
    type: "info",
    message: "",
    visible: false,
    alert: (msg, type) => {
      setSnackbar({ ...snackbar, message: msg, type: type, visible: true });
    },
    hide: () => {
      setSnackbar({ ...snackbar, visible: false });
    },
  });

  const [total, setTotal] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[0]);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, questions.length);

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (
    <>
      <Navbar />
      <Snackbar
        hide={snackbar.hide}
        message={snackbar.message}
        type={snackbar.type}
        visible={snackbar.visible}
      />
      <ScrollView
        style={{ backgroundColor: theme?.colors?.background }}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={{ width: "95%" }}>
          <Breadcrumb style={{ marginTop: 10, marginBottom: 15 }}>
            <Breadcrumb.Icon icon="home" link="home" />
            <Breadcrumb.Page label="Banco de Questões" link="questionlist" />
          </Breadcrumb>
          <Text style={{ ...styles.title, color: theme?.colors?.primary }}>
            Banco de Questões
          </Text>
          <TextInput
            rightIcon="magnify"
            rightPress={() => {}}
            label="Buscar no Banco"
            style={styles.searchInput}
          />
        </View>
        <DataTable
          style={{
            ...styles.table,
            backgroundColor: theme?.colors?.light,
          }}
        >
          <DataTable.Header>
            <DataTable.Title
              textStyle={styles.textTitle}
              sortDirection="descending"
            >
              Enunciado
            </DataTable.Title>
            <DataTable.Title textStyle={styles.textTitle}>
              Categorias
            </DataTable.Title>
          </DataTable.Header>

          <DataTable.Row
            onPress={() => navigation.navigate("questionview", { id: 1 })}
          >
            <DataTable.Cell textStyle={styles.text}>
              (Enem-2018) Em 1938 o arqueólogo alemão Wilhelm...
            </DataTable.Cell>
            <DataTable.Cell textStyle={styles.text}>
              Química, História
            </DataTable.Cell>
          </DataTable.Row>

          <DataTable.Pagination
            page={page}
            numberOfPages={Math.ceil(questions.length / itemsPerPage)}
            onPageChange={(page) => setPage(page)}
            label={`${from}-${to} de ${total}`}
            numberOfItemsPerPageList={optionsPerPage}
            numberOfItemsPerPage={itemsPerPage}
            onItemsPerPageChange={setItemsPerPage}
            showFastPaginationControls
            selectPageDropdownLabel={"Questões por página"}
          />
        </DataTable>
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
  table: {
    marginTop: 15,
    marginBottom: 45,
    width: "95%",
  },
  title: {
    fontFamily: "Roboto-Medium",
    alignSelf: "flex-start",
    marginBottom: 15,
    fontSize: 20,
  },
  tableTitle: {
    fontFamily: "Roboto-Medium",
  },
  text: {
    fontFamily: "Roboto-Medium",
  },
  searchInput: {
    width: "100%",
    marginBottom: 15,
  },
});

export default QuestionList;
