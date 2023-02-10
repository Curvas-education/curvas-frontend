import { useContext, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Avatar, BottomNavigation, useTheme } from "react-native-paper";
import BottomNavbar from "../../components/BottomNav";
import Breadcrumb from "../../components/Breadcrumb";
import Navbar from "../../components/Navbar";
import AuthContext from "../../contexts/auth";
import avatarAsText from "../../services/avatarText";
import Exercises from "./Exercises";
import Grades from "./Grades";
import Performance from "./Performance";
import Ranking from "./Ranking";

const Profile = () => {
    const theme = useTheme();
    const { user } = useContext(AuthContext);
    const avatar = avatarAsText(user.nome);

    const [index, setIndex] = useState(0);
    const routes = [
        {
            key: "grades",
            title: "Notas",
            focusedIcon: "school",
            onRender: <Grades />,
        },
        {
            key: "trophy",
            title: "Ranking",
            focusedIcon: "trophy",
            onRender: <Ranking />,
        },
        {
            key: "exercises",
            title: "Exercícios",
            focusedIcon: "bookshelf",
            onRender: <Exercises />,
        },
        {
            key: "performance",
            title: "Desempenho",
            focusedIcon: "speedometer",
            onRender: <Performance />,
        },
    ];

    const onIndexChange = (number) => {
        if (number === index) {
            setIndex(null);
            return;
        };

        setIndex(number);
    };

    return (
        <>
            <Navbar showExitButton />
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
                        <Breadcrumb.Page label="Meu Ambiente" link="profile" />
                    </Breadcrumb>

                    <Text style={{ ...styles.title, color: theme?.colors?.primary, marginBottom: 20 }}>
                        Meu Ambiente
                    </Text>
                    <View style={styles.userBoxContainer}>
                        <Avatar.Text size={72} label={avatar} labelStyle={{ fontFamily: 'Roboto-Medium' }} />
                        <ScrollView style={styles.descriptionContainer}>
                            <Text style={{ ...styles.title, color: theme?.colors?.primary }}>
                                {user?.nome}
                            </Text>
                            <Text style={{ ...styles.description, color: theme?.colors?.primary }}>
                                ID: {user?.id ?? "Desconhecido"}
                            </Text>
                            <Text style={{ ...styles.description, color: theme?.colors?.primary }}>
                                Série/Ano: 9ª ano
                            </Text>
                            <Text style={{ ...styles.description, color: theme?.colors?.primary }}>
                                Instituição: Escola Estadual Fictícia
                            </Text>
                        </ScrollView>
                    </View>

                    <Text style={{ ...styles.title, fontSize: 17, color: theme?.colors?.primary, marginTop: 20 }}>
                        Minhas Conquistas
                    </Text>
                    <ScrollView style={{ width: '100%', marginTop: 5 }}>
                        <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
                            <Avatar.Text size={32} label={"?"} labelStyle={{ fontFamily: 'Roboto-Medium' }} />
                        </View>
                    </ScrollView>

                    {routes[index].onRender}

                </View>

                <View style={{ marginBottom: 20 }} />

            </ScrollView>
            <View style={styles.floatingNavigator}>
                <BottomNavbar
                    index={index}
                    onIndexChange={onIndexChange}
                    routes={routes}
                    renderScene={BottomNavigation.SceneMap({
                        grades: () => { },
                        trophy: () => { },
                        exercises: () => { },
                        performance: () => { }
                    })}
                />
            </View>
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
    userBoxContainer: {
        flexDirection: 'row'
    },
    descriptionContainer: {
        flexDirection: 'column',
        marginLeft: 15
    },
    button: {
        width: 260
    },
    floatingNavigator: {
        height: 80,
        width: "100%",
    },
});

export default Profile;
