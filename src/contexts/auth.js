import React, {createContext, useState, useEffect}  from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as auth from '../services/auth'
import api from '../services/api';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadStoragedData() {
            const storagedUser = await AsyncStorage.getItem('@CurvasAuth:user')
            const storagedToken = await AsyncStorage.getItem('@CurvasAuth:token')

            //await new Promise((resolve) => setTimeout(resolve, 2000))

            if(storagedUser && storagedToken) {
                api.defaults.headers['Authorization'] = `Bearer ${storagedToken}`
                setUser(JSON.parse(storagedUser));
            }

            setLoading(false)

        }

        loadStoragedData();
    }, [])

    async function signIn(){
       const {user, token} = await auth.signIn();
       setUser(user)
       api.defaults.headers['Authorization'] = `Bearer ${token}`
       await AsyncStorage.setItem('@CurvasAuth:user', JSON.stringify(user))
       await AsyncStorage.setItem('@CurvasAuth:token', token)
    }

    async function signOut(){
        AsyncStorage.clear().then(() => {
            setUser(null);
        })
     }

    return (
        <AuthContext.Provider value={{signIn, signOut, user, signed: !!user, loading}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;