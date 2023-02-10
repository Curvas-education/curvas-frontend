import { useFocusEffect, useIsFocused, useNavigation, useRoute } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useTheme, Button, ActivityIndicator } from "react-native-paper";
import Breadcrumb from "../../components/Breadcrumb";
import Navbar from "../../components/Navbar";
import Snackbar from "../../components/Snackbar";
import api from "../../services/api";
import countdown from "../../services/countdown";
import QuizConclude from "./Conclude";

const QuizView = () => {
  const theme = useTheme();

  const [loading, setLoading] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selected, setSelected] = useState(-1);
  const [questions, setQuestions] = useState([]);
  const [points, setPoints] = useState(0);
  const [timer, setTimer] = useState(0);
  const [reset, setReset] = useState(false);
  const [onConclude, setOnConclude] = useState(false);
  const stopTimer = !!(currentQuestion == questions.length);

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
  const alert = snackbar.alert

  const exit = () => {
    setSelected(-1);
    setCurrentQuestion(0);
    setOnConclude(false);
    setTimer(0);
    setPoints(0);
  };

  const replay = () => {
    setSelected(-1);
    setCurrentQuestion(0);
    setOnConclude(false);
    setPoints(0);
    setTimer(0);
    setReset(!reset);
  };

  useEffect(() => {
    if (stopTimer) return;
    let timing = setTimeout(() => setTimer(timer + 1), 1000);
    return () => clearTimeout(timing);
  }, [timer, stopTimer]);

  async function getData() {
    try {
      exit();
      setLoading(true);
      const { data } = await api.get('/question/list');
      const questionsCorrected = data?.questions.map(question => {
        return {
          ...question,
          alternativas: Object.values(question.alternativas)
        }
      })
      const shuffledArray = questionsCorrected.sort(() => 0.5 - Math.random());
      const result = shuffledArray.slice(0, 10);
      setQuestions(result ?? [])
      setLoading(false);
    } catch (error) {
      console.log(error)
      alert(error?.response?.message ?? "Ocorreu um erro ao tentar listar as questões", "error");
    }
  };

  useFocusEffect(
    useCallback(() => {
      getData();
    }, [reset])
  );

  function correctColor(index) {
    if (selected >= 0) {
      if (selected === index) {
        return questions[currentQuestion].alternativa_c == index ? theme.colors.success : theme.colors.danger
      } else {
        return questions[currentQuestion].alternativa_c == index ? theme.colors.success : theme.colors.primary
      }
    } else {
      return theme.colors.primary
    }
  }

  function nextQuestion() {
    if (selected === -1) {
      alert("Nenhuma alternativa selecionada", "error");
      return
    }
    if ((currentQuestion + 1) == questions.length) {
      setOnConclude(true);
      setCurrentQuestion(currentQuestion + 1)
      return;
    };
    setSelected(-1);
    setCurrentQuestion(currentQuestion + 1)
  }

  if (loading) {
    return (
      <View style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator animating={true} color={theme?.colors?.primary} size={'large'} />
      </View>
    )
  }

  if (onConclude) {
    return <QuizConclude
      onExit={exit}
      onReplay={replay}
      statistics={{
        total: questions.length,
        correct: points,
        timer: timer,
        score: Math.round((points * (points / timer) * 100))
      }}
    />
  }

  return (
    <QuizContainer snackbar={snackbar}>
      <View
        style={{
          width: 550,
          maxWidth: '100%',
          justifyContent: 'space-between',
          alignItems: 'center',
          alignSelf: 'center'
        }}
      >
        <Text style={{ marginBottom: 5, fontFamily: "Roboto-Medium", fontSize: 16, color: theme.colors.primary }}>
          {countdown(timer * 1000)}
        </Text>
        <Text style={{ ...styles.subtitle, color: theme.colors.primary }}>
          {`${currentQuestion + 1} / ${questions.length}`}
        </Text>
        <Text style={{ ...styles.title, color: theme.colors.primary, width: '90%', textAlign: 'center', marginBottom: 60 }}>
          {questions[currentQuestion]?.enunciado}
        </Text>

        <View style={{ width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
          {questions[currentQuestion]?.alternativas?.map((question, index) => (
            <Button
              key={index}
              style={{ marginBottom: 15, width: '70%', borderColor: correctColor(index) }}
              contentStyle={{
                width: "100%",
                justifyContent: 'center',
                alignItems: 'center'
              }}
              mode="outlined"
              onPress={() => {
                if (selected < 0) {
                  setSelected(index);
                  questions[currentQuestion]?.alternativa_c == index && setPoints(points + 1);
                }
              }}
              textColor={correctColor(index)}
            >
              {`${String.fromCharCode(65 + index).toLowerCase()})`} {question}
            </Button>
          ))}
        </View>

        <Button
          icon="draw-pen"
          onPress={nextQuestion}
          mode="contained"
          textColor={theme?.colors?.background}
          style={{
            borderRadius: 5,
            marginTop: 25,
            width: "70%",
          }}
        >
          Próxima
        </Button>
      </View>
    </QuizContainer>
  );
};

const QuizContainer = ({ children, snackbar }) => {
  const theme = useTheme();

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
            <Breadcrumb.Page label={`Quiz`} link="quizview" />
          </Breadcrumb>

          {children}

          <View style={{ marginBottom: 25 }} />

        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'red'
  },
  divider: {
    width: '100%',
    borderRadius: 5,
    height: 2,
    marginBottom: 5
  },
  points: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  title: {
    fontFamily: "Roboto-Medium",
    fontSize: 20,
  },
  subtitle: {
    fontFamily: "Roboto-Medium",
    textAlign: 'left',
    fontSize: 16,
    marginTop: 10,
    marginBottom: 25
  },
  resultSubText: {
    fontFamily: "Roboto-Bold",
    textAlign: 'left',
    fontSize: 14,
  },
  resultText: {
    fontFamily: "Roboto-Regular",
    textAlign: 'left',
    fontSize: 16,
  },
  resultBoldText: {
    fontFamily: "Roboto-Bold",
    textAlign: 'left',
    fontSize: 16,
  },
  option: {
    width: "90%",
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    marginBottom: 25
  },
});

export default QuizView;
