import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./api";

export async function authenticate({ login, password }) {
  const {data} = await api.post('/user/login', {
    email: login,
    senha: password
  }
  )

  console.log(data)

  const { token, user } = data;

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
