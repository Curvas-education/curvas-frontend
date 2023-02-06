import { NavigationContainer } from "@react-navigation/native";
import Routes from "./src/routes";
import { AuthProvider } from "./src/contexts/auth";
import { ThemeProvider } from "./src/contexts/theme";

const state = {
  screens: {
    splash: "",
    home: "home",
    profile: "profile",
    questionlist: "question/list",
    questionview: "question/view",
    questioncreate: "question/create",
    signin: "auth/signin",
    signup: "auth/signup",
    quizview: "quiz/view"
  },
};

const linking = {
  prefixes: [],
  config: state,
};

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer linking={linking}>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </NavigationContainer>
    </ThemeProvider>
  );
}
