import { useState } from "react";
import { StyleSheet, Text, } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { DataTable, useTheme } from "react-native-paper";
import TextInput from "../../../components/TextInput";

const Performance = () => {
    const theme = useTheme();

    const [search, setSearch] = useState("Matemática");
    const [chartWidth, setChartWidth] = useState(0);

    const onLayout = (event) => {
        const { x, y, height, width } = event.nativeEvent.layout;
        setChartWidth(width);
    };

    return (
        <>
            <Text style={{ ...styles.title, fontSize: 17, color: theme?.colors?.primary, marginTop: 20 }}>
                Meu Desempenho
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

                <DataTable.Row>
                    <DataTable.Cell textStyle={styles.text}>
                        <Text style={{ ...styles.text, marginLeft: 10 }}>
                            Sua Média de Desempenho em Matemática
                        </Text>
                    </DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row onLayout={onLayout}>
                    <DataTable.Cell textStyle={styles.text}>
                        <LineChart
                            data={{
                                labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho"],
                                datasets: [
                                    {
                                        data: [
                                            Math.random() * 100,
                                            Math.random() * 100,
                                            Math.random() * 100,
                                            Math.random() * 100,
                                            Math.random() * 100,
                                            Math.random() * 100
                                        ]
                                    }
                                ]
                            }}
                            width={chartWidth}
                            height={220}
                            yAxisLabel=""
                            yAxisSuffix=""
                            yAxisInterval={1}
                            chartConfig={{
                                backgroundColor: theme?.colors?.light,
                                backgroundGradientFrom: theme?.colors?.light,
                                backgroundGradientTo: theme?.colors?.light,
                                decimalPlaces: 0,
                                color: (opacity = 1) => theme?.colors?.primary,
                                labelColor: (opacity = 1) => theme?.colors?.primary,
                                style: {
                                    borderRadius: 16
                                },
                                propsForDots: {
                                    r: "6",
                                    strokeWidth: "2",
                                    stroke: theme?.colors?.primary
                                }
                            }}
                            bezier
                            style={{
                                marginVertical: 8,
                                borderRadius: 16
                            }}
                        />
                    </DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row>
                    <DataTable.Cell textStyle={styles.text}>
                        <Text style={{ ...styles.text, marginLeft: 10 }}>
                            Outras Estatísticas
                        </Text>
                    </DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row>
                    <DataTable.Cell textStyle={styles.text}>
                        <Text style={{ fontFamily: "Roboto-Medium", marginLeft: 10 }}>
                            Nenhuma outra estatística encontrada
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

export default Performance;