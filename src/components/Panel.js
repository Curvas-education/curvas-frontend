import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useTheme, IconButton, Divider, TouchableRipple } from "react-native-paper";

export const Panel = ({
    width = 550,
    header = {
        title: "",
        icon: "",
        iconPress: () => { }
    },
    tabs = {
        pages: [],
        pageIndex: 0
    },
    children
}) => {
    const theme = useTheme();

    return (
        <View style={{
            width: width,
            maxWidth: "100%",
            backgroundColor: theme?.colors?.light,
            borderColor: theme?.colors?.gray,
            borderWidth: 1,
            elevation: 5
        }}>
            <Panel.Header title={header?.title} icon={header?.icon} iconPress={header?.iconPress} />
            <Panel.Tabs pages={tabs?.pages} pageIndex={tabs?.pageIndex} />
            <Panel.Body>
                {children}
            </Panel.Body>
        </View>
    )
};

Panel.Header = ({ title, icon, iconPress = () => { } }) => {
    const theme = useTheme();

    return (
        <>
            <View style={{ width: '100%', height: 55 }}>
                {
                    !icon ?
                        <IconButton
                            onPress={iconPress}
                            icon={icon}
                            iconColor={theme?.colors?.gray}
                            style={{ position: 'absolute', right: 0, top: 5 }}
                        />
                        :
                        <></>
                }
                <Text style={{ ...styles.title, color: theme?.colors?.primary, margin: 20 }}>
                    {title}
                </Text>
            </View>
            <Divider style={{ backgroundColor: theme?.colors?.gray }} />
        </>
    )
};

Panel.Tabs = ({ pages, pageIndex }) => {
    const theme = useTheme();

    return (
        <>
            <View style={{ width: '100%', alignItems: 'center', justifyContent: "space-around", flexDirection: 'row', marginBottom: 0, marginTop: 0 }}>
                {Object.keys(pages)?.map((page, key) => (
                    <TouchableRipple key={key} onPress={pages[page]?.onPress} style={{
                        ...(page == pageIndex ? { borderBottomColor: theme?.colors?.primary, borderBottomWidth: 3 } : {}),
                        flexDirection: 'column',
                        alignItems: "center",
                        minWidth: 67
                    }}>
                        <>
                            <IconButton icon={pages[page]?.icon} iconColor={theme?.colors?.primary} />
                            <Text style={{ ...styles.previewText, color: theme?.colors?.primary, marginBottom: 15 }}>
                                {pages[page]?.label}
                            </Text>
                        </>
                    </TouchableRipple>
                ))}
            </View>
            <Divider style={{ backgroundColor: theme?.colors?.gray }} />
        </>
    )
};

Panel.Body = ({ children }) => (
    <>
        <ScrollView style={{
            padding: 20
        }}>
            {children}
        </ScrollView>
    </>
);

const styles = StyleSheet.create({
    title: {
        fontFamily: "Roboto-Medium",
        alignSelf: "flex-start",
        marginBottom: 15,
        fontSize: 16,
        textAlign: 'center'
    },
    text: {
        fontFamily: "Roboto-Medium",
    },
    title: {
        fontFamily: "Roboto-Medium",
        marginBottom: 15,
        fontSize: 16,
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
        fontFamily: "Roboto-Regular"
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        borderRadius: 45
    },
});