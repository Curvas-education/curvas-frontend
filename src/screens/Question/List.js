import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { DataTable, useTheme } from "react-native-paper";
import Navbar from "../../components/Navbar";

const optionsPerPage = [10, 20, 30];

const List = () => {
  const theme = useTheme();

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
      <ScrollView
        style={{ backgroundColor: theme?.colors?.background }}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={{ width: "95%" }}>
          <Text style={{ ...styles.title, color: theme?.colors?.primary }}>
            Lista de Questões
          </Text>
        </View>
        <DataTable
          style={{
            ...styles.table,
            backgroundColor: theme?.colors?.light,
          }}
        >
          <DataTable.Header>
            <DataTable.Title
              textStyle={styles.tableTitle}
              sortDirection="descending"
            >
              ID
            </DataTable.Title>
            <DataTable.Title textStyle={styles.textTitle}>
              Enunciado
            </DataTable.Title>
            <DataTable.Title textStyle={styles.textTitle}>
              Categorias
            </DataTable.Title>
          </DataTable.Header>

          <DataTable.Row onPress={()=>{}}>
            <DataTable.Cell textStyle={styles.text}>1</DataTable.Cell>
            <DataTable.Cell textStyle={styles.text}>(Enem-2018) Em 1938 o arqueólogo alemão Wilhelm...</DataTable.Cell>
            <DataTable.Cell textStyle={styles.text}>Química, História</DataTable.Cell>
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
    marginTop: 20,
    fontSize: 20,
  },
  tableTitle: {
    fontFamily: "Roboto-Medium",
  },
  text: {
    fontFamily: "Roboto-Medium",
  },
});

export default List;
