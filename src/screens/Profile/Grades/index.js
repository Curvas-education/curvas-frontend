import { useState } from "react";
import { StyleSheet, Text, } from "react-native";
import { DataTable, useTheme } from "react-native-paper";
import TextInput from "../../../components/TextInput";

const Grades = () => {
    const theme = useTheme();

    const [search, setSearch] = useState("")

    return (
        <>
            <Text style={{ ...styles.title, fontSize: 17, color: theme?.colors?.primary, marginTop: 20 }}>
                Minhas Notas
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
                    label="Buscar Matéria"
                    leftIcon={"tag-search"}
                    style={{ margin: 10, width: 250, backgroundColor: theme?.colors?.light }}
                    outlineStyle={{
                        borderRadius: 5
                    }}
                />

                <DataTable.Header>
                    <DataTable.Title sortDirection="descending">
                        Matéria
                    </DataTable.Title>
                    <DataTable.Title>
                        Média Geral
                    </DataTable.Title>
                    <DataTable.Title>
                        Última Avaliação
                    </DataTable.Title>
                </DataTable.Header>

                <DataTable.Row>
                    <DataTable.Cell textStyle={styles.text}>
                        Linguagens e Códigos
                    </DataTable.Cell>
                    <DataTable.Cell textStyle={styles.text}>
                        8.0
                    </DataTable.Cell>
                    <DataTable.Cell textStyle={styles.text}>
                        09/02/2023
                    </DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row>
                    <DataTable.Cell textStyle={styles.text}>
                        Matemática
                    </DataTable.Cell>
                    <DataTable.Cell textStyle={styles.text}>
                        4.5
                    </DataTable.Cell>
                    <DataTable.Cell textStyle={styles.text}>
                        09/02/2023
                    </DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row>
                    <DataTable.Cell textStyle={styles.text}>
                        Ciências da Natureza
                    </DataTable.Cell>
                    <DataTable.Cell textStyle={styles.text}>
                        4.5
                    </DataTable.Cell>
                    <DataTable.Cell textStyle={styles.text}>
                        05/08/2022
                    </DataTable.Cell>
                </DataTable.Row>

                {/* 
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
                /> */}
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

export default Grades;
