import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Avatar, useTheme } from "react-native-paper";

const Exercises = () => {
    const theme = useTheme();

    return (
        <>
            <Text style={{ ...styles.title, fontSize: 17, color: theme?.colors?.primary, marginTop: 20 }}>
                Meus Exercícios
            </Text>
            <Text style={{ ...styles.description, color: theme?.colors?.primary, marginTop: 10 }}>
                Você não tem nenhum exercício pendente.
            </Text>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontFamily: "Roboto-Medium",
        alignSelf: "flex-start",
        fontSize: 20,
    },
    description: {
        fontFamily: "Roboto-Regular",
        alignSelf: "flex-start",
        // fontStyle: "italic",
        fontSize: 14,
    },
});

export default Exercises;
