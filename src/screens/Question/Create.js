import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { RadioButton, useTheme, IconButton, Button } from "react-native-paper";
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


  const [value, setValue] = useState("");

  const [alternativas, setAlternativas] = useState([]);
  const [inputAlternativa, setInputAlternativa] = useState("");
  const [inputEnunciado, setInputEnunciado] = useState("");


  const textStyle = (styling = {}) => {
    return { ...styles.title, ...styling };
  };

  const isCorrect = (op = {}) => {
    return value === op
    ? { backgroundColor: theme?.colors?.success }
    : {}
  };

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
  if(inputEnunciado === '') {
    snackbar.alert("Enunciado vazio", "error");
    return
  }

  if(alternativas.length < 2) {
    snackbar.alert("A questão precisa conter ao menos duas alternativas", "error");
    return
  }

  if(alternativas?.findIndex(el => el === value) === -1) {
    snackbar.alert("Nenhuma alternativa correta selecionada", "error");
    return
  }

  try {
    await api.post('/question/create', {
      enunciado: inputEnunciado, alternativas: {...alternativas}, alternativa_c: alternativas?.findIndex(el => el === value)
    })
    navigation.navigate('questionlist')
  } catch (error) {
    console.log(error)
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
      
      <View
        style={{ backgroundColor: theme?.colors?.background, flex: 1,
          justifyContent: "space-between",
          alignItems: "center",}}
      >
        <View style={{ width: "95%"}}>
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

          <Text
              style={{justifyContent: 'center', alignItems: 'center', textAlign: 'center',fontSize: 18, color: theme?.colors?.primary, fontWeight: 'bold', marginTop: 10, marginBottom: 10}}
            >
              Enunciado
          </Text>

          <TextInput
              mode="outlined"
              placeholder="Enunciado"
              value={inputEnunciado}
              onChangeText={text => setInputEnunciado(text)}
              multiline={true}
              selectionColor={theme?.colors?.backdrop}
            />
          <Text
              style={{justifyContent: 'center', alignItems: 'center', textAlign: 'center',fontSize: 18, color: theme?.colors?.primary, fontWeight: 'bold', marginTop: 50}}
            >
              Alternativas
          </Text>

            <TextInput
              rightIcon="plus"
              value={inputAlternativa}
              onChangeText={text => setInputAlternativa(text)}
              rightPress={() => {
                if(inputAlternativa !== "") {
                  setAlternativas([...alternativas, inputAlternativa])
                  setInputAlternativa("")
                } else {
                  setAlternativas(alternativas)
                }
              }
              }
              placeholder="Alternativa"
            />
          </View>

        
          <ScrollView style={styles.scrollView} 
        contentContainerStyle={styles.contentContainer}
        persistentScrollbar={true}>
            <RadioButton.Group value={value}>
              {alternativas.map((op, index) => (
                <View style={{flexDirection: 'row', width: '85%', justifyContent: 'space-between', marginBottom: 10}} key={index}
                >
                <RadioButton.Item
                labelStyle={textStyle({ color: value === op ? theme?.colors?.background : theme?.colors?.primary  })}
                style={{...styles.question, ...isCorrect(op)}}
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
          </ScrollView>
        </View>
          <Button marginBottom={30} mode="contained" onPress={handleCreateQuestion}>Salvar</Button>
      </View>
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
  question: {
    width: "100%",
    justifyContent: "flex-end",
    alignItems:'center',
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
  }
});

export default QuestionCreate;
