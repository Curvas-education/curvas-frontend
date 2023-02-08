import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useTheme, Button, IconButton, Divider } from "react-native-paper";

const QuizConclude = ({ statistics: values, onExit = () => { }, onReplay = () => { } }) => {
    const theme = useTheme();

    const { navigate } = useNavigation();

    const defaultValues = {
        total: 10,
        correct: 0,
        timer: 0,
        score: 0
    };
    const [statistics, setStatistics] = useState(defaultValues);

    useEffect(() => {
        setStatistics(values ?? defaultValues);
    }, [values]);

    if (((statistics.correct / statistics.total) * 100) >= 50) {
        return (
            <ScrollView
                style={{ backgroundColor: theme?.colors?.lightSuccess }}
                contentContainerStyle={{
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <View
                    style={{
                        marginTop: 150,
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <IconButton
                        size={48}
                        icon="thumb-up"
                        iconColor={theme?.colors?.dark}
                    />
                    <Text style={{ ...styles.title, color: theme.colors.dark, marginBottom: 60 }}>
                        Bom trabalho!
                    </Text>
                </View>

                <View
                    style={{
                        marginTop: 25,
                        width: 250,
                        maxWidth: "80%",
                        justifyContent: "flex-start",
                        alignItems: "flex-start"
                    }}
                >
                    <Text style={{ ...styles.resultSubText, color: theme.colors.dark, marginBottom: 5 }}>
                        Resultados:
                    </Text>

                    <Divider style={{ ...styles.divider, backgroundColor: theme?.colors?.dark }} />

                    <Text style={{ ...styles.resultText, color: theme.colors.dark }}>
                        Acertos: {statistics.correct}/{statistics.total}
                    </Text>
                    <Text style={{ ...styles.resultText, color: theme.colors.dark }}>
                        Tempo: {statistics.timer} segundos
                    </Text>
                    <Text style={{ ...styles.resultBoldText, color: theme.colors.dark }}>
                        Pontuação Total: {statistics.score}
                    </Text>

                </View>

                <Button
                    style={{ marginTop: 15, width: 250, maxWidth: '80%' }}
                    mode="contained"
                    icon="book-open-page-variant"
                    onPress={() => {
                        onExit();
                        navigate("questionlist");
                    }}
                    buttonColor={theme.colors.dark}
                    textColor={theme?.colors?.lightSuccess}
                >
                    Concluir
                </Button>

            </ScrollView>
        )
    } else {
        return (
            <ScrollView
                style={{ backgroundColor: theme?.colors?.danger }}
                contentContainerStyle={{
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >

                <View
                    style={{
                        marginTop: 150,
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <IconButton
                        size={48}
                        icon="emoticon-sad"
                        iconColor={theme?.colors?.background}
                    />
                    <Text style={{ ...styles.title, color: theme.colors.background, marginBottom: 60 }}>
                        Não foi dessa vez!
                    </Text>
                </View>

                <View
                    style={{
                        marginTop: 25,
                        width: 250,
                        maxWidth: "80%",
                        justifyContent: "flex-start",
                        alignItems: "flex-start"
                    }}
                >
                    <Text style={{ ...styles.resultSubText, color: theme.colors.background, marginBottom: 5 }}>
                        Resultados:
                    </Text>

                    <Divider style={{ ...styles.divider, backgroundColor: theme?.colors?.background }} />

                    <Text style={{ ...styles.resultText, color: theme.colors.background }}>
                        Acertos: {statistics.correct}/{statistics.total}
                    </Text>
                    <Text style={{ ...styles.resultText, color: theme.colors.background }}>
                        Tempo: {statistics.timer} segundos
                    </Text>
                    <Text style={{ ...styles.resultBoldText, color: theme.colors.background }}>
                        Pontuação Total: {statistics.score}
                    </Text>

                </View>

                <Button
                    style={{ marginTop: 15, width: 250, maxWidth: '80%' }}
                    mode="contained"
                    icon="book-open-page-variant"
                    onPress={() => {
                        onExit();
                        navigate("questionlist");
                    }}
                    buttonColor={theme.colors.background}
                    textColor={theme?.colors?.danger}>
                    Concluir
                </Button>

                <Button
                    style={{ marginTop: 10, width: 250, maxWidth: '80%' }}
                    mode="text"
                    onPress={onReplay}
                    textColor={theme?.colors?.background}
                >
                    Tentar Novamente
                </Button>

            </ScrollView>
        )
    }
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

export default QuizConclude;
