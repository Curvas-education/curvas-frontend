import { useContext } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Avatar, Button, useTheme } from "react-native-paper";
import Breadcrumb from "../../components/Breadcrumb";
import Navbar from "../../components/Navbar";
import AuthContext from "../../contexts/auth";

const Profile = () => {
    const theme = useTheme();
    const { user } = useContext(AuthContext);

    let avatarAsText = () => {
        let name = user?.nome?.split(" ")
        console.log(name);
        let firstLetter = name?.at(0)[0].toUpperCase();
        let secondLetter = name.length > 1 ? name?.at(-1)[0].toUpperCase() : "";

        if (!firstLetter) return "?";

        return firstLetter + secondLetter;
    };
    let avatar = avatarAsText();

    return (
        <>
            <Navbar />
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
                        <Breadcrumb.Page label="Meu Perfil" link="profile" />
                    </Breadcrumb>

                    <Text style={{ ...styles.title, color: theme?.colors?.primary, marginBottom: 20 }}>
                        Meu Perfil
                    </Text>
                    <View style={styles.userBoxContainer}>
                        <Avatar.Text size={72} label={avatar} labelStyle={{ fontFamily: 'Roboto-Medium' }} />
                        <ScrollView style={styles.descriptionContainer}>
                            <Text style={{ ...styles.title, color: theme?.colors?.primary }}>
                                {user?.nome}
                            </Text>
                            <Text style={{ ...styles.description, color: theme?.colors?.primary }}>
                                {user?.descricao ?? "Você ainda não adicionou uma descrição"}
                            </Text>
                        </ScrollView>
                    </View>

                    <Text style={{ ...styles.title, fontSize: 17, color: theme?.colors?.primary, marginTop: 20 }}>
                        Minhas Conquistas
                    </Text>
                    <ScrollView style={{ width: '100%', marginTop: 5 }}>
                        <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
                            <Avatar.Text size={32} label={"B"} labelStyle={{ fontFamily: 'Roboto-Medium' }} />
                        </View>
                    </ScrollView>

                </View>
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
    title: {
        fontFamily: "Roboto-Medium",
        alignSelf: "flex-start",
        fontSize: 20,
    },
    description: {
        fontFamily: "Roboto-Regular",
        alignSelf: "flex-start",
        fontStyle: "italic",
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
    }
});

export default Profile;
