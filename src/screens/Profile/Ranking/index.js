import { useContext, useState } from "react";
import { Platform, StyleSheet, Text, } from "react-native";
import { Avatar, DataTable, IconButton, ProgressBar, useTheme } from "react-native-paper";
import TextInput from "../../../components/TextInput";
import AuthContext from "../../../contexts/auth";
import avatarAsText from "../../../services/avatarText";

const Ranking = () => {
    const theme = useTheme();

    const { user } = useContext(AuthContext);
    const avatar = avatarAsText(user.nome);

    const [search, setSearch] = useState("Matemática")

    const ranking = [
        {
            position: 1,
            progress: 1,
            name: "Mario Leandro",
            hits: 135,
            misses: 12
        },
        {
            position: 2,
            progress: 0.8,
            name: "Jeremias Oliveira",
            hits: 87,
            misses: 24
        },
        {
            position: 3,
            progress: 0.7,
            name: "Raquel Alves",
            hits: 63,
            misses: 20
        }
    ]

    return (
        <>
            <Text style={{ ...styles.title, fontSize: 17, color: theme?.colors?.primary, marginTop: 20 }}>
                Meu Ranking
            </Text>

            <DataTable
                style={{
                    ...styles.table,
                    backgroundColor: theme?.colors?.light,
                }}
            >

                <TextInput
                    value={search}
                    onChangeText={(text) => setSearch(text)}
                    mode="outlined"
                    label="Matéria"
                    leftIcon={"tag-outline"}
                    rightIcon={"chevron-down"}
                    style={{ margin: 10, width: 250, backgroundColor: theme?.colors?.light }}
                    outlineStyle={{
                        borderRadius: 5
                    }}
                />

                {
                    ranking.map((rank, key) => (
                        <DataTable.Row key={key}>
                            <DataTable.Cell textStyle={styles.text}>
                                <Text style={{ ...styles.text, marginRight: 10 }}>
                                    {rank.position}º
                                </Text>
                                <Avatar.Text size={32} label={avatarAsText(rank.name)} labelStyle={{ ...styles.text }} />
                                <Text style={{ ...styles.text, marginLeft: 10 }}>
                                    {rank.name}
                                </Text>
                            </DataTable.Cell>
                            <DataTable.Cell textStyle={styles.text}>
                                <ProgressBar progress={rank.progress} color={theme?.colors?.primary} style={{ height: 3, width: 150 }} />
                            </DataTable.Cell>
                            <DataTable.Cell textStyle={styles.text}>
                                <IconButton
                                    icon="target"
                                    size={16}
                                    iconColor={theme?.colors?.primary}
                                />
                                <Text>
                                    {rank.hits}
                                </Text>
                                <IconButton
                                    icon="close-thick"
                                    size={16}
                                    iconColor={theme?.colors?.primary}
                                />
                                <Text>
                                    {rank.misses}
                                </Text>
                            </DataTable.Cell>
                        </DataTable.Row>
                    ))
                }

                <DataTable.Row>
                    <DataTable.Cell textStyle={styles.text}>
                        ...
                    </DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row>
                    <DataTable.Cell textStyle={styles.text}>
                        <Text style={{ ...styles.text, marginRight: 10 }}>
                            23883º
                        </Text>
                        <Avatar.Text size={32} label={avatar} labelStyle={{ ...styles.text }} />
                        <Text style={{ ...styles.text, marginLeft: 10 }}>
                            Você ({user.nome})
                        </Text>
                    </DataTable.Cell>
                    <DataTable.Cell textStyle={styles.text}>
                        {
                            Platform.OS === 'web' ?
                                <ProgressBar progress={0.15} color={theme?.colors?.primary} style={{ height: 3, width: 150 }} />
                                :
                                <></>
                        }
                    </DataTable.Cell>
                    <DataTable.Cell textStyle={styles.text}>
                        <IconButton
                            icon="target"
                            size={16}
                            iconColor={theme?.colors?.primary}
                        />
                        <Text>
                            4
                        </Text>
                        <IconButton
                            icon="close-thick"
                            size={16}
                            iconColor={theme?.colors?.primary}
                        />
                        <Text>
                            3
                        </Text>
                    </DataTable.Cell>
                </DataTable.Row>

            </DataTable>
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
    table: {
        marginTop: 15,
        marginBottom: 5,
        width: "100%",
    },
    text: {
        fontFamily: "Roboto-Medium",
    },
});

export default Ranking;
