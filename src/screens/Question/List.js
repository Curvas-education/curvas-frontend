import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { DataTable, useTheme, FAB, IconButton, ActivityIndicator, Button } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
import Breadcrumb from "../../components/Breadcrumb";
import Navbar from "../../components/Navbar";
import Snackbar from "../../components/Snackbar";
import TextInput from "../../components/TextInput";
import api from "../../services/api";
import useDebounce from "../../services/hooks/useDebounce";

const optionsPerPage = [10, 20, 30];

const QuestionList = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const isFocused = useIsFocused()

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

  const alert = snackbar.alert;

  const [total, setTotal] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 600);
  const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[0]);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, questions?.length);

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        const { data } = await api.get('/question/list', {
          params: {
            search: debouncedSearch
          }
        });
        setQuestions(data?.questions ?? [])
        setLoading(false);
      } catch (error) {
        console.log(error)
        alert(error?.response?.message ?? "Ocorreu um erro ao tentar listar as questões", "error");
      }
    }

    getData()
  }, [isFocused, debouncedSearch])

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  const openQuestionCreate = () => {
    navigation.navigate("questioncreate");
  };

  return (
    <>
      <Navbar />
      <Snackbar
        hide={snackbar.hide}
        message={snackbar.message}
        type={snackbar.type}
        visible={snackbar.visible}
      />
      {loading ?
        (<ScrollView style={{ backgroundColor: theme?.colors?.background }} contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator animating={true} color={theme?.colors?.primary} size={'large'} />
        </ScrollView>) :
        (<ScrollView
          style={{ backgroundColor: theme?.colors?.background }}
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={{ width: "95%" }}>
            <View style={styles.routes}>
              <Breadcrumb style={{ marginTop: 10, marginBottom: 15 }}>
                <Breadcrumb.Icon icon="home" link="home" />
                <Breadcrumb.Page label="Banco de Questões" link="questionlist" />
              </Breadcrumb>
            </View>
            <Text style={{ ...styles.title, color: theme?.colors?.primary }}>
              Banco de Questões
            </Text>
            <TextInput
              value={search}
              onChangeText={setSearch}
              multiline={true}
              leftIcon={"note-search"}
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

            {questions?.map((question) => (
              <DataTable.Row
                key={question.id}
                onPress={() => navigation.navigate("questionview", { id: question.id })}
              >
                <DataTable.Cell textStyle={styles.text}>
                  {question.enunciado}
                </DataTable.Cell>
                <DataTable.Cell textStyle={styles.text}>
                  Química, História
                </DataTable.Cell>
              </DataTable.Row>
            ))}

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

          <View style={{ width: "95%", marginBottom: 40 }}>
            <Button
              icon="pencil-plus"
              onPress={openQuestionCreate}
              mode="outlined"
              textColor={theme?.colors?.primary}
              style={{
                alignSelf: 'flex-end',
                borderColor: theme?.colors?.primary,
                borderRadius: 5,
                marginTop: 5,
                marginBottom: 10,
                width: 225
              }}
            >
              Criar Nova Questão
            </Button>
          </View>
        </ScrollView>)}
      <FAB
        icon="filter"
        color={theme?.colors?.background}
        style={{ ...styles.fab, backgroundColor: theme?.colors?.primary }}
        onPress={() => console.log("")}
      />
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
    marginBottom: 5,
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
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    borderRadius: 50
  },
  routes: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-between"
  }
});

export default QuestionList;
