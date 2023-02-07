import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { RadioButton, useTheme, IconButton, Button, ActivityIndicator } from "react-native-paper";
import Breadcrumb from "../../components/Breadcrumb";
import Navbar from "../../components/Navbar";
import { Panel } from "../../components/Panel";
import Snackbar from "../../components/Snackbar";
import TextInput from "../../components/TextInput";
import api from "../../services/api";

const QuestionContainer = ({ id, alert, onClose = () => { } }) => {
  const theme = useTheme();

  const [loading, setLoading] = useState(false)

  const [pageIndex, setPageIndex] = useState(0);
  const pages = {
    [0]: {
      icon: "form-select",
      label: "Formulário",
      onPress: () => setPageIndex(0)
    },
    [1]: {
      icon: "eye-outline",
      label: "Prévia",
      onPress: () => setPageIndex(1)
    }
  };

  const [inputEnunciado, setInputEnunciado] = useState("");

  const [correctOption, setCorrectOption] = useState("0");
  const [options, setOptions] = useState({
    [0]: ""
  })

  useEffect(() => {
    async function getData() {
      try {
        const { data: { question } } = await api.get('/question/view/' + id);
        setOptions(question?.alternativas);
        setInputEnunciado(question?.enunciado)
        setCorrectOption(question?.alternativa_c)
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    }

    getData()
  }, [id]);

  const handleCorrectOption = (selected) => {
    if (correctOption === selected) {
      setCorrectOption(null);
      return;
    }
    setCorrectOption(selected);
  };

  let removeOption = (i) => {
    if (Object.keys(options)?.length <= 1) {
      setOptions({
        [0]: ""
      });
      return;
    }
    if (correctOption === i) {
      setCorrectOption(null);
    } else if (correctOption && i < correctOption) {
      setCorrectOption(`${correctOption - 1}`);
    };
    let filteredOption = { ...options };
    delete filteredOption[i];

    const optionValues = Object.values(filteredOption);

    let newOptions = optionValues.reduce((prev, cur, index) => {
      return { ...prev, [index]: cur }
    }, {});

    setOptions(newOptions);
  };

  async function handleEditQuestion() {
    if (inputEnunciado === '') {
      alert("Enunciado vazio", "error");
      return
    }

    let keys = Object.keys(options);

    if (keys?.length < 2) {
      alert("A questão precisa conter ao menos duas alternativas", "error");
      return
    }

    if (keys?.findIndex(el => el === correctOption) === -1) {
      alert("Nenhuma alternativa correta selecionada", "error");
      return
    }

    try {
      setLoading(true)
      await api.put(`/question/${id}/edit`, {
        enunciado: inputEnunciado, alternativas: { ...options }, alternativa_c: correctOption
      })
      alert("Questão alterada com sucesso", "success");
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Panel
      header={{ icon: "close", iconPress: onClose, title: "Modificar Questão " + id }}
      tabs={{ pages, pageIndex }}
    >
      {
        pageIndex == 0 ?
          <>
            <TextInput
              value={inputEnunciado}
              onChangeText={setInputEnunciado}
              mode="outlined"
              label="Enunciado"
              leftIcon={"notebook"}
              multiline={true}
              style={{ ...styles.searchInput, backgroundColor: theme?.colors?.light }}
              outlineStyle={{
                borderRadius: 5
              }}
            />

            {Object.keys(options)?.map((option, key) => (
              <TextInput
                key={key}
                mode="outlined"
                value={options[option]}
                onChangeText={(text) => setOptions({ ...options, [option]: text })}
                rightIcon="trash-can"
                rightColor={theme?.colors?.danger}
                rightPress={() => removeOption(option)}
                leftPress={() => handleCorrectOption(option)}
                leftIcon={option === correctOption ? "check-circle-outline" : "close-circle-outline"}
                leftColor={option === correctOption ? theme?.colors?.success : theme?.colors?.danger}
                label={`Alternativa ${String.fromCharCode(65 + parseInt(option)).toLowerCase()})`}
                multiline={true}
                style={{ ...styles.searchInput, backgroundColor: theme?.colors?.light }}
                outlineStyle={{
                  borderRadius: 5
                }}
              />
            ))}

            <Button
              icon="pencil-plus"
              onPress={() => {
                let optionsSize = Object.keys(options)?.length;
                if (optionsSize >= 26) return;
                setOptions({ ...options, [optionsSize]: "" })
              }}
              mode="outlined"
              textColor={theme?.colors?.primary}
              style={{
                borderColor: theme?.colors?.primary,
                borderRadius: 5,
                marginBottom: 10,
                width: 225
              }}
            >
              Adicionar Alternativa
            </Button>
          </> : <></>
      }
      {
        pageIndex == 1 ?
          <>
            <Text style={{ ...styles.previewText, color: theme?.colors?.secondary, marginBottom: 10 }}>
              {inputEnunciado}
            </Text>
            {Object.keys(options)?.map((option, key) => (
              options[option] ?
                <Text key={key} style={{ ...styles.previewText, color: theme?.colors?.secondary, ...(option === correctOption ? { fontFamily: 'Roboto-Bold' } : {}) }}>
                  {`${String.fromCharCode(65 + parseInt(option)).toLowerCase()}) ${options[option]}`}
                </Text>
                :
                <></>
            ))}
            <Button
              icon="cursor-pointer"
              buttonColor={theme?.colors?.primary}
              textColor={theme?.colors?.background}
              disabled={!(inputEnunciado && options[0])}
              style={{
                borderColor: theme?.colors?.primary,
                borderRadius: 5,
                marginTop: 30,
                width: '100%'
              }}
              onPress={handleEditQuestion}
            >
              Aplicar Alterações
            </Button>
          </> : <></>
      }
    </Panel>
  )
};

const QuestionView = () => {
  const theme = useTheme();
  const route = useRoute();

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
          alignSelf: 'center',
          maxWidth: '95%'
        }}
      >
        <View style={{
          width: 550,
          maxWidth: "100%"
        }}>
          <Breadcrumb style={{ marginTop: 10, marginBottom: 15 }}>
            <Breadcrumb.Icon icon="home" link="home" />
            <Breadcrumb.Page label="Banco de Questões" link="questionlist" />
            <Breadcrumb.Page label={`Questão ${route?.params?.id}`} />
          </Breadcrumb>
        </View>

        <QuestionContainer id={route?.params?.id} width={550} alert={snackbar.alert} />
        <View style={{ marginBottom: 25 }} />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: "Roboto-Medium",
    alignSelf: "flex-start",
    marginBottom: 15,
    fontSize: 16,
    textAlign: 'center'
  },
  text: {
    fontFamily: "Roboto-Medium",
  },
  title: {
    fontFamily: "Roboto-Medium",
    marginBottom: 15,
    fontSize: 16,
  },
  subtitle: {
    fontFamily: "Roboto-Medium",
    textAlign: 'left',
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10
  },
  question: {
    width: "100%",
    justifyContent: "flex-end",
    alignItems: 'center',
    borderRadius: 10,
  },
  scrollView: {
    height: '45%',
    width: '100%',
    alignSelf: 'center',
    marginTop: 10
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInput: {
    marginBottom: 15,
  },
  previewText: {
    fontFamily: "Roboto-Regular"
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    borderRadius: 45
  },
});

export default QuestionView;
