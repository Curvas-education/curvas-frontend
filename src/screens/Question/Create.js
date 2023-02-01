import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { RadioButton, useTheme, Button, IconButton } from "react-native-paper";
import Breadcrumb from "../../components/Breadcrumb";
import Navbar from "../../components/Navbar";
import Snackbar from "../../components/Snackbar";
import TextInput from "../../components/TextInput";
import api from "../../services/api";

const optionsPerPage = [10, 20, 30];

const QuestionCreate = () => {
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

  const [loading, setLoading] = useState(false)

  const [value, setValue] = useState("");

  const [alternativas, setAlternativas] = useState([]);
  const [inputAlternativa, setInputAlternativa] = useState("");
  const [inputEnunciado, setInputEnunciado] = useState("");

  const handleValue = (selected) => {
    if (value === selected) {
      setValue(null);
      return;
    }
    setValue(selected);
  };

  let removeAlternativa = (i) => {
    let newAlternativas = [...alternativas];
    newAlternativas.splice(i, 1);
    setAlternativas(newAlternativas)
  }

  async function handleCreateQuestion() {
    if (inputEnunciado === '') {
      snackbar.alert("Enunciado vazio", "error");
      return
    }

    if (alternativas.length < 2) {
      snackbar.alert("A questão precisa conter ao menos duas alternativas", "error");
      return
    }

    if (alternativas?.findIndex(el => el === value) === -1) {
      snackbar.alert("Nenhuma alternativa correta selecionada", "error");
      return
    }

    try {
      setLoading(true)
      await api.post('/question/create', {
        enunciado: inputEnunciado, alternativas: { ...alternativas }, alternativa_c: alternativas?.findIndex(el => el === value)
      })
      snackbar.alert("Questão criada com sucesso", "success");
      setTimeout(() => {
        navigation.navigate('questionlist');
      }, 1000);
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

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
          <View style={{ width: "100%" }}>
            <Breadcrumb style={{ marginTop: 10, marginBottom: 15 }}>
              <Breadcrumb.Icon icon="home" link="home" />
              <Breadcrumb.Page label="Banco de Questões" link="questionlist" />
              <Breadcrumb.Page label="Criar Questão" link="questioncreate" />
            </Breadcrumb>
            <Text style={{ ...styles.title, color: theme?.colors?.primary }}>
              Criação de Questões
            </Text>
          </View>

          <View style={{ width: "100%" }}>

            <Text style={{ ...styles.subtitle, color: theme?.colors?.primary, marginTop: 20 }}>
              Enunciado
            </Text>

            <TextInput
              value={inputEnunciado}
              onChangeText={setInputEnunciado}
              leftIcon="notebook"
              label="Enunciado"
              multiline={true}
              style={styles.searchInput}
            />

            <TextInput
              value={inputAlternativa}
              onChangeText={setInputAlternativa}
              leftIcon="pencil"
              label="Alternativa"
              multiline={true}
              style={{ marginBottom: 15 }}
            />

            <Button
              icon="content-save"
              onPress={() => {
                if (inputAlternativa !== "") {
                  setAlternativas([...alternativas, inputAlternativa])
                  setInputAlternativa("")
                } else {
                  setAlternativas(alternativas)
                }
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

            <Text style={{ ...styles.subtitle, marginTop: 30, color: theme?.colors?.primary }}>
              Visualização
            </Text>
          </View>

          <Text style={{ ...styles.previewText, color: theme?.colors?.secondary, marginBottom: 15 }}>
            {inputEnunciado}
          </Text>

          {alternativas.map((op, index) => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ ...styles.previewText, color: theme?.colors?.secondary, textAlignVertical: 'center' }}>
                {String.fromCharCode(65 + index).toLowerCase() + ")"} {op}
                <IconButton icon="checkbox-marked-circle-outline" onPress={() => handleValue(op)} size={18} iconColor={theme?.colors[op === value ? "success" : "secondary"]} style={{ marginRight: 3 }} />
                <IconButton icon="trash-can" onPress={() => removeAlternativa(index)} size={18} iconColor={theme?.colors?.danger} />
              </Text>
            </View>
          ))}

          {/* 
          <RadioButton.Group value={value}>
            {alternativas.map((op, index) => {

              let background = op === value ? theme?.colors?.primary : theme?.colors?.background;
              let color = op === value ? theme?.colors?.background : theme?.colors?.primary;

              return (
                <View style={{
                  backgroundColor: background,
                  alignItems: 'center',
                  flexDirection: 'row',
                  width: '100%',
                  marginBottom: 10
                }} key={index}>
                  <View style={{ width: '90%', alignSelf: 'flex-start' }}>
                    <Text>{op}</Text>
                  </View>
                  <View style={{ width: '10%', alignSelf: 'flex-end' }}>
                    <IconButton
                      icon="delete"
                      mode="contained-tonal"
                      iconColor={theme?.colors?.danger}
                      size={30}
                      onPress={() => removeAlternativa(index)}
                    />
                  </View>
                </View>
              )
            })}
          </RadioButton.Group> */}

          {/* 

          <RadioButton.Item
                  labelStyle={{ color: color }}
                  style={{ backgroundColor: background, borderRadius: 5 }}
                  color={color}
                  uncheckedColor={color}
                  label={op}
                  value={op}
                  onPress={() => handleValue(op)}
                /> */}

          {/* <ScrollView style={styles.scrollView}
            contentContainerStyle={styles.contentContainer}
            persistentScrollbar={true}>
            <RadioButton.Group value={value}>
              {alternativas.map((op, index) => (
                <View style={{ flexDirection: 'row', width: '85%', justifyContent: 'space-between', marginBottom: 10 }} key={index}
                >
                  <RadioButton.Item
                    labelStyle={textStyle({ color: value === op ? theme?.colors?.background : theme?.colors?.primary })}
                    style={{ ...styles.question, ...isCorrect(op) }}
                    color={theme?.colors?.background}
                    uncheckedColor={theme?.colors?.backdrop}
                    label={op}
                    value={op}
                    onPress={() => handleValue(op)}
                  />
                  <IconButton
                    icon="delete"
                    mode="contained-tonal"
                    iconColor={theme?.colors?.danger}
                    size={30}
                    onPress={() => removeAlternativa(index)}
                  />
                </View>
              ))}
            </RadioButton.Group>
          </ScrollView> */}
        </View>
        <Button marginBottom={30} mode="contained" onPress={handleCreateQuestion} loading={loading} disabled={loading}>Salvar</Button>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: "Roboto-Medium",
    alignSelf: "flex-start",
    marginBottom: 15,
    fontSize: 20,
  },
  text: {
    fontFamily: "Roboto-Medium",
  },
  title: {
    fontFamily: "Roboto-Medium",
    alignSelf: "flex-start",
    marginBottom: 15,
    fontSize: 20,
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
    fontFamily: "Roboto-Regular",
    marginBottom: 5
  }
});

export default QuestionCreate;
