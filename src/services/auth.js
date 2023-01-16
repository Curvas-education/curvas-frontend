import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./api";

export async function authenticate({ login, password }) {
  const response = {
    token:
      "eyJhbGciOiJIUzI1NiIsInVzZXIiOnsiaWQiOjEsIm5hbWUiOiJhZG1pbiIsImVtYWlsIjoiZW1haWxAZW1haWwuY29tIn19.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.F-FgFAJZjIkmkX1hBPFwc4ctQHE-WNpKo1LkLQdPlts",
    user: {
      name: "admin",
      email: "email@email.com",
    },
  };

  const { token, user } = response;

  await AsyncStorage.setItem("@CurvasAuth:token", token);
  await AsyncStorage.setItem("@CurvasAuth:user", JSON.stringify(user));

  api.defaults.headers["Authorization"] = `Bearer ${token}`;

  return {
    token,
    user,
  };
}

export async function isAuthenticated() {
  const user = await AsyncStorage.getItem("@CurvasAuth:user");
  const token = await AsyncStorage.getItem("@CurvasAuth:token");

  if (user && token) {

    api.defaults.headers["Authorization"] = `Bearer ${token}`;

    return {
      token,
      user,
    };
  }

  return false;
}

export async function logout() {
  await AsyncStorage.removeItem("@CurvasAuth:token");
  await AsyncStorage.removeItem("@CurvasAuth:user");
}
